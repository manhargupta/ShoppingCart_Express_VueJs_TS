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
var userAction = __importStar(require("../models/UserAction"));
var passport_1 = __importDefault(require("../utilities/passport"));
route.get('/', function (req, res) {
    if (req.user == null) {
        res.send({
            msg: 'user is not logged in',
            success: false
        });
    }
    else {
        userAction.getUser(req.user.id).then(function (user) {
            res.status(200).send(user);
        }).catch(function (e) {
            res.status(500).send({
                msg: 'could not retrieve',
                success: false
            });
        });
    }
});
route.post('/', function (req, res) {
    var newUser = {
        username: req.body.username,
        email: req.body.email,
        mobile: req.body.mobile,
        password: req.body.password
    };
    userAction.addUser(newUser).then(function (user) {
        res.status(200).send({
            user: user,
            success: true
        });
    }).catch(function (e) {
        res.status(500).send({
            msg: 'could not add user ' + e,
            success: false
        });
    });
});
route.post('/login', passport_1.default.authenticate('local'), function (req, res) {
    res.status(200).send({
        user: req.user,
        success: true
    });
});
route.get('/logout', function (req, res) {
    req.logout();
    res.status(200).send({
        success: true
    });
});
exports.default = route;
//# sourceMappingURL=user.js.map