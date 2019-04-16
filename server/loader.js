var fs = require("fs");
var globalConf = require("./config");

var controllerSet = [];
var pathMap = new Map();

var files = fs.readdirSync(__dirname + "/" +globalConf["web_path"]);
for(var i = 0; i < files.length; i++){
    var temp = require("./" + globalConf["web_path"] + "/" + files[i]);
    if(temp.path){
        for(var [key,value] of temp.path){
            if(pathMap.get(key) == null){
                pathMap.set(key,value);
            }else{
                throw new Error("url path 异常，url：" + key);
            }
        }
        controllerSet.push(temp);
    }
}
// console.log(controllerSet);
module.exports = pathMap;