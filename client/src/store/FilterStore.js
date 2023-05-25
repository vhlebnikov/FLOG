import {makeAutoObservable} from "mobx";

export default class FilterStore {
    constructor() {
        this._category = null
        makeAutoObservable(this)
    }

    get category() {
        return this._category;
    }

    setCategory(value) {
        this._category = value;
    }
}