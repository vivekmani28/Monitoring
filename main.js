var http = require('http');
var request = require('request');
var os = require('os');

var exec = require('child_process').exec;
var io = require('socket.io')(3000);

io.on('connection', function (socket) {
        var heartbeatTimer = setInterval(function () {

                exec(". ./script.sh", (err, stdout, stderr) => {
                        if (err) {
                                console.log(err);
                                return;
                        }
                        var lines = stdout.toString().split('\n');
                        lines.forEach(function (line) {
                                if (line.length > 0) {
                                        var values = line.toString().split(',');
                                        var temp = values[0].toString().split('-');
                                        var obj = { "name": temp[0],"ip": temp[1], "count": values[1] };
                                        console.log(obj);
                                        socket.emit("heartbeat", obj);
                                }
                        });
                });
        }, 5000);

        socket.on('disconnect', function () {
                console.log("closing connection")
                clearInterval(heartbeatTimer);
        });
});
