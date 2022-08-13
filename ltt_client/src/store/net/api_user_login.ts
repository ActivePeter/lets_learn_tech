import {CreateUserRequest} from "@/store/models/user";
import axios from "axios";
import {BaseUrl} from "@/store/net/baseurl";
import {Notify, NotifyTypes} from "@/util/notify";
import {PaStateMan} from "@/util/pa_state_man";
// import {apiProxy} from "@/store/net/proxy";
export interface UserLoginResponse{
    token:string
}
export function api_user_login(name:string,pw:string){
    const failtitle="登录请求失败"
    // console.log(apiProxy)
    axios.post(BaseUrl+"user_login", {
        name_or_email:name,
        password:pw,
        verify:""
    }).then((res)=>{
        if(res.status==200){
            Notify.common("success","登录成功","")
            PaStateMan.getstate().proxy_log.log_succ(res.data)
        }else{
            console.log("fail",res)
            Notify.warn(failtitle,res.toString())
        }
    }).catch((e)=>{
        console.log(e?.response)
        // let var=
        let matches=[
            ["wronginfo","用户名或密码错误"],
        ]
        for(const key in matches){
            const v=matches[key]
            if(e?.response?.data==v[0]){
                Notify.warn(failtitle,v[1])
                return
            }
        }

        {

            Notify.warn(failtitle,e.toString())
        }
    })
}