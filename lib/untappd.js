var unirest = require('unirest');
var dotenv = require('dotenv').config();

var CLIENT_ID = process.env.UNTAPPD_CLIENT_ID;
var CLIENT_SECRET = process.env.UNTAPPD_CLIENT_SECRET;

var beerIdUrl = "https://api.untappd.com/v4/search/beer?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&q=";
var beerUrl = "https://api.untappd.com/v4/beer/info/"

var untappd = {};

untappd.getBeer = function(search, callback){
  search.replace(' ', '+');
  var url = beerIdUrl + search;
  unirest.get(url, function(response){
    if(response.body.response){
      if(response.body.response.beers.items[0]){
        var id = response.body.response.beers.items[0].beer.bid;
        getBeerById(id, function(data){
          callback(data);
        });
      }
    } else {
      callback( 'OH NO not found!!' );
    }
  });
};

function getBeerById(id, callback){
  var url = beerUrl + id + "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET
  console.log(url);
  unirest.get(url, function(response){
    var data = response;
    callback(data);
  });
}


module.exports = untappd;
