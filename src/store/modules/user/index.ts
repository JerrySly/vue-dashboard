import {CommitOptions, DispatchOptions, Module, Store as VuexStore } from "vuex"
import { RootState } from "../..";
import { actions,UserActions } from "./actions"
import { mutations,UserMutations } from "./mutations"
import { state,UserState } from "./state"
export type UserStore<S=UserState> = Omit<VuexStore<S>,'getters' | "commit" | 'dispatch'>
&{
    commit<K extends keyof UserMutations, P extends Parameters<UserMutations[K]>[1]>(
        key: K,
        payload: P,
        oprions?: CommitOptions
    ):ReturnType<UserMutations[K]>
} & {
    dispatch<K extends keyof UserActions>(
        key: K,
        payload: Parameters<UserActions[K]>[1],
        options?: DispatchOptions
    ):ReturnType<UserActions[K]>
};

export const user: Module<UserState, RootState> = {
    state,
    actions,
    mutations
}