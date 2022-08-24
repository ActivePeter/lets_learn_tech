import axios from "axios";
import {BaseUrl} from "@/store/net/baseurl";
import {Notify} from "@/util/notify";
import {UserBasicInfo} from "@/store/models/user";
import {Article, ArticlePreview} from "@/store/models/article";

export function api_articles_getwithtag(tags:number[]):
    Promise<undefined>|Promise<{ articles:ArticlePreview[] }>{
    // console.log({
    //     uid
    // })
// console.log(apiProxy)
    return axios.post(BaseUrl+"articles_getwithtag",{
        tags
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