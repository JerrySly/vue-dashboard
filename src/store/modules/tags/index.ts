import { TagState, state } from "./state";
import { CommitOptions, DispatchOptions, Module, Store as VuexStore } from "vuex";
import { mutations, TagMutations } from "./mutations";
import { actions, TagActions } from "./actions";
import { RootState } from "../..";

export type TagStore<S=TagState> = Omit<VuexStore<S>,'getters'|'commit'|'dispatch'>
& {
    commit<K extends keyof TagMutations, P extends Parameters<TagMutations[K]>[1]>(
        key: K,
        payload: P,
        options: CommitOptions
    ): ReturnType<TagMutations[K]>
}
& {
    dispatch<K extends keyof TagActions, P extends Parameters<TagActions[K]>[1]>(
        key:K,
        payload: P,
        options?: DispatchOptions
    ): ReturnType<TagActions[K]>
}

export const tags:Module<TagState, RootState> = {
    state,
    actions,
    mutations
}