
import {User,UserSettings} from "../../../models/index" 
export interface UserState{
    user: User | null,
    userSettings: UserSettings | null
}

export const state: UserState  = {
    user: null,
    userSettings: null
}