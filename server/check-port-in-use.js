// http://stackoverflow.com/questions/29860354/in-nodejs-how-do-i-check-if-a-port-is-listening-or-in-use
var net = require('net');

var portInUse = function(port, callback) {
    var server = net.createServer(function(socket) {
       socket.write('Echo server\r\n');
       socket.pipe(socket);
    });

    server.listen(port);
    server.on('error', function (e) {
        callback(true);
    });
    
    server.on('listening', function (e) {
        server.close();
        callback(false);
    });
};

// How to use:
// portInUse(5858, function(returnValue) {
//     console.log(returnValue);
// });

module.exports = {
    portInUse: portInUse
}