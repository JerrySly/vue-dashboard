import {collection, getDocs, getFirestore} from "firebase/firestore";
import {FirebaseOptions, initializeApp} from "firebase/app";
import { Project } from "../models";

const appConfig:FirebaseOptions = {
    apiKey: "AIzaSyAZnyv58gsxvNFBvYLcOFId0gTmpBVk9TA",
    authDomain: "vue-dashboard-c3a6f.firebaseapp.com",
    projectId: "vue-dashboard-c3a6f",
    storageBucket: "vue-dashboard-c3a6f.appspot.com",
    messagingSenderId: "526776945900",
    appId: "1:526776945900:web:ad70e1904b6077312769c9"
}

const app = initializeApp(appConfig);
const db = getFirestore(app);


export async function getEntityById<Type>(collectionName:string, id:string):Promise<Type | null>{
    const currentCollection = collection(db,collectionName);
    if(!currentCollection)
        return null;
    const docsModel = await getDocs(currentCollection);
    const list = docsModel.docs.map(x=>x.data())
    let result = list.find(x=>x.id === id);
    if(!result || result.length<1)
        return null;
    return result as Type;
}

export default db;
