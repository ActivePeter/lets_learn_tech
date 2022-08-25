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
import {CommentListRoot} from "@/layouts/comment/comment_list";
import BraftEditor from "braft-editor";

type Props = {
    articleid:number,
    root:CommentListRoot,
    addnew?:boolean,
};
export class CommentBar extends PureComponent<Props> {

    state={
        authorbasic:undefined,
        commenting:false
    }
    cancel_comment(){
        this.setState({
            commenting:false
        })
    }
    start_comment(){
        this.props.root.set_cur_editing(this);
        this.setState({
            commenting:true
        })
    }
    render() {

        if(!!this.props.addnew&&!this.state.commenting){
            return (<Button
            onClick={()=>{
                this.start_comment()
            }}
            >评论</Button>);
        }

        return (
            <Box
                sx={{
                    // fontSize:curstyle().fontsize.s,
                    background:curstyle().colors.gray_common,
                    borderRadius:curstyle().radius.common,

                    // marginTop:"-100px"
                }}
            >

                {/*controls={articlep.get_cur_mode()=="view"?[]:undefined}*/}
                {/*readOnly={articlep.get_cur_mode()=="view"}*/}
                <BraftEditor
                    contentStyle={{height: 'auto', minHeight: "100px"}}
                    ref={"be"}
                    controls={this.state.commenting?undefined:[]}
                    readOnly={!this.state.commenting}
                    // value={state}
                    onChange={(v)=>{
                        // this.props.root.edit.article_content_change(
                        //     v.toHTML(),v.toText()
                        // )
                    }}
                    onSave={()=>{}}
                />
                {this.state.commenting?
                    <Box className={reuse.row_flexcontainer_reverse}
                         sx={{gap:curstyle().gap.common,
                            paddingRight:curstyle().gap.common,
                             paddingBottom:curstyle().gap.common,
                             marginTop:"-40px",
                             zIndex:"1"
                         }}
                    >
                        <Button
                            sx={{
                                zIndex:"1"
                            }}
                            onClick={()=>{
                            this.cancel_comment()
                        }}>取消</Button>
                        <Button sx={{
                            zIndex:"1"
                        }}>发表</Button>
                    </Box>

                    :undefined}

                {!this.props.addnew?
                    <Box
                        className={reuse.row_flexcontainer_reverse}
                        sx={{padding:curstyle().gap.common}}>
                        <CommentBar
                            addnew={true}
                            articleid={this.props.articleid}
                            root={this.props.root}/>
                    </Box>
                    :undefined}
            </Box>
        );
    }
}