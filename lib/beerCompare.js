var mongoose = require('mongoose');
var Beer = require('../models/beer.js');

function beerCompare(tasteMap, callback){
  Beer.find({}, function(err, dbBeers){
    if(err) return handleError(err);

    for(var i = 0; i < dbBeers.length; i++){
      dbBeers[i].score = getScore(tasteMap, dbBeers[i].taste);
    }

    var matches = dbBeers.sort(function(a, b){
      return a.score - b.score;
    });

    callback(matches);
  });
}

function getScore(tasteMapOne, tasteMapTwo){
  var score = 0;
  for (var key in tasteMapOne) {
    var diff = tasteMapOne[key] - tasteMapTwo[key];
    score = score + Math.abs(diff);
  }
  return score;
}

module.exports = beerCompare;
