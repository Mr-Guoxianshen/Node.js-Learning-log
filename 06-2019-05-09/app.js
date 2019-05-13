'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const controllerMiddleware = require('./controllers/index');
const staticFiles = require('./static-files');
const templating = require('./templating');
// 设置环境变量
const isProduction = process.env.NODE_ENV === 'production';

// 记录url以及页面执行时间
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} + ${ctx.request.url}`);
    let startT = new Date().getTime(), execT;
    await next();
    execT = new Date().getTime() - startT;
    ctx.response.set('X-Response-Time', `${execT}ms...`);
});
// 处理静态文件
if (!isProduction) {
    app.use(staticFiles('/static/', __dirname + '/static'));
}
// 解析post请求表单信息
app.use(bodyParser());
// 给 ctx 加入 render() 函数 (模板渲染函数)
app.use(templating('view', {
    noCache: !isProduction,
    watch: !isProduction
}));
// 处理url路由
app.use(controllerMiddleware());
// 监听 8000 端口
app.listen('8000');
console.log('app started at port 8000!');