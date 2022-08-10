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

type Props = {

};
export class LogBarRegi extends PureComponent<Props> {
    render() {
        return <Fragment>
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
        </Fragment>
    }
}