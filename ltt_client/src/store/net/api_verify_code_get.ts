import axios from "axios";
import {BaseUrl} from "@/store/net/baseurl";
import {Notify} from "@/util/notify";
import {PaStateMan} from "@/util/pa_state_man";

export function api_verify_code_get(email:string)
    :Promise<boolean>
{
    // const failtitle="验证码获取"
    return axios.post(BaseUrl+"verify_code_get", {
        email
    }).then((res)=>{
        if(res.status==200){
            Notify.common("success","验证码已发送，请查收","")
            return true;
        }else{
            console.log("fail",res)
            Notify.warn(res.toString(),"")
        }
        return false;
    }).catch((e)=>{
        console.log(e?.response)
        // let var=
        let matches=[
            ["sendfail","发送验证码失败，请检查邮箱是否有效"],
            ["parsefail","邮箱格式不正确"],
            ["wait","最近验证码还未过期，请使用最近验证码"],
        ]
        for(const key in matches){
            const v=matches[key]
            if(e?.response?.data==v[0]){
                Notify.warn(v[1],"")
                return false
            }
        }
        {
            Notify.warn(e.toString(),"")
        }
        return false;
    })
}