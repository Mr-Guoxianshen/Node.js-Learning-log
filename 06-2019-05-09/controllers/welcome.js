'use strict';

const Welcome = async (ctx, next) => {
    ctx.render('../view/index.html', { title: 'Welcome, Koa' });
};

module.exports = {
    'GET /': Welcome
};