"use strict";
var util = require('util');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');


app.use(bodyParser.json({
  limit: '10mb'
}));
app.use(bodyParser.urlencoded({ 
  extended: true , 
  limit: '10mb', 
  parameterLimit: '5000' 
}));

require('./')(app);

app.set('port',process.env.PORT || 3333);

app.get('/', function(req, res) {
    res.redirect('/index.js');
  });

 app.post('/', function(req, res) {
 	console.log(req.body);
 	res.redirect('./index.js');
 });

app.on('error', function(err){
	util.log(err);
	process.exit(1);
 });
app.listen(app.get('port'),function(){
	util.log("Send Message to Teams,  listening on port "+app.get('port')+' in '+app.get('env'));
});
