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
    data: testTasteMap,
    success: function(response){
      console.log(response);
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
