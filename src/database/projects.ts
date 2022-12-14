import database, { getEntityById } from "./db";
import {collection,getDocs,addDoc, getDoc, deleteDoc, updateDoc} from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { Project } from "../models";

export const getProject = async (projectId: string):Promise<Project|null> => {
    return await getEntityById('projects',projectId);
}

export const  createDbProject = async (project:Project):Promise<Project | AppError> => {
    const projects = collection(database,'projects');
    if(!project)
        return {
            message: 'Argument is null'
        };
    if(projects){
        const newId = uuidv4();
        project.id = newId;
        await addDoc(projects, project)
        const dbProject = await getProject(newId);
        if(!dbProject)
            return {
                message: 'Project was not found'
            }
        return dbProject as Project;
    }
    return {
        message: 'Project collection is empty or not available'
    }
    
}

export const getProjects = async (memberId:string): Promise<Array<Project> | null> => {
    const dbCollection = collection(database,'projects');
    if(!dbCollection)
        return null;
    const collectionDocs = await getDocs(dbCollection);
    const docs = collectionDocs.docs.map(x=>x.data())
    const result = docs.filter(x=>((x as Project).admins && (x as Project).admins.indexOf(memberId) != -1))

    return result.map(x=>x as Project);

}

export const deleteDbProject = async (projectId:string): Promise<void | null> => {
    const dbCollection = collection(database,'projects');
    if(!dbCollection)
        return null;
    const collectionDocs = await getDocs(dbCollection);
    const docForDelete = collectionDocs.docs.filter(x=>(x.data() as Project).id == projectId)[0];
    if(!docForDelete)
        return null;
    await deleteDoc(docForDelete.ref);  
}

export const updateDbProject = async (project:Project): Promise<Project | null> => {
    const dbCollection = collection(database, 'projects')
    if(!dbCollection)
        return null;
    const collectionDocs = await getDocs(dbCollection);
    const searchedProject = collectionDocs.docs.filter(x=>x.data().id == project.id)[0]
    if(!searchedProject)
        return null;
    for(let prop in project){
        updateDoc(searchedProject.ref,prop,project[prop as keyof Project])
    }
    return await getProject(project.id)
}