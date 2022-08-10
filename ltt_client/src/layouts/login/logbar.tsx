import {PureComponent} from "react";
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
import {LogBarRegi} from "@/layouts/login/logbar_regi";
import {PaState} from "@/store/pastate";
import {PaStateMan} from "@/util/pa_state_man";

type Props = {
};
export class LogBar extends PureComponent<Props> {
    componentDidMount() {
        PaStateMan.regist_comp(this,(registval,state)=>{
            registval(state.log_gui_log_or_regi)
        })
    }
    componentWillUnmount() {
        PaStateMan.unregist_comp(this)
    }

    render() {
        const logp=PaStateMan.getstate().proxy_log;
        return (
            <Box
                className={style.logbar
            }
                sx={{
                    fontSize:curstyle().fontsize.s,
                    background:curstyle().colors.white_common,
                    borderRadius:curstyle().radius.common,

                    // marginTop:"-100px"
                }}
            >
                <Box
                    className={reuse.col_flexcontainer}
                    sx={{

                        marginBottom:curstyle().gap.xxl,
                        marginTop:curstyle().gap.xxl,
                        gap:curstyle().gap.l
                    }}
                >
                    <Logo/>
                    <Box
                        className={reuse.col_flexcontainer}
                        sx={{

                            marginLeft:curstyle().gap.xxl,
                            marginRight:curstyle().gap.xxl,
                            gap:curstyle().gap.l
                        }}
                    >
                        {logp.get_log_or_regi()?undefined:<LogBarRegi/>}
                        <Box
                            sx={{
                                gap:curstyle().gap.common
                            }}
                            className={reuse.row_flex2side_container+" "
                                +reuse.flex_secondaxis_align_center
                            }>
                            <TextBtn activecolor={curstyle().colors.main_s}
                                     hovercolor={curstyle().colors.main_l}
                                     color={curstyle().colors.main_s}
                                onClick={()=>{
                                    logp.show_log_gui(false)
                                }}
                            >
                                {'< 返回'}
                            </TextBtn>
                            <TextBtn activecolor={curstyle().colors.main_s}
                                     hovercolor={curstyle().colors.main_l}
                                     color={curstyle().colors.main_s} onClick={()=>{
                                logp.switch_log_regi()
                            }
                            }>
                                {logp.get_log_or_regi()?'没有账号，前往注册':'已有账号，前往登录'}
                            </TextBtn>
                        </Box>
                    </Box>
                    {/*<PaInput/>*/}
                    {/*<TextField*/}
                    {/*    sx={{*/}
                    {/*        "&:focus":{*/}
                    {/*          outline:"1px solid #AFECAB",*/}
                    {/*            border:"1px solid #AFECAB"*/}
                    {/*        },*/}
                    {/*        marginRight:curstyle().gap.l,*/}
                    {/*        marginLeft:curstyle().gap.l,*/}
                    {/*    }}*/}

                    {/*    variant="soft"/>*/}
                    {/*<TextField*/}

                    {/*    sx={{*/}

                    {/*        marginRight:curstyle().gap.l,*/}
                    {/*        marginLeft:curstyle().gap.l,*/}
                    {/*    }}*/}
                    {/*    color="primary"*/}
                    {/*    // variant="soft"*/}
                    {/*/>*/}
                </Box>
                {/*{this.props.tagname}*/}
            </Box>
        );
    }
}