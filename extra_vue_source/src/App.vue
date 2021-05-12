<template>
  <v-app>
    <v-snackbar
        v-model="snackbar_show"
        :timeout="snackbar_timeout"
        :color="snackbar_color"
        dark
    >
      {{ snackbar_text }}

      <template v-slot:action="{ attrs }">
        <v-btn
            text
            v-bind="attrs"
            @click="snackbar_show = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>

    <v-app-bar app>
      <v-app-bar-title >Docker control panel</v-app-bar-title>
      <v-chip class="mx-10">{{current_time}}</v-chip>

      <v-spacer></v-spacer>
      <v-chip class="mx-10">{{address}}</v-chip>

      <v-dialog
          v-model="dialog"
          width="500"
      >
        <template v-slot:activator="{ on, attrs }">
          <v-btn depressed class="mr-2 primary" v-bind="attrs" v-on="on"><v-icon left>mdi-plus</v-icon>Add</v-btn>
        </template>

        <v-card>
          <v-progress-linear
              height="3"
              indeterminate
              v-if="dialog_onload"
          ></v-progress-linear>
          <v-card-title class="headline grey lighten-2">New Docker</v-card-title>
          <v-card-text>
            <v-sheet>
              <v-text-field label="name" v-model="edit_docker.name"></v-text-field>
            </v-sheet>
          </v-card-text>
          <v-card-actions>
            <v-btn text color="primary" @click="docker_add()">Add</v-btn>
            <v-btn text color="error" @click="dialog = false">Cancel</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>

      <v-btn depressed class="success" @click="refresh()">
      <v-icon left>mdi-refresh</v-icon>Refresh</v-btn>
    </v-app-bar>

    <v-main>
      <v-card v-for="docker in dockers" :key="docker.id"  class="mx-auto my-12"     max-width="600">
        <v-progress-linear
            height="3"
            indeterminate
            v-if="docker.if_loading"
        ></v-progress-linear>

        <v-card-title>{{ docker.name }}</v-card-title>
        <v-card-subtitle class="py-2">
          id : {{docker.id}} <br/> {{docker.status_info}}
        </v-card-subtitle>
        <div class="pb-4 px-2 pt-0">
          <v-chip outlined small close-label="pr-5" :color="docker.on ? 'success' : 'error'">
            {{docker.on ? "online" : "offline"}}
          </v-chip>
          <v-btn @click="docker_power(docker)" class="ml-3" icon small><v-icon>mdi-power</v-icon></v-btn>
        </div>
        <v-divider></v-divider>
        <v-card-text class="px-8 py-8">
          <v-row v-if="docker.on">
            <div class="body-1 mr-5">Speed: {{docker.act_speed}} </div>
            <v-btn small depressed color="primary" @click="docker_speed_test(docker)">Do speed test</v-btn>
          </v-row>
          <v-sheet class="my-8 pa-0"></v-sheet>
          <v-row>
            <v-sheet width="300" class="mr-10">
              <v-text-field @change="docker_speed_change(docker)" label="set speed (Mbits/sec)" :disabled="!docker.on" v-model="docker.speed"></v-text-field>
            </v-sheet>
          </v-row>
        </v-card-text>
        <v-card-actions>
          <v-btn @click="docker_del(docker)" text color="error">Delete</v-btn>
        </v-card-actions>
      </v-card>
    </v-main>

  </v-app>
</template>

<script>
import moment from "moment";
import axios from "axios";

