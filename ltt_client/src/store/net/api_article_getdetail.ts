import axios from "axios";
import {BaseUrl} from "@/store/net/baseurl";
import {Notify} from "@/util/notify";
import {UserBasicInfo} from "@/store/models/user";
import {Article} from "@/store/models/article";
import {PaState} from "@/store/pastate";
import {PaStateMan} from "@/util/pa_state_man";
//
// interface ArticleNewResponse{
//     articleid:number
// }

export function api_article_getdetail(
    id: number ,
):
    Promise<undefined>|Promise<{article:Article}>{

    return axios.post(BaseUrl+"article_getdetail",{
        id
    }).then((res)=>{
        return res.data.article
    }).catch((e)=>{
        // "notfound"
        return undefined
    })
}