/**
 * Author : Manhar Gupta
 */
import {models}  from './db'
import * as productAction from './ProductAction'
import {loginVendorI, newVendorI} from "../Interfaces/VendorActionI";

export function deleteAllVendors() {
    return new Promise((resolve,reject) => {
        getAllVendors().then((vendors:any)=>{
            Promise.all(vendors.map((vendor:any)=>deleteVendor(vendor.vid))).then(()=>{
                resolve()
            })
        })
    })
}

export function getAllVendors():any {
    return models.Vendor.findAll({})
}
export function getVendor(vid:number):any {
    return models.Vendor.findById(vid)
}


export function addVendor(newVendor:newVendorI):any {
    return models.Vendor.create({
        name: newVendor.name,
        address: newVendor.address,
        mobile:newVendor.mobile
    })
}
export function deleteVendor(vid:number) {
    return new Promise((resolve,reject) => {
        productAction.findAllProductByVendor(vid).then((products:any)=>{
            Promise.all(products.map((product:any)=>product.destroy())).then(()=>{
                models.Vendor.destroy({
                    where: {
                        vid:vid
                    }
                }).then(o=>{
                    if(o>0)
                    {
                        resolve()
                    }
                    else{
                        reject()
                    }
                })
            })
        })
    })
}

export function loginVendor(loginVendor:loginVendorI):any {
    return models.Vendor.findOne({
        where:{
            name:loginVendor.name,
            mobile:loginVendor.mobile
        }
    })
}
