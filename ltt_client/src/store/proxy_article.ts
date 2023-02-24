import {PaState} from "@/store/pastate";
import {RouteControl} from "@/store/route_control";
import {api_articles_getwithtag} from "@/store/net/api_articles_getwithtag";
import {Article, ArticlePreview, ArticlePreviewMap} from "@/store/models/article";
import {Notify} from "@/util/notify";
import {api_article_new} from "@/store/net/api_article_new";
import {PaStateMan} from "@/util/pa_state_man";
import {api_article_getdetail} from "@/store/net/api_article_getdetail";
import {api_article_update} from "@/store/net/api_article_update";
import BraftEditor from "braft-editor";
import {api_article_delete, ArticleDeleteReq} from "@/store/net/api_generated";

export class ArticleProxy{
    article_preview_map=new ArticlePreviewMap()
    editor_state=BraftEditor.createEditorState("")
    private edit_article_state={
        rawtext:"",
        content:"",
        title:"",
    }
    edit_article_state_reset(){
        this.edit_article_state={
            rawtext:"",
            content:"",
            title:"",
        }
    }
    edit_article_change_content(rawtext:string,content:string){
        this.edit_article_state.content=content;
        this.edit_article_state.rawtext=rawtext;
    }
    edit_article_change_title(title:string){
        this.edit_article_state.title=title;
    }
    edit_article_try_update(tagselected:any,aid:number){
        if(PaStateMan.getstate().proxy_log.get_logged_uid()==-1){
            Notify.warn("请先登录或注册","")
            return;
        }
        if(this.state.article.id!=aid){
            //状态不一致
            return;
        }
        if(this.edit_article_state.title==""){
            this.edit_article_state.title=this.state.article.title
        }
        if(this.editor_state.isEmpty()){
            return;
        }
        if(this.edit_article_state.content==""){
            this.edit_article_state.content=this.editor_state.toHTML()
            this.edit_article_state.rawtext=this.editor_state.toText()
        }
        if(this.edit_article_state.rawtext==""){
            Notify.warn("内容不能为空","")
            return;
        }
        const tags=[]
        for (const k in tagselected){
            tags.push(tagselected[k])
        }
        const state=this.edit_article_state
        api_article_update(aid,
            tags,state.content, state.rawtext, state.title).then(
        (res)=>{
            if(res){
                Notify.common("success","修改文章成功","")
                RouteControl.replace_article_view(aid)
                this.sync_info_in_path()
            }
        })
    }
    edit_article_try_upload(tagselected:any){
        if(PaStateMan.getstate().proxy_log.get_logged_uid()==-1){
            Notify.warn("请先登录或注册","")
            return;
        }
        if(this.edit_article_state.title.length==0){
            Notify.warn("未填写文章标题","")
            return;
        }
        if(this.edit_article_state.rawtext.length==0){
            Notify.warn("未填写文章内容","")
            return;
        }
        const tags=[]
        for (const k in tagselected){
            tags.push(tagselected[k])
        }
        const state=this.edit_article_state
        api_article_new(tags,state.content, state.rawtext, state.title).then(
            (res)=>{
            if(res){
                Notify.common("success","创建文章成功","")
                RouteControl.replace_article_view(res.articleid)
                this.sync_info_in_path()
            }
        })
    }
    fetch_article_if_id_ok(){
        const id=this.state.article_id
        console.log("fetch_article_if_id_ok",id)
        if(id!=-1){
            api_article_getdetail(id).then((res)=>{
                console.log("article get",res)
                if(res){
                    this.state.article=res.article
                }
            })
        }
    }
    async delete_article(id:number):Promise<"needlogin" | "fail" | "succ">{
        if(PaStateMan.getstate().proxy_log.get_logged_uid()==-1){
            Notify.warn("请先登录或注册","")
            return "needlogin";
        }

        let res=await api_article_delete(new ArticleDeleteReq(
            PaStateMan.getstate().proxy_log.get_logged_token(),
            id
        ))
        if(!res||res.succ1_fail0==0){
            Notify.warn("删除失败",res?res.info:"")
            return "fail";
        }
        return "succ"
    }
    set_article_id_and_fetchwhenchange(id:number){
        if(this.state.article_id!=id){
            this.state.article_id=id
            this.fetch_article_if_id_ok();
        }
    }
    sync_info_in_path(){
        const curmode=RouteControl.get_article_mode()
        this.state.article_mode=curmode
        const id=RouteControl.get_article_id()
        this.state.article_id=id
        if(this.state.article_id==-1){
            this.state.article=Article.emptu()
        }
    }
    clear_cur_article_if_id_not_match(){
        if(this.state.article.id!=this.state.article_id){
            this.state.article=Article.emptu()
        }
    }
    get_cur_article(){
        if(this.state.article.id!=-1){
            return this.state.article
        }
        return undefined
    }
    get_cur_mode():"view"|""|"edit"|"create"{
        return this.state.article_mode
    }
    get_articles_with_selected_tags_for_preview(tags:number[]=[]){
        api_articles_getwithtag(tags).then(
            res=>{
                if(res!=undefined){
                    const preview_arts: number[]=[]
                    res.articles.forEach((v)=>{
                        this.article_preview_map.insert(v)
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