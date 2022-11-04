import { createStore } from "vuex";
import { UserState } from "./modules/user/state";
import {user, UserStore} from "./modules/user";
import {system, SystemStore} from "./modules/system";
import { SystemState } from "./modules/system/state";
import { projects,ProjectStore } from "./modules/projects";
import { ProjectsState } from "./modules/projects/state";
import { TagState } from "./modules/tags/state";
import { tags,TagStore } from "./modules/tags";
export interface RootState {
    user: UserState,
    system: SystemState,
    projects: ProjectsState,
    tags: TagState
}

export type Store = UserStore<Pick<RootState,'user'>> & SystemStore<Pick<RootState, 'system'>> 
& ProjectStore<Pick<RootState,'projects'>> & TagStore<Pick<RootState,'tags'>>

export const store  = createStore({
    modules:{
        user,
        system,
        projects,
        tags
    }
})

export function useStore():Store {
    return store as Store
}