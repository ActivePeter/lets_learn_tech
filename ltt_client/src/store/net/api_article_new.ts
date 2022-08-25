import axios from "axios";
import {BaseUrl} from "@/store/net/baseurl";
import {Notify} from "@/util/notify";
import {UserBasicInfo} from "@/store/models/user";
import {Article} from "@/store/models/article";
import {PaState} from "@/store/pastate";
import {PaStateMan} from "@/util/pa_state_man";
import {tokeninvalid} from "@/store/net/tokeninvalid";
import {notloggedin} from "@/store/net/notloggedin";

interface ArticleNewResponse{
    articleid:number
}

export function api_article_new(
    tags: number[],
    content: string,
    rawtext: string,
    title: string,
):
    Promise<undefined>|Promise<ArticleNewResponse>{
    // console.log({
    //     uid
    // })
// console.log(apiProxy)
    async function _undefined(){
        return undefined
    }

    const token=PaStateMan.getstate().proxy_log.get_logged_token()
    if(token==""){
        notloggedin();
        return _undefined()
    }
    const uid= PaStateMan.getstate().proxy_log.get_logged_basic().uid
    console.log({
        tags,content,rawtext,title,token,uid
    })
    return axios.post(BaseUrl+"article_new",{
        tags,content,rawtext,title,token,uid
    }).then((res)=>{
        return res.data
    }).catch((e)=>{
        // const failtitle="文章获取失败"
        // console.log(e?.response)
        // // let var=
        if(e?.response?.data=="token_invalid"){
            tokeninvalid();
            return undefined;
        }

        return undefined
    })
}