import {PureComponent} from "react";
import {Box} from "@mui/joy";
import {curstyle} from "@/theme/curtheme";
import style from "./logfloat.less"
import {LogBar} from "@/layouts/login/logbar";
import reuse from "@/assets/reuseable.less"
import {PaStateMan} from "@/util/pa_state_man";

type Props = {};

export class LogFloat extends PureComponent<Props> {
    componentDidMount() {
        PaStateMan.regist_comp(this, (registval, state) => {
            registval(state.log_gui_show)
        })
    }

    componentWillUnmount() {
        PaStateMan.unregist_comp(this)
    }

    render() {
        const logp = PaStateMan.getstate().proxy_log;
        // if(logp.get_logshowing()){
        return (
            <Box
                className={style.logfloat + " "
                    + reuse.col_flexcontainer
                }
                sx={{
                    display: logp.get_logshowing() ? undefined : "none",
                    fontSize: curstyle().fontsize.s,
                    background: curstyle().colors.main_halfopa,
                    borderRadius: curstyle().radius.common,
                    padding: curstyle().gap.mmm
                }}
            >
                <LogBar></LogBar>
            </Box>
        );
        // }else{
        //     return undefined
        // }
    }
}