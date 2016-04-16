console.log('to beer or not to beer');

var tasteMap = {
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


$('input').on('input', function(){
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
  var $delivery = $('<button>').addClass('delivery').attr('search', beer.name).text('get this delivered!');

  $beerContainer.append($beerName, $brewery, $abv, $ibu, $calories, $delivery);
  $('.beers-container').append($beerContainer);
}
