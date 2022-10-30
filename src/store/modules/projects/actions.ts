import { ActionContext, ActionTree } from "vuex";
import { RootState } from "../..";
import { AppError, Project } from "../../../models";
import { ProjectsActionTypes } from "./actions-types";
import { ProjectsMutations } from "./mutations";
import { ProjectsState } from "./state";
import {
  createProject,
  deleteProject,
  getMyProjects,
  getProjectById,
} from "../../../services/projectService";
import { SystemActionTypes } from "../system/actions-types";
import { ProjectsMutationsTypes } from "./mutations-types";
import { getProject } from "../../../database/projects";
type AugmentedActionContext = {
  commit<K extends keyof ProjectsMutations>(
    key: K,
    payload: Parameters<ProjectsMutations[K]>[1]
  ): ReturnType<ProjectsMutations[K]>;
} & Omit<ActionContext<ProjectsState, RootState>, "commit">;

export interface ProjectsActions {
  [ProjectsActionTypes.CREATE_NEW](
    { commit, dispatch }: AugmentedActionContext,
    payload: {
      name: string;
      description: string;
      creator: string;
    }
  ): Promise<Project | void>;
  [ProjectsActionTypes.GET_MY_PROJECTS](
    { commit, dispatch }: AugmentedActionContext,
    payload: {
      userId: string;
    }
  ): Promise<void>;
  [ProjectsActionTypes.OPEN_PROJECT](
    { commit, dispatch }: AugmentedActionContext,
    payload: {
      projectId: string;
    }
  ): Promise<void>;
  [ProjectsActionTypes.DELETE_PROJECT](
    {dispatch}:AugmentedActionContext,
    payload:{
      projectId:string
    }
  ):Promise<void>;
}

export const actions: ActionTree<ProjectsState, RootState> & ProjectsActions = {
  async [ProjectsActionTypes.CREATE_NEW]({ commit, dispatch }, payload) {
    const result = await createProject(
      payload.name,
      payload.description,
      payload.creator
    );
    if ((result as AppError).message != undefined) {
      await dispatch(SystemActionTypes.SET_ERROR, result);
    }
  },
  async [ProjectsActionTypes.GET_MY_PROJECTS]({ commit, dispatch }, payload) {
    const result = await getMyProjects(payload.userId);

    if ((result as AppError).message != undefined)
      dispatch(SystemActionTypes.SET_ERROR, result);
    else
      commit(ProjectsMutationsTypes.SET_MY_PROJECTS, result as Array<Project>);
  },
  async [ProjectsActionTypes.OPEN_PROJECT]({ commit, dispatch }, payload) {
    const result = await getProjectById(payload.projectId);
    if ((result as AppError).message != undefined) {
      dispatch(SystemActionTypes.SET_ERROR, result);
    } else commit(ProjectsMutationsTypes.SET_CURRENT_PROJECT, result);
  },
  async [ProjectsActionTypes.DELETE_PROJECT](
    { dispatch },
    payload: { projectId: string }
  ) {
    const result = await deleteProject(payload.projectId);
    if (!(result as AppError)?.message ) {
      dispatch(SystemActionTypes.SET_ERROR, result);
    }
  },
};
