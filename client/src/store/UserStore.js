import {makeAutoObservable} from "mobx";

export default class UserStore {
    constructor() {
        this._id = 0;
        this._isAuth = true
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool) {
        this._isAuth = bool
    }

    setUser(user) {
        this._user = user
    }

    setId(id){
        this._id = id
    }

    get isAuth() {
        return this._isAuth
    }

    get user() {
        return this._user
    }

    get id() {
        return this._id
    }
}