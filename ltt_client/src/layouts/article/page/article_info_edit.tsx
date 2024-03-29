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
import {TagSet} from "@/store/models/tag";
import {RouteControl} from "@/store/route_control";


type Props = {
};
export class ArticleInfoEdit extends PureComponent<Props> {
    // title=""
    componentWillMount(){
        PaStateMan.getstate().proxy_article.edit_article_state_reset();
        PaStateMan.regist_comp(this,(registval, state) => {
            registval(state.article)
        })
    }
componentWillUnmount() {
    PaStateMan.unregist_comp(this)
}

    render() {
        const logp=PaStateMan.getstate().proxy_log;
        const articlep=
            PaStateMan.getstate().proxy_article;
        const SetWrapper=styled.div`
          
        `

        const article=PaStateMan.getstate().proxy_article.get_cur_article()
        let pretitle=""
        let pretags=[]
        if(articlep.get_cur_mode()=="edit"){
            if(!article){
                return undefined
            }else{
                pretitle=article.title
                pretags=article.tag_ids
            }
        }
        return (
            <Box
                className={reuse.col_flexcontainer}
                sx={{
                padding:curstyle().gap.xxl,
                gap:curstyle().gap.xxl
            }}>
                <Box className={reuse.row_flexcontainer}
                    sx={{gap:curstyle().gap.common}}
                >
                    {articlep.get_cur_mode()=="edit"?
                        <Button
                            sx={{

                                flex: "1"
                                // width:"100%"
                            }}
                            onClick={()=>{
                                const at=articlep.get_cur_article()
                                if(at){
                                    RouteControl.replace_article_view(at.id)
                                    articlep.sync_info_in_path()
                                }
                            }}
                        >
                            {'<'} 取消编辑
                        </Button>:undefined
                    }

                    <Button
                        sx={{
                            flex: "1"
                            // width:"100%"
                        }}
                        onClick={()=>{
                            const ts_:TagSetsComp=this.refs.tag_select
                            if(articlep.get_cur_mode()=="edit"){
                                if(article){
                                    articlep.edit_article_try_update(
                                        ts_.seltag_hashmap,article.id
                                    )
                                }
                            }else{
                                articlep.edit_article_try_upload(
                                    ts_.seltag_hashmap
                                )
                            }
                        }}
                    >
                        {articlep.get_cur_mode()=="edit"?"提交修改":"提交并创建文章"}
                    </Button>
                </Box>
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
                    <Input1 placeholder={"输入标题"} sx={{
                        fontSize:curstyle().fontsize.l
                    }}
                            precontent={pretitle}
                    onChange={(e)=>{
                        PaStateMan.getstate().proxy_article
                            .edit_article_change_title(e.target.value);
                        // this.title=e.target.value
                    }}
                    />
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
                    <TagSetsComp
                        pretagids={pretags}
                        ref="tag_select"/>
                </SetWrapper>
            </Box>
        );
    }
}