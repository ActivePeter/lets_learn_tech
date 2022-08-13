// import {CourceStoreProxy, Course} from "@/store/course_list";

import {AllTags} from "@/store/models/tag";
import {LogProxy} from "@/store/log";
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
    }
    proxy_log
    constructor(private state:PaState) {
        this.proxy_log=new LogProxy(state)
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
    logged_token="";
    logged_uid=-1;


    constructor() {
    }
}