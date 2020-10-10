function get_name(){
    $.ajax({
    url: "/get_name",
    dataType: "json",
    type: "GET",
    success: function (data) {
        if(data.username !== null){
            $('#name').text(data.username);
        }else {
            $('#name').text('null');
        }
    },
    error: function () {},
});
}


function submit_form(){
    let name = $('#input_name').val()
    let pw = $('#input_password').val()
    $.ajax({
        url: "/post_form",
        dataType: "json",
        type: "POST",
        data: {
            'username': name,
            'password': pw,
        },
        success: function (data) {
            if (data.status === 1) {
                $('#status').text('login done');
                get_name();
            }else if(data.status === 2) {
                $('#status').text('err, try again');
                get_name();
            }
        },
        error: function () {},
    });
}

function submit_form_r(){
    let name = $('#input_name_r').val()
    let pw_1 = $('#input_password_r').val()
    let pw_2 = $('#input_password_r_again').val()
    if(pw_1 === pw_2){
        $.ajax({
            url: "/post_form_r",
            dataType: "json",
            type: "POST",
            data: {
                'username': name,
                'password': pw_1,
            },
            success: function (data) {
                if (data.status === 1) {
                    $('#status').text('register done');
                    get_name();
                }else if(data.status === 2){
                    $('#status').text('name already used');
                    get_name();
                }
            },
            error: function () {},
        });
    }else {
        $('#status').text('two password must be same')
    }
}

function log_out(){
    let name = $('#name').text()
    $.ajax({
        url: "/log_out",
        dataType: "json",
        type: "POST",
        data: {
            'username': name,
        },
        success: function (data) {
            if (data.status === 1) {
                $('#status').text('logout done');
                get_name();
            }else if(data.status === 2){
                $('#status').text('err, try again');
                get_name();
            }
        },
        error: function () {},
    });
}

get_name();