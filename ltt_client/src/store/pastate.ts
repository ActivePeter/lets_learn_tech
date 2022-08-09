// import {CourceStoreProxy, Course} from "@/store/course_list";

import {AllTags} from "@/store/tag";

export class PaStateProxy{
    addcnt(){
        this.state.cnt++;
    }
    get cnt(){
        return this.state.cnt
    }
    set cnt(cnt){}
    constructor(private state:PaState) {
    }
}
export class PaState{
    cnt=0;

    tags=AllTags.pre()

    constructor() {
    }
}