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
import {ArticleBody} from "@/layouts/article/page/article_body";
import {CommentBody} from "@/layouts/article/page/comment_body";
import {ArticleViewRoot} from "@/pages/article/$id";

type Props = {
    root:ArticleViewRoot
};
export class ArticleView extends PureComponent<Props> {
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
                sx={{
                    padding:curstyle().gap.xxl
                }}
            >

                <Box
                    sx={{
                        border:"1px solid "+curstyle().colors.gray_common,
                        borderRadius:curstyle().radius.common,
                        background:curstyle().colors.gray_common,
                    }}
                >
                    <ArticleBody root={this.props.root}/>
                    {/*<CommentBody/>*/}
                    {/*{this.props.tagname}*/}
                </Box>
            </Box>
        );
    }
}