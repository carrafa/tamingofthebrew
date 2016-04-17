var unirest = require('unirest');
var dotenv = require('dotenv').config();

var CLIENT_ID = process.env.UNTAPPD_CLIENT_ID;
var CLIENT_SECRET = process.env.UNTAPPD_CLIENT_SECRET;

var beerIdUrl = "https://api.untappd.com/v4/search/beer?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&q=";
var beerUrl = "https://api.untappd.com/v4/beer/info/";

var untappd = {};

untappd.getBeer = function(search, callback){
  search.replace(' ', '+');
  var url = beerIdUrl + search;
  unirest.get(url, function(response){
    var defaultBeer = {
      name: "Budweiser",
      beer_label: "http://www.bruguru.com/Budweiser.jpg",
      beer_style: "lager",
      abv: 5,
      beer_description: "it's great!",
      bid: 13
    }
    if(response.body.response){
      if(response.body.response.beers.items){
        var id = response.body.response.beers.items[0].beer.bid;
        getBeerById(id, function(data){
          callback(data);
        });
      } else {
        callback( defaultBeer );
      }
    } else {
      callback( defaultBeer );
    }
  });
};

function getBeerById(id, callback){
  var url = beerUrl + id + "?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET;
  unirest.get(url, function(response){
    var data = response;
    callback(data);
  });
}


module.exports = untappd;
