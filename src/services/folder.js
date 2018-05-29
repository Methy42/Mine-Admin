var spawn = require('child_process').spawn;
var os = require("os");

var service = {};
service.getList = function(path){
    var SYSTEM_TYPE = os.type();
    var command = "";
    switch(SYSTEM_TYPE){
        case "Windows_NT":
            command = "dir";
            path = path.replace(/\//g, '\\');
            break;
    }

    console.log("当前系统名",SYSTEM_TYPE);
    console.log("使用路径字符串",path);
    var ls = spawn(command, [path]);

    return ls;
}

module.exports = service;