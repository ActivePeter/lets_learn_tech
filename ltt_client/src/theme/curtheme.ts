import {MyGlobalStyle} from "@/theme/default_theme";

export function curstyle():MyGlobalStyle{
    // @ts-ignore
    return window['global_style'] as MyGlobalStyle
}