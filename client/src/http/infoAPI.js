import {$host} from "./index";

export const getInfo = async (id) => {
    const {data} = await $host.get('api/info/' + id)
    console.log(data)
    return data
}