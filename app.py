from flask import Flask, render_template

app = Flask(__name__, static_folder='front/build/static', template_folder='front/build')

@app.route("/")
def hello_world():
    return render_template('index.html')

if __name__ == '__main__':
    from sqlalchemy import select
    from models import user_table, todo_table
    from db import engine, init_db

    init_db()

    from sqlalchemy import insert

    stmt = insert(user_table).values(username='spongebob', password='mypassword')
    with engine.connect() as conn:
        result = conn.execute(stmt)
        conn.commit()

    print('SELECT!')
    stmt = select(user_table)
    with engine.connect() as conn:
        for row in conn.execute(stmt):
            print(row)

    stmt = insert(todo_table).values(user_id=1, content='hi~!', done=False)
    with engine.connect() as conn:
        result = conn.execute(stmt)
        conn.commit()

    stmt = select(todo_table)
    with engine.connect() as conn:
        for row in conn.execute(stmt):
            print(row)

    app.run(debug=True)
    