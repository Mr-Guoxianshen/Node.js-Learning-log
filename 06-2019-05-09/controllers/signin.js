'use strict';

const Signin = async (ctx, next) => {
    let email = ctx.request.body.email || '';
    let password = ctx.request.body.password || '';
    console.log(`Email: ${email}, Paeesword: ${password}`);
    if (email == '18701341975@163.com' && password == '123456') {
        ctx.render('signin-ok.html', {
            title: 'Sign In OK!',
            name: 'Mr_right'
        });
    } else {
        ctx.render('signin-failed.html', {
            title: 'Sign In Failed!'
        });
    }
}

module.exports = {
    'POST /signin': Signin
}