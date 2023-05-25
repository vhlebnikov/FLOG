import {makeAutoObservable} from "mobx";

export default class FilterStore {
    constructor() {
        this._activePage = 1
        this._pageLimit = 12
        this._category = null
        makeAutoObservable(this)
    }


    get activePage() {
        return this._activePage;
    }

    setActivePage(value) {
        this._activePage = value;
    }

    get pageLimit() {
        return this._pageLimit;
    }

    setPageLimit(value) {
        this._pageLimit = value;
    }

    get category() {
        return this._category;
    }

    setCategory(value) {
        this._category = value;
    }
}