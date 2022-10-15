import database, { getEntityById } from "./db";
import {collection,getDocs,addDoc, getDoc} from "firebase/firestore";
import { v4 as uuidv4 } from 'uuid';
import { AppError, Project } from "../models";

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

export const getProjects = async (creator:string): Promise<Array<Project> | null> => {
    const dbCollection = collection(database,'projects');
    if(!dbCollection)
        return null;
    const collectionDocs = await getDocs(dbCollection);
    const docs = collectionDocs.docs.map(x=>x.data())
    const result = docs.filter(x=>(x as Project).admins.includes(creator) 
    || (x as Project).members.includes(creator))

    return result.map(x=>x as Project);

}