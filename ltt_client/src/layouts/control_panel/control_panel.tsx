import reuse from '@/assets/reuseable.less'
import cp from './control_panel.less'

import Button from '@mui/joy/Button';
import {Box, Typography} from "@mui/joy";
import {curstyle} from "@/theme/curtheme";

export default function ControlPanel() {

    return (
        <Box
            sx={{
                marginTop:curstyle().gap.common
            }}
            className={reuse.col_flex2side_container + " "
            + cp.cpcont
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
                    variant="solid" color="primary">
                    说点什么？
                </Button>
                <Box className={
                    cp.listitem}
                     sx={{
                         marginLeft: curstyle().gap.common,
                         marginRight: curstyle().gap.common
                     }}
                >列表
                </Box>
            </Box>

            {/*down*/}
            <div>
                <div>
                    <div className={
                        cp.item_pad}>成员
                    </div>
                </div>
            </div>
        </Box>
    );
}