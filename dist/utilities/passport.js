"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var passport_1 = __importDefault(require("passport"));
var passport_local_1 = __importDefault(require("passport-local"));
var LocalStrategy = passport_local_1.default.Strategy;
var db_1 = require("../models/db");
passport_1.default.serializeUser(function (user, done) {
    if (user && user.id) {
        return done(null, user.id);
    }
    done(new Error("User or User ID not found"));
});
passport_1.default.deserializeUser(function (userId, done) {
    db_1.models.User.findOne({
        where: { id: userId }
    }).then(function (user) {
        if (user) {
            done(null, user);
        }
        else {
            done(new Error("No such user found"));
        }
    }).catch(function (err) { return done(err); });
});
passport_1.default.use(new LocalStrategy(function (username, password, done) {
    db_1.models.User.findOne({
        where: { username: username }
    }).then(function (user) {
        if (!user) {
            return done(null, false, { message: 'Username does not exist' });
        }
        if (user.password !== password) {
            return done(null, false, { message: 'Password is wrong' });
        }
        done(null, user);
    }).catch(function (err) { return done(err); });
}));
exports.default = passport_1.default;
//# sourceMappingURL=passport.js.map