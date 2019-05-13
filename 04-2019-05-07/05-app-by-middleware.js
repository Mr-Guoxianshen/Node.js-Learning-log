'use strict';

const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const app = new Koa();
const controllerMiddleware = require('./controller-middleware');

app.use(bodyParser());
app.use(controllerMiddleware());

app.listen(8000);
console.log('app started at port 8000!');