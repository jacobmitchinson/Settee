var app = require('express')();
var server = require('http').createServer(app).listen(3000);

app.set('view engine', 'ejs');

app.get('/', function(req, res){
  res.render('index');
});
