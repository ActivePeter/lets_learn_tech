import axios from "axios";
import {BaseUrl} from "@/store/net/baseurl";
import {Notify} from "@/util/notify";
import {UserBasicInfo} from "@/store/models/user";
import {Article} from "@/store/models/article";
import {PaState} from "@/store/pastate";
import {PaStateMan} from "@/util/pa_state_man";
import {Comment} from "@/store/models/comment";
//
// interface ArticleNewResponse{
//     articleid:number
// }

export function api_comments_getofarticle(
    id: number ,
):
    Promise<undefined>|Promise<{comments:Comment[]}>{

    return axios.post(BaseUrl+"comments_getofarticle",{
        id
    }).then((res)=>{
        return res.data
    }).catch((e)=>{
        // "notfound"
        return undefined
    })
}