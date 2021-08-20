from flask import Flask, render_template, request, session
from flask_cors import CORS

app = Flask(__name__, static_folder='front/build/static', template_folder='front/build')
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)
app.config['SECRET_KEY'] = 'mysecretkey123@321'

@app.route('/api/join', methods=['POST'])
def join():
    from models import user_table
    from sqlalchemy import insert, select
    from sqlalchemy.exc import IntegrityError
    from db import engine

    req = request.get_json()
    if not request_includes(req, ['username', 'password']):
        return {
            'status': 'fail',
            'data': 'Inappropriate request'
        }
    username, password = req['username'], req['password']
    stmt = insert(user_table).values(username=username, password=password)
    try:
        with engine.connect() as conn:
            result = conn.execute(stmt)
            print(result)
            conn.commit()
    except IntegrityError:
        return {
            'status': 'fail',
            'data': {
                'username': 'Duplicated username'
            }
        }

    return {
        'status': 'success'
    }

@app.route('/api/login', methods=['POST'])
def login():
    from models import user_table
    from sqlalchemy import insert, select
    from sqlalchemy.exc import IntegrityError
    from db import engine
    from models import user_table

    if 'user' in session:
        return {
            'status': 'fail',
            'data': 'Already logged in'
        }
    req = request.get_json()
    if not request_includes(req, ['username', 'password']):
        return {
            'status': 'fail',
            'data': 'Inappropriate request'
        }
    username, password = req['username'], req['password']
    stmt = select(user_table).where(user_table.c.username==username).where(user_table.c.password==password)
    with engine.connect() as conn:
        result = conn.execute(stmt).all()
        if len(result) == 0:
            return {
                'status': 'fail',
                'data': 'Incorrrect username or password'
            }
        if len(result) > 1:
            return {
                'status': 'fail',
                'data': 'Unknown'
            }
        result = result[0]
        username = result['username']
        session['user'] = username
        return {
            'status': 'success',
            'data': {
                'user': username
            }
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

@app.route('/api/todo', methods=['POST', 'GET', 'PUT'])
def todo():
    if 'user' not in session:
        return {
            'status': 'fail',
            'data': 'Not authenticated'
        }
    from models import user_table, todo_table
    from db import engine
    from sqlalchemy import select, insert, update
    import json

    username = session['user']
    if request.method == 'GET':
        stmt = select(todo_table).where(user_table.c.username == username)
        with engine.connect() as conn:
            result = conn.execute(stmt).all()
            res = [{'id': row['id'], 'content': row['content'], 'datetime': row['datetime'].strftime('%Y-%m-%d-%H:%M:%S'), 'done': row['done']} for row in result]
            return json.dumps(res)

    elif request.method == 'POST':
        req = request.get_json()
        content = req['content']
        if not request_includes(req, ['content']):
            return {
                'status': 'fail',
                'data': 'Inappropriate request'
            }
        stmt = insert(todo_table).values(user_id=1, content=content, done=False)
        with engine.connect() as conn:
            result = conn.execute(stmt)
            conn.commit()

    elif request.method == 'PUT':
        req = request.get_json()
        if not request_includes(req, ['id', 'content', 'done']):
            return {
                'status': 'fail',
                'data': 'Inappropriate request'
            }
        todo_id = req['id']
        content = req['content']
        done = req['done']
        stmt = update(todo_table).where(todo_table.c.id == todo_id).values(content=content, done=done)
        with engine.connect() as conn:
            result = conn.execute(stmt)
            conn.commit()
        
    return {
        'status': 'success'
    }


def request_includes(req, keys):
    if False in [k in req for k in keys]:
        return False
    return True

if __name__ == '__main__':
    from db import init_db

    init_db()

    app.run(debug=True)
    