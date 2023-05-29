import {makeAutoObservable} from "mobx";

export default class AdStore {
    constructor() {
        this._ads = []
        makeAutoObservable(this)
    }

    get ads() {
        return this._ads;
    }

    setAds(value) {
        this._ads = value;
    }
}