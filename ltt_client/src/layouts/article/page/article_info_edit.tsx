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


type Props = {
};
export class ArticleInfoEdit extends PureComponent<Props> {
    // title=""
    componentDidMount() {
        PaStateMan.getstate().proxy_article.edit_article_state_reset();
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
                <Button
                    sx={{
                        width:"100%"
                    }}
                    onClick={()=>{
                        const ts_:TagSetsComp=this.refs.tag_select
                        articlep.edit_article_try_upload(
                            ts_.seltag_hashmap
                        )
                    }}
                >
                    {articlep.get_cur_mode()=="edit"?"提交修改":"提交并创建文章"}
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