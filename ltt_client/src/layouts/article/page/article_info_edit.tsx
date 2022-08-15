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
import styled from "@emotion/styled";
import {TagSetsComp} from "@/layouts/tag/tagsets_in_controlpanel";


type Props = {
};
export class ArticleInfoEdit extends PureComponent<Props> {
    render() {
        const logp=PaStateMan.getstate().proxy_log;
        const SetWrapper=styled.div`
          
        `
        return (
            <Box
                className={reuse.col_flexcontainer}
                sx={{
                padding:curstyle().gap.xxl,
                gap:curstyle().gap.xxl
            }}>
                <Button
                    sx={{
                        width:"100%"
                    }}
                >
                    提交并创建文章
                </Button>
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
                    输入标题
                </SetWrapper>
                <SetWrapper>
                    <Typography
                        level="h6"
                        sx={{
                            fontWeight: curstyle().fontweight.bold,
                            paddingBottom: curstyle().gap.common,

                        }}
                    >
                        选择标签
                    </Typography>
                    <TagSetsComp/>
                </SetWrapper>
            </Box>
        );
    }
}