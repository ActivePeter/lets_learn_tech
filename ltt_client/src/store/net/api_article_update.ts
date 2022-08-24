import axios from "axios";
import {BaseUrl} from "@/store/net/baseurl";
import {Notify} from "@/util/notify";
import {UserBasicInfo} from "@/store/models/user";
import {Article} from "@/store/models/article";
import {PaState} from "@/store/pastate";
import {PaStateMan} from "@/util/pa_state_man";
import {tokeninvalid} from "@/store/net/tokeninvalid";


export function api_article_update(
    aid:number,
    tags: number[],
    content: string,
    rawtext: string,
    title: string,
):
    Promise<undefined|boolean>{
    // console.log({
    //     uid
    // })
// console.log(apiProxy)
    async function _undefined(){
        return undefined
    }

    const token=PaStateMan.getstate().proxy_log.get_logged_token()
    if(token==""){
        return _undefined()
    }
    const uid= PaStateMan.getstate().proxy_log.get_logged_basic().uid
    console.log({
        tags,content,rawtext,title,token,uid
    })
    return axios.post(BaseUrl+"article_update",{
        tags,content,rawtext,title,token,uid,aid
    }).then((res)=>{
        return true
    }).catch((e)=>{
        // const failtitle="文章获取失败"
        // console.log(e?.response)
        if(e?.response?.data=="token_invalid"){
            tokeninvalid();
            return undefined;
        }
        // // let var=
        let matches=[
            ["notexist","文章不存在"],
        ]
        for(const key in matches){
            const v=matches[key]
            if(e?.response?.data==v[0]){
                Notify.warn(v[1],"")
                // PaStateMan.getstate().proxy_log.log_out()
                return undefined
            }
        }
        return undefined
    })
}