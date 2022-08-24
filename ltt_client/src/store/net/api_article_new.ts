import axios from "axios";
import {BaseUrl} from "@/store/net/baseurl";
import {Notify} from "@/util/notify";
import {UserBasicInfo} from "@/store/models/user";
import {Article} from "@/store/models/article";
import {PaState} from "@/store/pastate";
import {PaStateMan} from "@/util/pa_state_man";

export function api_article_new(
    tags: number[],
    content: string,
    preview: string,
    title: string,
):
    Promise<undefined>|Promise<{ articles:Article[] }>{
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
        tags,content,preview,title,token,uid
    })
    return axios.post(BaseUrl+"article_new",{
        tags,content,preview,title,token,uid
    }).then((res)=>{
        return res.data
    }).catch((e)=>{
        // const failtitle="文章获取失败"
        // console.log(e?.response)
        // // let var=
        // let matches=[
        //     ["notfound",""],
        // ]
        // for(const key in matches){
        //     const v=matches[key]
        //     if(e?.response?.data==v[0]){
        //         // Notify.warn(failtitle,v[1])
        //         return undefined
        //     }
        // }
        return undefined
    })
}