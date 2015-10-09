var fs = require('fs'),
    spdy = require('spdy');
var Buffer = require('buffer').Buffer;

var options = {
  plain: true,
  ssl: true,
  maxStreams: 1000000,
  key: fs.readFileSync('keys/spdy-key.pem'),
  cert: fs.readFileSync('keys/spdy-cert.pem'),
  ca: fs.readFileSync('keys/spdy-csr.pem')
};

var server = spdy.createServer(options, function(req, res) {
  console.log('Received request')
  if (req.url !== '/') {
    res.writeHead(404);
    res.end();
    return;
  }
  req.on('end', function () {
    res.writeHead(200, {
      "Content-Type": "text/plain"
    });
    res.write('hello world\n');
    res.end();
    var now = new Date();
    console.log('receive time %s', now);
  });
});

server.listen(3232, function() {
  var addr = this.address();
  console.log('Server is listening on %s:%d', addr.address, addr.port);
});
