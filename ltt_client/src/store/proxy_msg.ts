import {PaState} from "@/store/pastate";


export class MsgProxy{
    inner:InnerPaState
    constructor(state:PaState) {
        this.inner=new InnerPaState(state)
    }

}

class InnerPaState{
    constructor(private state:PaState) {
    }
    get msg_small_view_show(){
        return this.state.msg_small_view_show
    }
    set msg_small_view_show(s){
        this.state.msg_small_view_show=s
    }
    get msg_list(){
        return this.state.msg_list
    }
    set msg_list(s){
        this.state.msg_list=s
    }
}