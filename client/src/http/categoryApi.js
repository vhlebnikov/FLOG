import {$authHost, $host} from "./index";

export const addCategory = async (category) => {
    const {data} = $authHost.post('api/category/cat', category)
    return data
}

export const addSubCategory = async (id, subCategory) => {
    const {data} = $authHost.post('api/category/sub/' + id, subCategory)
    return data
}

export const addSubSubCategory = async (id, subSubCategory) => {
    const {data} = $authHost.post('api/category/subsub/' + id, subSubCategory)
    return data
}

export const deleteCategory = async (id) => {
    const {data} = $authHost.delete('api/category/cat/' + id)
    return data
}

export const deleteSubCategory = async (id) => {
    const {data} = $authHost.delete('api/category/sub/' + id)
    return data
}

export const deleteSubSubCategory = async (id) => {
    const {data} = $authHost.delete('api/category/subsub/' + id)
    return data
}

export const updateCategory = async (id, name) => {
    const {data} = $authHost.put('api/category/cat/' + id, {name})
    return data
}

export const updateSubCategory = async (id, name) => {
    const {data} = $authHost.put('api/category/sub/' + id, {name})
    return data
}

export const updateSubSubCategory = async (id, name) => {
    const {data} = $authHost.put('api/category/subsub/' + id, {name})
    return data
}

export const getCategoryRoute = async (id) => {
    const {data} = $host.get('api/category/route/' + id)
    return data
}

export const getCategories = async () => {
    const {data} = $host.get('api/category/cat')
    return data
}

export const getSubCategories = async (id) => {
    const {data} = $host.get('api/category/sub/' + id)
    return data
}

export const getSubSubCategories = async (id) => {
    const {data} = $host.get('api/category/subsub/' + id)
    return data
}