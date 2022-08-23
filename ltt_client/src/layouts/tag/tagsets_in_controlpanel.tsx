import {Component, Fragment, PureComponent} from "react";
import {Box} from "@mui/joy";
import {TagInfo, TagSet} from "@/store/models/tag";
import {TagSetComp} from "@/layouts/tag/tag_set";
import {curstyle} from "@/theme/curtheme";
import {PaStateMan} from "@/util/pa_state_man";

export class TagSetsComp extends Component {
componentDidMount() {
    PaStateMan.regist_comp(this,(registval, state)=>{
        registval(state.tags.tagsets)
    })
}
componentWillUnmount() {
    PaStateMan.unregist_comp(this)
}

    render() {
        // let arr: TagSet[] = []
        // let tags = []
        // for (let i = 0; i < 9; i++) {
        //     tags.push(new TagInfo(i, "ssss"))
        // }
        // for (let i = 0; i < 9; i++) {
        //     arr.push(new TagSet("aaa", tags))
        // }
        return (
            <Box>
                {PaStateMan.getstate().proxy_tag.gettagset().map((v, i) =>
                    // <Fragment>


                        (<Box key={"B"+i}
                             sx={{
                                 marginBottom: curstyle().gap.common
                             }}>
                            <TagSetComp
                                key={i}
                                tagsetname={v.tagsetname}
                                tags={v.tags}

                            />
                            </Box>)
                )}
            </Box>
        );
    }
}