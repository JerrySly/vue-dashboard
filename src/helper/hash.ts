import CryptoJS from "crypto-js";
const secretKey = '222afd2134fg13f';

export const hashPassword = (password:string) =>{
    return CryptoJS.AES.encrypt(password,secretKey).toString();
}

export const comparePassword = (password:string,hash:string) => {
    const pass =  CryptoJS.AES.decrypt(hash,secretKey);
    return pass.toString(CryptoJS.enc.Utf8) === password
}