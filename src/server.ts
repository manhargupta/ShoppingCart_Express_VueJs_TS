/**
 * Author : Manhar Gupta
 */
import  express from 'express'
import path from 'path'
const app = express();
import session from 'express-session'
import passport from './utilities/passport'

import productRoute from './routes/product'
import vendorRoute from './routes/vendor'
import userRoute from './routes/user'
import cartRoute from './routes/cart'



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(session({
    secret: 'ajqutyrizmnvepowuidsew',
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/',express.static(path.join(__dirname,"../public")))

const route = {
    product : productRoute,
    vendor : vendorRoute,
    cart : cartRoute,
    user : userRoute,


}

app.use('/product',route.product)
app.use('/vendor',route.vendor)
app.use('/cart',route.cart)
app.use('/user',route.user)



app.listen(7777,()=>{
    console.log('server running on port 7777')
});
