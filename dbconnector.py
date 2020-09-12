from flask_pymongo import pymongo
import os
con_string = os.environ.get('MONGODB_URL',None)

def dbconnect():    
    client = pymongo.MongoClient(con_string)
    db = client.get_database('test')
    collection = db.get_collection('todo')
    print("------DB Connected------")
    return collection