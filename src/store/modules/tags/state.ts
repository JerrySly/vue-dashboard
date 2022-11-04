import { Tag } from "../../../models"

export interface TagState {
    myTags: Tag[]
}
export const state: TagState = {
    myTags: []
}