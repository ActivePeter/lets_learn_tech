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
import {ArticleViewRoot} from "@/pages/article/$id";

type Props = {
    root:ArticleViewRoot
};
export class ArticleBody extends PureComponent<Props> {

    async componentDidMount() {
        PaStateMan.regist_comp(this,(registval,state)=>{
            registval(state.article_mode)
            registval(state.article)
        })
        // Assume here to get the editor content in html format from the server
        // const htmlContent = await fetchEditorContent()
        // Use BraftEditor.createEditorState to convert html strings to editorState data needed by the editor


    }
    componentWillUnmount() {
        PaStateMan.unregist_comp(this)
    }
    // content=""
    // editorbarstate=undefined
    render() {
        const logp=PaStateMan.getstate().proxy_log;
        const articlep=PaStateMan.getstate().proxy_article;
        // const { editorState } = this.state
        const article=articlep.get_cur_article()

        if(articlep.get_cur_mode()=="view"&&article==undefined){
            return undefined
        }
        let state=BraftEditor.createEditorState("")
        if(article){

            state=BraftEditor.createEditorState(article.content)
        }
        PaStateMan.getstate().proxy_article.editor_state = state
        return (
            <Box
            >
                <BraftEditor
                    ref={"be"}
                    controls={articlep.get_cur_mode()=="view"?[]:undefined}
                    readOnly={articlep.get_cur_mode()=="view"}
                    value={state}
                    onChange={(v)=>{
                        this.props.root.edit.article_content_change(
                            v.toHTML(),v.toText()
                        )
                    }}
                    onSave={()=>{}}
                />
                {/*{this.props.tagname}*/}
            </Box>
        );
    }
}