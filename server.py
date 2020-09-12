from flask import Flask,request
import json
from dbconnector import dbconnect
from bson import ObjectId,json_util

app = Flask(__name__,static_folder='./build', static_url_path='/')
collection = dbconnect()

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/get-todo',methods=['GET'])
def get_todo():   
    res = collection.find({}).sort([['_id',-1]])
    return json_util.dumps(res)

@app.route('/get-todo/<id>',methods=['GET'])
def get_todo_id(id):
    res = collection.find({"_id":ObjectId(id)})             
    return json_util.dumps(res) 

@app.route('/add-todo',methods=['POST'])
def add_todo():   
    collection.insert({"bucket":request.json['bucket'], "title":request.json['title'],"completed":request.json['completed']})         
    res = collection.find({}).sort([['_id',-1]])
    return json_util.dumps(res)

@app.route('/delete-todo/<id>',methods=['DELETE'])
def delete_todo(id):
    deleted = collection.delete_one({"_id":ObjectId(id)})  
    print(deleted.deleted_count) 
    res = collection.find({}).sort([['_id',-1]])
    return json_util.dumps(res)

@app.route('/edit-todo/<id>',methods=['POST'])
def edit_todo(id):
    res = collection.find({"_id":ObjectId(id)})    
    collection.update({"_id":ObjectId(id)},{"bucket":request.json['bucket'], "title":request.json['title'],"completed":request.json['completed']})         
    res = collection.find({}).sort([['_id',-1]])
    return json_util.dumps(res)   
      
if __name__ == "__main__":
    app.run()    