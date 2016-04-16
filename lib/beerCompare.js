var mongoose = require('mongoose');
var Beer = require('../models/beer.js');

function beerCompare(tasteMap, callback){
  // gets beers from db
  console.log(tasteMap);
  Beer.find({}, function(err, dbBeers){
    if(err) return handleError(err);
    var matches;

    //sort dbBeers here
    // loop through the values, subtract each from tasteMap
    // add all the numbers together
    // take the total and add it as property to EACH beer

    for(var i = 0; i < dbBeers.length; i++){
      console.log('beer name: ', dbBeers[i].name);
      console.log('score: ', getScore(tasteMap, dbBeers[i].taste));
    }
    callback(dbBeers);
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
