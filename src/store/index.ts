import { createStore } from "vuex";
import { UserState } from "./modules/user/state";
import {user, UserStore} from "./modules/user";
import {system, SystemStore} from "./modules/system";
import { SystemState } from "./modules/system/state";
export interface RootState {
    userState: UserState,
    systemState: SystemState
}

export type Store = UserStore<Pick<RootState,'userState'>> & SystemStore<Pick<RootState, 'systemState'>>

export const store  = createStore({
    modules:{
        user,
        system
    }
})

export function useStore():Store {
    return store as Store
}