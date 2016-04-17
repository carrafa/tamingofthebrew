var express = require('express');
var router = express.Router();
var untappd = require('../lib/untappd');

router.get('/', function(req, res){
  res.render('index');
});

router.get('/beers/:beer', function(req, res){
  var search = req.params.beer;
  untappd.getBeer(search); 
  res.render('beer');
});

module.exports = router;
