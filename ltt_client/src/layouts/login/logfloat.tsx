import {PureComponent} from "react";
import {Box} from "@mui/joy";
import {curstyle} from "@/theme/curtheme";
import style from "./logfloat.less"
import {LogBar} from "@/layouts/login/logbar";
import reuse from "@/assets/reuseable.less"
type Props = {

};

export class LogFloat extends PureComponent<Props> {
    render() {
        return (
            <Box
                className={style.logfloat+ " "
                +reuse.col_flexcontainer
            }
                sx={{
                    fontSize:curstyle().fontsize.s,
                    background:curstyle().colors.main_halfopa,
                    borderRadius:curstyle().radius.common,
                    padding:curstyle().gap.mmm
                }}
            >
                <LogBar></LogBar>
            </Box>
        );
    }
}