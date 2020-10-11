function get_conf(){
    $.ajax({
        url: "/read_conf",
        dataType: "json",
        type: "GET",
        success: function (data) {
            console.log(data)
            let docker_name = Object.keys(data)
            for(let i=0;i<docker_name.length;i++){
                $('#' + docker_name[i]).append('<p id="' + docker_name[i] + '-speed">speed-limit: ' + data[docker_name[i]] + 'Mbits</p><button onclick="delete_docker(' + "'" + docker_name[i] + "'" +')" id="' + docker_name[i] + '-delete">DELETE</button>')
                $('#' + docker_name[i] + '-input').val(data[docker_name[i]])
            }
        },
        error: function () {},
    });
}

function get_docker(){
    $.ajax({
        url: "/read_docker",
        dataType: "json",
        type: "GET",
        success: function (data) {
            console.log(data)
            let docker_name = Object.keys(data)
            for(let i=0;i<docker_name.length;i++){
                $('#panel').append('<div class="docker_part" id="' + docker_name[i] + '"' + '><h4 class="docker_name">' + docker_name[i] + '</h4>name: ' + docker_name[i] + '<br>ID: ' + data[docker_name[i]] + '<br><br>change speed-limit: <input id="' + docker_name[i] + '-input">Mbits</div>')
            }
            get_conf()
        },
        error: function () {},
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
        error: function () {},
    });
}

function delete_docker(docker_name){
    $("#announce").text('loading')
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
                        }, 2000);
            }else {
                $("#announce").text('err, please try again')
                alert('err, please try again')
            }
        },
        error: function () {},
    });
}

function add_docker(){
    let add_panel = $("#add_panel")
    add_panel.append('name: <input id="add_docker_name">')
    add_panel.append('<button onclick=submit_add($("#add_docker_name").val())>add</button>')
}

function submit_add(docker_name){
    $("#announce").text('loading')
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
                        }, 2000);
            }else {
                $("#announce").text('err, please try again')
                alert('err, please try again')
            }
        },
        error: function () {},
    });
}

get_docker()
