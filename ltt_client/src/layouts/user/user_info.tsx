import {PureComponent} from "react";
import {Box} from "@mui/joy";
import {curstyle} from "@/theme/curtheme";
import {PaStateMan} from "@/util/pa_state_man";
import {UserBasicInfo} from "@/store/models/user";
import styled from "@emotion/styled";
type Props = {
    uid:number
};
export class UserInfoComp extends PureComponent<Props> {
    componentDidMount() {
    }
    componentWillUnmount() {
    }
    state={
        userinfo:undefined as (UserBasicInfo|undefined)
    }
    render() {
        if(this.props.uid==-1){
            return;
        }
        if(this.state.userinfo==undefined){
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
            return undefined
        }
        const Span=styled.span`
          color: ${curstyle().colors.font_second};
        `
        return (
            <Span>
                {this.state.userinfo.username}
            </Span>
        );
    }
}