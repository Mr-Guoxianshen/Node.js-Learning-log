'use strict';

const Koa = require('koa');
const router = require('koa-router')();
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const fs = require('fs');

const datas = fs.readFileSync('./data.js', 'utf-8');
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} + ${ctx.url}...`);
    await next();
});
router.get('/hello/:name', async (ctx, next) => {
    let name = ctx.params.name;
    ctx.response.body = `<h2>Hello, ${name}</h2>`;
})
router.get('/', async (ctx, next) => {
    ctx.response.body = '<h2>Index页</h2>';
})
router.get('/login', async (ctx, next) => {
    ctx.response.body = `
        <h1>Login Page</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa" /></p>
            <p>Password: <input name="password" type="password" /></p>
            <p><input type="submit" value="Submit" /></P>
        </form>
    `
});
router.post('/signin', async (ctx, next) => {
    let name = ctx.request.body.name || '';
    let password = ctx.request.body.password || '';
    console.log(`Name: ${name}, Paeesword: ${password}`);
    if (name == 'koa' && password == '123456') {
        ctx.response.body = `<h2>Welcome, ${name}!!</h2>`;
    } else {
        ctx.response.body = `
            <h2>Login failed!</h2>
            <p><a href="/login">Try again!</a></p>
        `;
    }
});

// 测试请求json数据 未成功!
// router.get('/getData/:path', async (ctx, next) => {
//     const api = ctx.request.path;
//     if (api == 'data') {
//         ctx.response.end(datas);
//     }
// });


app.use(bodyParser());
// 添加 router middleware
app.use(router.routes());

app.listen(8000);
console.log('app started at port 8000!');