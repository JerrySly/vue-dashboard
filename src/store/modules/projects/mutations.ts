import { MutationTree } from "vuex";
import { Project } from "../../../models";
import { ProjectsMutationsTypes } from "./mutations-types";
import { ProjectsState } from "./state";


export type ProjectsMutations<S=ProjectsState> = {
    [ProjectsMutationsTypes.SET_CURRENT_PROJECT](state:S,value:Project):void,
    [ProjectsMutationsTypes.SET_MY_PROJECTS](state:S,value:Array<Project>):void
}

export const mutations: MutationTree<ProjectsState> & ProjectsMutations = {
    [ProjectsMutationsTypes.SET_CURRENT_PROJECT](state,value){
        state.currentProject = value;
    },
    [ProjectsMutationsTypes.SET_MY_PROJECTS](state,value){
        state.myProjects = value;
    }

}