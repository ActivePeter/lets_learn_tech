import {PureComponent} from "react";
import {Box} from "@mui/joy";
import {curstyle} from "@/theme/curtheme";
import {PaStateMan} from "@/util/pa_state_man";
type Props = {
};
export class UserPreview extends PureComponent<Props> {
    componentDidMount() {
    }
    componentWillUnmount() {
    }

    render() {
        const p=PaStateMan.getstate().proxy_log.get_logged_basic()
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
                {p.username}
            </Box>
        );
    }
}