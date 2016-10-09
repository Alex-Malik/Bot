// Require all used modules
var express = require('express');

// Initialize application
var app = express();

// Initialize view engine
app.set('view engine', 'pug');

// Setup public directories
app.use('/public', express.static(__dirname + '\\public'));


// Handle get calls
app.get('/', function (req, res) {
  res.render('index');
});

// Run server
app.listen(process.env.PORT || 5000, function () {
  console.log('Example app listening on port 5000!');
});