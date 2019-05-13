'use strict';

let greet = require('./01-hello-word');
let test = require('./03-module-exports');
let s = 'Test';

// greet(s);

let one = test().one('one');
console.log(one);