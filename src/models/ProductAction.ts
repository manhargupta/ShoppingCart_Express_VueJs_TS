/**
 * Author : Manhar Gupta
 */
import {models}  from './db'
import {newprooductI} from '../Interfaces/ProductActionI'

export function getAllProducts ():any {
    return models.Products.findAll({
        include:[{
            model: models.Vendor,
            attributes: ['vid','name','address','mobile'],
            through:{
                attributes: []
            }
        }],
        order: [
            ['name', 'ASC'],
        ],
    })
}

export function getProduct(pid:number):any {
    return models.Products.findOne({
        where:{
            pid:pid
        },
        include:[{
            model: models.Vendor,
            attributes: ['vid','name','address','mobile'],
            through:{
                attributes: []
            }
        }]
    })
}


export function addProduct (newProduct:newprooductI) {
       return new Promise((resolve,reject) => {
           models.Products.create({
               name: newProduct.name,
               price: newProduct.price,
               stock:newProduct.stock
           }).then((product:any)=>{
               models.Vendor.findById(newProduct.vid).then((vendor:any)=>{
                   vendor.addProduct(product);
                   resolve(product)
               }).catch((e:Error)=>{
                   reject()
               })
           }).catch((e:Error)=>[
               reject()
           ])
       })
}

export function getAllProductsByVendor (vid:number):any {
    return models.Products.findAll({
        include:[{
            model: models.Vendor,
            where:{
                vid:vid
            },
            attributes: ['vid','name','address','mobile'],
            through:{
                attributes: []
            }
        }]
    })
}

export function deleteProductsByVendor(vid:number) {
    return new Promise((resolve,reject) => {
        findAllProductByVendor(vid).then((products:any) => {
            var promises:any = [];
            models.Vendor.findById(vid).then((vendor:any) => {
                products.forEach((product:any) => {
                    promises.push(product.destroy())
                })
                Promise.all(promises).then(() => {
                    resolve(vendor)
                })
            })
        }).catch((err:Error)=>{
            reject(err)
        })
    })
}

export function findAllProductByVendor(vid:number):any {
    return models.Products.findAll({
        include: [{
            model: models.Vendor,
            where: {
                vid: vid
            },
            attributes: [],
            through: {
                attributes: []
            }
        }]
    })
}

export function deleteProductByVendor(vid:number,pid:number) {
    return new Promise((resolve,reject) => {
        models.Products.destroy({
            where:{
                pid:pid,
                include: [{
                    model: models.Vendor,
                    where: {
                        vid: vid
                    }
                }]
            }
        }).then((products:any) => {
            if(products===1)
            {
                resolve()
            }
            else{
                reject()
            }
        }).catch((err:string)=>{
            reject(new Error(err))
        })
    })
}
