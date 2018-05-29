var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('/index.html');
});
router.get('/welcome',function(req,res){
	res.render('html/welcome.html');
});

module.exports = router;