var Beer = require('./models/beer');
var mongoPath = 'mongodb://localhost/brewhack';
var mongoose = require('mongoose');
mongoose.connect(mongoPath);

function Beer(name){
  this.name = name;
  this.brewery = name;
  this.taste = {
    crisp: Math.floor(Math.random() * 10),
    hop: Math.floor(Math.random() * 10),
    nut: Math.floor(Math.random() * 10),
    fruit: Math.floor(Math.random() * 10),
    cream: Math.floor(Math.random() * 10),
    dry: Math.floor(Math.random() * 10),
    sweet: Math.floor(Math.random() * 10),
    bitter: Math.floor(Math.random() * 10),
    spicy: Math.floor(Math.random() * 10),
    sour: Math.floor(Math.random() * 10)
  }
  this.nutritional_value = {
    abv: Math.floor(Math.random() * 10),
    ibu: Math.floor(Math.random() * 10),
    calories: Math.floor(Math.random() * 10)
  }
}

var beerArray = [];


var beers = [
  {name: "Guiness",
  brewery: "Guiness",
  taste: {
    crisp: Math.floor(Math.random() * 10),
    hop: Math.floor(Math.random() * 10),
    nut: Math.floor(Math.random() * 10),
    fruit: Math.floor(Math.random() * 10),
    cream: Math.floor(Math.random() * 10),
    dry: Math.floor(Math.random() * 10),
    sweet: Math.floor(Math.random() * 10),
    bitter: Math.floor(Math.random() * 10),
    spicy: Math.floor(Math.random() * 10),
    sour: Math.floor(Math.random() * 10)
  },
  nutritional_value: {
    abv: Math.floor(Math.random() * 10),
    ibu: Math.floor(Math.random() * 10),
    calories: Math.floor(Math.random() * 10)
  }
},
{name: "Heineken",
brewery: "Heineken",
taste: {
  crisp: 10,
  hop: 0,
  nut: Math.floor(Math.random() * 10),
  fruit: Math.floor(Math.random() * 10),
  cream: Math.floor(Math.random() * 10),
  dry: Math.floor(Math.random() * 10),
  sweet: Math.floor(Math.random() * 10),
  bitter: Math.floor(Math.random() * 10),
  spicy: Math.floor(Math.random() * 10),
  sour: Math.floor(Math.random() * 10)
},
nutritional_value: {
  abv: Math.floor(Math.random() * 10),
  ibu: Math.floor(Math.random() * 10),
  calories: Math.floor(Math.random() * 10)
}
},
{name: "Sierra Nevada",
brewery: "Sierra Nevada",
taste: {
  crisp: 10,
  hop: 0,
  nut: Math.floor(Math.random() * 10),
  fruit: Math.floor(Math.random() * 10),
  cream: Math.floor(Math.random() * 10),
  dry: Math.floor(Math.random() * 10),
  sweet: Math.floor(Math.random() * 10),
  bitter: Math.floor(Math.random() * 10),
  spicy: Math.floor(Math.random() * 10),
  sour: Math.floor(Math.random() * 10)
},
nutritional_value: {
  abv: Math.floor(Math.random() * 10),
  ibu: Math.floor(Math.random() * 10),
  calories: Math.floor(Math.random() * 10)
}
},
{name: "Harpoon",
brewery: "Harpoon",
taste: {
  crisp: 10,
  hop: 0,
  nut: Math.floor(Math.random() * 10),
  fruit: Math.floor(Math.random() * 10),
  cream: Math.floor(Math.random() * 10),
  dry: Math.floor(Math.random() * 10),
  sweet: Math.floor(Math.random() * 10),
  bitter: Math.floor(Math.random() * 10),
  spicy: Math.floor(Math.random() * 10),
  sour: Math.floor(Math.random() * 10)
},
nutritional_value: {
  abv: Math.floor(Math.random() * 10),
  ibu: Math.floor(Math.random() * 10),
  calories: Math.floor(Math.random() * 10)
}
},
{name: "Coors Light",
brewery: "Coors",
taste: {
  crisp: 10,
  hop: 0,
  nut: Math.floor(Math.random() * 10),
  fruit: Math.floor(Math.random() * 10),
  cream: Math.floor(Math.random() * 10),
  dry: Math.floor(Math.random() * 10),
  sweet: Math.floor(Math.random() * 10),
  bitter: Math.floor(Math.random() * 10),
  spicy: Math.floor(Math.random() * 10),
  sour: Math.floor(Math.random() * 10)
},
nutritional_value: {
  abv: Math.floor(Math.random() * 10),
  ibu: Math.floor(Math.random() * 10),
  calories: Math.floor(Math.random() * 10)
}
}];

function clearDb(){
  Beer.remove({}, function(){});
}

function seedDb(){
  for (var i = 0; i < beers.length; i++) {
    var beer = new Beer(beers[i]);
    beer.save();
  }
}

clearDb();
seedDb();
setTimeout(function(){
  mongoose.disconnect();
}, 10000);
