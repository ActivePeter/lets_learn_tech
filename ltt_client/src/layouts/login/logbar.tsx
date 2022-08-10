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

                        marginBottom:curstyle().gap.common,
                        marginTop:curstyle().gap.l,
                        gap:curstyle().gap.l
                    }}
                >
                    <Logo/>
                    <Box
                        className={reuse.col_flexcontainer}
                        sx={{

                            marginLeft:curstyle().gap.common,
                            marginRight:curstyle().gap.common,
                            gap:curstyle().gap.l
                        }}
                    >
                        <Input1/>
                        <Input1/>
                        <Box
                            sx={{
                                gap:curstyle().gap.common
                            }}
                            className={reuse.row_flexcontainer_reverse}>
                            {/*<Input1*/}
                            {/*    className={reuse.fillleft_flex}*/}
                            {/*/>*/}
                            {/*<Box*/}
                            {/*    sx={{*/}
                            {/*        width:"100%",*/}
                            {/*        background:curstyle().colors.main_s*/}
                            {/*    }}*/}
                            {/*>*/}

                            {/*</Box>*/}
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

                            <TextField/>
                            {/*<Input1*/}
                            {/*    className={reuse.fillleft_flex}*/}
                            {/*/>*/}
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