var spawn = require('child_process').spawn;

console.log("进入folder服务");
var ls = spawn('ls', ['/']);
console.log("获取列表信息成功");
ls.stdout.on('data', function (data) { 
    console.log("返回值类型：", typeof data);
    console.log("执行结果：\n" + data.toString().split('\n'));
});
ls.stderr.on('data', function (data) { 
    console.log('出现错误:\n' + data); 
});
ls.on('exit', function (code, signal) { 
    console.log('进程关闭 ,exit:' + code); 
});