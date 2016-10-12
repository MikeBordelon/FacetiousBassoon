const express = require('express');
const {db} = require('./database/db-config');
const worker = require('./worker.js');

var app = express();

require('./resources/middleware.js')(app, express);

require('./resources/routes.js')(app, express);

app.listen(3000, function () {
  console.log('Our app is listening on port 3000!');
});

module.exports = {app};