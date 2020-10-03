var http = require('http');
var url = require('url');
var fs = require('fs');
var root = "./";
var mongoose = require('mongoose');
var myDB = mongoose.connect('mongodb://localhost/users');
var schema = require('./schemaFile.js').schemaActual;
var modelActual = mongoose.model('modelActual', schema);
const milliTimestamp = new Date().getTime()

mongoose.connection.once('open', function() {
    http.createServer(function (req, res) {
        if(req.method === 'POST') {
            var serverData = '';
            req.on('data', function(chunk) {
                serverData += chunk;
            });
            req.on('end', function() {
                let savePkg = JSON.parse(serverData);
                console.log(savePkg)
                if(savePkg.message === '') {
                    console.log("THE DATA IS EMPTY!");
                } else {
                    var newItem = new modelActual({
                        listItem: savePkg.message,
                        timestamp: milliTimestamp
                    })
                    newItem.save(function(err, doc){
                        if(err) {
                            console.log("error saving to database " + err);
                            res.writeHead(404);
                            res.end(JSON.stringify(err));
                        } else {
                            console.log("saved successfully to database " + doc);
                            res.writeHead(200);
                            res.end(JSON.stringify({}));
                        }
                    })
                }
            });
        } else if((req.method === "GET" && req.url === "/list")) {
            var query = modelActual.find()
            query.exec(function(err, docs) {
                if(err) {
                    console.log("error pulling from database " + err);
                    res.writeHead(404);
                    res.end(JSON.stringify(err));
                } else {
                    res.writeHead(200);
                    res.end(JSON.stringify(docs));
                }
            })
        } else {
            let urlObj = url.parse(req.url, true, false);
            fs.readFile(root + urlObj.pathname, function(err, data) {
                if (err) {
                    res.writeHead(404);
                    res.end(JSON.stringify(err));
                    return;
                }
                res.writeHead(200);
                res.end(data);
            });
        }
    }).listen(8080);
});

var options = {
    hostname: 'localhost',
    port: '8080',
    path: '/userList.html'
}

var req = http.request(options);
req.end();