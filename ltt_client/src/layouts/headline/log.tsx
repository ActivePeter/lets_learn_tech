import {Fragment, PureComponent} from "react";
import {Box} from "@mui/joy";
import {TextBtn} from "@/layouts/reusable/textbtn";
import {curstyle} from "@/theme/curtheme";
import {PaStateMan} from "@/util/pa_state_man";
import reuse from "@/assets/reuseable.less";

type Props = {};

export class HeadLineLogPart extends PureComponent<Props> {
    componentDidMount() {
        PaStateMan.regist_comp(this,(registval , state)=>{
            registval(state.logged_uid,()=>{
                //获取user info
            })
        })
    }
    componentWillUnmount() {
    }
    render() {
        const logp=PaStateMan.getstate().proxy_log;
        const inside=logp.get_logged_uid()==-1?(
            <Fragment>
                <TextBtn activecolor={curstyle().colors.main_s}
                         hovercolor={curstyle().colors.main_l}
                         color={curstyle().colors.main_s}
                         onClick={() => {
                             logp.show_log_gui(true,true)
                         }
                         }
                >
                    登录
                </TextBtn>
                <TextBtn activecolor={curstyle().colors.main_s}
                         hovercolor={curstyle().colors.main_l}
                         color={curstyle().colors.main_s}
                         onClick={() => {
                             logp.show_log_gui(true,false)
                         }
                         }
                >
                    注册
                </TextBtn>
            </Fragment>
        ):undefined;
        return <Box
            className={reuse.flex_secondaxis_align_center+" "
                +reuse.row_flexcontainer
            }
            sx={{
                height:"100%",
                paddingRight:curstyle().gap.common,
                gap:curstyle().gap.common,
            }}
        >
            {/*<Box sx={{}}>*/}
            {inside}
            {/*</Box>*/}
        </Box>
    }
}