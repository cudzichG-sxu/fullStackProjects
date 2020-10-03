var http = require('http');
var url = require('url');
var fs = require('fs');
var root = "./";

http.createServer(function (req, res) {
    var urlObj = url.parse(req.url, true, false);
    fs.readFile(root + urlObj.pathname, function(err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
}).listen(8080);

var options = {
    hostname: 'localhost',
    port: '8080',
    path: '/catalog.html'
}

function handleResponse(response) {
    var serverData = '';
    response.on('data', function(chunk) {
        serverData += chunk;
    });
    response.on('end', function() {
        console.log(serverData);
    });
}

http.request(options, function(response) {
    handleResponse(response);
}).end();