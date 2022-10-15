import { CommitOptions, DispatchOptions, Module, Store as VuexStore } from "vuex";
import { RootState } from "../..";
import { actions, ProjectsActions } from "./actions";
import { mutations, ProjectsMutations } from "./mutations";
import { ProjectsState, state } from "./state";

export type ProjectStore<S=ProjectsState> = Omit<VuexStore<S>,'getters' | 'commit' | 'dispatch'>
& {
    commit<K extends keyof ProjectsMutations, P extends Parameters<ProjectsMutations[K]>[1]>(
        key: K,
        payload: P,
        options?: CommitOptions
    ): ReturnType<ProjectsMutations[K]>
} & {
    dispatch<K extends keyof ProjectsActions>(
        key: K,
        payload: Parameters<ProjectsActions[K]>[1],
        options?: DispatchOptions
    ): ReturnType<ProjectsActions[K]>
}

export const projects: Module<ProjectsState, RootState> = {
    state,
    actions,
    mutations
}