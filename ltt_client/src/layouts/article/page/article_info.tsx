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
import {ArticleInfoEdit} from "@/layouts/article/page/article_info_edit";
import {ArticleInfoView} from "@/layouts/article/page/article_info_view";


type Props = {
};
export class ArticleInfo extends PureComponent<Props> {
    componentDidMount() {
        PaStateMan.regist_comp(this,(registval, state)=>{
            registval(state.article_mode)
        })
    }
    componentWillUnmount() {
        PaStateMan.unregist_comp(this)
    }

    render() {
        const p=PaStateMan.getstate().proxy_article;
        if(p.get_cur_mode()=="edit"||p.get_cur_mode()=="create"){
            return <ArticleInfoEdit/>
        }
        return <ArticleInfoView/>
    }
}