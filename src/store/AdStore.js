import {makeAutoObservable} from "mobx";

export default class AdStore {
    constructor() {
        this._types = []
        this._tags = []
        this._ads = []
        makeAutoObservable(this)
    }

    setTypes(types) {
        this._types = types
    }

    setTags(tags) {
        this._tags = tags
    }

    setAds(ads) {
        this._ads = ads
    }

    get types() {
        return this._types
    }

    get tags() {
        return this._tags
    }

    get ads() {
        return this._ads
    }
}