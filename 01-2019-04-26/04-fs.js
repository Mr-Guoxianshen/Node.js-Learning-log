'use strict';

let fs = require('fs');
/*fs.readFile('./01-hello-word.js', 'utf-8', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
    }
})*/

/*fs.readFile('./imgs/logo.png', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log(data);
        console.log(data.length + 'bytes');
        let text = data.toString('utf-8');
        console.log(text);
        let buf = Buffer.from(text, 'utf-8');
        console.log(buf);
    }
})*/

/*let data = fs.readFileSync('./imgs/logo.png');
console.log(data);
try {
    let data2 = fs.readFileSync('./imgs/logo.png');
    console.log(data2);
} catch (error) {
    console.log(error);
}*/

/*const dataWrite = 'fs 写入文件测试内容!';
fs.writeFile('test.txt', dataWrite, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log('Write is OK!');
    }
})*/
/*const dataWriteSync = 'fs 同步写入文件测试内容!';
fs.writeFileSync('test.txt', dataWriteSync);*/

fs.stat('test.txt', (err, data) => {
    if (err) {
        console.log(err);
    } else {
        console.log('isFile: ' + data.isFile());
        console.log('isDirectory: ' + data.isDirectory());

        if (data.isFile()) {
            console.log('size: ' + data.size);
            console.log('birth time: ' + data.birthtime);
            console.log('modified: ' + data.mtime);
            console.log('modifiedMS: ' + data.mtimeMs);
        }
    }
})
































