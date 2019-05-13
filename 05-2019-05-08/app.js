'use strict';

const nunjucks = require('nunjucks');

function createEnv(path, opts) {
    let autoescape = opts.autoescape || true,
        noCache = opts.noCache || false,
        watch = opts.watch || false,
        throwOnUndefined = opts.throwOnUndefined || false,
        env = new nunjucks.Environment(
            new nunjucks.FileSystemLoader(
                'views', {
                    noCache: noCache,
                    watch: watch
                }
            ),
            {
                autoescape: autoescape,
                throwOnUndefined: throwOnUndefined
            }
        );

    if (opts.filters) {
        for (let f in opts.filters) {
            env.addFilter(f, opts.filters[f]);
        }
    }

    return env;
}

let env = createEnv('view', {
    watch: true,
    filters: {
        hex: function(n) {
            return '0x' + n.toString(16);
        }
    }
});
// let s1 = env.render('hello.html', { name: '小明' });
// console.log(s1);
// let s2 = env.render('hello.html', { name: '<script>alert("哈哈")</script>' })
// console.log(s2);
// let s3 = env.render('hello2.html', {
//     title: '测试',
//     fruits: [1, 2]
// })
// console.log(s3);
let s4 = env.render('extend.html', {
    header: 'Hello',
    body: '哈哈哈'
});
console.log(s4);












