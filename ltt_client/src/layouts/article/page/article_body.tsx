import {PureComponent} from "react";
import {Box} from "@mui/joy";
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
import BraftEditor from 'braft-editor'
import 'braft-editor/dist/index.css'

type Props = {
};
export class ArticleBody extends PureComponent<Props> {
    state = {
        editorState: null
    }
    async componentDidMount() {
        PaStateMan.regist_comp(this,(registval,state)=>{
        })
        // Assume here to get the editor content in html format from the server
        // const htmlContent = await fetchEditorContent()
        // Use BraftEditor.createEditorState to convert html strings to editorState data needed by the editor
        this.setState({
            editorState: BraftEditor.createEditorState("")
        })
    }
    componentWillUnmount() {
        PaStateMan.unregist_comp(this)
    }

    render() {
        const logp=PaStateMan.getstate().proxy_log;
        const { editorState } = this.state

        return (
            <Box
            >
                <BraftEditor
                    value={editorState}
                    onChange={()=>{}}
                    onSave={()=>{}}
                />
                {/*{this.props.tagname}*/}
            </Box>
        );
    }
}