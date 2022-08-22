import {Fragment, PureComponent} from "react";
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
import {PageOfArticle} from "@/store/models/article";
import {ArticlePreviewBar} from "@/layouts/article/article_preview_bar";
import {ArticlePreviewSideBar} from "@/layouts/article/article_preview_sidebar";

type Props = {};

class WaterFallOneCol{
    colheight=0
    elemids:number[]=[]
    constructor() {
    }
}

const state_instance={
    update_cnt:0
}
export class ArticlePreviewList extends PureComponent<Props,typeof state_instance> {

    componentDidMount() {
        PaStateMan.regist_comp(this,(registval, state)=>{
            registval(state.preview_articles)
        })
        window.addEventListener('resize', this.on_window_resize.bind(this));
        this.waterfall_recalc(true);
    }

    componentWillUnmount() {
        PaStateMan.unregist_comp(this)
        window.removeEventListener('resize', this.on_window_resize);
    }
    state=state_instance
    all_content=[100,200,300,100,200,300,100,200,300,100,200,300]
    waterfall={
        cols:[new WaterFallOneCol()],
        interval:0,
        putcnt:0,
        waitforrenderitem_i:-1
    }
    waterfall_resetcols(colcnt:number){
        this.waterfall.cols=[]
        for(let i=0;i<colcnt;i++){
            this.waterfall.cols.push(new WaterFallOneCol())
        }
        this.waterfall.putcnt=0;
    }
    // componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any) {
    // }

    waterfall_replace(){
        if(this.waterfall.interval!=0){
            window.clearInterval(this.waterfall.interval)
        }
        const insert2col=(height:number)=>{
            let minheightcoli=0
            for(let i=1;i< this.waterfall.cols.length;i++){
                const col=this.waterfall.cols[i]
                if(col.colheight<this.waterfall.cols[minheightcoli].colheight){
                    minheightcoli=i;
                }
            }

            const pop=this.waterfall.cols[0].elemids.pop();
            if(pop!=undefined){
                this.waterfall.cols[minheightcoli].elemids.push(pop)
                this.waterfall.cols[minheightcoli].colheight+=height
            }else{
                console.warn("waterfall no pre load item")
            }

            console.log("insert2col after",height,pop,this.waterfall.cols[0].colheight)
        }
        const drawone=(i:number)=>{
            this.waterfall.cols[0].elemids.push(i)
            this.setState({
                update_cnt: this.state.update_cnt+1
            },()=>{
                const dom=document.getElementById("item_"+i);
                if(dom){
                    insert2col(dom.offsetHeight)
                    // window.setTimeout(()=>{
                        if(i<this.all_content.length){
                            drawone(i+1)
                        }
                    // },1000)

                }else{
                    console.warn("waterfall no pre load item dom")
                }
            })
        }
        drawone(0)
        // this.waterfall.interval=window.setInterval(()=>{
        //     // if(this.waterfall.putcnt,this.all_content.length){
        //     //
        //     // }
        // },500)
    }
    waterfall_recalc(forcereplace:boolean){
        const dom=document.getElementById("ArticlePreviewList");
        const w=dom.offsetWidth;
        // console.log(w)
        const singlemaxw=300
        let colcnt=1
        if(w>3*singlemaxw){
            colcnt=4
        }else if(w>2*singlemaxw){
            colcnt=3
        }else if(w>singlemaxw){
            colcnt=2
        }
        if(colcnt!=this.waterfall.cols.length||forcereplace){
            this.waterfall_resetcols(colcnt)
            this.waterfall_replace()
        }
    }
    on_window_resize(e:Event){
        this.waterfall_recalc(false);
    }

    render() {

        const page=PageOfArticle.testpre();
        const logp = PaStateMan.getstate().proxy_log;
        const colcnt=this.waterfall.cols.length;
        const colwidth='calc('+100.0/colcnt+'% - '+(12.0*(colcnt-1)/colcnt)+'px)';
        const cols=[]
        const previewarts=PaStateMan.getstate().proxy_article
            .get_preview_articles();
        for(const coli in this.waterfall.cols){
            const v=this.waterfall.cols[coli]
            const onecol=[]
            for(const i in v.elemids){
                const eid=v.elemids[i]
                if(eid<previewarts.length){
                    onecol.push(<Box
                        id={"item_"+eid}
                        key={eid}
                        sx={{
                            // border:"1px solid black",
                            width:"100%",
                            height:this.all_content[eid]+"px",
                        }}
                    >
                        <ArticlePreviewBar articleid={previewarts[eid]}/>
                    </Box>)
                }else{
                    onecol.push(<Box
                        id={"item_"+eid}
                        key={eid}
                        sx={{
                            // border:"1px solid black",
                            width:"100%",
                            height:this.all_content[eid]+"px",
                        }}
                    >
                        <ArticlePreviewBar articleid={-1}/>
                    </Box>)
                }

            }
            cols.push(
                <Box
                    className={reuse.col_flexcontainer}
                    key={"col_"+coli}
                    sx={{
                        width:colwidth,
                        gap:curstyle().gap.common,
                    }}
                >
                    {onecol}
                </Box>
            )
        }
        return (
            // <Box
            //     sx={{
            //         padding:curstyle().gap.common,
            //         overflowY:"scroll",
            //         height: "100%",
            //     }}
            // >
            <Box
                className={reuse.row_flexcontainer_reverse}
                sx={{
                    width: "100%",
                    height:"100%"
                }}
            >
                <ArticlePreviewSideBar/>
                <Box
                    className={reuse.fillleft_flex}
                    sx={{
                        height:"100%"
                    }}
                >
                    <Box
                        id={"ArticlePreviewList"}
                        className={reuse.row_flexcontainer}
                        sx={{
                            boxSizing:"border-box",

                            gap:curstyle().gap.common,
                            padding:curstyle().gap.common,
                            height: "100%",
                            width: "100%",
                            overflowY:"scroll",
                        }}
                    >
                        {cols}
                    </Box>
                </Box>
            </Box>

            // </Box>
        );
    }
}