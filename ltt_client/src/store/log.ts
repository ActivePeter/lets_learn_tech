import {IProxy, PaState} from "@/store/pastate";
import {CreateUserRequest} from "@/store/models/user";
import {api_user_create} from "@/store/net/api_user_create";
import {Notify} from "@/util/notify";
import {api_user_login, UserLoginResponse} from "@/store/net/api_user_login";

export class LogProxy implements IProxy{
    check_logable_thenlog(name:string,pw:string):boolean{
        if(name.length==0){
            Notify.warn("登录信息填写","用户名为空")
            return false
        }
        if(pw.length==0){
            Notify.warn("登录信息填写","密码为空")
            return false
        }
        api_user_login(name,pw)
        return true
    }
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
        if(regivars.pw!=regivars.pw2){
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
            console.log("hide log gui")
            this.state.log_gui_show=false;
        }
    }
    switch_log_regi(){
        if(this.state.log_gui_show){
            this.state.log_gui_log_or_regi=!this.state.log_gui_log_or_regi
        }
    }
    get_logshowing(){
        console.log("get_logshowing")
        return this.state.log_gui_show
    }
    get_log_or_regi(){
        return this.state.log_gui_log_or_regi
    }
    log_succ(res:UserLoginResponse){
        // this.state.logged_token;
        this.state.log_gui_show=false
        localStorage.logged_token=res.token
        localStorage.logged_uid=res.uid

        this.state.logged_token=res.token
        this.state.logged_uid=res.uid
    }
    token_verify(){
        //验证成功后，
        this.state.logged_token=localStorage.logged_token

    }
    first_load(){
        //首次加载token，并检查token
        if(localStorage.logged_token
            &&localStorage.logged_token!=""){
            this.token_verify()
        }
    }
    constructor(private state:PaState) {
    }
}