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
import {UserInfoComp} from "@/layouts/user/user_info";
import {CommentPreview} from "@/layouts/comment/comment_preview";
import styled from "@emotion/styled";

type Props = {
    articleid:number,
    root:CommentListRoot,
    addnew?:boolean,
    to_cmt_or_art:boolean,
    to_cmt_id:number,
    bind_comment_data?:Comment,
    on_start_commnet?:(comment:boolean)=>void
};

export class CommentBar extends PureComponent<Props> {

    state={
        authorbasic:undefined,
        commenting:false,
        commenting_to_this:false,
    }
    old_editor_state=undefined

    cancel_comment(){
        if(this.props.bind_comment_data!=undefined
            && this.old_editor_state
        ){
            // @ts-ignore
            this.refs.be.setValue(this.old_editor_state);
        }
        this.props.on_start_commnet?.(false)
        this.setState({
            commenting:false
        })
    }
    start_comment(){
        // @ts-ignore
        if(this.refs.be){
            this.old_editor_state=this.refs.be.getValue();
        }
        this.props.on_start_commnet?.(true)
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
        //没绑定，是新评论
        if(this.props.bind_comment_data==undefined){
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

        const GrayText=styled.span`
          color: ${curstyle().colors.font_second};
        `
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
                    contentStyle={{height: 'auto', minHeight: "100px",zIndex:"0",
                        maxHeight:"500px"
                    }}
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
                        className={reuse.row_flex2side_container}
                        sx={{padding:curstyle().gap.common,
                            borderTop:"solid 1px "+curstyle().colors.gray_d,
                            gap:curstyle().gap.common,
                            marginTop:"-30px",
                            zIndex:"1",
                            alignItems:"center"
                    }}
                    >
                        {this.state.commenting_to_this?undefined:(
                            <Box className={reuse.row_flexcontainer}
                                sx={{
                                    alignItems:"center",
                                    gap:curstyle().gap.common,
                                }}
                            >
                                <UserInfoComp uid={this.props.bind_comment_data ? this.props.bind_comment_data.uid : -1}/>
                                {this.props.to_cmt_or_art?
                                    (
                                        <Fragment>
                                            <GrayText>回复评论</GrayText>
                                            <CommentPreview cid={this.props.bind_comment_data?.to_cid} root={this.props.root}/>
                                        </Fragment>)
                                    :undefined}
                            </Box>)}
                        <Box
                            className={reuse.row_flexcontainer_reverse}
                            sx={{
                                border:"solid 1px "+curstyle().colors.gray_d,
                                    gap:curstyle().gap.common,
                                    zIndex:"1",}}
                        >

                            {this.props.bind_comment_data!=undefined?<CommentBar
                                to_cmt_id={this.props.bind_comment_data.cid}
                                to_cmt_or_art={true}
                                addnew={true}
                                articleid={this.props.articleid}
                                root={this.props.root}
                                on_start_commnet={
                                    (start) => {
                                        console.log("on_start_commnet", start)
                                        this.setState(
                                            {
                                                commenting_to_this: start
                                            }
                                        )
                                    }}
                            />:undefined}

                            {this.state.commenting_to_this?undefined:<Button
                                sx={{
                                    zIndex: "1",
                                }}
                                onClick={() => {
                                    this.start_comment()
                                }}
                            >修改</Button>}
                        </Box>
                    </Box>
                    :undefined}
            </Box>
        );
    }
}