var express = require('express');
var router = express.Router();
var Beer = require('../../models/beer.js');

router.get('/', function(req, res){
  Beer.find({}, function(err, dbBeers){
    res.json({
      beers: dbBeers
    });
  });
});


router.post('/', function(req, res){

});

module.exports = router
