function get_server_ip(){
    $.ajax({
        url: "/server_ip",
        dataType: "json",
        type: "GET",
        success: function (data) {
            console.log(data)
            $('#server_ip').text(data.ip)
            get_docker()
        },
        error: function (err) {
            console.log(err)
            get_server_ip()
        },
    });
}

function get_conf(){
    $.ajax({
        url: "/read_conf",
        dataType: "json",
        type: "GET",
        success: function (data) {
            console.log(data)
            let docker_name = Object.keys(data)
            for(let i=0;i<docker_name.length;i++){
                $('#' + docker_name[i]).append('<p id="' + docker_name[i] + '-speed">speed-limit: ' + data[docker_name[i]] + 'Mbits</p><button onclick="delete_docker(' + "'" + docker_name[i] + "'" +')" id="' + docker_name[i] + '-delete" class="btn btn-danger" > <i class="fas fa-trash-alt"></i> DELETE </button>')
                $('#' + docker_name[i] + '-input').val(data[docker_name[i]])
            }
        },
        error: function () {
            get_conf()
        },
    });
}

function get_docker(){
    $.ajax({
        url: "/read_docker",
        dataType: "json",
        type: "GET",
        success: function (data) {
            console.log(data)
            let panel = $('#panel')
            let docker_name = Object.keys(data)
            let html_panel;
            for (let i = 0; i < docker_name.length; i++) {
                html_panel = '<div class="docker_part" id="' + docker_name[i] + '"' + '><h4 class="docker_name">' + docker_name[i] + '</h4>name: ' + docker_name[i] + '<br>ID: ' + data[docker_name[i]][0] + '<br>Status: ' + data[docker_name[i]][1]
                if (data[docker_name[i]][1][0] === 'U') {
                    html_panel += '<br><button id="' + docker_name[i] + '-stop" onclick="stop_docker(' + "'" + docker_name[i] + "'" + ')" class="btn btn-secondary" ><i class="fas fa-pause"></i> STOP </button><label for="' + docker_name[i] + '-stop" id=' + docker_name[i] + '_start_stop_message></label><br><br><label id="' + docker_name[i] + '-test-speed-result" for="' + docker_name[i] + '-test-speed" ></label> <br> <button onclick="test_speed(' + "'" + docker_name[i] + "'" + ')" id="' + docker_name[i] + '-test-speed" class="btn btn-primary"  > <i class="fas fa-vial"></i> Do speed test </button> <br>change speed-limit: <input id="' + docker_name[i] + '-input">Mbits<br></div>'}else {
                    html_panel += '<br><button id="' + docker_name[i] + '-start" onclick="start_docker(' + "'" + docker_name[i] + "'" + ')" class="btn btn-success" ><i class="fas fa-play"></i> START </button><label for="' + docker_name[i] + '-start" id=' + docker_name[i] + '_start_stop_message></label><br></div>'
                }
                panel.append(html_panel)
                if (data[docker_name[i]][1][0] === 'U'){
                    test_speed(docker_name[i])
                }
            }
            get_conf()
        },
        error: function () {
            get_docker()
        },
    });
}

function update_speed_limit(){
    let conf_data = {}
    $('.docker_name').each(function(){
        conf_data[$(this).html().toString()] = $('#' + $(this).html() + '-input').val()
    });
    $("#announce").text('loading')
    $.ajax({
        url: "/update_conf",
        dataType: "json",
        type: "POST",
        data: {
            'config': JSON.stringify(conf_data),
        },
        success: function (data) {
            if(data.status === 1){
                $("#announce").text('update successful')
                alert('update successful')
                setTimeout(function() {
                            location.reload();
                        }, 1000);
            }else {
                $("#announce").text('err, please try again')
                alert('err, please try again')
            }
        },
        error: function () {
            update_speed_limit()
        },
    });
}

function delete_docker(docker_name){
    $("#announce").text(' loading')
    $.ajax({
        url: "/delete_docker",
        dataType: "json",
        type: "POST",
        data: {
            'name': docker_name,
        },
        success: function (data) {
            if(data.status === 1){
                $("#announce").text('delete ' + docker_name + ' successful')
                alert('delete ' + docker_name + ' successful')
                setTimeout(function() {
                            location.reload();
                        }, 1000);
            }else {
                $("#announce").text('err, please try again')
                alert('err, please try again')
            }
        },
        error: function () {
            delete_docker(docker_name)
        },
    });
}

function add_docker(){
    let add_panel = $("#add_panel")
    add_panel.append('name: <input id="add_docker_name">')
    add_panel.append('<button onclick=submit_add($("#add_docker_name").val())>add</button>')
}

function submit_add(docker_name){
    $("#announce").text(' loading')
    $.ajax({
        url: "/add_docker",
        dataType: "json",
        type: "POST",
        data: {
            'name': docker_name,
        },
        success: function (data) {
            if(data.status === 1){
                $("#announce").text('add ' + docker_name + ' successful')
                alert('add ' + docker_name + ' successful')
                setTimeout(function() {
                            location.reload();
                        }, 1000);
            }else {
                $("#announce").text('err, please try again')
                alert('err, please try again')
            }
        },
        error: function () {
            submit_add(docker_name)
        },
    });
}

function test_speed(docker_name){
    $('#'+docker_name+'-test-speed-result').text(' loading')
    $.ajax({
        url: "/test_docker",
        dataType: "json",
        type: "POST",
        data: {
            'name': docker_name,
        },
        success: function (data) {
            $('#'+docker_name+'-test-speed-result').text(' Upload: '+data)
        },
        error: function (err) {
            console.log(err)
            $('#'+docker_name+'-test-speed-result').text(' Upload: '+err.responseText)
        },
    });
}

function start_docker(docker_name){
    $('#' + docker_name + '_start_stop_message').text('loading')
    $.ajax({
        url: "/start_docker",
        dataType: "json",
        type: "POST",
        data: {
            'name': docker_name,
        },
        success: function (data) {
            if(data.status === 1){
                alert("start " + docker_name + " successful")
                setTimeout(function() {
                            location.reload();
                        }, 1000);
            }else {
                alert('err, please try again')
            }
        },
        error: function () {
            start_docker(docker_name)
        },
    });
}


function stop_docker(docker_name){
    $('#' + docker_name + '_start_stop_message').text('loading')
    $.ajax({
        url: "/stop_docker",
        dataType: "json",
        type: "POST",
        data: {
            'name': docker_name,
        },
        success: function (data) {
            if(data.status === 1){
                alert("stop " + docker_name + " successful")
                setTimeout(function() {
                            location.reload();
                        }, 1000);
            }else {
                alert('err, please try again')
            }
        },
        error: function () {
            stop_docker(docker_name)
        },
    });
}

get_server_ip()

