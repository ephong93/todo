from models import todo_table, user_table
from db import engine
from sqlalchemy import select, insert, update, delete, and_
import datetime

def todo_select(user_id, data):
    year = int(data['year'])
    month = int(data['month'])
    day = int(data['day'])
    stmt = select(todo_table).where(and_(todo_table.c.user_id == user_id, todo_table.c.date == datetime.date(year, month, day)))
    with engine.connect() as conn:
        result = conn.execute(stmt).all()
        res = [{'id': row['id'], 'content': row['content'], 'done': row['done']} for row in result]
    return res

def todo_insert(user_id, data):
    date = data['date']
    content = data['content']
    stmt = insert(todo_table).values(user_id=user_id, content=content, done=False, date=datetime.date(date['year'], date['month'], date['day']))
    with engine.connect() as conn:
        result = conn.execute(stmt)
        conn.commit()
    return {
        'id': result.lastrowid,
        'content': content,
        'done': False
    }

def todo_update(data):
    todo_id = data['id']
    content = data['content']
    done = data['done']
    date = data['date']
    stmt = update(todo_table).where(todo_table.c.id == todo_id).values(content=content, done=done, date=datetime.date(date['year'], date['month'], date['day']))
    with engine.connect() as conn:
        result = conn.execute(stmt)
        conn.commit()

def todo_delete(data):
    todo_id = data['id']
    stmt = delete(todo_table).where(todo_table.c.id == todo_id)
    with engine.connect() as conn:
        result = conn.execute(stmt)
        conn.commit()

def user_insert(data):
    username = data['username']
    password = data['password']
    stmt = insert(user_table).values(username=username, password=password)
    with engine.connect() as conn:
        result = conn.execute(stmt)
        conn.commit()

def user_select(data):
    username = data['username']
    password = data['password']
    stmt = select(user_table).where(user_table.c.username==username).where(user_table.c.password==password)
    with engine.connect() as conn:
        result = conn.execute(stmt).all()
        return result

def get_user_id(username):
    stmt = select(user_table).where(user_table.c.username == username)
    with engine.connect()as conn:
        result = conn.execute(stmt).first()
    return result['user_id']


def analyze_request(req, method, keys):
    data = {}
    if method == 'GET':
        for key in keys:
            val = req.args.get(key)
            if val is None:
                return None
            data[key] = val
    else:
        req = req.get_json()
        for key in keys:
            if key not in req:
                return None 
            data[key] = req[key]
    return data
