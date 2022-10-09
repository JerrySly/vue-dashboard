import database from "./db";
import {collection,getDocs,addDoc} from "firebase/firestore";
import { UserSettings } from "../models";

export const getUserSettings = async (userId:string):Promise<UserSettings | null> =>{
    const users = collection(database,'usersSettings');
    const snapshot = await getDocs(users);
    const list = snapshot.docs.map(x=>x.data());
    let result = list.find(x=>x.userId === userId);
    if(result == null)
        return null
    return result as UserSettings;
}