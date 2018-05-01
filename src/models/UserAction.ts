/**
 * Author : Manhar Gupta
 */
import {models}  from './db'
import {loginUserI, newUserI} from "../Interfaces/UserActionI";

export function getUser(uid:number):any {
    return models.User.findById(uid)
}


export function addUser(newUser:newUserI):any {
    return models.User.create({
        username: newUser.username,
        email: newUser.email,
        mobile:newUser.mobile,
        password:newUser.password
    })
}

export function loginUser(loginUser:loginUserI):any {
    return models.User.findOne({
        where:{
            name:loginUser.name,
            mobile:loginUser.mobile
        }
    })
}
