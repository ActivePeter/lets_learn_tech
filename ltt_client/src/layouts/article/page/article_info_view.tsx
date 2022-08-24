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
import {TagSetCompNoWrap} from "@/layouts/tag/tag_set_nowrap";
import {UserBasicInfo} from "@/store/models/user";
import {RouteControl} from "@/store/route_control";


type Props = {
};
export class ArticleInfoView extends PureComponent<Props> {
    componentWillMount()  {
        PaStateMan.regist_comp(this,(registval, state)=>{
            registval(state.article)
        })
        const articlep=PaStateMan.getstate().proxy_article
        articlep.clear_cur_article();
        articlep.sync_info_in_path();
        articlep.fetch_article_if_id_ok()
    }
    componentWillUnmount() {
        PaStateMan.unregist_comp(this)
    }
    state={
        userinfo:undefined
    }
    render() {
        const logp=PaStateMan.getstate().proxy_log;
        const SetWrapper=styled.div``
        const articlep=PaStateMan.getstate().proxy_article
        const article=PaStateMan.getstate().proxy_article.get_cur_article()
        if(!article){
            return undefined
        }
        const editable=article.author_id==logp.get_logged_basic().uid
        let authorname:string|undefined
        let userinfo=this.state.userinfo as UserBasicInfo|undefined;
        if(userinfo!=undefined){
            authorname=userinfo.username
        }else{
            PaStateMan.getstate().proxy_user.lazy_get_user_basic(article.author_id,
                (res,)=>{
                if(res){
                    this.setState({
                        userinfo:res
                    })
                }
            })
        }
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
                        const at=articlep.get_cur_article()
                        if(at){
                            RouteControl.replace_article_edit(at.id)
                            articlep.sync_info_in_path()
                        }
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
                    <Box
                        sx={{paddingLeft:curstyle().gap.common}}
                    >

                        {article.title}</Box>
                </SetWrapper>
                <SetWrapper>



                    <Typography
                        level="h6"
                        sx={{
                            fontWeight: curstyle().fontweight.bold,
                            paddingBottom: curstyle().gap.common,

                        }}
                    >
                        作者
                    </Typography>
                    <Box
                        sx={{paddingLeft:curstyle().gap.common}}
                    >
                        {authorname}</Box>
                </SetWrapper>
                {article.tag_ids.length>0?<SetWrapper>
                    <Typography
                        level="h6"
                        sx={{
                            fontWeight: curstyle().fontweight.bold,
                            paddingBottom: curstyle().gap.common,

                        }}
                    >
                        标签
                    </Typography>
                    <Box
                        sx={{paddingLeft:curstyle().gap.common}}
                    >

                        <TagSetCompNoWrap tags={article.tag_ids.map((id) => {
                            const find = PaStateMan.getstate().proxy_tag.findtag(id)
                            if (find) {
                                return find
                            } else {
                                return undefined
                            }
                        })}/>
                    </Box>
                </SetWrapper>:undefined}
            </Box>
        );
    }
}