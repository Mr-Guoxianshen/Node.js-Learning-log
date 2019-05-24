'use strict';

function parseUser(obj) {
    if (!obj) return;
    console.log(`try parse: ${obj}`);
    let s = '';
    if (typeof obj === 'string') {
        s = obj;
    } else if (obj.header) {
        let cookies = new Cookies(obj, null);
        s = cookies.get('name');
    }

    if (s) {
        try {
            let user = JSON.parse(Buffer.from(s, 'base64').toString());
            console.log(`User1111: ${user.name}, ID: ${user.id}`);
            return user;
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = parseUser;