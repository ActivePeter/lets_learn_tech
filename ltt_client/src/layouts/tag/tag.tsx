import {PureComponent} from "react";
import {Box} from "@mui/joy";
import {curstyle} from "@/theme/curtheme";
import reuse from "@/assets/reuseable.less"
type Props = {
    // using `interface` is also ok
    tagname: string;
    tagcolor: string;
    selectable?: boolean;
    onselect_change?: (select: boolean) => void
}
export class TagComp extends PureComponent<Props> {
    state={
        selected:false
    }
    switchselect(){
        if(this.props.selectable){
            this.setState({
                selected:!this.state.selected
            },()=>{
                this.props.onselect_change?.(
                    this.state.selected
                );
            })
        }
    }
    render() {
        return (
            <Box
                className={reuse.trans_all_common+" "+reuse.cursorhand}
                sx={{
                    fontSize:curstyle().fontsize.s,
                    background:this.state.selected?curstyle().colors.main_s:curstyle().colors.main_l,
                    borderRadius:curstyle().radius.common,
                    padding:curstyle().gap.mmm+" "+curstyle().gap.m,
                    color:this.state.selected?
                        curstyle().colors.white_common
                        :curstyle().colors.main_d,
                    ":hover":{
                        background:curstyle().colors.main_s,
                        color:curstyle().colors.white_common
                    },
                    ":active":{
                        background:curstyle().colors.main_sx,
                        color:curstyle().colors.main_l,
                    }
                }}
                onClick={()=>{
                    this.switchselect()
                }}
            >
                {this.props.tagname}
            </Box>
        );
    }
}