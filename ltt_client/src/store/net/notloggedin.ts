import {PaStateMan} from "@/util/pa_state_man";

export function notloggedin(){
    PaStateMan.getstate().proxy_log.show_log_gui(true,true)
}