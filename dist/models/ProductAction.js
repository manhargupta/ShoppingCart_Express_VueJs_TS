"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Author : Manhar Gupta
 */
var db_1 = require("./db");
function getAllProducts() {
    return db_1.models.Products.findAll({
        include: [{
                model: db_1.models.Vendor,
                attributes: ['vid', 'name', 'address', 'mobile'],
                through: {
                    attributes: []
                }
            }],
        order: [
            ['name', 'ASC'],
        ],
    });
}
exports.getAllProducts = getAllProducts;
function getProduct(pid) {
    return db_1.models.Products.findOne({
        where: {
            pid: pid
        },
        include: [{
                model: db_1.models.Vendor,
                attributes: ['vid', 'name', 'address', 'mobile'],
                through: {
                    attributes: []
                }
            }]
    });
}
exports.getProduct = getProduct;
function addProduct(newProduct) {
    return new Promise(function (resolve, reject) {
        db_1.models.Products.create({
            name: newProduct.name,
            price: newProduct.price,
            stock: newProduct.stock
        }).then(function (product) {
            db_1.models.Vendor.findById(newProduct.vid).then(function (vendor) {
                vendor.addProduct(product);
                resolve(product);
            }).catch(function (e) {
                reject();
            });
        }).catch(function (e) { return [
            reject()
        ]; });
    });
}
exports.addProduct = addProduct;
function getAllProductsByVendor(vid) {
    return db_1.models.Products.findAll({
        include: [{
                model: db_1.models.Vendor,
                where: {
                    vid: vid
                },
                attributes: ['vid', 'name', 'address', 'mobile'],
                through: {
                    attributes: []
                }
            }]
    });
}
exports.getAllProductsByVendor = getAllProductsByVendor;
function deleteProductsByVendor(vid) {
    return new Promise(function (resolve, reject) {
        findAllProductByVendor(vid).then(function (products) {
            var promises = [];
            db_1.models.Vendor.findById(vid).then(function (vendor) {
                products.forEach(function (product) {
                    promises.push(product.destroy());
                });
                Promise.all(promises).then(function () {
                    resolve(vendor);
                });
            });
        }).catch(function (err) {
            reject(err);
        });
    });
}
exports.deleteProductsByVendor = deleteProductsByVendor;
function findAllProductByVendor(vid) {
    return db_1.models.Products.findAll({
        include: [{
                model: db_1.models.Vendor,
                where: {
                    vid: vid
                },
                attributes: [],
                through: {
                    attributes: []
                }
            }]
    });
}
exports.findAllProductByVendor = findAllProductByVendor;
function deleteProductByVendor(vid, pid) {
    return new Promise(function (resolve, reject) {
        db_1.models.Products.destroy({
            where: {
                pid: pid,
                include: [{
                        model: db_1.models.Vendor,
                        where: {
                            vid: vid
                        }
                    }]
            }
        }).then(function (products) {
            if (products === 1) {
                resolve();
            }
            else {
                reject();
            }
        }).catch(function (err) {
            reject(new Error(err));
        });
    });
}
exports.deleteProductByVendor = deleteProductByVendor;
//# sourceMappingURL=ProductAction.js.map