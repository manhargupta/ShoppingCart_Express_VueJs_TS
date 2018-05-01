/**
 * Author : Manhar Gupta
 */
import express,{Request,Response} from 'express'
let route: express.Router = express.Router();
import * as cartAction from '../models/CartAction'

route.use('/',(req:Request,res:Response,next)=>{
    if(req.user==null)
    {
        res.send({
            msg:'user is not logged in',
            success:false
        })
    }else{
        next()
    }
})

route.get('/', (req:Request,res:Response) => {
    cartAction.getCart(req.user!.id).then((cart:any)=>{
        res.status(200).send(cart);
    }).catch((e:Error)=>{
        res.status(500).send({
            msg:'could not retrieve',
            success:false
        });
    })
});

route.get('/count', (req:Request,res:Response) => {
    cartAction.userCountOrders(req.user!.id).then((count:any)=>{
        res.status(200).send({
            'orderCount':count
        });
    }).catch((e:Error)=>{
        res.status(500).send({
            msg:'could not retrieve',
            success:false
        });
    })
});

route.get('/sum', (req:Request,res:Response) => {
    cartAction.cartTotalSum(req.user!.id).then((sum:any)=>{
        res.status(200).send({
            'cartsum':sum
        });
    }).catch((e:Error)=>{
        res.status(500).send({
            msg:e.toString(),
            success:false
        });
    })
});

route.post('/', (req:Request,res:Response) => {
    let newcart = {
        pid:req.body.pid,
        id:req.user!.id,
        qty:req.body.qty,
    }
    cartAction.addToCart(newcart).then(()=>{
        res.status(200).send({
            success:true
        });
    }).catch((e:Error)=>{
        res.status(500).send({
            msg:'could not add cart '+e,
            success:false
        });
    })
});

route.put('/:pid/:incdec', (req:Request,res:Response) => {
    let cartDetails = {
        pid: req.params.pid,
        id: req.user!.id,
        incdec:req.params.incdec,
    }
    cartAction.incdecQuantity(cartDetails).then(()=>{
        res.status(200).send({
            success:true
        });
    }).catch((e:Error)=>{
        res.status(500).send({
            msg:'could not inc/dec '+e,
            success:false
        });
    })
});

route.delete('/', (req:Request,res:Response) => {
    let product = {
        pid:req.query.pid,
        id:req.user!.id,
    }
    if(product.pid==undefined || product.pid==undefined)
    {
        res.status(500).send({
            msg:'could not remove product, pid or id is empty',
            success:false
        });
    }
    cartAction.removeProduct(product).then(()=>{
        res.status(200).send({
            success:true
        });
    }).catch((e:Error)=>{
        res.status(500).send({
            msg:'could not remove product '+e,
            success:false
        });
    })
});

route.delete('/checkout', (req:Request,res:Response) => {
    cartAction.checkoutUserCart(req.user!.id).then(()=>{
        res.status(200).send({
            success:true
        });
    }).catch((e)=>{
        res.status(500).send({
            msg:'could not checkout cart '+e,
            success:false
        });
    })
});
export default route