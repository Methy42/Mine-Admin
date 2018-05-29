var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
	res.render("html/article.html");
});
router.ws('/echo', function(ws, req) {
	var msg = "[ 测试 ]";
	ws.on('message', function(msg) {
		ws.send(msg);
	});
});

module.exports = router;