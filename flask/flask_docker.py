import json
import os
from flask import Flask, request
from docker_conn import main_process, list_docker, create_docker, delete_docker

app = Flask(__name__)


@app.route('/', methods=['GET'])
def return_homepage():
    return app.send_static_file('HTML/docker_page.html')


@app.route('/read_docker', methods=['GET'])
def docker_list_get():
    docker_list = list_docker()
    return docker_list


@app.route('/read_conf', methods=['GET'])
def docker_status():
    conf = {}
    path = os.getcwd()
    f = open(os.path.join(path, 'docker_config'), 'r')
    config = f.readlines()
    for line in config:
        line_list = line.split(':')
        conf[line_list[0]] = line_list[1]
    f.close()
    return conf


@app.route('/update_conf', methods=['POST'])
def update_docker():
    path = os.getcwd()
    conf = json.loads(request.form['config'])
    if main_process(conf) == 1:
        f = open(os.path.join(path, 'docker_config'), 'w')
        for key in conf.keys():
            f.write(key + ':' + conf[key] + '\n')
        f.close()
        return {'status': 1}
    else:
        return {'status': 2}


@app.route('/delete_docker', methods=['POST'])
def delete_docker_fun():
    docker_name = request.form['name']
    if delete_docker(docker_name) == 1:
        return {'status': 1}
    else:
        return {'status': 2}


@app.route('/add_docker', methods=['POST'])
def create_docker_fun():
    path = os.getcwd()
    docker_name = request.form['name']
    if create_docker(docker_name) is not None:
        f = open(os.path.join(path, 'docker_config'), 'a')
        f.write(docker_name + ':' + str(0) + '\n')
        f.close()
        return {'status': 1}
    else:
        return {'status': 2}


if __name__ == '__main__':
    app.run()
