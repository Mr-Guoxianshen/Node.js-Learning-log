'use strict';

let index = 0;
const GetSignin = async (ctx, next) => {
    let names = '甲乙丙丁戊己庚辛壬癸';
    let name = names[index % 10];
    ctx.render('signin.html', {
        name: `路人${name}`
    });
}
const PostSignin = async (ctx, next) => {
    index++;
    let name = ctx.request.body.name || '路人甲';
    let user = {
        id: index,
        name: name,
        image: index & 10
    }
    let value = Buffer.from(JSON.stringify(user)).toString('base64');
    console.log(`Set cookie value: ${value}`);
    ctx.cookies.set('name', value);
    ctx.response.redirect('/');
}
const Signout = async (ctx, next) => {
    let names = '甲乙丙丁戊己庚辛壬癸';
    let name = names[index % 10];
    ctx.render('signin.html', {
        name: `路人${name}`
    });
}

module.exports = {
    'GET /signin': GetSignin,
    'POST /signin': PostSignin,
    'GET /signout': Signout
}