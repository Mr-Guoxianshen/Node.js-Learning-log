'use strict';

const Koa = require('koa');
const app = new Koa();

app.use(async (ctx, next) => {
    console.log(`${ctx.request.method} + ${ctx.request.url}`);
    console.log(`${ctx.url}`);
    await next();
});

app.use(async (ctx, next) => {
    const start = new Date().getTime(); // 当前时间
    await next(); // 调用下一个middleware
    const ms = new Date().getTime() - start; // 耗费时间
    console.log(`Time: ${ms} ms`);
});

app.use(async (ctx, next) => {
    await next();
    // ctx.response.type = 'text/html';
    ctx.type = 'text/html';
    ctx.response.body = '<h2>恩恩哈哈!</h2>';
});

app.listen(8000);
console.log('app started at port 8000!');