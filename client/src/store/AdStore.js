import {makeAutoObservable} from "mobx";

export default class AdStore {
    constructor() {
        this._types = [
            {id: 1, name:"c1"},
            {id: 2, name:"c2"},
            {id: 3, name:"c3"}
        ]
        this._price = [
            {id: 1, type: 1, start: 100, end: null}
        ]
        this._ads = [
            {id: 1, image: 'https://s0.rbk.ru/v6_top_pics/resized/600xH/media/img/4/99/756723917919994.webp', name: "Сибирская кошка", description: "srfsf", address: "rsgrg", user_id: 123, price_id: 1, sub_sub_category_id: 15},
            {id: 2, image: 'https://s0.rbk.ru/v6_top_pics/resized/600xH/media/img/4/28/756723915797284.webp', name: "Бенгальская кошка", description: "edrgrge", address: "rgrgrg", user_id: 3244, price_id: 2, sub_sub_category_id: 134},
            {id: 3, image: 'https://s0.rbk.ru/v6_top_pics/resized/600xH/media/img/4/97/756723916815974.webp', name: "Британская короткошерстная", description: "rsrfg", address: "rgfrgrg", user_id: 324234, price_id: 3, sub_sub_category_id: 137},
            {id: 4, image: 'https://s0.rbk.ru/v6_top_pics/resized/600xH/media/img/4/99/756723917919994.webp', name: "Сибирская кошка", description: "srfsf", address: "rsgrg", user_id: 123, price_id: 1, sub_sub_category_id: 15},
            {id: 5, image: 'https://s0.rbk.ru/v6_top_pics/resized/600xH/media/img/4/28/756723915797284.webp', name: "Бенгальская кошка", description: "edrgrge", address: "rgrgrg", user_id: 3244, price_id: 2, sub_sub_category_id: 134},
            {id: 6, image: 'https://s0.rbk.ru/v6_top_pics/resized/600xH/media/img/4/97/756723916815974.webp', name: "Британская короткошерстная", description: "rsrfg", address: "rgfrgrg", user_id: 324234, price_id: 3, sub_sub_category_id: 137},
            {id: 7, image: 'https://s0.rbk.ru/v6_top_pics/resized/600xH/media/img/4/99/756723917919994.webp', name: "Сибирская кошка", description: "srfsf", address: "rsgrg", user_id: 123, price_id: 1, sub_sub_category_id: 15},
            {id: 8, image: 'https://s0.rbk.ru/v6_top_pics/resized/600xH/media/img/4/28/756723915797284.webp', name: "Бенгальская кошка", description: "edrgrge", address: "rgrgrg", user_id: 3244, price_id: 2, sub_sub_category_id: 134},
            {id: 9, image: 'https://s0.rbk.ru/v6_top_pics/resized/600xH/media/img/4/97/756723916815974.webp', name: "Британская короткошерстная", description: "rsrfg", address: "rgfrgrg", user_id: 324234, price_id: 3, sub_sub_category_id: 137},
            {id: 10, image: 'https://s0.rbk.ru/v6_top_pics/resized/600xH/media/img/4/99/756723917919994.webp', name: "Сибирская кошка", description: "srfsf", address: "rsgrg", user_id: 123, price_id: 1, sub_sub_category_id: 15},
            {id: 11, image: 'https://s0.rbk.ru/v6_top_pics/resized/600xH/media/img/4/28/756723915797284.webp', name: "Бенгальская кошка", description: "edrgrge", address: "rgrgrg", user_id: 3244, price_id: 2, sub_sub_category_id: 134},
            {id: 12, image: 'https://s0.rbk.ru/v6_top_pics/resized/600xH/media/img/4/97/756723916815974.webp', name: "Британская короткошерстная", description: "rsrfg", address: "rgfrgrg", user_id: 324234, price_id: 3, sub_sub_category_id: 137}
        ]
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

    get prices() {
        return this._prices;
    }

    setPrices(value) {
        this._prices = value;
    }
}