'use strict';

const http = require('http');
const path = require('path');
const url = require('url');
const fs = require('fs');

const root = path.resolve(process.argv[2] || '.');
console.log(root);
const fileNameList = ['index.html', 'default.html'];

const server = http.createServer((req, res) => {
    // 获取路径
    let pathname = url.parse(req.url).pathname;
    console.log('pathname: ' + pathname);
    // 拼接文件路径
    let filePath = path.join(root, pathname);
    console.log('filePath: ' + filePath);
    filePath = filePath.endsWith('index.html') ? filePath : filePath + 'index.html';

    fs.stat(filePath, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log('200' + req.url);
            res.writeHead(200, { 'Content-Type': 'text/html' });
            fs.createReadStream(filePath).pipe(res);
        }
    })
})
server.listen(8080);
console.log('Server is running at http://127.0.0.1:8080/index.html');