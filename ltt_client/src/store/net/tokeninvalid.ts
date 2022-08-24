import {PaStateMan} from "@/util/pa_state_man";
import {Notify} from "@/util/notify";

export function tokeninvalid(){
    PaStateMan.getstate().proxy_log.log_out()
    Notify.warn("用户登录信息已过期","")
}