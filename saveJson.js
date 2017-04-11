// //读取songs.json文件,读取方式同步
// var songs = fs.readFileSync("www/json/songs.json");
// var mplayer_song = JSON.parse(songs);


// //第一次现将数据格式化为json，并保存在songs.json文件
// fs.writeFile("www/json/songs.json", JSON.stringify(mplayer_song), function(err){
// 	if(err){
// 		console.log(err);
// 	}else{
// 		console.log("JSON saves to www/json/songs.json");
// 	}
// });


// //连接数据库mongodb加载驱动
// var MongoClient = require('mongodb').MongoClient;
// //连接到数据库musicPlay
// var DB_CONN_STR = 'mongodb://localhost:27017/musicPlay';
// //链接表的容器
// var collection ="";
// //连接到表songs
// var cols = "songs";

// //json数据映射路径
// var songsPath = {"path":"www/json/songs.json"};

// //查询数据函数
// var selectData = function(db, callback) { 
//     collection = db.collection(cols);
//     //查询数据
//     var whereStr = songsPath;
//     collection.find(whereStr).toArray(function(err, result) {
//         if(err)
//         {
//             console.log('Error:'+ err);
//             return false;
//         }
//         callback(result);
//     });
//     return true;
// }

// //插入数据函数
// var insertData = function(db, callback) {  
//     collection = db.collection(cols);
//     //插入数据
//     collection.insert(songsPath, function(err, result) { 
//         if(err)
//         {
//             console.log('Error:'+ err);
//             return;
//         }     
//         callback(result);
//     });
// }

// //初始化数据库
// var initData = function(){
//         MongoClient.connect(DB_CONN_STR, function(err, db) {
//             console.log("连接mongoDB成功！");
            
//             var resultBol = false;
//             var hasPath = selectData(db, function(result) {
//                     if(result[0].path === songsPath.path){
//                         resultBol = true;
//                     }

//                     if(hasPath && resultBol){
//                         console.log("数据已经存储在数据库！");
//                         db.close();
//                     }else if(hasPath && !resultBol){
//                         //执行插入数据函数
//                         insertData(db, function(result){
//                             console.log(result);
//                             db.close();
//                         });
//                     }else{
//                         console.log("数据库操作出错！");
//                         db.close();
//                     }
//                 });   
//             });
//         // callback(songsPath.path);
//     }