var mongoose = require('mongoose');
var Beer = require('../models/beer.js');

var testTasteMap = {
  crisp: 10,
  hop: 8,
  nut: 1,
  fruit: 3,
  cream: 5,
  dry: 5, 
  sweet: 4,
  bitter: 1,
  spicy: 8,
  sour: 7
}

function getBeers(){
  console.log('..searching');
  Beer.find({}, function(err, dbBeers){
    if(err) return handleError(err);
    console.log(dbBeers);
  });
}

function beerCompare(tasteMap){
  // get all the beers from the db

  // loop through the values, subtract each from tasteMap
  // add all the numbers together
  // take the total and add it as property to EACH beer
   
  // sort beers

  // return beers
}

getBeers();

//module.exports = beerCompare;
