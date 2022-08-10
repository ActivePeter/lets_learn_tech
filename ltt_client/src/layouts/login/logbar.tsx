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

type Props = {

};
export class LogBar extends PureComponent<Props> {
    render() {
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
                        <Input1/>
                        <Input1/>
                        <Box
                            sx={{
                                gap:curstyle().gap.common
                            }}
                            className={reuse.row_flexcontainer_reverse+" "
                            +reuse.flex_secondaxis_align_center
                        }>
                            <Button>
                                获取验证码
                            </Button>
                            <Box
                                className={reuse.fillleft_flex}
                                sx={{
                                    width:"70px",
                                    // background:curstyle().colors.main_s
                                }}
                            >
                                <Input1/>
                            </Box>
                        </Box>
                        <Button
                        >
                            注册
                        </Button>
                        <Box
                            sx={{
                                gap:curstyle().gap.common
                            }}
                            className={reuse.row_flex2side_container+" "
                                +reuse.flex_secondaxis_align_center
                            }>
                            <TextBtn activecolor={curstyle().colors.main_s}
                                     hovercolor={curstyle().colors.main_l}
                                     color={curstyle().colors.main_s}>
                                {'< 返回'}
                            </TextBtn>
                            <TextBtn activecolor={curstyle().colors.main_s}
                                     hovercolor={curstyle().colors.main_l}
                                     color={curstyle().colors.main_s}>
                                已有账号，前往登录
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