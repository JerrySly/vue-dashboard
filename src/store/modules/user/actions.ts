import { ActionContext, ActionTree } from "vuex";
import { RootState } from "../..";
import { AppError, User, UserSettings } from "../../../models";
import { getSettings, loginToAccount, createUser } from "../../../services/userService";
import { SystemActionTypes } from "../system/actions-types";
import { UserActionsTypes } from "./actions-types";
import { UserMutations } from "./mutations";
import { UserMutationTypes } from "./mutations-type";
import { UserState } from "./state";

type AugmentedActionContext = {
    commit<K extends keyof UserMutations>(
        key: K,
        payload: Parameters<UserMutations[K]>[1]
    ): ReturnType<UserMutations[K]>
} & Omit<ActionContext<UserState, RootState>,"commit">

export interface UserActions {
    [UserActionsTypes.GET_USER]({commit,dispatch}:AugmentedActionContext, payload:{
        login:string,
        password: string
    }):Promise<void>,
    [UserActionsTypes.GET_USER_SETTINGS]({commit,dispatch}:AugmentedActionContext, userId:string): Promise<void>,
    [UserActionsTypes.CREATE_USER]({commit,dispatch}:AugmentedActionContext, payload:{
        login:string,
        password: string,
        name: string
    }): Promise<void>
}

export const actions: ActionTree<UserState,RootState> & UserActions = {
    async [UserActionsTypes.GET_USER]({commit,dispatch},{login,password}):Promise<void>{
        const result = await loginToAccount(login,password);
        console.log('Geting result:', result);
        if((result as User).login != undefined){
            commit(UserMutationTypes.SET_USER,result as User);  
        }
        else{
            await dispatch(SystemActionTypes.SET_ERROR, result as AppError )
        }
    },
    async [UserActionsTypes.GET_USER_SETTINGS]({commit,dispatch},userId):Promise<void>{
        const result = await getSettings(userId);
        if((result as UserSettings).userId != undefined)
            commit(UserMutationTypes.SET_SETTINGS,result as UserSettings);
        else
            await dispatch(SystemActionTypes.SET_ERROR, result as AppError )
    },
    async [UserActionsTypes.CREATE_USER]({commit,dispatch},{login,password,name}):Promise<void>{
        const result = await createUser(login,password,name)
        if((result as AppError).message != undefined)
            await dispatch(SystemActionTypes.SET_ERROR, result as AppError)
        else{
            const user = await dispatch(UserActionsTypes.GET_USER, {login,password})
        }
    }   
}