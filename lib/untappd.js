var unirest = require('unirest');
var dotenv = require('dotenv').config();

var CLIENT_ID = process.env.UNTAPPD_CLIENT_ID;
var CLIENT_SECRET = process.env.UNTAPPD_CLIENT_SECRET;

var baseUrl = "https://api.untappd.com/v4/search/beer?client_id=" + CLIENT_ID + "&client_secret=" + CLIENT_SECRET + "&q=";

var untappd = {};

untappd.getBeer = function(search){
  search.replace(' ', '+');
  var url = baseUrl + search;
  console.log("URL!!!! ", url);
  unirest.get(url, function(response){
    var data = response.body;
    console.log("DATA: ", data);
  });
};

module.exports = untappd;
