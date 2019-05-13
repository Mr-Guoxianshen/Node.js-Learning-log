'use strict';

const base = 'base: ';
function init() {
    const initData = 'first';

    function one(one) {
        return base + one + initData;
    }
    function two(two) {
        return base + two + initData;
    }

    return {
        one: one,
        two: two,
        first: initData
    }
}
module.exports = init;
