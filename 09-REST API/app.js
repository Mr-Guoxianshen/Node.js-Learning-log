'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const templating = require('./templating');
const rest = require('./rest');
const staticFiles = require('./static-files');
const app = new Koa();
const controller = require('./controller');
// 设置环境变量
const isProduction = process.env.NODE_ENV === 'production';

// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    await next();
});

// 处理静态文件
if (!isProduction) {
    app.use(staticFiles('/static/', __dirname + '/static'));
}

// parse request body
app.use(bodyParser());

// add nunjucks as view
app.use(templating('views', {
    noCache: !isProduction,
    watch: !isProduction
}));

// bind rest() for ctx
app.use(rest.restify());

// add controller
app.use(controller());

app.listen(3000);
console.log('app started at port 3000...');
