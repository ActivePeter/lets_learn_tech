import {PureComponent} from "react";
import {Box} from "@mui/joy";
import {curstyle} from "@/theme/curtheme";
import {PaStateMan} from "@/util/pa_state_man";
import styled from "@emotion/styled";
import reuse from "@/assets/reuseable.less"

type Props = {
};
export class UserNavi extends PureComponent<Props> {
    componentDidMount() {
        PaStateMan.regist_comp(this,(registval, state)=>{
            registval(state.logged_basicinfo)
        })
    }
    componentWillUnmount() {
        PaStateMan.unregist_comp(this)
    }

    render() {
        const p=PaStateMan.getstate().proxy_log.get_logged_basic()
        const Wrapper=styled.div`
          padding: ${curstyle().gap.common};
          gap: ${curstyle().gap.common};
        `
        // background: ${seldir==this.props.dirid?curstyle().colors.main_l:
        // background: ${seldir==this.props.dirid?curstyle().colors.main_l:''};

        const Bar=styled.div`
          cursor: pointer;
          /* Adapt the colors based on primary prop */

          &:hover { // <Thing> when hovered
            background: ${curstyle().colors.main_l}
          }

          user-select: none;

          background: ${curstyle().colors.gray_common};
          padding: ${curstyle().gap.common};
          border-radius: ${curstyle().radius.common};
        `
        return (
            <Wrapper
                className={reuse.col_flexcontainer}
            >
                <Bar
                    className={reuse.trans_all_common}
                >
                    {p.username}
                </Bar>
                <Bar
                    className={reuse.trans_all_common}
                >
                    发表的
                </Bar>
                <Bar
                    className={reuse.trans_all_common}
                >
                    评论的
                </Bar>
            </Wrapper>
        );
    }
}