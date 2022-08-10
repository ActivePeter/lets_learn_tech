import {PaState} from "@/store/pastate";
import {CreateUserRequest} from "@/store/models/user";
import {api_user_create} from "@/store/net/api_user_create";
import {Notify} from "@/util/notify";

export class LogProxy{
    check_registable_thenregist(regivars:{
        email:string,
        username:string,
        pw:string,
        pw2:string,
        verify:string,
    }){
        //邮箱
        //用户名
        //密码
        if(regivars.pw.length<8){
            Notify.warn("注册信息填写","密码长度至少8位")
            return
        }
        if(regivars.pw==regivars.pw2){
            Notify.warn("注册信息填写","两次密码输入不同")
            return
        }
        //验证码

        api_user_create(new CreateUserRequest(
            regivars.email,
            regivars.pw,
            regivars.verify,
            regivars.username))
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