var express     =    require('express');
var app         =    express();

// database!
var mongoPath = 'mongodb://localhost/brewhack';
var mongoose = require('mongoose');
mongoose.connect(mongoPath);

// middleware!
var morgan = require('morgan');
app.use(morgan('dev'));

app.use(express.static('public'));

app.set('view engine', 'ejs');

// routes!
app.get('/', function(req, res){
  res.render('index');
});

// listen!
var port = 8080;
app.listen(port, function(){
  console.log('the taming of the brew is up on port ', port);
});
