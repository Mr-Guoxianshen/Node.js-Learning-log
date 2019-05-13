'use strict';

const fs = require('fs');

let rs = fs.createReadStream('./test.txt', 'utf-8');

/*rs.on('data', (chunk) => {
    console.log('DATA: ');
    console.log(chunk);
})
rs.on('end', () => {
    console.log('END! ')
})
rs.on('error', (err) => {
    console.log('ERROR: ' + err);
})*/

// 写入文件
const ws1 = fs.createWriteStream('./writed.txt', 'utf-8');
/*ws1.write('使用stream写入文本内容!');
ws1.write('使用stream第二次写入文本内容!');
ws1.end();*/

// pipe Readable流的一个方法, 可视为复制文件内容的工具
rs.pipe(ws1);





