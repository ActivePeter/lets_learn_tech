import {Component, Fragment, PureComponent} from "react";
import {Box} from "@mui/joy";
import {TagInfo, TagSet} from "@/store/tag";
import {TagSetComp} from "@/layouts/tag/tag_set";
import {curstyle} from "@/theme/curtheme";

export class TagSetsComp extends Component {

    render() {
        let arr: TagSet[] = []
        let tags = []
        for (let i = 0; i < 9; i++) {
            tags.push(new TagInfo(i, "ssss"))
        }
        for (let i = 0; i < 9; i++) {
            arr.push(new TagSet("aaa", tags))
        }
        return (
            <Box>
                {arr.map((v, i) =>
                    <Fragment>
                        <TagSetComp
                            key={i}
                            tagsetname={v.tagsetname}
                            tags={v.tags}

                        />

                        <Box sx={{
                            marginBottom: curstyle().gap.common
                        }}/>
                    </Fragment>
                    )}
            </Box>
        );
    }
}