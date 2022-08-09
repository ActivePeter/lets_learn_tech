import {PureComponent} from "react";
import {Box} from "@mui/joy";
import {curstyle} from "@/theme/curtheme";
type Props = {
    // using `interface` is also ok
    tagname: string;
    tagcolor:string;
};
export class TagComp extends PureComponent<Props> {
    render() {
        return (
            <Box
                sx={{
                    fontSize:curstyle().fontsize.s,
                    cursor:"pointer",
                    background:curstyle().colors.main_l,
                    borderRadius:curstyle().radius.common,
                    padding:curstyle().gap.mmm
                }}
            >
                {this.props.tagname}
            </Box>
        );
    }
}