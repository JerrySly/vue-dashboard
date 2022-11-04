import { createDbTag, getMyDbTags, removeDbTag } from "../database/tags"

export const createTag = async (tag: Tag): Promise<Tag | AppError> => {
    const result = await createDbTag(tag);
    return result?? {
        message: "Tag with this name already exist"
    }
}

export const removeTag = async (tag:Tag):Promise<Boolean | AppError> => {
    const result = await removeDbTag(tag)
    return result? result:{
        message: "This tag is not exist"
    }
}

export const getMyTags = async (userId:string):Promise<Tag[] | AppError> => {
    const result = await getMyDbTags(userId);
    return result?? {
        message: "You don't have tags collection"
    }
}