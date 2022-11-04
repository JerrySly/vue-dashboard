import { addDoc, collection, deleteDoc, getDocs } from "firebase/firestore"
import database from "./db"
export const createDbTag = async (tag: Tag):Promise<Tag | null> =>{
    const tagsCollection = collection(database,'tags');
    if(await isTagExist(tag))
        return null
    await addDoc(tagsCollection,tag);
    return await getTag(tag.userId,tag.name,tag.projectId);
}

export const getMyDbTags = async (userId:string):Promise<Array<Tag> | null> => {
    const tags = collection(database,'tags');
    if(!tags)
        return null;
    const collectionDocs = await getDocs(tags);
    const docs = collectionDocs.docs.map(x=>x.data());
    return docs.filter(x=>(x as Tag).userId == userId).map(x=>x as Tag);
}

export const getTag = async (userId:string,name:string,projectId?: string):Promise<Tag | null> => {
    const myTags =  await getMyDbTags(userId);
    if(myTags){
        let tempTags = myTags;
        if(projectId)
            tempTags  = myTags
                .filter(x=>x.projectId == projectId);
        tempTags = tempTags
            .filter(x=>x.name.toLowerCase() == name.toLowerCase())
        return tempTags[0] ?? null;
    }
    return null
}

export const removeDbTag = async (tag: Tag):Promise<Boolean> => {
    if(!(await isTagExist(tag)))
        return false
    const tagsCollection = collection(database, 'tags');
    let tagsDocs = (await getDocs(tagsCollection)).docs;
    if(tag.projectId)
        tagsDocs = tagsDocs.filter(x=>(x.data() as Tag).projectId == tag.projectId);
    tagsDocs = tagsDocs.filter(x=>(x.data() as Tag).name == tag.name);
    if(tagsDocs && tagsDocs.length>0){
        const tagRef = tagsDocs[0].ref;
        deleteDoc(tagRef);
        return true;
    }
    return false;
}

const isTagExist = async (tag: Tag):Promise<Boolean> => {
    return (await getTag(tag.userId,tag.name, tag.projectId)) != null
}