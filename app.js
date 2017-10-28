var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var config = require('./config.js');
const exec = require('child_process').exec;
const slackbot = require('./plugins/slackbot.js');
var statusOk = 200;

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post('/', function(req,res){
   var data = {};
   var branch = "refs/heads/" + config.branch;

   data = req.body;
   console.log('Received body data:');
   console.log(data);
   //TODO Check data, then start the app updating script.
   //ONlY for gitlab versions > 7
   //if(data.object_kind == "push") {
   if((data.repository.name == config.repository) && (data.ref == branch)) {
      exec(config.command, function(error, stdout, stderr){
         console.log('stdout: ' + stdout);
         console.log('stderr: ' + stderr);
         if(error != null)
            console.log('exec error: ' + error);
      });
   } else if ((data.repository.name == config.repository) && (config.slackbot)) {
      slackbot.sendMessage(data);
   }

   res.writeHead(statusOk, {'Content-Type': 'text/plain'});
   res.end();
});

http.createServer(app).listen(config.port, config.hostname, function(){
   console.log('Listening on port ' + config.port);
   console.log('Returning status code ' + statusOk.toString());
});
