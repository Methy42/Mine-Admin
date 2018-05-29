var express = require('express');
var router = express.Router();
var fs = require("fs");

router.get('/', function(req, res, next) {
	try{
		res.render("html/music.html");
	}catch(e){
		console.log(e);
		res.send(e);
	}
	
	
	
  	// res.render('/view/html/music.html');
});

module.exports = router;