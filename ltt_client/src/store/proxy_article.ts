import {PaState} from "@/store/pastate";
import {RouteControl} from "@/store/route_control";

export class ArticleProxy{
    sync_info_in_title(){
        const curmode=RouteControl.get_article_mode()
        this.state.article_mode=curmode
    }
    get_cur_mode(){
        return this.state.article_mode
    }
    constructor(private state:PaState) {
    }
}