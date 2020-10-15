import os
from fabric import Connection
from invoke import UnexpectedExit


def get_connection():
    path = os.getcwd()
    f = open(os.path.join(path, 'config/server_config'), 'r')
    config = f.readlines()
    con = Connection(
        host=config[0].strip('\n'),
        user=config[1].strip('\n'),
        port=int(config[2].strip('\n')),
        connect_kwargs={
            "password": config[3].strip('\n')
        },
    )
    return con


def get_server_ip():
    path = os.getcwd()
    f = open(os.path.join(path, 'config/server_config'), 'r')
    config = f.readlines()
    return config[0].strip('\n')


def get_conf():
    conf = {}
    path = os.getcwd()
    f = open(os.path.join(path, 'config/docker_config'), 'r')
    config = f.readlines()
    for line in config:
        if len(line) > 1:
            line_list = line.strip('\n').split(':')
            if len(line_list) == 2:
                conf[line_list[0]] = line_list[1]
    f.close()
    return conf


def write_conf(conf):
    path = os.getcwd()
    f = open(os.path.join(path, 'config/docker_config'), 'r+')
    f.truncate()
    f = open(os.path.join(path, 'config/docker_config'), 'w')
    for key in conf.keys():
        if list(conf.keys()).index(key) != len(conf.keys()) - 1:
            f.write(key + ':' + conf[key] + '\n')
        else:
            f.write(key + ':' + conf[key])
    f.close()


def add_conf(docker_name):
    path = os.getcwd()
    f = open(os.path.join(path, 'config/docker_config'), 'a')
    f.write('\n' + docker_name + ':' + str(1))
    f.close()


def create_docker(c, docker_name):
    result = c.run("docker ps -aqf 'name=" + docker_name + "'", hide=True)
    if len(result.stdout.strip()) != 0:
        print('Use existing docker')
    else:
        c.run("docker run -itd --cap-add=NET_ADMIN --name " + docker_name + " ubuntu /bin/bash", hide=True)
        change_apt_source(c, docker_name)
        c.run("docker exec " + docker_name + " apt update", warn=True, hide=True)
        c.run("docker exec " + docker_name + " apt-get install iperf -y", hide=True)
        c.run("docker exec " + docker_name + " apt-get install iproute2 -y", hide=True)
    return 1


def delete_docker(c, docker_name):
    result = c.run("docker ps -aqf 'name=" + docker_name + "'", hide=True)
    if len(result.stdout.strip()) == 0:
        print("cannot find docker " + docker_name)
        return 2
    else:
        stop_docker(c, docker_name)
        c.run("docker rm " + docker_name, hide=True)
        print("delete " + docker_name + " successful")
        return 1


def start_docker(c, docker_name):
    result = c.run("docker ps -aqf 'name=" + docker_name + "'", hide=True)
    if len(result.stdout.strip()) == 0:
        print("cannot find docker" + docker_name)
        return 2
    else:
        c.run("docker start " + docker_name, hide=True)
        return 1


def stop_docker(c, docker_name):
    result = c.run("docker ps -aqf 'name=" + docker_name + "'", hide=True)
    if len(result.stdout.strip()) == 0:
        print("cannot find docker " + docker_name)
        return 2
    else:
        c.run("docker stop " + docker_name, hide=True)
        return 1


def list_docker(c):
    docker_list = {}
    result = c.run("docker ps -a --format '{{.Names}}|{{.ID}}|{{.Status}}'", hide=True)
    if len(result.stdout.strip()) != 0:
        for val in result.stdout.strip().split('\n'):
            value_list = val.split('|')
            docker_list[value_list[0]] = [value_list[1], value_list[2]]
    return docker_list


def get_docker_id(c, docker_names):
    command = ""
    for docker_name in docker_names:
        command += "docker ps -aqf 'name=" + docker_name + "' --no-trunc;"
    result = c.run(command, hide=True)
    return result.stdout.strip().split('\n')


def change_apt_source(c, docker_name):
    path = os.getcwd()
    f = open(os.path.join(path, 'config/apt_source'), 'r')
    apt_source = f.readlines()
    f.close()
    source_text = ''
    for line in apt_source:
        source_text += line + " "
    c.run("docker exec " + docker_name + " sh -c \'echo \"" + source_text + "\" > /etc/apt/sources.list\'", hide=True)
    print('change apt source successful')


def write_tag(c, docker_id, docker_name):
    command = ""
    for i in range(len(docker_id)):
        command += "echo 0x010001 > /sys/fs/cgroup/net_cls/docker/" + docker_id[i] + "/net_cls.classid;"
    c.run(command, hide=True)
    print("label " + str(docker_name) + " successful")


def init_tc(c, net_name_in, docker_name):
    try:
        c.run("docker exec " + docker_name + " tc qdisc del dev " + net_name_in + " root", hide=True)
    except UnexpectedExit:
        print("already clean")


def tc_shaping(c, docker_names, configs):
    command = ""
    for docker_name in docker_names:
        result = c.run("docker exec " + docker_name + " cat /proc/net/dev | awk '{i++; if(i>2){print $1}}' | sed " +
                       "'s/^[\t]*//g' | sed 's/[:]*$//g'", hide=True)
        net_name_list = result.stdout.split('\n')
        net_name = ''
        for name in net_name_list:
            if name != 'lo' and name != '':
                net_name = name
        init_tc(c, net_name, docker_name)
        command += "docker exec " + docker_name + " tc qdisc add dev " + net_name + \
                   " root handle 1: htb;docker exec " + docker_name + " tc class add dev " + net_name + \
                   " parent 1:0 classid 1:1 htb rate " + str(configs[docker_name]) + "Mbit burst 15k;"
        command += "docker exec " + docker_name + " tc filter add dev " + net_name + \
                   " parent 1:0 protocol ip prio 1 handle 1: cgroup;"
    c.run(command, hide=True)


def get_local_ip(c):
    result = c.run("cat /proc/net/dev | awk '{i++; if(i>2){print $1}}' | "
                   "sed 's/^[\t]*//g' | sed 's/[:]*$//g'", hide=True)
    net_name = result.stdout.split('\n')[-1]
    result = c.run("ifconfig " + net_name + " | grep 'inet' | awk '{print $2}'", hide=True)
    ip = result.stdout.split('\n')[0]
    return ip


def speed_test(c, docker_name):
    result = c.run("docker exec " + docker_name + " iperf -c " + get_local_ip(c) +
                   " |awk '/[0-9]]/{sub(/.*]/,\"\");print $1\" \"$5}'", hide=True)
    print(docker_name + " speed:" + result.stdout.split('\n')[1].split(' ')[1])
    return result.stdout.split('\n')[1].split(' ')[1]


def main_process(c, config):
    if config != {}:
        docker_names = list(config.keys())
        docker_ids = get_docker_id(c, docker_names)

        write_tag(c, docker_ids, docker_names)

        tc_shaping(c, docker_names, config)
    return 1
