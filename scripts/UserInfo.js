import {selectors} from './index.js';

class UserInfo{
    constructor({name,decs}){
        this._name = name;
        this._decs = decs;
    }

    getUserInfo(){
        return {
            name:this._name,
            description:this._decs,
        }
    }
    setUserInfo(name,desc){
        this._name.textContent = name;
        this._decs.textContent = desc;
    }
}
export {UserInfo};