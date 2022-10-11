import database from "./db";
import {collection,getDocs,addDoc} from "firebase/firestore";
import { User } from "../models";
import { v4 as uuidv4 } from 'uuid';

export const getUser = async (login:string):Promise<User | null> =>{
    const users = collection(database,'users');
    const snapshot = await getDocs(users);
    const list = snapshot.docs.map(x=>x.data());
    console.log(snapshot.docs)
    console.log(list);
    let result = list.find(x=>x.login === login);
    console.log(result);
    if(result == null)
        return null
    return result as User;
}

export const createUser = async (login:string, password: string):Promise<User> => {
    const users = collection(database,'users');
    console.log(uuidv4())
    await addDoc(users,{
        userId: uuidv4(),
        login,
        password
    })
    const user = await getUser(login);
    return user as User;
}