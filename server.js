#!/usr/bin/env node
var express = require('express');
var app = module.exports = express();
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
app.set('trust proxy', true);
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(require('cookie-parser')());

app.get('/', function(req, res) {
  console.log('GET /');
  res.send('<h1>foo lala</h1>');
})

var port = 1987;
var ipaddr = '127.0.0.1';
server.listen(port, ipaddr, function() {
  console.log('Express server listening on port ' + server.address().port + ' at ' + server.address().address);
});
