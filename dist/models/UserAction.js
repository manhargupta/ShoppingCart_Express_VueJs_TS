"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Author : Manhar Gupta
 */
var db_1 = require("./db");
function getUser(uid) {
    return db_1.models.User.findById(uid);
}
exports.getUser = getUser;
function addUser(newUser) {
    return db_1.models.User.create({
        username: newUser.username,
        email: newUser.email,
        mobile: newUser.mobile,
        password: newUser.password
    });
}
exports.addUser = addUser;
function loginUser(loginUser) {
    return db_1.models.User.findOne({
        where: {
            name: loginUser.name,
            mobile: loginUser.mobile
        }
    });
}
exports.loginUser = loginUser;
//# sourceMappingURL=UserAction.js.map