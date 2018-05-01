/// <reference types="sequelize" />
/**
 * Author : Manhar Gupta
 */
import Sequelize from 'sequelize';
import { DataTypeAbstract, DefineAttributeColumnOptions } from "sequelize";
import { ProductI, CartI, UserI, VendorI } from './models';
declare global  {
    type SequelizeAttributes<T extends {
        [key: string]: any;
    }> = {
        [P in keyof T]: string | DataTypeAbstract | DefineAttributeColumnOptions;
    };
}
declare const db: Sequelize.Sequelize;
declare const models: {
    Products: Sequelize.Model<ProductI, any>;
    User: Sequelize.Model<UserI, any>;
    Cart: Sequelize.Model<CartI, any>;
    Vendor: Sequelize.Model<VendorI, any>;
};
export { db };
export { models };
