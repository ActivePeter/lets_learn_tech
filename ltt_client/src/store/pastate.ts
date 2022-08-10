// import {CourceStoreProxy, Course} from "@/store/course_list";

import {AllTags} from "@/store/tag";
import {LogProxy} from "@/store/log";

export class PaStateProxy{
    addcnt(){
        this.state.cnt++;
    }
    get cnt(){
        return this.state.cnt
    }
    set cnt(cnt){}


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
    log_gui_show=true;
    log_gui_log_or_regi=true;

    constructor() {
    }
}