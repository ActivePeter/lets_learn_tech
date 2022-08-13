import {CreateUserRequest} from "@/store/models/user";
import axios from "axios";
import {BaseUrl} from "@/store/net/baseurl";
import {Notify, NotifyTypes} from "@/util/notify";
// import {apiProxy} from "@/store/net/proxy";
interface VerifyTokenResponse {
    newtoken:string
}
export function api_verify_token(uid:number,token:string):Promise<"invalid">|Promise<"expire">|Promise<VerifyTokenResponse>{
    // console.log(apiProxy)
    return axios.post(BaseUrl+"verify_token",{
        token,uid
    }).then((res)=>{
        console.log(res)
        if(res.status==200){
            return res.data
        }
        return "invalid"
    }).catch((e)=>{
        // console.log(e?.response)
        // // let var=
        let matches=[
            ["expire","登入过期，请重新登入"],
        ]
        for(const key in matches){
            const v=matches[key]
            if(e?.response?.data==v[0]){
                // Notify.warn(failtitle,v[1])
                return "expire"
            }
        }

        {
            // Notify.warn(failtitle,e.toString())
        }
        return "invalid"
    })
}