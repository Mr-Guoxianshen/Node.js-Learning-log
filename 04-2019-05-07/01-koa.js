'use strict';

const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
    await next();
    ctx.response.type = 'text/html';
    ctx.response.body = '<h2>呵呵哒</h2>';
})

app.listen(8000);
console.log('app started at port 8000!');