from fabric import Connection
from invoke import UnexpectedExit

c = Connection(
    host="172.16.0.108",
    user="root",
    port=22,
    connect_kwargs={
        "password": "tqhpoi123,./"
    },
)


def create_docker(docker_name):
    result = c.run("docker ps -aqf 'name=" + docker_name + "'", hide=True)
    if len(result.stdout.strip()) == 0:
        c.run("docker run -itd --name " + docker_name + " --network=host  ubuntu /bin/bash", hide=True)
        print('Create docker successful')
    else:
        print('Use existing docker')
    result = c.run(" docker ps -aqf 'name=" + docker_name + "' --no-trunc", hide=True)
    docker_id = result.stdout.strip()
    print("docker_name: " + docker_name)
    print("docker_id: " + docker_id)
    return docker_id


def delete_docker(docker_name):
    result = c.run("docker ps -aqf 'name=" + docker_name + "'", hide=True)
    if len(result.stdout.strip()) == 0:
        print("cannot find docker " + docker_name)
    else:
        stop_docker(docker_name)
        c.run("docker rm " + docker_name, hide=True)
        print("delete " + docker_name + " successful")


def start_docker(docker_name):
    result = c.run("docker ps -aqf 'name=" + docker_name + "'", hide=True)
    if len(result.stdout.strip()) == 0:
        print("cannot find docker" + docker_name)
    else:
        c.run("docker start " + docker_name, hide=True)


def stop_docker(docker_name):
    result = c.run("docker ps -aqf 'name=" + docker_name + "'", hide=True)
    if len(result.stdout.strip()) == 0:
        print("cannot find docker " + docker_name)
    else:
        c.run("docker stop " + docker_name, hide=True)


def list_docker():
    docker_list = []
    result = c.run("docker ps --format '{{.Names}} {{.ID}}' --no-trunc", hide=True)
    for val in result.stdout.strip().split('\n'):
        docker_list.append(val.split(' '))
    return docker_list


def make_tag(config):
    tag = []
    for val in conf:
        if config.index(val) < 8:
            tag.append('0x01000' + str(config.index(val) + 2))
        else:
            tag.append('0x0100' + str(config.index(val) + 2))
    return tag


def write_tag(docker_id, docker_name, tag_value):
    result = c.run("docker ps -aqf 'name=" + docker_name + "'", hide=True)
    if len(result.stdout.strip()) == 0:
        print("cannot find docker " + docker_name)
    else:
        c.run("echo " + tag_value + " > /sys/fs/cgroup/net_cls/docker/" + docker_id + "/net_cls.classid",
              hide=True)
        print("label " + docker_name + " successful")


def get_net_name():
    result = c.run("cat /proc/net/dev | awk '{i++; if(i>2){print $1}}' | sed 's/^[\t]*//g' | sed 's/[:]*$//g'",
                   hide=True)
    return result.stdout.strip().split('\n')[0]


def init_tc(net_name_in):
    try:
        c.run("tc qdisc del dev " + net_name_in + " root", hide=True)
    except UnexpectedExit:
        print("already clean")
    c.run("tc qdisc add dev " + net_name_in + " root handle 1: htb", hide=True)
    c.run("tc class add dev " + net_name_in + " parent 1:0 classid 1:1 htb rate 30Mbit burst 15k", hide=True)


def tc_shaping(docker_name, speed_value, class_id, net_name_in):
    print("tc class add dev " + net_name_in + " parent 1:1 classid 1:" + class_id +
          " htb rate " + speed_value + "Mbit burst 15k")
    c.run("tc class add dev " + net_name_in + " parent 1:1 classid 1:" + class_id +
          " htb rate " + speed_value + "Mbit burst 15k", hide=True)
    print("shaping " + docker_name + " successful")


def tc_filter(net_name_in):
    c.run("tc filter add dev " + net_name_in + " parent 1:0 protocol ip prio 1 handle 1: cgroup", hide=True)


def main_process(config):
    net_name = get_net_name()
    init_tc(net_name)
    tag = make_tag(conf)
    for i in range(len(config)):
        docker = create_docker(config[i][0])
        write_tag(docker, config[i][0], tag[i])
        tc_shaping(config[i][0], str(config[i][1]), str(i + 2), net_name)
        print('-----------------------------------------')
    tc_filter(net_name)


conf = [['docker-a', 0.5], ['docker-b', 1.5], ['docker-c', 5.0]]

main_process(conf)
