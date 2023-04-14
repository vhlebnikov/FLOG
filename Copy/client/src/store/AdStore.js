import {makeAutoObservable} from "mobx";

export default class AdStore {
    constructor() {
        this._types = [
            {id: 1, name:"c1"},
            {id: 2, name:"c2"},
            {id: 3, name:"c3"}
        ]
        this._ads = []
        this._categories = [
            {id: 1, name:"c1"},
            {id: 2, name:"c2"},
            {id: 3, name:"c3"}
        ]
        this._subCategories = [
            {id: 1, name:"sc1"},
            {id: 1, name:"sc2"},
            {id: 1, name:"sc3"}
        ]
        this._subsubCategories = [
            {id: 1, name:"ssc1"},
            {id: 1, name:"ssc2"},
            {id: 1, name:"ssc3"}
        ]
        makeAutoObservable(this)
    }


    get types() {
        return this._types;
    }

    get categories() {
        return this._categories
    }

    setCategories(value) {
        this._category = value;
    }

    get ads() {
        return this._ads;
    }

    setAds(value) {
        this._ads = value;
    }
}