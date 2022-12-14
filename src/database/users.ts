import database from "./db";
import {collection,getDocs,addDoc} from "firebase/firestore";
import { User } from "../models";
import { v4 as uuidv4 } from 'uuid';

export const getUser = async (login:string):Promise<User | null> =>{
    const users = collection(database,'users');
    const snapshot = await getDocs(users);
    const list = snapshot.docs.map(x=>x.data());
    let result = list.find(x=>x.login === login);
    if(!result)
        return null
    return result as User;
}

export const createUserInDb = async (login:string, password: string,name: string):Promise<User> => {
    const users = collection(database,'users');
    await addDoc(users,{
        userId: uuidv4(),
        login,
        password,
        name
    })
    const user = await getUser(login);
    return user as User;
}