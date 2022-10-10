import { AppError } from "../../../models";

export interface SystemState {
    error: AppError | null
}

export const state:SystemState = {
    error: null
} 