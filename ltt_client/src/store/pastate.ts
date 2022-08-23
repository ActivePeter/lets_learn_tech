// import {CourceStoreProxy, Course} from "@/store/course_list";

import {AllTags} from "@/store/models/tag";
import {LogProxy} from "@/store/proxy_log";
import {Article, ArticleMap} from "@/store/models/article";
import {ArticleProxy} from "@/store/proxy_article";
import {UserProxy} from "@/store/proxy_user";
import {TagProxy} from "@/store/proxy_tag";
export interface IProxy{
    first_load():void
}
export class PaStateProxy implements IProxy{
    addcnt(){
        this.state.cnt++;
    }
    get cnt(){
        return this.state.cnt
    }
    set cnt(cnt){}
    first_load(){
        this.proxy_log.first_load()
        this.proxy_tag.first_load()
    }

    proxy_article
    proxy_log
    proxy_user
    proxy_tag
    constructor(private state:PaState) {
        this.proxy_log=new LogProxy(state)
        this.proxy_article=new ArticleProxy(state)
        this.proxy_user=new UserProxy(state)
        this.proxy_tag=new TagProxy(state)
    }
}
export class PaState{
    cnt=0;

    //tag
    tags=AllTags.pre()

    //log
    log_gui_show=false;
    log_gui_log_or_regi=true;
    //logged
    logged_token="";//用于权限请求
    logged_uid=-1;//当前登入用户记录
    logged_basicinfo={}

    //article
    article=Article.emptu()
    article_mode=""
    preview_articles:number[]=[]
    // article_map:{}={}

    constructor() {
    }
}