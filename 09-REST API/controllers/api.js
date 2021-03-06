'use strict';
const products = require('../products');
const APIError = require('../rest').APIError;

module.exports = {
    'GET /api/products': async (ctx, next) => {
        ctx.rest({
            products: products.getProducts()
        });
    },
    'POST /api/products': async (ctx, next) => {
        let p = products.createProduct({
            name: ctx.request.body.name,
            manufacturer: ctx.request.body.manufacturer,
            price: parseFloat(ctx.request.body.price)
        });
        ctx.rest(p);        
    },
    'DELETE /api/products/:id': async (ctx, next) => {
        console.log(`delete product ${ctx.params.id}...`);
        let p = products.deleteProduct(ctx.params.id);
        if (p) {
            ctx.rest(p);
        } else {
            throw new APIError('product:not_found', 'product not found by id.');
        }
    }
};