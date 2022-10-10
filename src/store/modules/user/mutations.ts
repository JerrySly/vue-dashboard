import { MutationTree } from "vuex";
import { User, UserSettings } from "../../../models";
import { UserMutationTypes } from "./mutations-type";
import { UserState } from "./state";
export type UserMutations<S=UserState> = {
    [UserMutationTypes.SET_SETTINGS](state: S, value:UserSettings): void,
    [UserMutationTypes.SET_USER](state: S,value: User): void
}

export const mutations: MutationTree<UserState> & UserMutations = {
    [UserMutationTypes.SET_USER](state,value){
        state.user = value;
    },
    [UserMutationTypes.SET_SETTINGS](state,value){
        state.userSettings = value;
    }
}