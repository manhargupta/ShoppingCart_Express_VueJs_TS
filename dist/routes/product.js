"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
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
var express_1 = __importDefault(require("express"));
var route = express_1.default.Router();
var productAction = __importStar(require("../models/ProductAction"));
route.get('/', function (req, res) {
    productAction.getAllProducts().then(function (products) {
        res.status(200).send(products);
    }).catch(function (e) {
        res.status(500).send({
            msg: 'could not retrieve',
            success: false
        });
    });
});
route.get('/:pid/', function (req, res) {
    productAction.getProduct(req.params.pid).then(function (product) {
        res.status(200).send([product]);
    }).catch(function (e) {
        res.status(500).send({
            msg: 'could not retrieve',
            success: false
        });
    });
});
route.get('/:vid/products', function (req, res) {
    productAction.getAllProductsByVendor(req.params.vid).then(function (products) {
        res.status(200).send(products);
    }).catch(function (e) {
        res.status(500).send({
            msg: 'could not retrieve',
            success: false
        });
    });
});
route.post('/', function (req, res) {
    var newProduct = {
        name: req.body.name,
        price: req.body.price,
        stock: req.body.stock,
        vid: req.body.vid
    };
    productAction.addProduct(newProduct).then(function (product) {
        res.status(200).send({
            product: product,
            success: true
        });
    }).catch(function (e) {
        res.status(500).send({
            msg: 'could not add ' + e,
            success: false
        });
    });
});
route.delete('/:id/products', function (req, res) {
    productAction.deleteProductsByVendor(req.params.id).then(function (vendor) {
        if (vendor == undefined) {
            throw new Error();
        }
        else {
            res.status(200).send({
                vendor: vendor,
                success: true
            });
        }
    }).catch(function (e) {
        res.status(500).send({
            msg: 'could not delete vendor products',
            success: false
        });
    });
});
route.delete('/:vid/product/:pid', function (req, res) {
    productAction.deleteProductByVendor(req.params.vid, req.params.pid).then(function () {
        res.status(200).send({
            success: true
        });
    }).catch(function (e) {
        res.status(500).send({
            msg: 'could not delete vendor product ' + e,
            success: false
        });
    });
});
exports.default = route;
//# sourceMappingURL=product.js.map