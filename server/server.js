const express = require('express');
const {db} = require('./database/db-config');
const worker = require('./worker.js');

var app = express();

require('./resources/middleware.js')(app, express);

cloudinary.config({ 
  cloud_name: 'dsz0gov6k', 
  api_key: '674192445522955', 
  api_secret: 't6uJBD_T4bzaAYa1-YXJ2E7Oxtw' 
});

app.get('/cloudSignature', function(req, res) {
  var secret='t6uJBD_T4bzaAYa1-YXJ2E7Oxtw';
  var str='context=true&prefix=' + req.params.userId + '&timestamp=' + Date.now() + secret;
  res.json(sha1(str));
});

app.get('/cloudinaryGet/:userId', function(req, res) {
  // res.json('fadsdas');
  console.log(req.params.userId);
  cloudinary.api.resources(function(result){
    res.json(result);
  },
  { type: 'upload', prefix: req.params.userId, context: 'true' });
});

app.get('/openCV', function(req, res) {
  var result = [];
  // var fs = require('fs');
  // var temp = require('temp');
  // var execFile = require('child_process').execFile;

  const spawn = require('child_process').spawn;
  // var execFile = require('child_process').execFile;
  // var picture = path.join(__dirname, "../BodyCV/After1.jpg");
  var picture = 'After1.jpg';
  var program = './imageproc2';
  const getPics = spawn(program, [picture], {cwd: 'BodyCV'});

  getPics.stdout.on('data', function(data) {
    data.forEach(function(elem) {
      result.push(String.fromCharCode(elem));
    });
    res.json(result.join(''));
  });

  getPics.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
  });

  getPics.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });

});

require('./resources/routes.js')(app, express);

app.listen(3000, function () {
  console.log('Our app is listening on port 3000!');
});

module.exports = {app};