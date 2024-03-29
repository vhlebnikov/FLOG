import {$authHost, $host} from "./index";

export const getAllAds = async (categoryId, price, status, substring, limit, page) => {
    const {data} = await $host.get('api/ad', {params: {categoryId, price, status, substring, limit, page}})
    return data
}

export const getOneAd = async (id) => {
    const {data} = await $host.get('api/ad/' + id)
    return data
}

export const getAdsForUser = async (id) => {
    const {data} = await $host.get('api/ad/user/' + id)
    return data
}

export const createAd = async (device) => {
    const {data} = await $authHost.post('api/ad', device)
    return data
}

export const updateAd = async (id, device) => {
    const {data} = await $authHost.put('api/ad/' + id, device)
    return data
}

export const deleteAd = async (id) => {
    const {data} = await $authHost.delete('api/ad/' + id)
    return data
}