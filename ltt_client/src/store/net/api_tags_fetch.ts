import axios from "axios";
import {BaseUrl} from "@/store/net/baseurl";
import {Notify} from "@/util/notify";
import {UserBasicInfo} from "@/store/models/user";
import {Article} from "@/store/models/article";
import {TagSet} from "@/store/models/tag";

export function api_tags_fetch():
    Promise<undefined|TagSet[]>{
    // console.log({
    //     uid
    // })
// console.log(apiProxy)
    return axios.post(BaseUrl+"tags_fetch",{
    }).then((res)=>{
        const sets:TagSet[]=[]
        for (const key in res.data.group2tags){
            sets.push(new TagSet(
                key,
                res.data.group2tags[key]
            ))
        }
        return sets
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