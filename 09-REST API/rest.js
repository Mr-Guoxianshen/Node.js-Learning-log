'use strict';

module.exports = {
    APIError(code, message) {
        this.code = code || 'internal:unknown_error';
        this.message = message || '';
    },
    restify(pathPrefix) {
        // REST API 前缀, 默认为 /api/
        pathPrefix = pathPrefix || '/api/';
        return async (ctx, next) => {
            if (ctx.request.path.startsWith(pathPrefix)) {
                // 是REST API, 绑定 rest() 方法
                ctx.rest = (data) => {
                    ctx.response.type - 'application/json';
                    ctx.response.body = data;
                }
                await next();
            } else {
                await next();
            }
        }
    }
}