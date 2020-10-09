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


def write_tag(docker_name, tag_value):
    result = c.run("docker ps -aqf 'name=" + docker_name + "'", hide=True)
    if len(result.stdout.strip()) == 0:
        print("cannot find docker " + docker_name)
    else:
        result = c.run("docker ps --format '{{.ID}}' --no-trunc", hide=True)
        c.run("echo " + tag_value + " > /sys/fs/cgroup/net_cls/docker/" + result.stdout.strip() + "/net_cls.classid",
              hide=True)
        print("label " + docker_name + " successful")


def init_tc(na_name):
    try:
        c.run("tc qdisc del dev " + na_name + " root", hide=True)
    except UnexpectedExit:
        print("already clean")


def tc_shaping(na_name):
    c.run("tc qdisc add dev " + na_name + " root handle 1: htb", hide=True)
    c.run("tc class add dev " + na_name + " parent 1:0 classid 1:1 htb rate 4Mbit burst 15k", hide=True)
    c.run("tc class add dev " + na_name + " parent 1:1 classid 1:10 htb rate 0.4Mbit ceil 0.5Mbit burst 15k", hide=True)
    c.run("tc class add dev " + na_name + " parent 1:1 classid 1:20 htb rate 1Mbit ceil 3Mbit burst 15k", hide=True)
    c.run("tc class add dev " + na_name + " parent 1:1 classid 1:30 htb rate 0.1Mbit ceil 2Mbit burst 15k", hide=True)
    c.run("tc filter add dev " + na_name + " parent 1:0 protocol ip prio 1 handle 1: cgroup", hide=True)

print(list_docker())

create_docker('docker-a')
write_tag('docker-a', '0x010030')

init_tc('enp2s0')
tc_shaping('enp2s0')