export default {
  name: "App",
  data: () => ({
    temp_addr : '',
    snackbar_show : false,
    snackbar_text : "",
    snackbar_timeout: 2000,
    snackbar_color : "primary",
    address : '',
    current_time : null,
    dialog: false,
    dialog_onload : false,
    dockers:[
    ],
    def_docker:{
      id:0,
      name: "my docker",
      speed: 100,
      act_speed: "",
      on: false,
      if_loading:false,
      status_info: ''
    },
    edit_docker:{
      id:1,
      name: "my docker",
      speed: 100,
      act_speed: "",
      on: false,
      if_loading:false,
      status_info: ''
    },
  }),
  methods: {
    updateCurrentTime() {
      this.current_time = moment().format("HH:mm:ss");
    },

    async refresh(){
      this.check_dockers()
          .catch(error=> {this.trigger_snackbar('connection error','e'); throw error });
      this.trigger_snackbar('refresh success','i');
    },

    async docker_speed_change(docker) {
      docker.if_loading = true
      let temp_spd = {}
      temp_spd[docker.name] = docker.speed
      let bodyFormData = new FormData();
      bodyFormData.append('config', JSON.stringify(temp_spd));
      await axios.post(this.temp_addr+"/update_conf",bodyFormData,{  headers: { "Content-Type": "multipart/form-data" },})
        .catch(error => {this.trigger_snackbar(error,'e'); docker.if_loading = false;throw error})
      docker.if_loading = false
      this.trigger_snackbar("update " + docker.name +" speed success",'i')
    },

    async docker_power(docker) {
      docker.if_loading = true
      let post_to = docker.on ? "/stop_docker" : "/start_docker"
      let bodyFormData = new FormData();
      bodyFormData.append('name', docker.name);
      await axios.post(this.temp_addr+post_to,bodyFormData,{  headers: { "Content-Type": "multipart/form-data" },})
          .catch(error => {this.trigger_snackbar(error,'e'); throw error})
      docker.on = ! docker.on
      docker.if_loading = false
      await axios.get(this.temp_addr + '/read_docker')
          .then(response => {
            for (let key in response.data) {
              let index = this.dockers.findIndex(el => el.name === key)
              this.dockers[index].status_info = response.data[key][1]
            }
          })
          .catch(error => {this.trigger_snackbar(error,'e'); docker.if_loading = false; throw  error})

      let sta_str = docker.on ? "start " : "stop "
      this.trigger_snackbar( sta_str + docker.name +" success",'i')
    },


    async docker_speed_test(docker) {
      docker.if_loading = true
      docker.act_speed = 0
      let bodyFormData = new FormData();
      bodyFormData.append('name', docker.name);
      await axios.post(this.temp_addr+"/test_docker",bodyFormData,{  headers: { "Content-Type": "multipart/form-data" },})
          .then(response => docker.act_speed = response.data)
          .catch(error => {this.trigger_snackbar(error,'e'); docker.if_loading = false; throw error})
      docker.if_loading = false
    },


    async docker_add(){
      this.dialog_onload =true
      let bodyFormData = new FormData();
      bodyFormData.append('name', this.edit_docker.name);
      await axios.post(this.temp_addr+"/add_docker",bodyFormData,{  headers: { "Content-Type": "multipart/form-data" },})
          .catch(error => {this.dialog =false;this.trigger_snackbar(error,'e'); throw error})
      await this.check_dockers()
      this.dialog_onload =false
      this.dialog = false
      this.trigger_snackbar("add "+ this.edit_docker.name + " success",'i')
    },

    async docker_del(docker){
      docker.if_loading = true
      let bodyFormData = new FormData();
      let the_name = docker.name
      bodyFormData.append('name', the_name);
      await axios.post(this.temp_addr+"/delete_docker",bodyFormData,{  headers: { "Content-Type": "multipart/form-data" },})
          .catch(error => {this.dialog =false; this.trigger_snackbar(error,'e'); throw error})
      await this.check_dockers()
      this.dialog_onload =false
      this.dialog = false
      this.trigger_snackbar("delete "+ the_name + " success",'i')

    },

    trigger_snackbar(text,status){
      this.snackbar_text = text
      this.snackbar_color = status === 'i' ? "primary" : "error"
      this.snackbar_show = true
    },

    async check_dockers(){
      this.dockers = []
      await axios.get(this.temp_addr + '/read_docker')
          .then(response => {
            for (let key in response.data) {
              this.dockers.push({
                id: response.data[key][0],
                name: key,
                speed: 0,
                act_speed: 0,
                on: response.data[key][1][0] === 'U',
                if_loading: false,
                status_info: response.data[key][1]
              })
            }
          })

      await axios.get(this.temp_addr + '/read_conf')
          .then(response => {
            for (let key in response.data) {
              let index = this.dockers.findIndex(el => el.name === key)
              console.log()
              this.dockers[index].speed = response.data[key]
            }
          })
    }
  },
  async created() {
    this.current_time = moment().format("HH:mm:ss");
    setInterval(() => this.updateCurrentTime(), 1000);
    axios.get(this.temp_addr + '/server_ip')
        .then(response => this.address = response.data.ip)
        .catch(error => this.trigger_snackbar(error, 'e'))

    await this.check_dockers()
        .catch(error => {this.trigger_snackbar(error,'e'); throw  error})

    this.trigger_snackbar("load success",'i')
  },

  filters: {

  },
};
</script>

<style scoped>
</style>
