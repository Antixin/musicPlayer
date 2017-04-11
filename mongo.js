/*
*对于异步函数，return需要谨慎使用，
*一旦return，很有可能回调函数还没有执行就结束啦
*/
//连接数据库mongodb加载驱动
var MongoClient = require('mongodb').MongoClient;
//连接到数据库musicPlay
var DB_CONN_STR = 'mongodb://localhost:27017/musicPlay';
//链接表的容器
var collection ="";
//连接到表songs
var cols = "songs";

//json数据映射路径
var songsPath = {"path":"www/json/songs.json"};

function Mongo(){
    this.result;

    this.doInit = function(mongo, callback){
        mongo.initData(mongo, callback);
    };

    //查询数据函数
    this.selectData = function(db, callback) { 
        collection = db.collection(cols);
        //查询数据
        var whereStr = songsPath;
        collection.find(whereStr).toArray(function(err, result) {
            if(err)
            {
                console.log('Error:'+ err);
                return false;
            }
            callback(true, result);
        });
    }

    //插入数据函数
    this.insertData = function(db, callback) {  
        collection = db.collection(cols);
        //插入数据
        collection.insert(songsPath, function(err, result) { 
            if(err)
            {
                console.log('Error:'+ err);
                return;
            }     
            callback(result);
        });
    }

    //初始化数据库
    this.initData = function(mongo, callback){
        MongoClient.connect(DB_CONN_STR, function(err, db) {
            console.log("连接mongoDB成功！");

            var resultBol = false;
            var hasPath = false;
            mongo.selectData(db, function(hasPath, result){
                if(result[0].path === songsPath.path){
                    resultBol = true;
                }
                
                if(hasPath && resultBol){
                   console.log("数据已经存储在数据库！");
                   callback(result[0].path);
                }else if(hasPath && !resultBol){
                    //执行插入数据函数
                    mongo.insertData(db, function(result){
                        // console.log(result[0].path);
                        callback(result[0].path);
                    });
                }else{
                    console.log("数据库操作出错！");
                }
            });
        });
    }
};

module.exports = Mongo;