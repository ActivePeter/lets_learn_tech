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

type Props = {
    articleid:number,
};
export class CommentListRoot{
    cur_comment:CommentBar|undefined=undefined
    set_cur_editing(bar:CommentBar){
        if(this.cur_comment){
            this.cur_comment.cancel_comment()
        }
        this.cur_comment=bar
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
    render() {

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
                            root={this.root}/>
                <CommentBar articleid={this.props.articleid}
                            root={this.root}/>
                <CommentBar articleid={this.props.articleid}
                            root={this.root}/>
                <CommentBar articleid={this.props.articleid}
                            root={this.root}/>
                <CommentBar articleid={this.props.articleid}
                            root={this.root}/>
            </Box>
        );
    }
}