console.log('to beer or not to beer');

var DELIVERY_API = "https://www.delivery.com/api/data/search?search_type=alcohol&address=1006+Avenue+of+the+Americas,10018&order_time=ASAP&order_type=delivery&client_id=brewhacks2016&section=beer";

var tasteMap = {
  crisp: 5,
  hop: 5,
  nut: 5,
  fruit: 5,
  cream: 5,
  dry: 5,
  sweet: 5,
  bitter: 5,
  spicy: 5,
  sour: 5
};

function compare(){
  $.ajax({
    method: 'get',
    url: '/api/beers/compare',
    data: tasteMap,
    success: function(response){
      var beers = response.beers;
      console.log(beers);
      for(var i = 0; i < beers.length; i++){
        renderABeer(beers[i]);
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
      console.log(beer);
    }
  });
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

  $beerContainer.append($beerName, $brewery, $abv, $ibu, $calories, $info);
  $('.beers-container').append($beerContainer);
}

RadarChartSlidey.draw('#chart-area', d, 600, 600);
