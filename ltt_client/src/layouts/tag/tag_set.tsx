import {Fragment, PureComponent} from "react";
import {Box, Typography} from "@mui/joy";
import {TagComp} from "@/layouts/tag/tag";
import reuse from "@/assets/reuseable.less"
import {curstyle} from "@/theme/curtheme";
import {TagInfo, TagSet} from "@/store/models/tag"

type Props = {
    // using `interface` is also ok
    tagsetname: string,
    tags: TagInfo[]
};

export class TagSetComp extends PureComponent<Props> {

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
                                    key={index}
                                    tagname={value.tagname} tagcolor={""}/>

                            ))
                    }
                </Box>
            </Box>
        );
    }
}