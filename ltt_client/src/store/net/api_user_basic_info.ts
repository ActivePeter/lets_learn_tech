import axios from "axios";
import {BaseUrl} from "@/store/net/baseurl";
import {Notify} from "@/util/notify";
import {UserBasicInfo} from "@/store/models/user";

export function api_user_basic_info(uid:number):
    Promise<undefined>|Promise<UserBasicInfo>{
    console.log({
        uid
    })
// console.log(apiProxy)
    return axios.post(BaseUrl+"user_basic_info",{
        uid
    }).then((res)=>{
        return res.data
    }).catch((e)=>{
        const failtitle="注册请求失败"
        console.log(e?.response)
        // let var=
        let matches=[
            ["notfound",""],
        ]
        for(const key in matches){
            const v=matches[key]
            if(e?.response?.data==v[0]){
                // Notify.warn(failtitle,v[1])
                return undefined
            }
        }
        return undefined
    })
}