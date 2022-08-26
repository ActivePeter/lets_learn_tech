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

type Props = {
    cid:number,
    root:CommentListRoot,
};

export class CommentPreview extends PureComponent<Props> {

    render() {
        const cmt=this.props.root.find_cmt(this.props.cid)
        if(cmt==undefined){
            return
        }

        let defaults= BraftEditor.createEditorState(cmt.content)
        return (
            <Box
                sx={{
                    // fontSize:curstyle().fontsize.s,
                    // background:curstyle().colors.gray_d,
                    borderRadius:curstyle().radius.common,

                    border:"solid 1px "+curstyle().colors.gray_d,
                    // marginTop:"-100px"
                }}
            >
                <BraftEditor
                    contentStyle={{height: 'auto', minHeight: "0px",zIndex:"0",
                        maxHeight:"500px"
                    }}
                    ref={"be"}
                    controls={[]}
                    readOnly={true}
                    defaultValue={defaults}
                    // value={state}
                    onChange={(v)=>{
                    }}
                    onSave={()=>{}}
                />
            </Box>
        );
    }
}