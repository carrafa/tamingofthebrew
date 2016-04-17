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
     setMoreInfoHandler();
    }
  });
}

$('#submit-button').on('click', function(){
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
      var beer = response.beer.body.response.beer
      renderMoreInfo(beer);
    }
  });
}

function renderMoreInfo(beer){
  var source = $('#moreInfo-template').html();
  var context = beer;
  var template = Handlebars.compile(source); 
  var $beerInfo = template(context);
  var $modal = $('<div>');
  $modal.append($beerInfo);
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

function renderABeer(beer){
  var source = $('#beer-template').html();
  beer.tasteMapId = "a" + beer._id;
  var context = beer;
  var template = Handlebars.compile(source); 
  var $beerContainer = template(context);
  $('.beers-container').append($beerContainer);
}

RadarChartSlidey.draw('#chart-area', d, 520, 520);
