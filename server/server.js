const express = require('express');
const {db} = require('./database/db-config');
const worker = require('./worker.js');

var app = express();

require('./resources/middleware.js')(app, express);

require('./resources/routes.js')(app, express);

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

  // var child = execFile(program, [picture], 
  //   function(error, stdout, stderr) {
  //     console.log( process.cwd() );
  //     res.setHeader('Content-Type', 'application/json');
  //     res.json(stdout);
  //     console.log('area is:' + stdout);
  //     console.log(error);
  //   }
  // );
});
// app.get('/openCV', function(req, res) {
//   var fs = require('fs');
//   var temp = require('temp');
//   var execFile = require('child_process').execFile;
//   var picture = "After1.jpg";
//   var program = "../openCV/imageproc2";
//   temp.mkdir('node_example', function(err, dirPath) {
//       // build full paths for the input/output files
//       var inputPath = path.join(dirPath, 'input.txt');
//       var outputPath = path.join(dirPath, 'output.txt');

//       // write the "under" value to the input files
//       fs.writeFile(inputPath, picture, function(err) {
//         if (err) throw err;
//         var child = execFile(program, [inputPath],
//           function (error, stdout, stderr) {
//             // This function is still executed once the program terminates...
//             res.setHeader('Content-Type', 'application/json');
//             res.json(stdout);
//             console.log('area is:' + stdout);
//             console.log(error);
//         });
//       });
//   });
// });

app.listen(3000, function () {
  console.log('Our app is listening on port 3000!');
});

module.exports = {app};
