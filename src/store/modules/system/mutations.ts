import { MutationTree } from "vuex";
import { AppError } from "../../../models";
import { SystemActionTypes } from "./actions-types";
import { SystemMutationTypes } from "./mutations-types";
import { SystemState } from "./state";

export type SystemMutations<S=SystemState> = {
    [SystemMutationTypes.SET_ERROR](state:S,value:AppError|null):void
}

export const  mutations: MutationTree<SystemState> & SystemMutations = {
    [SystemActionTypes.SET_ERROR](state,value){
        state.error = value;
    }
}