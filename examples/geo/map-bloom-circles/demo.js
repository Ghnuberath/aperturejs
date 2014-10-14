var express = require('express');
var path = require('path');

var app = express();

app.use(express.static(__dirname));

app.get('/aperture.js', function(req, res) {
	res.sendFile(path.resolve(__dirname+'../../../../aperture.js'));
});

var server = app.listen(8080, function() {
	var host = server.address().address;
  var port = server.address().port;

  console.log('Demo app available at http://%s:%s', host, port);
});