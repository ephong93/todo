from flask import Flask, render_template, request, session

app = Flask(__name__, static_folder='front/build/static', template_folder='front/build')
app.config['SECRET_KEY'] = 'mysecretkey123@321'

@app.route('/api/join', methods=['POST'])
def join():
    from models import user_table
    from sqlalchemy import insert, select
    from sqlalchemy.exc import IntegrityError
    from db import engine

    req = request.get_json()
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

    ## for test
    stmt = select(user_table)
    with engine.connect() as conn:
        result = conn.execute(stmt)
        for row in result:
            print(row)
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

@app.route('/api/todo', methods=['POST', 'GET'])
def todo():
    if 'user' not in session:
        return {
            'status': 'fail',
            'data': 'Not authenticated'
        }
    from models import user_table, todo_table
    from db import engine
    from sqlalchemy import select, insert

    username = session['user']
    if request.method == 'GET':
        stmt = select(user_table).where(user_table.c.username == username)
        with engine.connect() as conn:
            result = conn.execute(stmt).all()
            user_id = result[0]['user_id']
        print(user_id)

        stmt = select(todo_table).where(todo_table.c.user_id == user_id)
        with engine.connect() as conn:
            result = conn.execute(stmt).all()
            print(result)

            import json

            res = [{'content': row['content'], 'datetime': row['datetime'].strftime('%Y-%m-%d-%H:%M:%S'), 'done': row['done']} for row in result]
            return json.dumps(res)


    elif request.method == 'POST':
        req = request.get_json()
        content = req['content']
        stmt = insert(todo_table).values(user_id=1, content=content, done=False)
        with engine.connect() as conn:
            result = conn.execute(stmt)
            conn.commit()

    return {
        'status': 'success'
    }

if __name__ == '__main__':
    from db import init_db

    init_db()

    app.run(debug=True)
    