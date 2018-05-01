/**
 * Author : Manhar Gupta
 */
import express,{Request,Response} from 'express'
let route: express.Router = express.Router();
import * as userAction from '../models/UserAction'
import passport from '../utilities/passport'

route.get('/', (req, res) => {
        if(req.user==null)
        {
            res.send({
                msg:'user is not logged in',
                success:false
            })
        }else {
            userAction.getUser(req.user.id).then((user:any) => {
                res.status(200).send(user);
            }).catch((e:Error) => {
                res.status(500).send({
                    msg: 'could not retrieve',
                    success: false
                });
            })
        }
});

route.post('/', (req, res) => {
    let newUser = {
        username:req.body.username,
        email:req.body.email,
        mobile:req.body.mobile,
        password:req.body.password

    }
    userAction.addUser(newUser).then((user:any)=>{
        res.status(200).send({
            user:user,
            success:true
        });
    }).catch((e:Error)=>{
        res.status(500).send({
            msg:'could not add user '+e,
            success:false
        });
    })
});


route.post('/login', passport.authenticate('local'),(req,res)=>{
    res.status(200).send({
        user:req.user,
        success:true
    });

})

route.get('/logout', function(req, res){
    req.logout();
    res.status(200).send({
        success:true
    });
});

export default route