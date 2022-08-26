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
import {RouteControl} from "@/store/route_control";
import {TagSetCompNoWrap} from "@/layouts/tag/tag_set_nowrap";
import {CommentBar} from "@/layouts/comment/comment_bar";
import {Comment} from "@/store/models/comment";
import {api_comments_getofarticle} from "@/store/net/api_comments_getofarticle";

type Props = {
    articleid:number,
};
export class CommentListRoot{
    cur_comment:CommentBar|undefined=undefined
    set_cur_editing(bar:CommentBar){
        if(this.cur_comment&&this.cur_comment!=bar){
            this.cur_comment.cancel_comment()
        }
        this.cur_comment=bar
    }
    find_cmt(cmtid:number){
        for(let i=0;i<this.listcomp.state.loaded_comments.length;i++){
            const v=this.listcomp.state.loaded_comments[i]
            if(v.cid==cmtid){
                return v
            }
        }
        return undefined
    }
    constructor(public listcomp:CommentList) {
    }
}
export class CommentList extends PureComponent<Props> {
    root
    constructor(props:any) {
        super(props);
        this.root=new CommentListRoot(this);
    }
    // comments
    state={
        loaded_comments:[] as Comment[],
        loaded_aid:-1
    }
    fetch_article_comments() {
        api_comments_getofarticle(this.props.articleid).then((res)=>{
            console.log("comments loaded",res)
            if(res){
                this.setState({
                    loaded_comments:res.comments,
                    loaded_aid:this.props.articleid
                })
            }
        })
    }
    render() {
        if(this.state.loaded_aid!=this.props.articleid){
            this.fetch_article_comments()
            return undefined
        }
        return (
            <Box
                className={reuse.col_flexcontainer}
                sx={{
                    // fontSize:curstyle().fontsize.s,
                    borderRadius:curstyle().radius.common,
                    gap:curstyle().gap.xl,
                    // marginTop:"-100px"
                }}
            >
                <CommentBar
                    addnew={true}
                    articleid={this.props.articleid}
                            root={this.root}
                    to_cmt_or_art={false}
                    to_cmt_id={0}
                />
                {this.state.loaded_comments.map((v)=>{
                    return <CommentBar
                        to_cmt_id={v.to_cid}
                        to_cmt_or_art={v.to_comment_or_article}
                        key={v.cid}
                        articleid={this.props.articleid}
                        bind_comment_data={v}
                        root={this.root}/>
                })}
            </Box>
        );
    }
}