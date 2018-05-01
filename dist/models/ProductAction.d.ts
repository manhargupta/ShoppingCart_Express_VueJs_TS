import { newprooductI } from '../Interfaces/ProductActionI';
export declare function getAllProducts(): any;
export declare function getProduct(pid: number): any;
export declare function addProduct(newProduct: newprooductI): Promise<{}>;
export declare function getAllProductsByVendor(vid: number): any;
export declare function deleteProductsByVendor(vid: number): Promise<{}>;
export declare function findAllProductByVendor(vid: number): any;
export declare function deleteProductByVendor(vid: number, pid: number): Promise<{}>;
