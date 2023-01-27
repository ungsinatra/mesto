class UserInfo{
    constructor({name,about,avatar}){
        this._name = name;
        this._about = about;
        this._avatar = avatar;
    }

    getUserInfo(){
        return {
            
            name:this._name.textContent,
            about:this._about.textContent,
            avatar:this._avatar.src
        }
    }
    setUserInfo({name,about,avatar}){
        this._name.textContent = name;
        this._about.textContent = about;
        this._avatar.src = avatar
    }
}
export {UserInfo};