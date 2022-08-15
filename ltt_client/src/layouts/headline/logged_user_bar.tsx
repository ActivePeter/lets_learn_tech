import {Fragment, PureComponent} from "react";
import {Box, Button, MenuItem, MenuList} from "@mui/joy";
import {TextBtn} from "@/layouts/reusable/textbtn";
import {curstyle} from "@/theme/curtheme";
import {PaStateMan} from "@/util/pa_state_man";
import reuse from "@/assets/reuseable.less";
import {UserBasicInfo} from "@/store/models/user";
import styled from "@emotion/styled";
import {ClickAwayListener} from "@mui/material";
import {RouteControl} from "@/store/route_control";

type Props = {
    userbasic: UserBasicInfo,
};


class UserMenu extends PureComponent<Props> {
    state={
        show:false
    }
    setshow(show:boolean){
        this.setState({
            show
        })
    }
    render() {
        const Menu=styled.div`
          display: ${this.state.show ? "" : "none"};
          position: absolute;
          top: 0;
          right: 0;
          background: ${curstyle().colors.gray_common};
        `
        const _MenuItem=styled.div`
          
        `
        return <MenuList
                variant="outlined"
                onKeyDown={()=>{}}
                sx={{ boxShadow: 'md', bgcolor: 'background.body' ,
                    display:this.state.show ? "" : "none",
                    position: "absolute",
                    top:"0",right:"0",
                    zIndex:"1"
                }}
            >
                <MenuItem ><Button
                    onClick={()=>{
                        RouteControl.open_user(this.props.userbasic.uid)
                    }}>
                    {this.props.userbasic.username}
                </Button></MenuItem>
                <MenuItem onClick={()=>{
                    PaStateMan.getstate().proxy_log.log_out()
                }}>退出</MenuItem>
            </MenuList>
        // <Menu
        // >
        //     <_MenuItem>
        //         个人页
        //     </_MenuItem>
        //     <_MenuItem>
        //         退出
        //     </_MenuItem>
        // </Menu>
    }
}

export class LoggedUserBar extends PureComponent<Props> {
    getmenu():UserMenu{
        return this.refs.usermemu as UserMenu;
    }
    render() {
        return <Box
            sx={{
                position:"relative"
            }}
        >
            <ClickAwayListener
                onClickAway={()=>{
                    this.getmenu().setshow(false)
                }}
            >
                <Box
                    onClick={()=>{
                        // console.log(this.getmenu())
                        this.getmenu().setshow(true)
                    }}
                >{this.props.userbasic.username}</Box>
            </ClickAwayListener>
            <UserMenu userbasic={this.props.userbasic}
                      ref={"usermemu"}
            />
        </Box>
    }
}