export declare type User = {
    login: string,
    password: string,
    userId: string
}

export declare type AppError = {
    message: string
}

export declare type UserSettings = {
    userId:string,
    backgroundColor: string
}

export declare type Project = {
    name: string,
    admins: Array<string>,
    members: Array<string>
}
