'use strict';

const http = require('http');
const url = require('url');
const path = require('path');

// 解析当前目录
let nowDir = path.resolve('.');
console.log(nowDir);

let filePath = path.join(nowDir, '.', 'index.html');
console.log(filePath);

console.log(process.argv[2]);






































