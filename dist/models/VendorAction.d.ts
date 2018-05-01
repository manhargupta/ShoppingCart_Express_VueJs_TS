import { loginVendorI, newVendorI } from "../Interfaces/VendorActionI";
export declare function deleteAllVendors(): Promise<{}>;
export declare function getAllVendors(): any;
export declare function getVendor(vid: number): any;
export declare function addVendor(newVendor: newVendorI): any;
export declare function deleteVendor(vid: number): Promise<{}>;
export declare function loginVendor(loginVendor: loginVendorI): any;
