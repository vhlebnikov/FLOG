import {makeAutoObservable} from "mobx";

export default class FilterStore {
    constructor() {
        this._category = null
        this._status = null
        this._price = null
        this._substring = null
        makeAutoObservable(this)
    }

    get category() {
        return this._category;
    }

    setCategory(value) {
        this._category = value;
    }


    get status() {
        return this._status;
    }

    setStatus(value) {
        this._status = value;
    }

    get price() {
        return this._price;
    }

    setPrice(value) {
        this._price = value;
    }

    get substring() {
        return this._substring;
    }

    setSubstring(value) {
        this._substring = value;
    }
}