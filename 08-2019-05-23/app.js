'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const url = require('url');
const ws = require('ws');
// 引入server类
const WebSocketServer = ws.Server;
const controllerMiddleware = require('./controllers/index');
const staticFiles = require('./static-files');
const templating = require('./templating');
const parseUser = require('./util/user');
// const { onConnection, onMessage, onClose } = require('./util/websocketHandle');
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
// parse userInfo from cookie
app.use(async (ctx, next) => {
    ctx.state.user = parseUser(ctx.cookies.get('name') || '');
    console.log(ctx.state.user);
    await next();
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
let server = app.listen(3000);

function createWebSocketServer(server, onConnection, onMessage, onClose) {
    let wss = new WebSocketServer({
        server: server
    })
    wss.broadcast = function broadcast(data) {
        wss.clients.forEach(function each(client) {
            client.send(data);
        });
    };
    wss.broadcast = function broadcast(data) {
        wss.clients.forEach(function each(client) {
            client.send(data);
        });
    };
    wss.on('connection', function (ws, req) {
        let location = url.parse(req.url, true);
        console.log('[WebSocketServer] connection: ' + location.href);
        ws.on('message', onMessage);
        ws.on('close', onClose);
        ws.on('error', function(err) {
            console.log('[WebSocket] error: ' + err);
        });
        if (location.pathname !== '/ws/chat') {
            // close ws:
            ws.close(4000, 'Invalid URL');
        }
        // check user:
        console.log('1111', req.headers.cookie);
        let user = parseUser(req.headers.cookie.split('=')[1] || '');
        if (!user) {
            ws.close(4001, 'Invalid user');
        }
        ws.user = user;
        ws.wss = wss;
        onConnection.apply(ws);
    });
    console.log('WebSocketServer was attached.');
    return wss;
}

var messageIndex = 0;

function createMessage(type, user, data) {
    messageIndex ++;
    return JSON.stringify({
        id: messageIndex,
        type: type,
        user: user,
        data: data
    });
}

function onConnection() {
    let user = this.user;
    let msg = createMessage('join', user, `${user.name} joined.`);
    this.wss.broadcast(msg);
    // build user list:
    console.log(this.wss.clients);
    // let users = this.wss.clients.map((client) => client.user);
    let users = Array.from(this.wss.clients).map((client) => { return client.user; });
    this.send(createMessage('list', user, users));
}

function onMessage(message) {
    console.log(message);
    if (message && message.trim()) {
        let msg = createMessage('chat', this.user, message.trim());
        this.wss.broadcast(msg);
    }
}

function onClose() {
    let user = this.user;
    let msg = createMessage('left', user, `${user.name} is left.`);
    this.wss.broadcast(msg);
}

// 创建WebSocketServer
app.wss = createWebSocketServer(server, onConnection, onMessage, onClose);
console.log('app started at port 3000!');
