import * as Common from "./common"; 
type User = {
    login: string,
    password: string,
    userId: string
}

 type AppError = {
    message: string
}

 type UserSettings = {
    userId:string,
    backgroundColor: string
}

 type Project = {
    id: string,
    name: string,
    admins: Array<string>,
    members: Array<string>,
    creator: string,
    describe: string,
}

type Tag = {
    name: string,
    color: string,
    type: TagType,
    projectId?: string,
    userId: string
}

type TagType = 'project' | 'card'