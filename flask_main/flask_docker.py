import json
from flask import Flask, request
from docker_conn import *
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
c = get_connection()

@app.route('/', methods=['GET'])
def return_homepage():
    return app.send_static_file('index.html')


@app.route('/server_ip', methods=['GET'])
def server_ip_fun():
    server_ip = get_server_ip()
    return {'ip': server_ip}


@app.route('/read_conf', methods=['GET'])
def docker_status():
    conf = get_conf()
    return conf


@app.route('/update_conf', methods=['POST'])
def update_docker():
    conf = json.loads(request.form['config'])
    if main_process(c, conf) == 1:
        write_conf(conf)
        return {'status': 1}
    else:
        return {'status': 2}


@app.route('/read_docker', methods=['GET'])
def docker_list_get():
    conf = get_conf()
    del_name = []
    docker_list = list_docker(c)
    docker_list_name = list_docker(c).keys()
    docker_list_conf = conf.keys()
    for name in docker_list_conf:
        if name not in docker_list_name:
            del_name.append(name)
    for name in docker_list_name:
        if name not in docker_list_conf:
            conf[name] = '1'
    for name in del_name:
        del conf[name]
    write_conf(conf)
    return docker_list


@app.route('/start_docker', methods=['POST'])
def start_docker_fun():
    docker_name = request.form['name']
    if start_docker(c, docker_name) == 1:
        return {'status': 1}
    else:
        return {'status': 2}


@app.route('/stop_docker', methods=['POST'])
def stop_docker_fun():
    docker_name = request.form['name']
    if stop_docker(c, docker_name) == 1:
        return {'status': 1}
    else:
        return {'status': 2}


@app.route('/add_docker', methods=['POST'])
def create_docker_fun():
    docker_name = request.form['name']
    if create_docker(c, docker_name) is not None:
        add_conf(docker_name)
        main_process(c, get_conf())
        return {'status': 1}
    else:
        return {'status': 2}


@app.route('/delete_docker', methods=['POST'])
def delete_docker_fun():
    docker_name = request.form['name']
    if delete_docker(c, docker_name) == 1:
        conf = get_conf()
        del conf[docker_name]
        write_conf(conf)
        main_process(c, get_conf())
        return {'status': 1}
    else:
        return {'status': 2}


@app.route('/test_docker', methods=['POST'])
def test_docker_speed():
    docker_name = request.form['name']
    speed_real = speed_test(c, docker_name)
    return speed_real


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
