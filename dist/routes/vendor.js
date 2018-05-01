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
var vendorAction = __importStar(require("../models/VendorAction"));
route.get('/', function (req, res) {
    vendorAction.getAllVendors().then(function (vendors) {
        res.status(200).send(vendors);
    }).catch(function (e) {
        res.status(500).send({
            msg: 'could not retrieve',
            success: false
        });
    });
});
route.get('/:id', function (req, res) {
    vendorAction.getVendor(req.params.id).then(function (vendor) {
        res.status(200).send(vendor);
    }).catch(function (e) {
        res.status(500).send({
            msg: 'could not retrieve',
            success: false
        });
    });
});
route.post('/', function (req, res) {
    var newVendor = {
        name: req.body.name,
        address: req.body.address,
        mobile: req.body.mobile
    };
    vendorAction.addVendor(newVendor).then(function (vendor) {
        res.status(200).send({
            vendor: vendor,
            success: true
        });
    }).catch(function (e) {
        res.status(500).send({
            msg: 'could not add' + e,
            success: false
        });
    });
});
route.post('/login', function (req, res) {
    var loginVendor = {
        name: req.body.name,
        mobile: req.body.mobile
    };
    vendorAction.loginVendor(loginVendor).then(function (vendor) {
        if (!vendor) {
            throw new Error('not a valid vendor');
        }
        res.status(200).send({
            vendor: vendor,
            success: true
        });
    }).catch(function (e) {
        res.status(500).send({
            msg: 'could not login vendor, ' + e,
            success: false
        });
    });
});
route.delete('/', function (req, res) {
    vendorAction.deleteAllVendors().then(function () {
        res.status(200).send({
            success: true
        });
    }).catch(function (e) {
        res.status(500).send({
            msg: 'could not delete add vendors',
            success: false
        });
    });
});
route.delete('/:id', function (req, res) {
    vendorAction.deleteVendor(req.params.id).then(function () {
        res.status(200).send({
            success: true
        });
    }).catch(function (e) {
        res.status(500).send({
            msg: 'could not delete vendor',
            success: false
        });
    });
});
exports.default = route;
//# sourceMappingURL=vendor.js.map