import { createStore } from "vuex";
import { UserState } from "./modules/user/state";
import {user, UserStore} from "./modules/user";
import {system, SystemStore} from "./modules/system";
import { SystemState } from "./modules/system/state";
export interface RootState {
    user: UserState,
    system: SystemState
}

export type Store = UserStore<Pick<RootState,'user'>> & SystemStore<Pick<RootState, 'system'>>

export const store  = createStore({
    modules:{
        user,
        system
    }
})

export function useStore():Store {
    return store as Store
}