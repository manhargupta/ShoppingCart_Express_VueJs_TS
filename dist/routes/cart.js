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
var cartAction = __importStar(require("../models/CartAction"));
route.use('/', function (req, res, next) {
    if (req.user == null) {
        res.send({
            msg: 'user is not logged in',
            success: false
        });
    }
    else {
        next();
    }
});
route.get('/', function (req, res) {
    cartAction.getCart(req.user.id).then(function (cart) {
        res.status(200).send(cart);
    }).catch(function (e) {
        res.status(500).send({
            msg: 'could not retrieve',
            success: false
        });
    });
});
route.get('/count', function (req, res) {
    cartAction.userCountOrders(req.user.id).then(function (count) {
        res.status(200).send({
            'orderCount': count
        });
    }).catch(function (e) {
        res.status(500).send({
            msg: 'could not retrieve',
            success: false
        });
    });
});
route.get('/sum', function (req, res) {
    cartAction.cartTotalSum(req.user.id).then(function (sum) {
        res.status(200).send({
            'cartsum': sum
        });
    }).catch(function (e) {
        res.status(500).send({
            msg: e.toString(),
            success: false
        });
    });
});
route.post('/', function (req, res) {
    var newcart = {
        pid: req.body.pid,
        id: req.user.id,
        qty: req.body.qty,
    };
    cartAction.addToCart(newcart).then(function () {
        res.status(200).send({
            success: true
        });
    }).catch(function (e) {
        res.status(500).send({
            msg: 'could not add cart ' + e,
            success: false
        });
    });
});
route.put('/:pid/:incdec', function (req, res) {
    var cartDetails = {
        pid: req.params.pid,
        id: req.user.id,
        incdec: req.params.incdec,
    };
    cartAction.incdecQuantity(cartDetails).then(function () {
        res.status(200).send({
            success: true
        });
    }).catch(function (e) {
        res.status(500).send({
            msg: 'could not inc/dec ' + e,
            success: false
        });
    });
});
route.delete('/', function (req, res) {
    var product = {
        pid: req.query.pid,
        id: req.user.id,
    };
    if (product.pid == undefined || product.pid == undefined) {
        res.status(500).send({
            msg: 'could not remove product, pid or id is empty',
            success: false
        });
    }
    cartAction.removeProduct(product).then(function () {
        res.status(200).send({
            success: true
        });
    }).catch(function (e) {
        res.status(500).send({
            msg: 'could not remove product ' + e,
            success: false
        });
    });
});
route.delete('/checkout', function (req, res) {
    cartAction.checkoutUserCart(req.user.id).then(function () {
        res.status(200).send({
            success: true
        });
    }).catch(function (e) {
        res.status(500).send({
            msg: 'could not checkout cart ' + e,
            success: false
        });
    });
});
exports.default = route;
//# sourceMappingURL=cart.js.map