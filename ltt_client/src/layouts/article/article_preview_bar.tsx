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
import {LogBarLog} from "@/layouts/login/logbar_log";

type Props = {
};
export class ArticlePreviewBar extends PureComponent<Props> {


    render() {
        const logp=PaStateMan.getstate().proxy_log;
        return (
            <Box
                sx={{
                    // fontSize:curstyle().fontsize.s,
                    background:curstyle().colors.gray_common,
                    borderRadius:curstyle().radius.common,
                    width:"100%",
                    height:"100%",
                    // marginTop:"-100px"
                }}
            >
            </Box>
        );
    }
}