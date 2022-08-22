import yayJpg from '../assets/yay.jpg';
import index_styles from './index.less';
import reuse_styles from '../assets/reuseable.less'
import Headline from "@/layouts/headline/headline";
import ControlPanel from "@/layouts/control_panel/control_panel";
import {Box, CssVarsProvider} from "@mui/joy";
import {GlobalStyles} from '@mui/system';
import type {Theme} from '@mui/joy/styles';
// import  from "@mui/joy/styles/defaultTheme";
import {get_default_theme,bind_style_2_window} from "@/theme/default_theme";
import {curstyle} from "@/theme/curtheme";
import {Fragment, PureComponent} from "react";
import {LogFloat} from "@/layouts/login/logfloat";
import {ArticlePreviewList} from "@/layouts/article/article_preview_list";
import {PaStateMan} from "@/util/pa_state_man";

export default class HomePage extends PureComponent{
    componentDidMount() {
        PaStateMan.getstate().proxy_article
            .get_articles_with_selected_tags_for_preview()
    }

    render() {
        const headheight=curstyle().headheight
        return (
            <Fragment>
                <Box className={
                    reuse_styles.row_flexcontainer}

                     sx={{
                         height: "calc(100vh - 1px - " + headheight + ")"
                     }}
                >
                    <Box className={index_styles.control_panel}
                         sx={{
                             overflowY:"scroll"
                         }}
                    >
                        <ControlPanel/>
                    </Box>
                    <div className={index_styles.main + " " +
                        reuse_styles.fillleft_flex
                    }>
                        <ArticlePreviewList/>
                    </div>
                    {/*</div>*/}
                </Box>
            </Fragment>
        );
    }


}
