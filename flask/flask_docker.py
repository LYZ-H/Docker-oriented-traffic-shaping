import json
import os
from flask import Flask, request
from docker_conn import main_process, list_docker, create_docker, delete_docker, speed_test

app = Flask(__name__)


def get_conf():
    conf = {}
    path = os.getcwd()
    f = open(os.path.join(path, 'docker_config'), 'r')
    config = f.readlines()
    for line in config:
        if len(line) > 1:
            line_list = line.strip('\n').split(':')
            conf[line_list[0]] = line_list[1]
    f.close()
    return conf


def write_conf(conf):
    path = os.getcwd()
    f = open(os.path.join(path, 'docker_config'), 'r+')
    f.truncate()
    f = open(os.path.join(path, 'docker_config'), 'w')
    for key in conf.keys():
        if list(conf.keys()).index(key) != len(conf.keys()) - 1:
            f.write(key + ':' + conf[key] + '\n')
        else:
            f.write(key + ':' + conf[key])
    f.close()


def add_conf(docker_name):
    path = os.getcwd()
    f = open(os.path.join(path, 'docker_config'), 'a')
    f.write('\n' + docker_name + ':' + str(1))
    f.close()


@app.route('/', methods=['GET'])
def return_homepage():
    return app.send_static_file('HTML/docker_page.html')


@app.route('/read_conf', methods=['GET'])
def docker_status():
    conf = get_conf()
    return conf


@app.route('/update_conf', methods=['POST'])
def update_docker():
    conf = json.loads(request.form['config'])
    if main_process(conf) == 1:
        write_conf(conf)
        return {'status': 1}
    else:
        return {'status': 2}


@app.route('/read_docker', methods=['GET'])
def docker_list_get():
    conf = get_conf()
    del_name = []
    docker_list = list_docker()
    docker_list_name = list_docker().keys()
    docker_list_conf = conf.keys()
    for name in docker_list_conf:
        if name not in docker_list_name:
            del_name.append(name)
    for name in del_name:
        del conf[name]
    for name in docker_list_name:
        if name not in docker_list_conf:
            conf[name] = '1'
    write_conf(conf)
    return docker_list


@app.route('/add_docker', methods=['POST'])
def create_docker_fun():
    docker_name = request.form['name']
    if create_docker(docker_name) is not None:
        add_conf(docker_name)
        main_process(get_conf())
        return {'status': 1}
    else:
        return {'status': 2}


@app.route('/delete_docker', methods=['POST'])
def delete_docker_fun():
    docker_name = request.form['name']
    if delete_docker(docker_name) == 1:
        conf = get_conf()
        del conf[docker_name]
        write_conf(conf)
        main_process(get_conf())
        return {'status': 1}
    else:
        return {'status': 2}


@app.route('/test_docker', methods=['POST'])
def test_docker_speed():
    docker_name = request.form['name']
    speed_real = speed_test(docker_name)
    return speed_real


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8080)
