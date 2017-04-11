var express = require("express");
var fs = require("fs");
var app = express();
var server = require("http").createServer(app);
var io = require("socket.io").listen(server);
var Mongo = require('./mongo.js');

//文件路径
var songsPath;
//数据源
var mplayer_song;

//读取数据库获取json数据文件的路径
var mongo = new Mongo();
mongo.doInit(mongo, function(songsPath){
	mplayer_song = JSON.parse(fs.readFileSync(songsPath));
});


// mplayer_song = JSON.parse(fs.readFileSync(songsPath));
// console.log(mplayer_song);

//读取songs.json文件,读取方式同步
// var songs = fs.readFileSync(songsPath);
// var mplayer_song = JSON.parse(songs);

//设置静态路径
app.use("/", express.static(__dirname + "/www"));

//监听端口号
server.listen(80);
console.log("端口80正在监听事件！");

//监听io事件
io.sockets.on('connection', function(socket){
	console.log("socket建立通信！");
	socket.emit("datas", mplayer_song);
});


