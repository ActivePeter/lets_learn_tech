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
        const failtitle="注册请求失败"
        console.log(e?.response)
        // let var=
        let matches=[
            ["space in values","输入内容中存在空格"],
            ["email exist","邮箱已存在"],
            ["wronglength","错误长度"],
            ["user exist","用户已存在"],
            ["wrong verify","验证码错误或超时"],
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