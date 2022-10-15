class UserInfo{
    constructor({name,desc}){
        this._name = name;
        this._decs = desc;
    }

    getUserInfo(){
        return {
            name:this._name.textContent,
            desc:this._decs.textContent,
        }
    }
    setUserInfo({name,desc}){
        this._name.textContent = name;
        this._decs.textContent = desc;
    }
}
export {UserInfo};