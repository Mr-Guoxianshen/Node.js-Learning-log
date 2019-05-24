'use strict';

const Welcome = async (ctx, next) => {
    let user = ctx.state.user;
    if (user) {
        ctx.render('room.html', {
            user: user
        });
    } else {
        ctx.response.redirect('/signin');
    }
};

module.exports = {
    'GET /': Welcome
};