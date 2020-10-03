var http = require('http');
var url = require('url');
var fs = require('fs');
var root = "./";
var MongoClient = require('mongodb').MongoClient;
let databaseUrl = "mongodb://localhost/";
let databaseOptions = {useNewUrlParser: true, useUnifiedTopology: true};

MongoClient.connect(databaseUrl, databaseOptions, function(err, db) {
    http.createServer(function (req, res) {
        if(req.method === 'POST') {
            var serverData = '';
            req.on('data', function(chunk) {
                serverData += chunk;
            });
            req.on('end', function() {
                let savePkg = JSON.parse(serverData);
                console.log("RAW RESPONSE " + serverData);
                console.log("MESSAGE " + savePkg.message);
                let myDB = db.db("users");
                myDB.collection("messages", function(err, database){
                    database.insertOne(savePkg);
                });
                res.writeHead(200);
                res.end(JSON.stringify({}));
            });
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
    path: '/userInput.html'
}

var req = http.request(options);
req.end();