import {PureComponent} from "react";
import {Box} from "@mui/joy";
import {curstyle} from "@/theme/curtheme";
import {PaStateMan} from "@/util/pa_state_man";
import {UserBasicInfo} from "@/store/models/user";
type Props = {
    uid:number
};
export class UserInfoComp extends PureComponent<Props> {
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    props={
        uid:-1
    }
    state={
        userinfo:undefined as (UserBasicInfo|undefined)
    }
    render() {

        PaStateMan.getstate().proxy_user
            .lazy_get_user_basic(this.props.uid,(
                res
            )=>{
            if(res){
                this.setState({
                    userinfo:res
                })
            }
        })
        if(this.state.userinfo==undefined){
            return undefined
        }
        return (
            <span>
                {this.state.userinfo.username}
            </span>
        );
    }
}