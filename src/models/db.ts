/**
 * Author : Manhar Gupta
 */
import Sequelize from 'sequelize';
import { DataTypeAbstract, DefineAttributeColumnOptions } from "sequelize";
import {ProductI,CartI,UserI,VendorI} from './models'

declare global {
    type SequelizeAttributes<T extends { [key: string]: any }> = {
        [P in keyof T]: string | DataTypeAbstract | DefineAttributeColumnOptions;
    };
}
/*

type productInstance = Sequelize.Instance<ProductI> & ProductI;
type cartInstance = Sequelize.Instance<CartI> & CartI;
type userInstance = Sequelize.Instance<UserI> & UserI;
type vendorInstance = Sequelize.Instance<VendorI> & VendorI;
*/



const db = new Sequelize('shpcart', 'manhargupta', 'password', {
    host: 'localhost',
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 5000
    }
});

const productAttr: SequelizeAttributes<ProductI> = {
    pid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:Sequelize.STRING,
    price:Sequelize.INTEGER,
    stock:Sequelize.INTEGER,

};
const Products = db.define<ProductI,any>('product', productAttr);


const vendorAttr: SequelizeAttributes<VendorI> = {
    vid: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name:Sequelize.STRING,
    address: Sequelize.STRING,
    mobile:Sequelize.STRING

};
const Vendor = db.define<VendorI,any>('vendor', vendorAttr);



const userAttr: SequelizeAttributes<UserI> = {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    username: Sequelize.STRING,
    email: Sequelize.STRING,
    mobile: Sequelize.STRING,
    password:Sequelize.STRING

};
const User= db.define<UserI,any>('user', userAttr);

const cartAttr: SequelizeAttributes<CartI> = {
    qty: {
        type:Sequelize.INTEGER,
        defaultValue:1
    }

};
const Cart = db.define<CartI,any>('cart', cartAttr);


Vendor.belongsToMany(Products,{through: 'Product_Vendor',onDelete : 'cascade'});
Products.belongsToMany(Vendor,{through: 'Product_Vendor',onDelete : 'cascade'});

Cart.belongsTo(Products);
Products.hasMany(Cart);

Cart.belongsToMany(User,{through: 'cart_user',onDelete : 'cascade'});

(async function(){
    try{
        await db.authenticate()
        await db.sync({force: false})
            .then(() => {
                console.log("Database Synchronised");
            })
            .catch((err) => {
                console.log("Error setting up Database");
                console.error(err);
            });
    }
    catch (e) {
        console.log(e)
    }
})()

const models = {
    Products,
    User,
    Cart,
    Vendor
}

export {db};
export { models}