var app = require('express')();
var server = require('http').Server(app);
var WebSocket = require('ws');
const fs = require('fs');

var wss = new WebSocket.Server({port: 8080});

wss.on('connection', function connection(ws) {
    console.log('server: receive connection.');

    ws.on('message', function incoming(message) {
        console.log('server: received: %s', message);
    });
    // Buffer()
    let buf = fs.readFileSync('./index.html');
    setInterval(() => {
        ws.send(buf.toString());
    }, 3000);
});

app.get('/', function (req, res) {
    res.sendfile(__dirname + '/index.html');
});

app.listen(3000);
