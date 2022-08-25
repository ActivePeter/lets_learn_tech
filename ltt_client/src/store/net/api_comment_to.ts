import axios from "axios";
import {BaseUrl} from "@/store/net/baseurl";
import {Notify} from "@/util/notify";
import {UserBasicInfo} from "@/store/models/user";
import {Article} from "@/store/models/article";
import {PaState} from "@/store/pastate";
import {PaStateMan} from "@/util/pa_state_man";
import {Comment} from "@/store/models/comment";
import {tokeninvalid} from "@/store/net/tokeninvalid";
import {notloggedin} from "@/store/net/notloggedin";
//
// interface ArticleNewResponse{
//     articleid:number
// }

export function api_comment_to(
    content:string,
    to_comment_or_article:boolean,
    to_cid:number,
    aid:number,
):
    Promise<undefined>|Promise<{cid:number}>{
    async function _undefined(){
        return undefined
    }

    const token=PaStateMan.getstate().proxy_log.get_logged_token()
    if(token==""){
        notloggedin();
        return _undefined()
    }
    const uid= PaStateMan.getstate().proxy_log.get_logged_basic().uid
    return axios.post(BaseUrl+"comment_to",{
        content,to_comment_or_article,to_cid,aid,uid,token
    }).then((res)=>{
        return res.data
    }).catch((e)=>{
        if(e?.response?.data=="token_invalid"){
            tokeninvalid();
            return undefined;
        }
        console.log(e)
        // "notfound"
        return undefined
    })
}