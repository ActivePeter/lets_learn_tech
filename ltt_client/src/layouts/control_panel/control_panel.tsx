import reuse from '@/assets/reuseable.less'
import cp from './control_panel.less'

import Button from '@mui/joy/Button';
import {Box, Typography} from "@mui/joy";
import {curstyle} from "@/theme/curtheme";
import {TagSetsComp} from "@/layouts/tag/tagsets_in_controlpanel";
import {Component} from "react";
import {push_create_article, RouteControl} from "@/store/route_control";

export default class ControlPanel extends Component<any, any>{
    render() {

        return (
            <Box
                sx={{
                    padding:curstyle().gap.common,
                    marginTop:curstyle().gap.common,
                    height:"100%",
                }}
                className={reuse.col_flex2side_container
                }>
                {/*up*/}
                <Box
                    sx={{

                        display: 'flex',
                        flexDirection: 'column',
                        gap: curstyle().gap.common,
                        // alignItems: 'center',
                        // justifyContent: 'space-between',
                    }}
                >
                    <Button
                        sx={{
                            marginLeft: curstyle().gap.common,
                            marginRight: curstyle().gap.common
                        }}
                        className={cp.listitem}
                        variant="solid" color="primary"
                        onClick={()=>{
                            RouteControl.push_create_article()
                        }}
                    >
                        说点什么？
                    </Button>
                    <Box className={
                        cp.listitem}
                         sx={{
                             marginLeft: curstyle().gap.common,
                             marginRight: curstyle().gap.common
                         }}
                    >
                        <TagSetsComp/>
                    </Box>
                </Box>

            </Box>
        );
    }
}