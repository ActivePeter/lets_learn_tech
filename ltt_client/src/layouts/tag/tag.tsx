import {PureComponent} from "react";
import {Box} from "@mui/joy";
import {curstyle} from "@/theme/curtheme";
import reuse from "@/assets/reuseable.less"
type Props = {
    // using `interface` is also ok
    tagname: string;
    tagcolor:string;
};
export class TagComp extends PureComponent<Props> {
    render() {
        return (
            <Box
                className={reuse.trans_all_common+" "+reuse.cursorhand}
                sx={{
                    fontSize:curstyle().fontsize.s,
                    background:curstyle().colors.main_l,
                    borderRadius:curstyle().radius.common,
                    padding:curstyle().gap.mmm+" "+curstyle().gap.m,
                    color:curstyle().colors.main_d,
                    ":hover":{
                        background:curstyle().colors.main_s,
                        color:curstyle().colors.white_common
                    },
                    ":active":{
                        background:curstyle().colors.main_sx,
                    }
                }}
            >
                {this.props.tagname}
            </Box>
        );
    }
}