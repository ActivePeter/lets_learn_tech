import {Fragment, PureComponent} from "react";
import {Box, Typography} from "@mui/joy";
import {TagComp} from "@/layouts/tag/tag";
import reuse from "@/assets/reuseable.less"
import {curstyle} from "@/theme/curtheme";
import {TagInfo, TagSet} from "@/store/models/tag"

type Props = {
    // using `interface` is also ok
    tagsetname: string,
    tags: TagInfo[],
    on_select?:(tagid:number,selected:boolean)=>void,
    pretagids?:number[],
};

export class TagSetComp extends PureComponent<Props> {
    pre_select_tag(id:number){
        let tags=this.props.pretagids
        if(tags){
            for(let i=0;i<tags.length;i++){
                if(tags[i]==id){
                    return true
                }
            }
        }
        return false
    }
    render() {
        return (
            <Box
                sx={{
                    background:curstyle().colors.gray_common,
                    padding:curstyle().gap.common,
                    paddingBottom:curstyle().gap.xl
                }}
            >
                <Typography level="h6"
                            sx={{
                                paddingBottom:curstyle().gap.m
                            }}
                >
                    {this.props.tagsetname}
                </Typography>

                <Box className={reuse.row_flexcontainer}
                     sx={{
                         gap: curstyle().gap.m
                     }}
                >
                    {this.props.tags.map(
                        (value, index) =>
                            (
                                <TagComp
                                    onselect_change={(select)=>{
                                        this.props.on_select?.(
                                            value.tag_id,select
                                        )
                                    }}
                                    selectable={true}
                                    key={value.tag_id}
                                    preselect={this.pre_select_tag(value.tag_id)}
                                    tagname={value.tag_name+"("+value.artcnt+")"} tagcolor={""}/>

                            ))
                    }
                </Box>
            </Box>
        );
    }
}