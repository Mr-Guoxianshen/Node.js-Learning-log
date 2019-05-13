'use strict';

const Hello = async (ctx, next) => {
    let name = ctx.params.name;
    console.log(name);
    ctx.response.body = `<h2>Hello, ${name}</h2>`;
};

module.exports = {
    'GET /hello/:name': Hello
};