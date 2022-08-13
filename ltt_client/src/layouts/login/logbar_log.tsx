import {Fragment, PureComponent} from "react";
import {Box} from "@mui/joy";
import style from "@/layouts/login/logfloat.less";
import {curstyle} from "@/theme/curtheme";
import {Logo} from "@/layouts/reusable/logo/logo";
import reuse from "@/assets/reuseable.less"
import {Input1} from "@/layouts/reusable/input";
import {TextField} from "@mui/joy";
// import InputUnstyled from "@mui/base/InputUnstyled";
import Button from "@mui/joy/Button";
import {TextBtn} from "@/layouts/reusable/textbtn";
import {PaStateMan} from "@/util/pa_state_man";

type Props = {

};
export class LogBarLog extends PureComponent<Props> {
    loginfo={
        email:"",
        pw:""
    }
    render() {
        return <Fragment>
            <Input1  placeholder={"邮箱/用户名"}
               onChange={(e:any)=>{
                   this.loginfo.email=e.target.value}}
            />
            <Input1 placeholder={"密码"}
                onChange={(e:any)=>{
                    this.loginfo.pw=e.target.value}}
            />
            <Button
                onClick={()=>{
                    PaStateMan.getstate().proxy_log
                        .check_logable_thenlog(this.loginfo.email,this.loginfo.pw)
                }}
            >
                登录
            </Button>
        </Fragment>
    }
}