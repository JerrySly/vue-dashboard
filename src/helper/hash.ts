import bcrypt from "bcrypt";
const saltRounds = 10;

export const hashPassword = (password:string) =>{
    return bcrypt.hash(password,saltRounds);
}

export const comparePassword = (password:string,hash:string) => {
    return bcrypt.compare(password,hash);
}