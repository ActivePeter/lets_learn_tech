import {PaState} from "@/store/pastate";
import {UserBasicInfo} from "@/store/models/user";
import {api_user_basic_info} from "@/store/net/api_user_basic_info";

interface UserDatas{
    userbasic?:UserBasicInfo|((res:undefined|UserBasicInfo)=>void)[]
}
class UserDataMap{
    private _map:any={}
    set_userbasic(uid:number,ub?:UserBasicInfo|((res:undefined|UserBasicInfo)=>void)[]){
        let v:UserDatas|undefined=this._map["$"+uid]
        if (!v){
            this._map["$"+uid]={}
            v=this._map["$"+uid]
        }
        if(v){
            v.userbasic=ub
        }
    }
    get_userdatas(uid:number):undefined|UserDatas{
        return this._map["$"+uid]
    }
}
export class UserProxy{
    usermap=new UserDataMap()
    private async fetch_user_basic(uid:number){
        console.log("fetch ub",uid)
        const cbs: ((res: UserBasicInfo | undefined) => void)[]=[]
        this.usermap.set_userbasic(uid,cbs)
        const res =await api_user_basic_info(uid)
        cbs.forEach((v)=>{
            v(res)
        })
        //有结果了，返回给所有用户
        if(res){
            this.usermap.set_userbasic(uid,res)
        }else{
            this.usermap.set_userbasic(uid,undefined)
        }
        return res
    }
    lazy_get_user_basic(uid:number,
                              cb:(res:undefined|UserBasicInfo)=>void){
        const user=this.usermap.get_userdatas(uid)
        if(user?.userbasic&&!(user.userbasic instanceof Array)){
            return user.userbasic
        }
        if(user?.userbasic instanceof Array){
            user.userbasic.push(cb)
        }else{
            this.fetch_user_basic(uid).then((res)=>{
                cb(res)
            })
        }
    }
    constructor(private state:PaState) {
    }
}