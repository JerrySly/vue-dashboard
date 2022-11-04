import { MutationTree } from "vuex";
import { Tag } from "../../../models";
import { TagMutationTypes } from "./mutations-types";
import { TagState } from "./state";

export type TagMutations<S = TagState> = {
  [TagMutationTypes.SET_MY_TAGS](state: S, value: Tag[]): void;
};

export const mutations: MutationTree<TagState> & TagMutations = {
  [TagMutationTypes.SET_MY_TAGS](state, value) {
    state.myTags = value;
  },
};
