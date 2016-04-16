console.log('to beer or not to beer');

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

function testCompare(){
  $.ajax({
    method: 'get',
    url: '/api/beers/compare', 
    data: testTasteMap,
    success: function(response){
      console.log(response);
    }
  });
}


$('input').on('input', function(){
// stuff in here
});
