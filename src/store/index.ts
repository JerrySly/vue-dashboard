import { createStore } from "vuex";
import { SystemState } from "./modules/system/state";
import { UserState } from "./modules/user/state";
import {user} from "./modules/user";
import {system} from "./modules/system";
export interface RootState {
    userState: UserState,
    systemState: SystemState
}

const store  = createStore({
    modules:{
        user,
        system
    }
})