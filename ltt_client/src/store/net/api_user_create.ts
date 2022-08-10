import {CreateUserRequest} from "@/store/models/user";
import axios from "axios";
import {BaseUrl} from "@/store/net/baseurl";
import {Notify, NotifyTypes} from "@/util/notify";
// import {apiProxy} from "@/store/net/proxy";

export function api_user_create(data:CreateUserRequest){
    // console.log(apiProxy)
    axios.post(BaseUrl+"user_create",data).then((res)=>{
        console.log(res)
    }).catch((e)=>{
        Notify.warn("注册请求失败",e.toString())
    })
}