var http = require('http');

http.createServer(function (request, response){
    setTimeout(function(){
        response.writeHead(200, {'Content-Type':'text/plain'});
        response.end('Hello World\n');
    }, 20000);
}).listen(8124, '127.0.0.1');

console.log('Server Running ');
