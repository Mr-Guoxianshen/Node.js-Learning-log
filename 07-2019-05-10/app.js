'use strict';

// 引入 WebSocket 模块
const WebSocket = require('ws');
// 引用 Server 类
const WebSocketServer = WebSocket.Server;
// 实例化
const wss = new WebSocketServer({
    port: 8000
});

wss.on('connection', (ws) => {
    console.log(`[SERVER] connection()`);
    ws.on('message', (message) => {
        console.log(`[SERVER] Received: ${message}`);
        ws.send(`ECHO: ${message}`, (err) => {
            if (err) console.log(`[SERVER] error: ${err}`);
        })
    });
});
console.log('ws server started at port 8000...');

// client test
let ws = new WebSocket('ws://localhost:8000/test');
// 打开
ws.on('open', function() {
    console.log(`[CLIENT] open()`);
    ws.send('Hello!');
});
ws.on('message', function(message) {
    console.log(`[CLIENT] Received: ${message}`);
});




