import {PaState} from "@/store/pastate";
import {RouteControl} from "@/store/route_control";
import {api_articles_getwithtag} from "@/store/net/api_articles_getwithtag";
import {Article, ArticleMap} from "@/store/models/article";

export class ArticleProxy{
    article_map=new ArticleMap()
    sync_info_in_title(){
        const curmode=RouteControl.get_article_mode()
        this.state.article_mode=curmode
    }
    get_cur_mode(){
        return this.state.article_mode
    }
    get_articles_with_selected_tags_for_preview(){
        api_articles_getwithtag([]).then(
            res=>{
                if(res!=undefined){
                    const preview_arts: number[]=[]
                    res.articles.forEach((v)=>{
                        this.article_map.insert(v)
                        preview_arts.push(v.id)
                    })
                    this.state.preview_articles=preview_arts
                }
            }
        )
    }
    get_preview_articles(){
        return this.state.preview_articles
    }
    constructor(private state:PaState) {
    }
}