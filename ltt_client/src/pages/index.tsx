import yayJpg from '../assets/yay.jpg';
import index_styles from './index.less';
import reuse_styles from '../assets/reuseable.less'
import Headline from "@/layouts/headline/headline";
import ControlPanel from "@/layouts/control_panel/control_panel";
import {CssVarsProvider} from "@mui/joy";
import {GlobalStyles} from '@mui/system';
import type {Theme} from '@mui/joy/styles';
// import  from "@mui/joy/styles/defaultTheme";
import {get_default_theme,bind_style_2_window} from "@/theme/default_theme";
import ClassList from "@/layouts/class_list/class_list";
import CourseList from "@/layouts/course_list/course_list";

export default function HomePage() {
    bind_style_2_window();
    const theme = get_default_theme();
    return (
        <CssVarsProvider theme={theme}>
            <GlobalStyles<Theme>
                styles={(theme) => ({

                    body: {
                        margin: 0,
                        fontFamily: theme.vars.fontFamily.body,
                    },
                })}
            />
            <div className={index_styles.whole + " "
            + reuse_styles.col_flexcontainer}
            >
                <div className={index_styles.headline}>

                    <Headline></Headline>
                </div>
                <div className={reuse_styles.fillleft_flex + " "
                + reuse_styles.row_flexcontainer}>
                    {/*<div className={index_styles.sidebar}>*/}
                    {/*    <ClassList></ClassList>*/}
                    {/*</div>*/}
                    <div className={index_styles.sidebar}>
                        <CourseList/>
                    </div>
                    <div className={index_styles.control_panel}>
                        <ControlPanel></ControlPanel>
                    </div>
                    <div className={index_styles.main + " " +
                    reuse_styles.fillleft_flex
                    }>

                    </div>
                </div>
            </div>
        </CssVarsProvider>

    );
}
