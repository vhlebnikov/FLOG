import {$authHost, $host} from "./index";

export const addCategory = async (id, name) => {
    const {data} = await $authHost.post('api/category/' + id, {name})
    return data
}

export const deleteCategory = async (id) => {
    const {data} = await $authHost.delete('api/category/' + id)
    return data
}

export const updateCategory = async (id, name) => {
    const {data} = await $authHost.put('api/category/' + id, {name})
    return data
}

export const getCategoryRoute = async (id) => {
    const {data} = await $host.get('api/category/route/' + id)
    return data
}

export const getCategories = async (id) => {
    const {data} = await $host.get('api/category/' + id)
    return data
}