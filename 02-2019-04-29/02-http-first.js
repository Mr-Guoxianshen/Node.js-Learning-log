'use strict';

const http = require('http');

let server = http.createServer((request, response) => {
    // console.log(request);
    // console.log(response);
    console.log(request.method + ' : ' + request.url);
    
    response.writeHead(200, { 'Content-Type': 'text/html' });

    response.end('<h2>Hello World!</h2>');
})

server.listen(8080);
console.log('Server is running at http://127.0.0.1:8080/');