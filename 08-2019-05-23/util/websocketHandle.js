'use strict';
const url = require('url');
const ws = require('ws');
// 引入server类
const WebSocketServer = ws.Server;
const parseUser = require('./user');

// 创建json格式信息发送给浏览器
var messageIndex = 0;
const createMessage = function(type, user, data) {
    messageIndex++;
    return JSON.stringify({
        id: messageIndex,
        type: type,
        user: user,
        dats: data
    })
}
const onConnection = function() {
    console.log(`[Websocket] connected.`);
    let user = this.user;
    let msg = createMessage('join', user, `${user.name} joined.`);
    this.wss.broadcast(msg);
    // build user list
    // let users = this.wss.clients.map((client) => client.user);
    let users = Array.from(this.wss.clients).map((client) => client.user);
    this.send(createMessage('list', user, users));
}
const onMessage = function(message) {
    console.log(message);
    if (message && message.trim()) {
        let msg = createMessage('chat', this.user, message.trim());
        this.wss.broadcast(msg);
    }
}
const onClose = function() {
    let user = this.user;
    let msg = createMessage('left', user, `${user.name} is left.`);
    this.wss.broadcast(msg);
}
const onError = function(err) {
    
}
function createWebSocketServer(server) {
    let wss = new WebSocketServer({
        server: server
    })
    // TODO: 待确认
    // wss.broadcast = function(data) {
    //     wss.clients.forEach(function each(client) {
    //         client.send(data);
    //     });
    // }
    wss.broadcast = function broadcast(data) {
        wss.clients.forEach(function each(client) {
            client.send(data);
        });
    };
    wss.on('connection', function(ws, req) {
        // ws.upgradeReq 属性已废弃!!!!
        // let location = url.parse(ws.upgradeReq.url, true);
        let location = url.parse(req.url, true);
        console.log(`[WebsocketServer] connection: ${location.href}`);
        ws.on('message', onMessage);
        ws.on('close', onClose);
        ws.on('error', onError || function(err) {
            console.log(err);
        });
        if (location.pathname !== 'ws/chat') {
            ws.close(4000, 'Invalid URL');
        }
        // check user
        // let user = parseUser(ws.upgradeReq);
        let user = parseUser(req.headers.cookie.split('=')[1] || '');
        if (!user) ws.close(4001, 'Invalid USER');
        ws.user = user;
        ws.wss = wss;
        onConnection.apply(ws);
    })
    console.log('WebsocketServer was attached.');
    return wss;
}

module.exports = createWebSocketServer;







