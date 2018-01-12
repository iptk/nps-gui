var static = require('node-static');
const path = require('path');

var fileServer = new static.Server(path.resolve(__dirname, 'public'));

require('http').createServer(function (request, response) {
    request.addListener('end', function () {
        fileServer.serve(request, response);
    }).resume();
}).listen(80);
