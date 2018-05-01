import { cartDetailsI, newOrderI, productI } from '../Interfaces/CartActionI';
export declare function addToCart(newOrder: newOrderI): Promise<{}>;
export declare function getCart(id: number): any;
export declare function removeProduct(product: productI): any;
export declare function userCountOrders(id: number): any;
export declare function checkoutUserCart(id: number): Promise<{}>;
export declare function incdecQuantity(cartDetails: cartDetailsI): Promise<{}>;
export declare function cartTotalSum(id: number): any;
