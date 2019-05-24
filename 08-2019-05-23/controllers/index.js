'use strict';

const fs = require('fs');
const router = require('koa-router')();

function addControllers(router) {
    let files = fs.readdirSync(__dirname, 'utf-8');
    let files_js = files.filter((i) => i.endsWith('.js'));
    for (let f of files_js) {
        console.log(`controller: ${f}`);
        let maps = require(`${__dirname}/${f}`);
        addMaps(router, maps);
    }
}
function addMaps(router, maps) {
    for (let url in maps) {
        if (url.startsWith('GET')) {
            let path = url.substring(4);
            router.get(path, maps[url]);
            console.log(`register URL mapping: GET ${path}`);
        } else if (url.startsWith('POST')) {
            let path = url.substring(5);
            router.post(path, maps[url]);
            console.log(`register URL mapping: POST ${path}`);
        } else {
            console.log('url 无效!');
        }
    }
}

module.exports = function() {
    addControllers(router);
    return router.routes();
}