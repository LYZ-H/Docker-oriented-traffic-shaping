import hashlib
import os
import random
import time
import pymysql as mdb
from DBUtils.PooledDB import PooledDB
from flask import Flask, request, session

POOL = PooledDB(
    creator=mdb,
    maxconnections=6,
    mincached=2,
    maxcached=5,
    maxshared=1,
    blocking=True,
    maxusage=None,
    setsession=[],
    ping=0,
    host='47.95.192.13',
    port=3306,
    user='LYZ',
    password='tPYUE4QRCjMIY@D',
    database='flask',
    charset='utf8'
)

app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(24)


def get_md5(s):
    md = hashlib.md5()
    md.update(s.encode('utf-8'))
    return md.hexdigest()


def rand_str(num):
    str_r = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    salt = ''
    for i in range(num):
        salt += random.choice(str_r)
    return salt


def create_conn():
    conn = POOL.connection()
    cursor_in = conn.cursor(mdb.cursors.DictCursor)
    return conn, cursor_in


def close_conn(conn, cursor_in):
    conn.close()
    cursor_in.close()


@app.route('/', methods=['GET'])
def return_homepage():
    return app.send_static_file('HTML/homepage.html')


@app.route('/post_form', methods=['POST'])
def post_login():
    username = request.form['username']
    password = request.form['password']

    connection, cursor = create_conn()
    cursor.execute('SELECT pwvalue,saltvalue FROM user INNER JOIN salt ON user.userid = salt.userid INNER JOIN pw '
                   'ON user.userid = pw.userid WHERE username = %s', username)
    connection.commit()
    results = cursor.fetchone()
    close_conn(connection, cursor)

    pw_processed = get_md5(get_md5(password) + results['saltvalue'])
    if pw_processed == results['pwvalue']:
        session['username'] = username
        return {'status': 1}
    else:
        return {'status': 2}


@app.route('/post_form_r', methods=['POST'])
def post_register():
    username = request.form['username']
    password = request.form['password']

    time_stamp = str(int(time.time()))
    salt = get_md5(username + time_stamp + rand_str(16))
    pw_processed = get_md5(get_md5(password) + salt)

    connection, cursor = create_conn()
    cursor.execute('SELECT userid FROM user WHERE username = %s', username)
    connection.commit()
    results = cursor.fetchone()
    if results is None:
        cursor.execute('INSERT INTO user(username) values(%s)', username)
        cursor.execute('INSERT INTO pw(pwvalue) values(%s)', pw_processed)
        cursor.execute('INSERT INTO salt(saltvalue) values(%s)', salt)
        connection.commit()
        close_conn(connection, cursor)
        return {'status': 1}
    else:
        close_conn(connection, cursor)
        return {'status': 2}


@app.route('/log_out', methods=['POST'])
def log_out():
    if session.get('username') == request.form['username']:
        session.pop('username')
        return {'status': 1}
    else:
        return {'status': 2}


@app.route('/get_name', methods=['GET'])
def get_name():
    user_name = session.get('username')
    print(user_name)
    return {'username': user_name}


if __name__ == '__main__':
    app.run()
