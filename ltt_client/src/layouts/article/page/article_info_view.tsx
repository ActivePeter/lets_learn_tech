import {PureComponent} from "react";
import {Box, Typography} from "@mui/joy";
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
import {TagSetsComp} from "@/layouts/tag/tagsets_in_controlpanel";
import styled from "@emotion/styled";


type Props = {
};
export class ArticleInfoView extends PureComponent<Props> {
    render() {
        const logp=PaStateMan.getstate().proxy_log;
        const SetWrapper=styled.div``
        const editable=false
        return (
            <Box
                className={reuse.col_flexcontainer}
                sx={{
                    padding:curstyle().gap.xxl,
                    gap:curstyle().gap.xxl
                }}>
                {editable?<Button
                    sx={{
                        width: "100%"
                    }}
                    onClick={() => {
                    }}
                >
                    编辑文章
                </Button>:undefined}
                <SetWrapper>
                    <Typography
                        level="h6"
                        sx={{
                            fontWeight: curstyle().fontweight.bold,
                            paddingBottom: curstyle().gap.common,

                        }}
                    >
                        标题
                    </Typography>

                </SetWrapper>
                <SetWrapper>
                    tags
                </SetWrapper>
            </Box>
        );
    }
}