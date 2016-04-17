console.log('to beer or not to beer');

var DELIVERY_API = "https://www.delivery.com/api/data/search?search_type=alcohol&address=1006+Avenue+of+the+Americas,10018&order_time=ASAP&order_type=delivery&client_id=brewhacks2016&section=beer";

$(document).ready(function(){
  $(this).scrollTop(0);

  setTimeout(fillLetters, 3200);
  setTimeout(function(){
    $('#instructions').toggle()
  }, 4000)

  $("#scroll").click(function() {
      $('html,body').animate({
          scrollTop: $("#second").offset().top},
          1000);


  });
});



function fillLetters(){
  $('.brew').css("fill", '#2D2A73');
  $('.brew').css('stroke', 'white')
}

var tasteMap = {};

function compare(){
  var data = tellMe();
  console.log(data);
  $.ajax({
    method: 'get',
    url: '/api/beers/compare',
    data: data,
    success: function(response){
      $('#beers-holster').empty();
      var beers = response.beers;
      console.log(beers);
      for(var i = 0; i < 15; i++){

        var dd = [
          {axis: "crisp", value: beers[i].taste.crisp, order:0},
          {axis: "hop", value: beers[i].taste.hop, order:1},
          {axis: "nut", value: beers[i].taste.nut, order:2},
          {axis: "fruit", value: beers[i].taste.fruit, order:3},
          {axis: "cream", value: beers[i].taste.cream, order:4},
          {axis: "dry", value: beers[i].taste.dry, order:5},
          {axis: "sweet", value: beers[i].taste.sweet, order:6},
          {axis: "bitter", value: beers[i].taste.bitter, order:7},
          {axis: "spicy", value: beers[i].taste.spicy, order:8},
          {axis: "sour", value: beers[i].taste.sour, order:9}
        ];


        renderABeer(beers[i]);
        notSlideyOne.draw('#a' + beers[i]._id, dd, 300, 300);
     }
     setMoreInfoHandler();

    }
  });

}

$('#beer-me').on('click', function(){

   compare();
});

function setMoreInfoHandler(){
  $('.info').click(function(){
    var search = $(this).attr('search');
    moreInfoButton(search);
  });
}

function moreInfoButton(search){
  search.replace(' ', '+');
  $.ajax({
    method: 'get',
    url: '/api/beers/' + search,
    success: function(response){
      if(response.beer.body){
        var beer = response.beer.body.response.beer
      }else{
        var beer = response.beer;
      }
      renderMoreInfo(beer, function(){
        renderMap(beer.brewery.location, beer.mapId);
      });
    },
    error: function(err){
      console.log("ERROR: ", err);
    }
  });
}

function renderMoreInfo(beer, callback){
  var source = $('#moreInfo-template').html();
  var context = beer;
  beer.mapId = 'map' + beer.bid;
  var template = Handlebars.compile(source);
  var $beerInfo = template(context);
  var $modal = $('<div>');
  $modal.append($beerInfo);

  $('body').append($modal);
  var inst = $modal.remodal();
  inst.open();
  var latLng = {
    lat: beer.brewery.location.lat,
    lng: beer.brewery.location.lng
  }

  callback(latLng, beer.mapId);
}

$('input').on('input',  function(){
  var value = $(this).val();
  var name = $(this).attr('name');
  tasteMap[name] = value;
  renderTheWheelThing(tasteMap);
});

function renderABeer(beer){
  var source = $('#beer-template').html();
  beer.tasteMapId = "a" + beer._id;
  var context = beer;
  var template = Handlebars.compile(source);
  var $beerContainer = template(context);

  $('#beers-holster').append($beerContainer);
}

RadarChartSlidey.draw('#chart-area', d, 520, 520);

function renderMap(latLng, id){
  var map;
  map = new google.maps.Map(document.getElementById('map' + id), {
    center: {lat: latLng.lat, lng: latLng.lng},
    zoom: 8
  });

  var marker = new google.maps.Marker({
    map: map,
    animation: google.maps.Animation.DROP,
    position: latLng,
    title: name
  });

  marker.setMap(map);

}
