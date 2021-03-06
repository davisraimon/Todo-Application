import os
from flask_pymongo import pymongo
con_string = os.environ.get('MONGODB_URL',None)

# @desc   : Connect with MongoDB and returns collection
# @returns: Returns the collection
def dbconnect():    
    client = pymongo.MongoClient(con_string)
    db = client.get_database('test')
    collection = db.get_collection('todo')
    print("------DB Connected------")
    return collection