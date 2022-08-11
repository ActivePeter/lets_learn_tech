import {Link, Outlet} from 'umi';
import styles from './index.less';
import {bind_style_2_window, get_default_theme} from "@/theme/default_theme";
import {GlobalStyles} from "@mui/system";
import {Theme,CssVarsProvider} from "@mui/joy/styles";
import Headline from "@/layouts/headline/headline";
import {LogFloat} from "@/layouts/login/logfloat";
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import {ResetPaStateMan} from "@/util/pa_state_man";

export default function Layout() {

    bind_style_2_window();
    const theme = get_default_theme();
    ResetPaStateMan()
    return (
        <div className={styles.navs}>
            {/*<ul>*/}
            {/*  <li>*/}
            {/*    <Link to="/">Home</Link>*/}
            {/*  </li>*/}
            {/*  <li>*/}
            {/*    <Link to="/docs">Docs</Link>*/}
            {/*  </li>*/}
            {/*  <li>*/}
            {/*    <a href="https://github.com/umijs/umi">Github</a>*/}
            {/*  </li>*/}
            {/*</ul>*/}

            <CssVarsProvider theme={theme}>
                <GlobalStyles<Theme>
                    styles={(theme) => ({

                        body: {
                            margin: 0,
                            fontFamily: theme.vars.fontFamily.body,
                        },
                    })}
                />
                <ReactNotifications/>
                <LogFloat/>
                <Headline/>
                <Outlet/>

            </CssVarsProvider>
        </div>
    );
}
