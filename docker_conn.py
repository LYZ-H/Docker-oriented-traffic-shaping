from fabric import Connection

c = Connection(
    host="106.52.86.77",
    user="root",
    port=7681,
    connect_kwargs={
        "key_filename": "C:/Users/LYZ/Desktop/LEEDS资料/server/private_key_cloud1_openssh",
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



