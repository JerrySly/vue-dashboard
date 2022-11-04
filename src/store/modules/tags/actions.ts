import { ActionContext, ActionTree } from "vuex";
import { RootState } from "../..";
import { AppError, Tag } from "../../../models";
import { createProject } from "../../../services/projectService";
import { createTag, getMyTags, removeTag } from "../../../services/tagService";
import { SystemActionTypes } from "../system/actions-types";
import { UserMutations } from "../user/mutations";
import { TagActionTypes } from "./actions-types";
import { TagMutations } from "./mutations";
import { TagMutationTypes } from "./mutations-types";
import { TagState } from "./state";
type AugmentedActionContext = {
  commit<K extends keyof TagMutations>(
    key: K,
    payload: Parameters<TagMutations[K]>[1]
  ): ReturnType<TagMutations[K]>;
} & Omit<ActionContext<TagState, RootState>, "commit">;

export interface TagActions {
  [TagActionTypes.GET_TAGS](
    { commit, dispatch }: AugmentedActionContext,
    payload: {
      userId: String;
    }
  ): void;
  [TagActionTypes.CREATE_TAG](
    { dispatch }: AugmentedActionContext,
    payload: {
      tag: Tag;
    }
  ): void;
  [TagActionTypes.REMOVE_TAG](
    { dispatch }: AugmentedActionContext,
    payload: {
      tag: Tag;
    }
  ): void;
}

export const actions: ActionTree<TagState, RootState> & TagActions = {
  async [TagActionTypes.CREATE_TAG]({ dispatch }, payload) {
    const result = await createTag(payload.tag);
    if ((result as AppError).message) {
      dispatch(SystemActionTypes.SET_ERROR, result);
    } else
      dispatch(TagActionTypes.GET_TAGS, {
        userId: payload.tag.userId,
      });
  },
  async [TagActionTypes.GET_TAGS]({ commit, dispatch }, payload) {
    const result = await getMyTags(payload.userId);
    if ((result as AppError).message) {
      dispatch(SystemActionTypes.SET_ERROR, result);
    } else commit(TagMutationTypes.SET_MY_TAGS, result as Tag[]);
  },
  async [TagActionTypes.REMOVE_TAG]({ dispatch }, payload) {
    const result = await removeTag(payload.tag);
    if ((result as AppError).message) {
      dispatch(SystemActionTypes.SET_ERROR, result);
    } else
      dispatch(TagActionTypes.GET_TAGS, {
        userId: payload.tag.userId,
      });
  },
};
