export interface ProductI{
    pid:number
    name:string;
    price:number;
    stock:number;
}

export interface VendorI{
    vid:number
    name:string;
    address:string;
    mobile:string;

}

export interface UserI{
    id:number
    username:string;
    email:string;
    mobile:string;
    password:string;


}

export interface CartI {
    qty:number;

}

