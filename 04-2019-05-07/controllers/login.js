'use strict';

const Login = async (ctx, next) => {
    ctx.response.body = `
        <h1>Login Page</h1>
        <form action="/signin" method="post">
            <p>Name: <input name="name" value="koa" /></p>
            <p>Password: <input name="password" type="password" /></p>
            <p><input type="submit" value="Submit" /></P>
        </form>
    `
};
const Signin = async (ctx, next) => {
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
}

module.exports = {
    'GET /login': Login,
    'POST /signin': Signin
}