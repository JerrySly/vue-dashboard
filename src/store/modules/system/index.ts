import { state,SystemState } from "./state";
import {CommitOptions, DispatchOptions, Module, Store as VuexStore } from "vuex"
import { mutations,SystemMutations } from "./mutatuins";
import { actions,SystemActions } from "./actions";
import { RootState } from "../..";

export type SystemStore<S=SystemState> = Omit<VuexStore<S>,'getters' | "commit" | 'dispatch'>
& {
    commit<K extends keyof SystemMutations, P extends Parameters<SystemMutations[K]>[1]>(
        key:K,
        payload: P,
        oprions?: CommitOptions
    ):ReturnType<SystemMutations[K]>
} & {
    dispatch<K extends keyof SystemActions> (
        key: K,
        payload: Parameters<SystemActions[K]>[1],
        options?: DispatchOptions
    ): ReturnType<SystemActions[K]>
}

export const system: Module<SystemState,RootState> = {
    state,
    mutations,
    actions
}