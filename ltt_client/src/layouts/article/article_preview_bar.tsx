import {Fragment, PureComponent} from "react";
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
import {UserBasicInfo} from "@/store/models/user";
import {TagSetComp} from "@/layouts/tag/tag_set";
import {TagComp} from "@/layouts/tag/tag";

type Props = {
    articleid:number
};
export class ArticlePreviewBar extends PureComponent<Props> {

    state={
        authorbasic:undefined
    }
    render() {
        const logp=PaStateMan.getstate().proxy_log;
        const articlep=PaStateMan.getstate().proxy_article;
        const tagp=PaStateMan.getstate().proxy_tag;
        const articledetail=articlep.article_map.getbyid(
            this.props.articleid)
        if(this.state.authorbasic==undefined&&articledetail
        ){
            PaStateMan.getstate().proxy_user
                .lazy_get_user_basic(articledetail.author_id,
                    (res)=>{
                    if(res!=undefined){
                        this.setState({
                            authorbasic:res
                        })
                    }
                })
        }
        const authorbasic:undefined|UserBasicInfo=this.state.authorbasic
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
                {articledetail!=undefined?
                    (
                        <Box
                            className={reuse.col_flexcontainer}
                            sx={{
                            padding:curstyle().gap.common,
                            gap:curstyle().gap.m,
                        }}>
                            <Typography
                                className={reuse.cursorhand}
                                level="h5">
                                {articledetail.title}
                            </Typography>
                            <Box sx={{
                                color:curstyle().colors.font_main2,
                                fontSize:curstyle().fontsize.s
                            }}>
                                {articledetail.content}
                            </Box>
                            <Box
                                className={reuse.row_flex2side_container}
                                sx={{color:curstyle().colors.gray_dd,
                                fontSize:curstyle().fontsize.s
                                }}
                            >
                                <Box>发布者 {authorbasic?
                                    authorbasic.username
                                    :articledetail.author_id} <br/>编辑于 {articledetail.edit_time}</Box>
                            </Box>
                                <Box
                                    className={reuse.row_flexcontainer}
                                    sx={{
                                        gap:curstyle().gap.common
                                    }}
                                >

                                    {articledetail.tag_ids.map((id)=>{
                                        const find=tagp.findtag(id)
                                        if(find){
                                            return <TagComp tagname={find.tag_name}/>
                                        }else{
                                            return undefined
                                        }
                                    })
                                    }
                                </Box>
                        </Box>
                    )
                    :undefined}
            </Box>
        );
    }
}