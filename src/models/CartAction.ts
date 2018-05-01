/**
 * Author : Manhar Gupta
 */
import {models}  from './db'
import {cartDetailsI, newOrderI, productI} from '../Interfaces/CartActionI'
import * as sequelize from "sequelize";


export function addToCart(newOrder:newOrderI) {
    return new Promise((resolve,reject)=>{
        models.Products.findById(newOrder.pid).then((product:any)=>{
            models.User.findById(newOrder.id).then((user:any)=>{
                models.Cart.findOrCreate({
                    include:[{
                        model:models.User,
                        where:{
                            id:user.id
                        }
                    }],
                    where:{
                        productPid:product.pid
                    }
                }).spread((cart:any, created:any)=>{
                    if (created){
                        product.addCart(cart);
                        cart.addUser(user)
                        cart.increment({'qty':newOrder.qty-1})
                        resolve()
                    }
                    else {
                        cart.increment({'qty':newOrder.qty})
                        resolve()
                    }
                })
            }).catch((err:string)=>{
                reject(err)
            })
        }).catch((err:string)=>{
            reject(err)
        })
    })

}

export function getCart(id:number):any {
    return models.Cart.findAll({
        include:[{
            model:models.User,
            attributes: ['id','username'],
            through:{
                attributes: [],
            },
            where:{
                id:id
            }
        },{
            model:models.Products,
            attributes: ['pid','name','price','stock'],
        }]
    })
}


export function removeProduct(product:productI):any {
    return new Promise((resolve,reject)=> {
        models.Cart.findOne({
            include:[{
                model:models.User,
                where:{
                    id:product.id
                }
            }],
            where:{
                productPid:product.pid
            }
        }).then((product:any)=>{
            if(!product)
            {
                reject()
            }else {
                product.destroy();
                resolve()
            }
        })
    })
}

export function userCountOrders(id:number):any {
    return models.Cart.count({
        include:[{
            model:models.User,
            where:{
                id:id
            }
        }]
    })
}



export function checkoutUserCart(id:number) {
    return new Promise((resolve,reject)=> {
        models.Cart.findAll({
            include:[{
                model:models.User,
                where:{
                    id:id
                }
            }]
        }).then((products:any)=>{
            if(products=='') {
                reject()
            }else {
                products.map((product:any)=>{

                    models.Products.findOne({
                        where:{
                            pid:product.productPid
                        }
                    }).then((prod:any)=>{
                        if(prod){
                            prod.updateAttributes({
                                stock:prod.dataValues.stock-product.qty
                            })
                        }
                    })
                })
                products.map((product:any)=>product.destroy())
                resolve()
            }
        })
    })
}

export function incdecQuantity(cartDetails:cartDetailsI) {
    return new Promise((resolve,reject)=> {
        models.Cart.findOne({
            include:[{
                model:models.Products,
                where:{
                    pid:cartDetails.pid
                }
            },
                {
                    model:models.User,
                    where:{
                        id:cartDetails.id
                    }
                }],
        }).then((product:any)=>{
            if(product==null) {
                reject()
            }else {
                if(cartDetails.incdec==='inc') {
                    product.increment({'qty': 1})
                }
                else{
                    product.decrement({'qty':1})
                }
                resolve()
            }
        })
    })
}

export function cartTotalSum(id:number):any
{
       return models.Cart.findAll({
            include:[{
                model:models.Products,
                attributes: [
                    [sequelize.literal('SUM(price * `Cart`.qty)'), 'totalAmount']
                ],
            },{
                model:models.User,
                attributes: [],
                through:{
                    attributes: [],
                },
                where:{
                    id:id
                }
            }]
        })
}

