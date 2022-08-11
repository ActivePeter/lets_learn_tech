import {PureComponent} from "react";
import {Box} from "@mui/joy";
import style from "@/layouts/login/logfloat.less";
import {curstyle} from "@/theme/curtheme";
import {Logo} from "@/layouts/reusable/logo/logo";
import reuse from "@/assets/reuseable.less"
import {Input1} from "@/layouts/reusable/input";
import {TextField} from "@mui/joy";
// import InputUnstyled from "@mui/base/InputUnstyled";
import Button from "@mui/joy/Button";
import {TextBtn} from "@/layouts/reusable/textbtn";
import {LogBarRegi} from "@/layouts/login/logbar_regi";
import {PaState} from "@/store/pastate";
import {PaStateMan} from "@/util/pa_state_man";
import {LogBarLog} from "@/layouts/login/logbar_log";
import styled from "@emotion/styled";


const state_instance={
    update_cnt:0
}
type Props = {
};
export class ArticlePreviewSideBar extends PureComponent<Props,typeof state_instance> {
    state=state_instance
    cursel=1
    begin=1
    renderrange=8
    pagecnt=15
    update(cb?:()=>void){
        this.setState({
            update_cnt: this.state.update_cnt+1
        },cb)
    }
    clicklastpage(){
        if(this.cursel==1){
            return
        }
        this.clickgotopage(this.cursel-1)
    }
    clicknextpage(){
        if(this.cursel==this.pagecnt){
            return
        }
        this.clickgotopage(this.cursel+1)
    }
    clickgotopage(i:number){
        this.cursel=i;

        const beginmove2=this.begin-this.cursel
        const leftcnt=2
        if(beginmove2>-leftcnt){
            this.begin-=beginmove2+leftcnt;
            if(this.begin<1){
                this.begin=1;
            }
        }

        const beginmove=this.cursel-(this.begin+this.renderrange-1)
        if(beginmove>-leftcnt){
            this.begin+=beginmove+leftcnt;
            if(this.begin+this.renderrange-1>this.pagecnt){
                this.begin=this.pagecnt+1-this.renderrange;
            }
        }
        this.update()
    }

    render() {
        const PageButton=styled.div`
          transition: all 0.3s;
          user-select: none;
          &:hover{
            background: ${curstyle().colors.main_l};
          } 
          text-align: center;
          width: 25px;
          padding: ${curstyle().gap.mmm};
          border-radius: ${curstyle().radius.common};
          margin:${curstyle().gap.mm} auto;
        `
        const PageButtonSeled=styled.div`
          background: ${curstyle().colors.main_l};
          transition: all 0.3s;
          user-select: none;
          text-align: center;
          width: 25px;
          padding: ${curstyle().gap.mmm};
          border-radius: ${curstyle().radius.common};
          margin:${curstyle().gap.mm} auto;
        `
        const More=styled.div`
          user-select: none;
          text-align: center;
          width: 25px;
          padding: ${curstyle().gap.mmm};
          border-radius: ${curstyle().radius.common};
          margin:${curstyle().gap.mm} auto;
        `
        const cursel=this.cursel;
        const pagecnt=this.pagecnt;
        const renderrange=this.renderrange;
        const lastpagebar_ok=cursel!=1;
        const nextpagebar_ok=cursel!=pagecnt;
        const bararr=[]
        const begin=this.begin;

        // if(lastpagebar_ok)
        {
            bararr.push(<PageButton
                key={"last"}
                className={reuse.cursorhand}
                onClick={()=>{
                    this.clicklastpage()
                }}
            >
                    {'<'}
                </PageButton>)
        }
        if(begin>1){
            bararr.push(<More key={"last_"}>
                    {'...'}
                </More>)
        }
        for( let i=0;i<renderrange;i++){
            if(begin+i>pagecnt){
                break;
            }
            if(begin+i==cursel){
                bararr.push(<PageButtonSeled
                    className={reuse.cursorhand}
                    onClick={()=>{
                        this.clickgotopage(begin+i)
                    }}
                    key={begin+i}
                >
                    {begin+i}
                </PageButtonSeled>)
            }else{
                bararr.push(<PageButton
                    className={reuse.cursorhand}
                    onClick={()=>{
                        this.clickgotopage(begin+i)
                    }}
                    key={begin+i}
                >
                    {begin+i}
                </PageButton>)
            }
        }
        if(begin+renderrange-1<pagecnt){
            bararr.push(<More key={"next_"}>
                {'...'}
            </More>)
        }
        // if(nextpagebar_ok)
        {
            bararr.push(<PageButton
                className={reuse.cursorhand}
                onClick={()=>{
                    this.clicknextpage()
                }}
                key={"next"}>
                    {'>'}
                </PageButton>)
        }
        return (
            <Box
                className={reuse.col_flexcenter_container}
                sx={{
                    width:"50px",
                    height:"100%",
                    // marginTop:"-100px"
                }}
            >
                {bararr}
            </Box>
        );
    }
}