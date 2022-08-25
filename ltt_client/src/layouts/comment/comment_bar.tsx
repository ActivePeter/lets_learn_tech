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
import BraftEditor, {EditorState} from "braft-editor";
import {api_comment_to} from "@/store/net/api_comment_to";
import {Notify} from "@/util/notify";
import {Comment} from "@/store/models/comment";

type Props = {
    articleid:number,
    root:CommentListRoot,
    addnew?:boolean,
    to_cmt_or_art:boolean,
    to_cmt_id:number,
    bind_comment_data?:Comment,
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
    comeent_editor_state:undefined|EditorState=undefined
    upload_comment(){
        if(!this.comeent_editor_state){
            return
        }
        if(this.props.articleid==-1){
            return;
        }
        api_comment_to(
            this.comeent_editor_state.toHTML(),
            this.props.to_cmt_or_art,
            this.props.to_cmt_id,
            this.props.articleid,
        ).then((res)=>{
            if(res){
                this.props.root.listcomp.fetch_article_comments()
                this.cancel_comment()
            }else{
                Notify.warn("评论提交失败","")
            }
        })
    }

    render() {

        if(!!this.props.addnew&&!this.state.commenting){
            return (<Button
                sx={{
                    zIndex:"1",}}
            onClick={()=>{
                this.start_comment()
            }}
            >回复</Button>);
        }
        const defaultv=this.props.bind_comment_data?this.props.bind_comment_data.content:"";
        let defaults= BraftEditor.createEditorState(defaultv)

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
                    contentStyle={{height: 'auto', minHeight: "100px",zIndex:"0"}}
                    ref={"be"}
                    controls={this.state.commenting?undefined:[]}
                    readOnly={!this.state.commenting}
                    defaultValue={defaults}
                    // value={state}
                    onChange={(v)=>{
                        this.comeent_editor_state=v// this.props.root.edit.article_content_change(
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
                        }}
                            onClick={()=>{
                                this.upload_comment()
                            }}
                        >发表</Button>
                    </Box>

                    :undefined}

                {!this.props.addnew&&!this.state.commenting?
                    <Box
                        className={reuse.row_flexcontainer_reverse}
                        sx={{padding:curstyle().gap.common,

                            gap:curstyle().gap.common,
                            marginTop:"-40px",
                            zIndex:"1",
                    }}
                    >  
                        by {this.props.bind_comment_data?.uid}
                        <CommentBar
                            to_cmt_id={0}
                            to_cmt_or_art={false}
                            addnew={true}
                            articleid={this.props.articleid}
                            root={this.props.root}/>

                        <Button
                            sx={{
                                zIndex:"1",}}
                            onClick={()=>{
                                this.start_comment()
                            }}
                        >修改</Button>
                    </Box>
                    :undefined}
            </Box>
        );
    }
}