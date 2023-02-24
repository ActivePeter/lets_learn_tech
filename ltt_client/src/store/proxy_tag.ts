import {IProxy, PaState} from "@/store/pastate";
import {CreateUserRequest, UserBasicInfo} from "@/store/models/user";
import {api_user_create} from "@/store/net/api_user_create";
import {Notify} from "@/util/notify";
import {api_user_login, UserLoginResponse} from "@/store/net/api_user_login";
import {api_verify_token} from "@/store/net/api_verify_token";
import {api_user_basic_info} from "@/store/net/api_user_basic_info";
import {Rules} from "@/store/models/_rules";
import {api_verify_code_get} from "@/store/net/api_verify_code_get";
import {api_tags_fetch} from "@/store/net/api_tags_fetch";
import {TagInfo} from "@/store/models/tag";
import {FrequentControl} from "@/util/frequent_contol";
import {PaStateMan} from "@/util/pa_state_man";

function seltag_hashmap2arr(seltag_hashmap:any){
    let arr:number[]=[]
    for(const key in seltag_hashmap){
        arr.push(seltag_hashmap[key])
    }
    return arr
}

class LoadArticleWhenTagChanged{
    freq_ctrl=new FrequentControl()
    tag_selection_changed(seltag_hashmap:any){
        this.freq_ctrl.update(2000,()=>{
            // console.log("lets request for new tag selection",seltag_hashmap)

            PaStateMan.getstate().proxy_article
                .get_articles_with_selected_tags_for_preview(
                    seltag_hashmap2arr(seltag_hashmap)
                )
        })
    }
}

export class TagProxy implements IProxy{
    private load_article_when_tag_changed=new LoadArticleWhenTagChanged()
    constructor(private state:PaState) {
    }
    tag_selection_changed(seltag_hashmap:any,where:"mainpage"|"other"){
        if (where=="mainpage"){
            this.load_article_when_tag_changed.tag_selection_changed(seltag_hashmap)
        }
    }
    gettagset(){
        return this.state.tags.tagsets
    }
    findtag(tid:number):TagInfo|undefined{
        const sets=this.state.tags.tagsets
        for(let i=0;i<sets.length;i++){
            const set=sets[i]
            for(let j=0;j<set.tags.length;j++){
                const tag=set.tags[j]
                if(tag.tag_id==tid){
                    return tag
                }
            }
        }
    }
    first_load(): void {
        api_tags_fetch().then((res)=>{
            console.log("api_tags_fetch",res)
            if(res){
                this.state.tags.tagsets=res
            }
        })
    }
}