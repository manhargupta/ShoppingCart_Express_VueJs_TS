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
var productAction = __importStar(require("./ProductAction"));
function deleteAllVendors() {
    return new Promise(function (resolve, reject) {
        getAllVendors().then(function (vendors) {
            Promise.all(vendors.map(function (vendor) { return deleteVendor(vendor.vid); })).then(function () {
                resolve();
            });
        });
    });
}
exports.deleteAllVendors = deleteAllVendors;
function getAllVendors() {
    return db_1.models.Vendor.findAll({});
}
exports.getAllVendors = getAllVendors;
function getVendor(vid) {
    return db_1.models.Vendor.findById(vid);
}
exports.getVendor = getVendor;
function addVendor(newVendor) {
    return db_1.models.Vendor.create({
        name: newVendor.name,
        address: newVendor.address,
        mobile: newVendor.mobile
    });
}
exports.addVendor = addVendor;
function deleteVendor(vid) {
    return new Promise(function (resolve, reject) {
        productAction.findAllProductByVendor(vid).then(function (products) {
            Promise.all(products.map(function (product) { return product.destroy(); })).then(function () {
                db_1.models.Vendor.destroy({
                    where: {
                        vid: vid
                    }
                }).then(function (o) {
                    if (o > 0) {
                        resolve();
                    }
                    else {
                        reject();
                    }
                });
            });
        });
    });
}
exports.deleteVendor = deleteVendor;
function loginVendor(loginVendor) {
    return db_1.models.Vendor.findOne({
        where: {
            name: loginVendor.name,
            mobile: loginVendor.mobile
        }
    });
}
exports.loginVendor = loginVendor;
//# sourceMappingURL=VendorAction.js.map