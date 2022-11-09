import { createDbProject, deleteDbProject, getProject, getProjects, updateDbProject } from "../database/projects";
import { AppError, Project } from "../models";



export const createProject = async (name: string,describe:string, creator: string):Promise<Project | AppError> => {
    let project = {
        id: "",
        name,
        creator,
        describe,
        admins: [creator],
        members: []
    }
    return await createDbProject(project);
}

export const getMyProjects = async (creator:string): Promise<Array<Project> | AppError> =>{
    const result = await getProjects(creator);
    if(!result)
        return {
            message: "Projects is null"
        }
    return result as Array<Project>;
}

export const getProjectById = async (projectId: string): Promise<Project | AppError> => {
    const result = await getProject(projectId);
    if(!result)
        return {
            message: "Project not found"
        }
    return result as Project;
}

export const deleteProject = async(projectId:string):Promise<void | AppError> =>{
    const result = await deleteDbProject(projectId);
    if(result === null)
        return {
            message: 'Project not founded'
        }
    
}
export const updateProject = async(project:Project):Promise<Project | AppError> => {
    const result = await updateDbProject(project);
    if(result === null)
        return {
            message: 'Error on update'
        }
    return result
}