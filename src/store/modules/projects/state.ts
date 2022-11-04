
export interface ProjectsState {
    currentProject: Project | null,
    myProjects: Array<Project>
}

export const state: ProjectsState = {
    currentProject: null,
    myProjects: []
}