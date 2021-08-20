import sqlite3
from sqlalchemy import create_engine, event
from sqlalchemy.engine import Engine
from models import metadata

engine = create_engine('sqlite:///db.sqlite3', echo=True, future=True)

@event.listens_for(Engine, "connect")
def set_sqlite_pragma(dbapi_connection, connection_record):
    if type(dbapi_connection) is sqlite3.Connection:  # play well with other DB backends
       cursor = dbapi_connection.cursor()
       cursor.execute("PRAGMA foreign_keys=ON")
       cursor.close()

def init_db():
    metadata.create_all(engine)
