"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Author : Manhar Gupta
 */
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var app = express_1.default();
var express_session_1 = __importDefault(require("express-session"));
var passport_1 = __importDefault(require("./utilities/passport"));
var product_1 = __importDefault(require("./routes/product"));
var vendor_1 = __importDefault(require("./routes/vendor"));
var user_1 = __importDefault(require("./routes/user"));
var cart_1 = __importDefault(require("./routes/cart"));
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(express_session_1.default({
    secret: 'ajqutyrizmnvepowuidsew',
    resave: false,
    saveUninitialized: true
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use('/', express_1.default.static(path_1.default.join(__dirname, "../public")));
var route = {
    product: product_1.default,
    vendor: vendor_1.default,
    cart: cart_1.default,
    user: user_1.default,
};
app.use('/product', route.product);
app.use('/vendor', route.vendor);
app.use('/cart', route.cart);
app.use('/user', route.user);
app.listen(7777, function () {
    console.log('server running on port 7777');
});
//# sourceMappingURL=server.js.map