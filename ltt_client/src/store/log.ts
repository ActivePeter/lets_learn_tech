import {PaState} from "@/store/pastate";
import {CreateUserRequest} from "@/store/models/user";
import {api_user_create} from "@/store/net/api_user_create";

export class LogProxy{
    net_regist(req:CreateUserRequest){
        api_user_create(req)
    }
    show_log_gui(show:boolean,log_or_regi?:boolean){
        if(show&&log_or_regi!=undefined){
            this.state.log_gui_log_or_regi=log_or_regi;
            this.state.log_gui_show=show;
        }else{
            this.state.log_gui_show=false;
        }
    }
    switch_log_regi(){
        if(this.state.log_gui_show){
            this.state.log_gui_log_or_regi=!this.state.log_gui_log_or_regi
        }
    }
    get_logshowing(){
        return this.state.log_gui_show
    }
    get_log_or_regi(){
        return this.state.log_gui_log_or_regi
    }
    constructor(private state:PaState) {
    }
}