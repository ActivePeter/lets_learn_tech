import {history} from "umi";
function getUrlParams (query:string) {
    let urlParam:any = {};
    if(query){
        const paramArr = query.split('&');
        for(let i=0 ; i<paramArr.length ; i++ ){

            if(i == 0) paramArr[i] = paramArr[i].substr(1,paramArr[i].length);
            let arr = paramArr[i].split('=');
            urlParam[arr[0]] = arr[1];
        }
    }
    return urlParam;
}
function UrlParams2Suffix(params:any){
    if(Object.keys(params).length==0){
        return ""
    }
    let make="?"
    let first=true
    for (const key in params){
        if(!first){
            make+='&'
        }
        first=false;
        make+=key+'='+params[key]
    }
    return make
}
export namespace RouteControl{
    export function open_user(uid:number){
        if(window.location.pathname=="/user/"+uid||
            window.location.pathname=="/user/"+uid+'/'
        ){
            return
        }
        history.push("/user/"+uid)
    }
    export function get_article_mode():"create"|"edit"|"view"{
        const params=getUrlParams(window.location.search)
        if(params.mode=="create"){
            return "create"
        }
        if(params.mode=="edit"){
            return "edit"
        }
        return "view"
    }
    export function get_article_id():number{
        const sp=window.location.pathname.split('/');
        // console.log("get_article_id",sp)
        if(sp.length==4&&sp[2]=='article'){
            const v=parseInt(sp[3])
            if(v){
                return v
            }
        }
        return -1;
    }
    export function replace_index(){
        history.replace("/")
    }
    export function push_article_view(articleid:number){
        history.push("/article/"+articleid+"?mode=view")
    }
    export function replace_article_edit(articleid:number){
        history.replace("/article/"+articleid+"?mode=edit")
    }
    export function replace_article_view(articleid:number){
        history.replace("/article/"+articleid+"?mode=view")
    }
    export function push_create_article(){
        history.push("/article/_?mode=create")
    }
}