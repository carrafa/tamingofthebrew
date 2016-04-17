var express = require('express');
var router = express.Router();
var Beer = require('../../models/beer.js');
var beerCompare = require('../../lib/beerCompare');
var untappd = require('../../lib/untappd');

router.get('/', function(req, res){
  Beer.find({}, function(err, dbBeers){
    res.json({
      beers: dbBeers
    });
  });
});

router.get('/compare', function(req, res){
  var tasteMap = req.query;
  beerCompare(tasteMap, function(matches){
    res.json({
     beers: matches
    });
  });
});

router.get('/:beer', function(req, res){
  var search = req.params.beer;
  untappd.getBeer(search, function(data){
    res.json({
      beer: data
    });
  });
});


module.exports = router;
