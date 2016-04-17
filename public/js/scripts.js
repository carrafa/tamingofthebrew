console.log('to beer or not to beer');

var DELIVERY_API = "https://www.delivery.com/api/data/search?search_type=alcohol&address=1006+Avenue+of+the+Americas,10018&order_time=ASAP&order_type=delivery&client_id=brewhacks2016&section=beer";

$(document).ready(function(){
  $(this).scrollTop(0);

  $("#scroll").click(function() {
      $('html,body').animate({
          scrollTop: $("#second").offset().top},
          1500);
  });

})



//var tasteMap = {
  //crisp: 5,
  //hop: 5,
  //nut: 5,
  //fruit: 5,
  //cream: 5,
  //dry: 5,
  //sweet: 5,
  //bitter: 5,
  //spicy: 5,
  //sour: 5
//};
//
var tasteMap = {};

function compare(){
  var data = tellMe();
  console.log(data);
  $.ajax({
    method: 'get',
    url: '/api/beers/compare',
    data: data,
    success: function(response){
      $('.beers-container').empty();
      var beers = response.beers;
      console.log(beers);
      for(var i = 0; i < 15; i++){
   
        var dd = [
          {axis: "crisp", value: beers[i].taste['crisp'], order:0},
          {axis: "hop", value: beers[i].taste['hop'], order:1},
          {axis: "nut", value: beers[i].taste['nut'], order:2},
          {axis: "fruit", value: beers[i].taste['fruit'], order:3},
          {axis: "cream", value: beers[i].taste['cream'], order:4},
          {axis: "dry", value: beers[i].taste['dry'], order:5},
          {axis: "sweet", value: beers[i].taste['sweet'], order:6},
          {axis: "bitter", value: beers[i].taste['bitter'], order:7},
          {axis: "spicy", value: beers[i].taste['spicy'], order:8},
          {axis: "sour", value: beers[i].taste['sour'], order:9}
        ];

     renderABeer(beers[i]);
        notSlideyOne.draw('#a' + beers[i]._id, dd, 300, 300); 
      }
    }
  });
}

$('#submit-button').on('click', function(){
   compare();
});

function moreInfoHandler(div){
  var search = div.attr('search').toLowerCase();
  div.on('click', function(){
    moreInfoButton(search);
  });
}

function moreInfoButton(search){
  search.replace(' ', '+');
  $.ajax({
    method: 'get',
    url: '/api/beers/' + search,
    success: function(response){
      var beer = response.beer.body.response.beer
      renderMoreInfo(beer);
    }
  });
}

function renderMoreInfo(beer){
  var $modal = $('<div>');
  var $name = $('<h1>').text(beer.name);
  var $label = $('<img>').attr('src', beer.beer_label);
  var $abv = $('<div>').text(beer.beer_abv);
  var $style = $('<div>').text(beer.beer_style);
  var $description = $('<div>').text(beer.beer_description);
  

  $modal.append($name, $label, $abv, $style, $description);
  $('body').append($modal);
  var inst = $modal.remodal();
  inst.open();
}

$('input').on('input',  function(){
  var value = $(this).val();
  var name = $(this).attr('name');
  // console.log($(this)[0].id + value);
  tasteMap[name] = value;
  renderTheWheelThing(tasteMap);
});

function renderTheWheelThing(tasteMap){

}

function renderABeer(beer){

  var $beerContainer = $('<div>').addClass('beer-container');
  var $beerName = $('<div>').addClass('beer-name').text(beer.name);
  var $brewery = $('<div>').addClass('brewery').text(beer.brewery);
  var $abv = $('<div>').addClass('abv').text(beer.nutritional_value.abv);
  var $ibu = $('<div>').addClass('ibu').text(beer.nutritional_value.ibu);
  var $calories = $('<div>').addClass('calories').text(beer.nutritional_value.calories);
  var $info = $('<button>').addClass('info').attr('search', beer.name).text('get more info!');
  moreInfoHandler($info);

  var $tasteMapDiv = $('<span>');

  $tasteMapDiv.attr('id', 'a' + beer._id);

  $beerContainer.append($beerName, $brewery, $abv, $ibu, $calories, $info, $tasteMapDiv);

  $('.beers-container').append($beerContainer);
}

RadarChartSlidey.draw('#chart-area', d, 520, 520);
