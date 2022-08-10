import * as React from 'react';
import InputUnstyled, {InputUnstyledProps} from '@mui/base/InputUnstyled';
// import { styled } from '@mui/system';
import reuse from "@/assets/reuseable.less"
import {curstyle} from "@/theme/curtheme";
import styled from '@emotion/styled'
import {Component, PureComponent} from "react";
import {Box} from "@mui/joy";


interface Props {
    activecolor: string,
    hovercolor: string,
    color: string,
    children: any,
}

export class TextBtn extends PureComponent<Props> {
    constructor(props: Props) {
        super(props)
    }

    state = {}

// padding: ${this.props.? };
    render() {
        return (<Box
            className={reuse.trans_color_common + " "
                + reuse.cursorhand
            }
            sx={{
                "color": this.props.color,
                ":hover": {
                    "color": this.props.hovercolor,
                }
            }}
        >
            {this.props.children}
        </Box>)
    }


}
