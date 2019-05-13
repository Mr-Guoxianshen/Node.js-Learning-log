'use strict';

const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const fs = require('fs');

let files = fs.readdirSync(__dirname + '/controllers', 'utf-8');
let files_js = files.filter((i) => i.endsWith('.js'));
for (let f of files_js) {
    console.log(`controller: ${f}`);
    let maps = require(__dirname + '/controllers/' + f);
    for (let url in maps) {
        if (url.startsWith('GET')) {
            let path = url.substring(4);
            router.get(path, maps[url]);
        } else if (url.startsWith('POST')) {
            let path = url.substring(5);
            router.post(path, maps[url]);
        } else {
            console.log('url 无效!');
        }
    }
}

app.use(bodyParser());
app.use(router.routes());

app.listen(8000);
console.log('app started at port 8000!');