"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Author : Manhar Gupta
 */
var db_1 = require("./db");
var sequelize = __importStar(require("sequelize"));
function addToCart(newOrder) {
    return new Promise(function (resolve, reject) {
        db_1.models.Products.findById(newOrder.pid).then(function (product) {
            db_1.models.User.findById(newOrder.id).then(function (user) {
                db_1.models.Cart.findOrCreate({
                    include: [{
                            model: db_1.models.User,
                            where: {
                                id: user.id
                            }
                        }],
                    where: {
                        productPid: product.pid
                    }
                }).spread(function (cart, created) {
                    if (created) {
                        product.addCart(cart);
                        cart.addUser(user);
                        cart.increment({ 'qty': newOrder.qty - 1 });
                        resolve();
                    }
                    else {
                        cart.increment({ 'qty': newOrder.qty });
                        resolve();
                    }
                });
            }).catch(function (err) {
                reject(err);
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}
exports.addToCart = addToCart;
function getCart(id) {
    return db_1.models.Cart.findAll({
        include: [{
                model: db_1.models.User,
                attributes: ['id', 'username'],
                through: {
                    attributes: [],
                },
                where: {
                    id: id
                }
            }, {
                model: db_1.models.Products,
                attributes: ['pid', 'name', 'price', 'stock'],
            }]
    });
}
exports.getCart = getCart;
function removeProduct(product) {
    return new Promise(function (resolve, reject) {
        db_1.models.Cart.findOne({
            include: [{
                    model: db_1.models.User,
                    where: {
                        id: product.id
                    }
                }],
            where: {
                productPid: product.pid
            }
        }).then(function (product) {
            if (!product) {
                reject();
            }
            else {
                product.destroy();
                resolve();
            }
        });
    });
}
exports.removeProduct = removeProduct;
function userCountOrders(id) {
    return db_1.models.Cart.count({
        include: [{
                model: db_1.models.User,
                where: {
                    id: id
                }
            }]
    });
}
exports.userCountOrders = userCountOrders;
function checkoutUserCart(id) {
    return new Promise(function (resolve, reject) {
        db_1.models.Cart.findAll({
            include: [{
                    model: db_1.models.User,
                    where: {
                        id: id
                    }
                }]
        }).then(function (products) {
            if (products == '') {
                reject();
            }
            else {
                products.map(function (product) {
                    db_1.models.Products.findOne({
                        where: {
                            pid: product.productPid
                        }
                    }).then(function (prod) {
                        if (prod) {
                            prod.updateAttributes({
                                stock: prod.dataValues.stock - product.qty
                            });
                        }
                    });
                });
                products.map(function (product) { return product.destroy(); });
                resolve();
            }
        });
    });
}
exports.checkoutUserCart = checkoutUserCart;
function incdecQuantity(cartDetails) {
    return new Promise(function (resolve, reject) {
        db_1.models.Cart.findOne({
            include: [{
                    model: db_1.models.Products,
                    where: {
                        pid: cartDetails.pid
                    }
                },
                {
                    model: db_1.models.User,
                    where: {
                        id: cartDetails.id
                    }
                }],
        }).then(function (product) {
            if (product == null) {
                reject();
            }
            else {
                if (cartDetails.incdec === 'inc') {
                    product.increment({ 'qty': 1 });
                }
                else {
                    product.decrement({ 'qty': 1 });
                }
                resolve();
            }
        });
    });
}
exports.incdecQuantity = incdecQuantity;
function cartTotalSum(id) {
    return db_1.models.Cart.findAll({
        include: [{
                model: db_1.models.Products,
                attributes: [
                    [sequelize.literal('SUM(price * `Cart`.qty)'), 'totalAmount']
                ],
            }, {
                model: db_1.models.User,
                attributes: [],
                through: {
                    attributes: [],
                },
                where: {
                    id: id
                }
            }]
    });
}
exports.cartTotalSum = cartTotalSum;
//# sourceMappingURL=CartAction.js.map