import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const createType = async (type) => {
    const {data} = await $authHost.post('api/category', type)
    return data
}

export const fetchTypes = async () => {
    const {data} = await $host.get('api/category')
    return data
}

export const createDevice = async (device) => {
    const {data} = await $authHost.post('api/ad', device)
    return data
}

export const fetchDevices = async (typeId, brandId, page, limit= 5) => {
    const {data} = await $host.get('api/ad', {params: {
            typeId, brandId, page, limit
        }})
    return data
}

export const fetchOneDevice = async (id) => {
    const {data} = await $host.get('api/device/' + id)
    return data
}