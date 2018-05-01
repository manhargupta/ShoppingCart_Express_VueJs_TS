/**
 * Author : Manhar Gupta
 */
import express,{Request,Response} from 'express'
let route: express.Router = express.Router();
import * as vendorAction from '../models/VendorAction'

route.get('/', (req, res) => {
    vendorAction.getAllVendors().then((vendors:any)=>{
        res.status(200).send(vendors);
    }).catch((e:Error)=>{
        res.status(500).send({
            msg:'could not retrieve',
            success:false
        });
    })
});

route.get('/:id', (req, res) => {
    vendorAction.getVendor(req.params.id).then((vendor:any)=>{
        res.status(200).send(vendor);
    }).catch((e:Error)=>{
        res.status(500).send({
            msg:'could not retrieve',
            success:false
        });
    })
});

route.post('/', (req, res) => {
    let newVendor = {
        name:req.body.name,
        address:req.body.address,
        mobile:req.body.mobile
    }
    vendorAction.addVendor(newVendor).then((vendor:any)=>{
        res.status(200).send({
            vendor:vendor,
            success:true
        });
    }).catch((e:Error)=>{
        res.status(500).send({
            msg:'could not add'+e,
            success:false
        });
    })
});

route.post('/login', (req, res) => {
    let loginVendor = {
        name:req.body.name,
        mobile:req.body.mobile
    }
    vendorAction.loginVendor(loginVendor).then((vendor:any)=>{
        if(!vendor)
        {
            throw new Error('not a valid vendor')
        }
        res.status(200).send({
            vendor:vendor,
            success:true
        });
    }).catch((e:Error)=>{
        res.status(500).send({
            msg:'could not login vendor, '+e,
            success:false
        });
    })
});

route.delete('/', (req, res) => {
    vendorAction.deleteAllVendors().then(()=>{
        res.status(200).send({
            success:true
        });
    }).catch((e:Error)=>{
        res.status(500).send({
            msg:'could not delete add vendors',
            success:false
        });
    })
});

route.delete('/:id', (req, res) => {
    vendorAction.deleteVendor(req.params.id).then(()=>{
        res.status(200).send({
            success:true
        });
    }).catch((e:Error)=>{
        res.status(500).send({
            msg:'could not delete vendor',
            success:false
        });
    })
});


export default route