'use strict';

const fs = require('fs');
const router = require('koa-router')();

function addControllers(router, dir) {
    let files = fs.readdirSync(__dirname + '/' + dir, 'utf-8');
    let files_js = files.filter((i) => i.endsWith('.js'));
    for (let f of files_js) {
        console.log(`controller: ${f}`);
        let maps = require(`${__dirname}/${dir}/${f}`);
        addMaps(router, maps);
    }
}
function addMaps(router, maps) {
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

module.exports = function(dir) {
    let controllers_dir = dir || 'controllers';
    addControllers(router, controllers_dir);
    return router.routes();
}