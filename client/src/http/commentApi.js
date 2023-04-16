import {$authHost, $host} from "./index";

export const addComment = async (id, text) => {
    const {data} = $authHost.post('api/comment/' + id, {text})
    return data
}

export const getAllComments = async () => {
    const {data} = $host.get('api/comment')
    return data
}

export const deleteComment = async (id) => {
    const {data} = $authHost.delete('api/comment/' + id)
    return data
}