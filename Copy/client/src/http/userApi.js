import {$authHost, $host} from "./index";
import jwt_decode from "jwt-decode";

export const registration = async (email, password, username) => {
    const {data} = await $host.post('api/user/registration', {email, password, username})
    return data
}

export const login = async (email, password) => {
    const {data} = await $host.post('api/user/login', {email, password})
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const check = async () => {
    const {data} = await $authHost.get('api/user/auth')
    localStorage.setItem('token', data.token)
    return jwt_decode(data.token)
}

export const getMyId = async () => {
    const {data} = await $authHost.get('api/user/id')
    return data
}

export const getUser = async (id) => {
    const {data} = await $host.get('api/user/' + id)
    return data
}

export const addContacts = async (contacts) => {
    const {data} = await $authHost.post('api/user/contacts', {contacts})
    return data
}

export const getContacts = async (id) => {
    const {data} = await $authHost.get('api/user/contacts' + id)
    return data
}

export const updateContacts = async (contacts) => {
    const {data} = await $authHost.put('api/user/contacts', {contacts})
    return data
}

export const deleteContacts = async () => {
    const {data} = await $authHost.delete('api/user/contacts')
    return data
}