import { ActionContext, ActionTree } from "vuex"
import { RootState } from "../.."
import { AppError } from "../../../models"
import { SystemActionTypes } from "./actions-types"
import { SystemMutationTypes } from "./mutations-types"
import { SystemMutations } from "./mutations"
import { SystemState } from "./state"

type AugmentedActionContext = {
    commit<K extends keyof SystemMutations>(
        key: K,
        payload: Parameters<SystemMutations[K]>[1]
    ): ReturnType<SystemMutations[K]>
} & Omit<ActionContext<SystemState, RootState>,"commit">

export interface SystemActions {
    [SystemActionTypes.SET_ERROR]({commit}:AugmentedActionContext, error:AppError|null):void
}

export const actions: ActionTree<SystemState,RootState> & SystemActions = {
    [SystemActionTypes.SET_ERROR]({commit},error){
        commit(SystemMutationTypes.SET_ERROR,error)
    }
}