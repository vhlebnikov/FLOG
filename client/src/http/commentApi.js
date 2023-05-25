import {$authHost, $host} from "./index";

export const addComment = async (id, text) => {
    const {data} = await $authHost.post('api/comment/' + id, {text})
    return data
}

export const getAllComments = async (id) => {
    const {data} = await $host.get('api/comment/' + id)
    return data
}

export const deleteComment = async (id) => {
    const {data} = await $authHost.delete('api/comment/' + id)
    return data
}