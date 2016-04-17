var express     =    require('express');
var app         =    express();

// database!
var mongoPath = process.env.MONGODB_URI || 'mongodb://localhost/brewhack';
var mongoose = require('mongoose');
mongoose.connect(mongoPath);

// middleware!
var morgan = require('morgan');
app.use(morgan('dev'));

app.use(express.static('public'));

app.set('view engine', 'ejs');

// routes!

var indexRouter = require('./routes/index.js');
app.use('/', indexRouter);

var beerApi = require('./routes/api/beers.js');
app.use('/api/beers', beerApi);

var usersApi = require('./routes/api/users.js');
app.use('/api/users', usersApi);

// listen!
var port = parseInt(process.env.PORT) || 8080;
app.listen(port, function(){
  console.log('the taming of the brew is up on port ', port);
});
