var express = require('express');
var folderService = require('../services/folder');
var router = express.Router();

router.get('/', function(req, res, next) {
  console.log("进入folder接口");
  var path = req.query.path;
  console.log("传入路径字符串",path);
  var list = folderService.getList(path);
  list.stdout.on('data', function (data) { 
    console.log("得到的list:",data.toString().split('\n'));
    res.render('html/folder.html',{'list':data.toString().split('\n')});
  });
  list.stderr.on('data', function (data) { 
    console.log('出现错误:\n' + data); 
  });
  list.on('exit', function (code, signal) { 
    console.log('进程关闭 ,exit:' + code); 
  });
  
});
module.exports = router;