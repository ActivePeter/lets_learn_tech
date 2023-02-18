import axios from "axios";
import {BaseUrl} from "@/store/net/baseurl";

export class ArticleDeleteReq{
   constructor(
      public token:string,
      public articleid:number
   ){}
}
export class ArticleDeleteResp{
   constructor(
      public succ1_fail0:number,
      public info:string
   ){}
}


export async function api_article_delete(
   req:ArticleDeleteReq
):Promise<ArticleDeleteResp|undefined>{
    return axios.post(BaseUrl+'article_delete',req).then((res)=>{
        return res.data
    }).catch((e)=>{
        console.log("req err",e)
        return undefined
    })
}
