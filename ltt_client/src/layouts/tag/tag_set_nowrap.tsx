import {Fragment, PureComponent} from "react";
import {Box, Typography} from "@mui/joy";
import {TagComp} from "@/layouts/tag/tag";
import reuse from "@/assets/reuseable.less"
import {curstyle} from "@/theme/curtheme";
import {TagInfo, TagSet} from "@/store/models/tag"

type Props = {
    // using `interface` is also ok
    showcnt?:boolean,
    tagsetname: string,
    tags: TagInfo[],
    on_select?:(tagid:number,selected:boolean)=>void
};

export class TagSetCompNoWrap extends PureComponent<Props> {

    render() {
        return (
            <Box className={reuse.row_flexcontainer}
                 sx={{
                     gap: curstyle().gap.m
                 }}
            >
                {(this.props.tags&&
                    this.props.tags.length>0&&
                    this.props.tags[0]
                )?this.props.tags.map(
                    (value, index) =>{
                        // console.log("TagSetCompNoWrap map value",value,this.props.tags)
                        return (
                            <TagComp
                                onselect_change={(select)=>{
                                    this.props.on_select?.(
                                        value.tag_id,select
                                    )
                                }}
                                selectable={false}
                                key={value.tag_id}
                                tagname={
                                    this.props.showcnt?value.tag_name+"("+value.artcnt+")":value.tag_name} tagcolor={""}/>

                        )
                    }):undefined
                }
            </Box>
        );
    }
}