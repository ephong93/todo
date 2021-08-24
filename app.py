from commands import analyze_request
from flask import Flask, render_template, request, session
from flask_cors import CORS

app = Flask(__name__, static_folder='front/build/static', template_folder='front/build')
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)
app.config['SECRET_KEY'] = 'mysecretkey123@321'

@app.route('/api/join', methods=['POST'])
def join():
    from commands import user_insert
    try:
        data = analyze_request(request, 'POST', ['username', 'password'])
        user_insert(data)
        return {
            'status': 'success'
        }
    except:
        return {
            'status': 'fail'
        }


@app.route('/api/login', methods=['POST'])
def login():
    from models import user_table

    if 'user' in session:
        return {
            'status': 'fail',
            'data': 'Already logged in'
        }

    from commands import user_select
    try:
        data = analyze_request(request, 'POST', ['usename', 'password'])
        users = user_select(data)
        if len(users) == 0:
            return {
                'status': 'fail',
                'data': 'Incorrrect username or password'
            }
        if len(users) > 1:
            return {
                'status': 'fail',
                'data': 'Unknown'
            }
        user = users[0]
        username = user['username']
        session['user'] = username
        return {
            'status': 'success',
            'data': {
                'user': username
            }
        }
    except:
        return {
            'status': 'fail'
        }
    
   
@app.route('/api/logout', methods=['POST'])
def logout():
    if 'user' not in session:
        return {
            'status': 'fail',
            'data': 'Already logged out'
        }
    session.pop('user')
    if 'user' not in session:
        return {
            'status': 'success'
        }
    return {
        'status': 'fail',
        'data': 'Unknown'
    }

@app.route('/api/auth', methods=['GET'])
def auth():
    if 'user' not in session:
        return {
            'status': 'fail'
        }
    user = session['user']
    return {
        'status': 'success',
        'data': {
            'user': user
        }
    }

@app.route('/api/todo', methods=['POST', 'GET', 'PUT', 'DELETE'])
def todo():
    if 'user' not in session:
        return {
            'status': 'fail',
            'data': 'Not authenticated'
        }

    from commands import todo_select, todo_delete, todo_insert, todo_update, get_user_id
    try:
        username = session['user']
        user_id = get_user_id(username)
        if request.method == 'GET':
            data = analyze_request(request, 'GET', ['year', 'month', 'day'])
            res = todo_select(user_id, data)
        elif request.method == 'POST':
            data = analyze_request(request, 'POST', ['date', 'content'])
            res = todo_insert(user_id, data)
        elif request.method == 'PUT':
            data = analyze_request(request, 'PUT', ['id', 'content', 'done', 'date'])
            res = todo_update(data)
        elif request.method == 'DELETE':
            data = analyze_request(request, 'DELETE', ['id'])
            res = todo_delete(data)
        return {
            'status': 'success',
            'data': res
        }
    except Exception as e:
        print(e)
        return {
            'status': 'fail'
        }


def request_includes(req, keys):
    if False in [k in req for k in keys]:
        return False
    return True

if __name__ == '__main__':
    from db import init_db

    init_db()

    app.run(debug=True)
    