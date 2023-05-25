import {makeAutoObservable} from "mobx";

export default class AdStore {
    constructor() {
        this._ads = []
        this._sort = ''
        this._filter = ''
        this._category = null
        makeAutoObservable(this)
    }

    get category() {
        return this._category;
    }

    setCategory(value) {
        this._category = value;
    }

    get filter() {
        return this._filter;
    }

    setFilter(value) {
        this._filter = value;
    }

    get sort() {
        return this._sort;
    }

    setSort(value) {
        this._sort = value;
    }

    get ads() {
        return this._ads;
    }

    setAds(value) {
        this._ads = value;
    }
}