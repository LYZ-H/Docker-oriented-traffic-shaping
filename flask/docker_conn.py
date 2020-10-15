from fabric import Connection
from invoke import UnexpectedExit


def create_docker(docker_name):
    result = c.run("docker ps -aqf 'name=" + docker_name + "'", hide=True)
    if len(result.stdout.strip()) != 0:
        print('Use existing docker')
    else:
        c.run("docker run -itd --name " + docker_name + " --network=host  ubuntu /bin/bash", hide=True)
    return 1


def delete_docker(docker_name):
    result = c.run("docker ps -aqf 'name=" + docker_name + "'", hide=True)
    if len(result.stdout.strip()) == 0:
        print("cannot find docker " + docker_name)
        return 2
    else:
        stop_docker(docker_name)
        c.run("docker rm " + docker_name, hide=True)
        print("delete " + docker_name + " successful")
        return 1


def start_docker(docker_name):
    result = c.run("docker ps -aqf 'name=" + docker_name + "'", hide=True)
    if len(result.stdout.strip()) == 0:
        print("cannot find docker" + docker_name)
        return 2
    else:
        c.run("docker start " + docker_name, hide=True)
        return 1


def stop_docker(docker_name):
    result = c.run("docker ps -aqf 'name=" + docker_name + "'", hide=True)
    if len(result.stdout.strip()) == 0:
        print("cannot find docker " + docker_name)
        return 2
    else:
        c.run("docker stop " + docker_name, hide=True)
        return 1


def list_docker():
    docker_list = {}
    result = c.run("docker ps -a --format '{{.Names}}|{{.ID}}|{{.Status}}'", hide=True)
    if len(result.stdout.strip()) != 0:
        for val in result.stdout.strip().split('\n'):
            value_list = val.split('|')
            docker_list[value_list[0]] = [value_list[1], value_list[2]]
    return docker_list


def get_docker_id(docker_names):
    command = ""
    for docker_name in docker_names:
        command += "docker ps -aqf 'name=" + docker_name + "' --no-trunc;"
    result = c.run(command, hide=True)
    return result.stdout.strip().split('\n')


def make_tag(config):
    tag = []
    for docker_name in config:
        if config.index(docker_name) < 8:
            tag.append('0x01000' + str(config.index(docker_name) + 2))
        else:
            tag.append('0x0100' + str(config.index(docker_name) + 2))
    return tag


def write_tag(docker_id, docker_name, tag_value):
    command = ""
    for i in range(len(docker_id)):
        command += "echo " + tag_value[i] + " > /sys/fs/cgroup/net_cls/docker/" + docker_id[i] + "/net_cls.classid;"
    c.run(command, hide=True)
    print("label " + str(docker_name) + " successful")


def get_net_name():
    result = c.run("cat /proc/net/dev | awk '{i++; if(i>2){print $1}}' | sed 's/^[\t]*//g' | sed 's/[:]*$//g'",
                   hide=True)
    for val in result.stdout.split('\n'):
        if val != 'docker0' and val != 'lo':
            return val


def init_tc(net_name_in):
    try:
        c.run("tc qdisc del dev " + net_name_in + " root", hide=True)
    except UnexpectedExit:
        print("already clean")
    c.run("tc qdisc add dev " + net_name_in + " root handle 1: htb; tc class add dev " + net_name_in + " parent 1:0 " +
          "classid 1:1 htb rate 30Mbit burst 15k", hide=True)


def tc_shaping(docker_name, config, net_name):
    command = ""
    for i in range(len(docker_name)):
        command += "tc class add dev " + net_name + " parent 1:1 classid 1:" + str(i + 2) + " htb rate " + \
                   str(config[docker_name[i]]) + "Mbit burst 15k;"
    c.run(command, hide=True)


def tc_filter(net_name_in):
    c.run("tc filter add dev " + net_name_in + " parent 1:0 protocol ip prio 1 handle 1: cgroup", hide=True)


def speed_test(docker_name):
    c.run("docker exec " + docker_name + " apt update", warn=True, hide=True)
    c.run("docker exec " + docker_name + " apt-get install speedtest-cli -y", hide=True)
    result = c.run("docker exec " + docker_name + " speedtest-cli --simple --no-download", hide=True)
    print(result.stdout.strip() + "x")
    c.run("exit", warn=True, hide=True)
    return result.stdout.strip().split('\n')[2][8:-7]


def main_process(config):
    net_name = get_net_name()
    init_tc(net_name)
    if config != {}:
        docker_names = list(config.keys())
        docker_ids = get_docker_id(docker_names)
        tags = make_tag(docker_names)

        write_tag(docker_ids, docker_names, tags)
        tc_shaping(docker_names, config, net_name)
    tc_filter(net_name)
    return 1


c = Connection(
    host="192.168.1.100",
    user="root",
    port=22,
    connect_kwargs={
        "password": "lingyunzhi123"
    },
)

# c = Connection(
#     host="106.52.86.77",
#     user="root",
#     port=7681,
#     connect_kwargs={
#         "password": "tPYUE4QRCjMII"
#     },
# )
