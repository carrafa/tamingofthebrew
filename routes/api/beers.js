var express = require('express');
var router = express.Router();
var Beer = require('../../models/beer.js');
var beerCompare = require('../../lib/beerCompare');

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

module.exports = router;
