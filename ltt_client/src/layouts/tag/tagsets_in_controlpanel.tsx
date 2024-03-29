import {Component, Fragment, PureComponent} from "react";
import {Box} from "@mui/joy";
import {TagInfo, TagSet} from "@/store/models/tag";
import {TagSetComp} from "@/layouts/tag/tag_set";
import {curstyle} from "@/theme/curtheme";
import {PaStateMan} from "@/util/pa_state_man";
import {RouteControl} from "@/store/route_control";


interface Prop{
    pretagids?:number[]
}
export class TagSetsComp extends Component <Prop>{
    componentDidMount() {
        PaStateMan.regist_comp(this, (registval, state) => {
            registval(state.tags.tagsets)
        })
    }

    componentWillUnmount() {
        PaStateMan.unregist_comp(this)
    }

    seltag_hashmap: any = {}

    on_select_change(tagid: number, sele: boolean) {
        if (sele) {
            this.seltag_hashmap["$" + tagid] = tagid
        } else {
            delete this.seltag_hashmap["$" + tagid]
        }

        PaStateMan.getstate().proxy_tag.tag_selection_changed(
            this.seltag_hashmap,RouteControl.current_position()=="index"?"mainpage":"other")
    }

    render() {
        if(this.props.pretagids){
            this.props.pretagids.forEach((v)=>{
                this.on_select_change(v,true)
            })
        }
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


                    (<Box key={"B" + i}
                          sx={{
                              marginBottom: curstyle().gap.common
                          }}>
                        <TagSetComp
                            pretagids={this.props.pretagids}
                            key={i}
                            tagsetname={v.tagsetname}
                            tags={v.tags}
                            on_select={(id, sel) => {
                                this.on_select_change(id, sel)
                            }}
                        />
                    </Box>)
                )}
            </Box>
        );
    }
}