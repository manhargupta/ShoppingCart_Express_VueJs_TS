/**
 * Author : Manhar Gupta
 */
import express,{Request,Response} from 'express'
let route: express.Router = express.Router();
import * as productAction from '../models/ProductAction'


route.get('/', (req, res) => {
    productAction.getAllProducts().then((products:any)=>{
        res.status(200).send(products);
    }).catch((e:Error)=>{
        res.status(500).send({
            msg:'could not retrieve',
            success:false
        });
    })
});

route.get('/:pid/', (req, res) => {
    productAction.getProduct(req.params.pid).then((product:any)=>{
        res.status(200).send([product]);
    }).catch((e:Error)=>{
        res.status(500).send({
            msg:'could not retrieve',
            success:false
        });
    })
});

route.get('/:vid/products', (req, res) => {
    productAction.getAllProductsByVendor(req.params.vid).then((products:any)=>{
        res.status(200).send(products);
    }).catch((e:Error)=>{
        res.status(500).send({
            msg:'could not retrieve',
            success:false
        });
    })
});

route.post('/', (req, res) => {
    let newProduct = {
        name:req.body.name,
        price:req.body.price,
        stock:req.body.stock,
        vid:req.body.vid
    }
    productAction.addProduct(newProduct).then((product:any)=>{
        res.status(200).send({
            product:product,
            success:true
        });
    }).catch((e:Error)=>{
        res.status(500).send({
            msg:'could not add '+e,
            success:false
        });
    })
});

route.delete('/:id/products', (req, res) => {
    productAction.deleteProductsByVendor(req.params.id).then((vendor:any)=>{
        if(vendor==undefined)
        {
            throw new Error()
        }else {
            res.status(200).send({
                vendor: vendor,
                success: true
            });
        }
    }).catch((e:Error)=>{
        res.status(500).send({
            msg:'could not delete vendor products',
            success:false
        });
    })
});

route.delete('/:vid/product/:pid', (req, res) => {
    productAction.deleteProductByVendor(req.params.vid,req.params.pid).then(()=>{
        res.status(200).send({
            success:true
        });
    }).catch((e:Error)=>{
        res.status(500).send({
            msg:'could not delete vendor product '+e,
            success:false
        });
    })
});

export default route