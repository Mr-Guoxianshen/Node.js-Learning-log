'use strict';

let id = 0;
function nextId() {
    id++;
    return `p${id}`;
}
function Product(name, manufacturer, price) {
    this.id = nextId();
    this.name = name;
    this.manufacturer = manufacturer;
    this.price = price;
}
let products = [
    new Product('iPhone X', 'Apple', 7000),
    new Product('ThinkPad T440', 'Lenovo', 5999),
    new Product('LBP2900', 'Canon', 1099),
]

module.exports = {
    getProducts() {
        return products;
    },
    getProduct(id) {
        let product = products.filter((i) => i.id == id) || [];
        return product[0] || null;
    },
    createProduct({ name, manufacturer, price }) {
        let p = new Product(name, manufacturer, price);
        products.push(p);
        return p;
    },
    deleteProduct(id) {
        let product = products.filter((i) => i.id == id) || [];
        products = products.filter((i) => i.id !== id) || [];
        return product[0] || null;
    }
}