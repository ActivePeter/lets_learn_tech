import reuse from '@/assets/reuseable.less'
import headline from './headline.less'
import {Box} from "@mui/joy";
import {curstyle} from "@/theme/curtheme";
import {HeadLineLogPart} from "@/layouts/headline/log";
import {PureComponent} from "react";
import {RouteControl} from "@/store/route_control";
export default class  Headline extends PureComponent{
    render() {

        return (
            <Box className={reuse.row_flex2side_container}
                 sx={{
                     height:curstyle().headheight,
                     borderBottom:"1px solid "+curstyle().colors.gray_d
                 }}
            >
                <Box
                    sx={{
                        paddingTop:curstyle().gap.common,
                        paddingBottom:curstyle().gap.common
                    }}
                    className={
                        reuse.col_flexcenter_container+" "
                        +headline.logo
                    }>

                    <div
                        className={reuse.row_flex2center_container}
                        onClick={()=>{
                            RouteControl.push_index()
                        }}
                    >
                        <svg width="480" height="40" viewBox="0 0 68 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.71136 9.732C1.39136 9.652 1.13136 9.484 0.931358 9.228C0.739358 8.98 0.583358 8.68 0.463358 8.328C0.455358 8.224 0.451358 8.08 0.451358 7.896C0.459358 7.712 0.471358 7.54 0.487358 7.38C0.503358 7.22 0.519358 7.128 0.535358 7.104C0.559358 7.088 0.571358 7.04 0.571358 6.96C0.563358 6.928 0.567358 6.876 0.583358 6.804C0.607358 6.724 0.631358 6.644 0.655358 6.564C0.695358 6.468 0.715358 6.392 0.715358 6.336C0.715358 6.272 0.711358 6.224 0.703358 6.192C0.703358 6.192 0.715358 6.168 0.739358 6.12C0.763358 6.064 0.791358 6.02 0.823358 5.988C0.871358 5.94 0.891358 5.892 0.883358 5.844C0.883358 5.796 0.883358 5.772 0.883358 5.772C0.875358 5.74 0.883358 5.696 0.907358 5.64C0.931358 5.584 0.955358 5.54 0.979358 5.508C0.995358 5.492 1.01536 5.46 1.03936 5.412C1.07136 5.356 1.08736 5.328 1.08736 5.328C1.08736 5.304 1.10336 5.24 1.13536 5.136C1.17536 5.032 1.21936 4.92 1.26736 4.8C1.31536 4.672 1.35936 4.556 1.39936 4.452C1.44736 4.348 1.48336 4.28 1.50736 4.248V4.224C1.53936 4.144 1.58336 4.06 1.63936 3.972C1.64736 3.932 1.66736 3.868 1.69936 3.78C1.73136 3.684 1.76736 3.592 1.80736 3.504C1.89536 3.312 2.00336 3.096 2.13136 2.856C2.26736 2.608 2.41136 2.364 2.56336 2.124C2.71536 1.876 2.85936 1.656 2.99536 1.464C3.13936 1.264 3.26336 1.116 3.36736 1.02C3.50336 0.868 3.63936 0.76 3.77536 0.696C3.91936 0.624 4.05136 0.648 4.17136 0.767999C4.22736 0.824 4.27536 0.908 4.31536 1.02C4.35536 1.124 4.37136 1.224 4.36336 1.32C4.36336 1.408 4.33136 1.456 4.26736 1.464C4.21136 1.496 4.13536 1.588 4.03936 1.74C3.94336 1.884 3.83536 2.056 3.71536 2.256C3.60336 2.456 3.49136 2.664 3.37936 2.88C3.26736 3.088 3.16336 3.276 3.06736 3.444C2.96336 3.676 2.86736 3.88 2.77936 4.056C2.69136 4.224 2.64736 4.308 2.64736 4.308C2.63936 4.332 2.63136 4.352 2.62336 4.368C2.61536 4.384 2.60736 4.4 2.59936 4.416C2.47936 4.664 2.37936 4.892 2.29936 5.1C2.21936 5.3 2.13936 5.512 2.05936 5.736C2.01136 5.792 1.98336 5.848 1.97536 5.904C1.96736 5.96 1.96336 5.988 1.96336 5.988C1.94736 5.98 1.93536 6 1.92736 6.048C1.91936 6.088 1.90336 6.136 1.87936 6.192C1.83936 6.224 1.81536 6.276 1.80736 6.348C1.79936 6.412 1.79536 6.476 1.79536 6.54C1.73936 6.684 1.68736 6.86 1.63936 7.068C1.59136 7.268 1.55536 7.464 1.53136 7.656C1.51536 7.84 1.51136 7.984 1.51936 8.088C1.53536 8.224 1.57136 8.34 1.62736 8.436C1.69136 8.524 1.77936 8.596 1.89136 8.652C1.97936 8.692 2.05936 8.728 2.13136 8.76C2.20336 8.784 2.26736 8.796 2.32336 8.796C2.38736 8.804 2.46736 8.804 2.56336 8.796C2.66736 8.78 2.80736 8.756 2.98336 8.724H2.97136C3.07536 8.708 3.18336 8.688 3.29536 8.664C3.41536 8.632 3.52736 8.604 3.63136 8.58C3.72736 8.564 3.81936 8.548 3.90736 8.532C3.99536 8.508 4.06336 8.488 4.11136 8.472C4.28736 8.424 4.42736 8.384 4.53136 8.352C4.64336 8.32 4.71936 8.32 4.75936 8.352C4.79936 8.384 4.84336 8.444 4.89136 8.532C4.93936 8.62 4.95136 8.7 4.92736 8.772C4.91136 8.812 4.83136 8.892 4.68736 9.012C4.54336 9.14 4.37936 9.264 4.19536 9.384C4.01136 9.512 3.84336 9.6 3.69136 9.648C3.53136 9.72 3.31536 9.768 3.04336 9.792C2.77936 9.824 2.52336 9.832 2.27536 9.816C2.02736 9.8 1.83936 9.772 1.71136 9.732ZM7.82873 8.76C7.58873 8.896 7.33273 8.976 7.06073 9C6.79673 9.016 6.54873 8.98 6.31673 8.892C6.08473 8.796 5.89673 8.656 5.75273 8.472C5.67273 8.368 5.59673 8.204 5.52473 7.98C5.45273 7.748 5.44073 7.436 5.48873 7.044C5.53673 6.676 5.64873 6.304 5.82473 5.928C6.00873 5.552 6.23273 5.22 6.49673 4.932C6.76073 4.644 7.04873 4.448 7.36073 4.344C7.47273 4.304 7.58473 4.276 7.69673 4.26C7.81673 4.236 7.97273 4.232 8.16473 4.248C8.34873 4.272 8.51273 4.32 8.65673 4.392C8.80073 4.456 8.90473 4.528 8.96873 4.608C9.09673 4.736 9.18073 4.86 9.22073 4.98C9.26073 5.1 9.27673 5.216 9.26873 5.328C9.22873 5.584 9.11273 5.86 8.92073 6.156C8.73673 6.452 8.47673 6.672 8.14073 6.816C8.00473 6.872 7.84473 6.908 7.66073 6.924C7.47673 6.94 7.22473 6.916 6.90473 6.852C6.71273 6.812 6.58473 6.832 6.52073 6.912C6.46473 6.992 6.44073 7.148 6.44873 7.38C6.46473 7.524 6.49673 7.652 6.54473 7.764C6.60073 7.868 6.70073 7.94 6.84473 7.98C7.02873 8.012 7.16073 8.016 7.24073 7.992C7.32073 7.96 7.42073 7.916 7.54073 7.86C7.60473 7.82 7.66473 7.776 7.72073 7.728C7.78473 7.68 7.84473 7.632 7.90073 7.584C7.96473 7.536 8.01673 7.5 8.05673 7.476C8.09673 7.444 8.13673 7.424 8.17673 7.416C8.21673 7.408 8.25673 7.404 8.29673 7.404C8.38473 7.412 8.46873 7.46 8.54873 7.548C8.62873 7.636 8.68073 7.72 8.70473 7.8C8.70473 7.864 8.66473 7.956 8.58473 8.076C8.50473 8.188 8.39673 8.308 8.26073 8.436C8.13273 8.556 7.98873 8.664 7.82873 8.76ZM7.67273 6.084C7.72873 6.06 7.80873 6.004 7.91273 5.916C8.02473 5.828 8.12473 5.736 8.21273 5.64C8.30073 5.536 8.34473 5.456 8.34473 5.4C8.34473 5.312 8.28473 5.236 8.16473 5.172C8.05273 5.108 7.90473 5.096 7.72073 5.136C7.65673 5.152 7.58073 5.196 7.49273 5.268C7.40473 5.34 7.31673 5.424 7.22873 5.52C7.14073 5.608 7.06473 5.696 7.00073 5.784C6.93673 5.864 6.89273 5.928 6.86873 5.976C6.90073 6.016 6.96473 6.048 7.06073 6.072C7.15673 6.096 7.26073 6.108 7.37273 6.108C7.49273 6.108 7.59273 6.1 7.67273 6.084ZM10.1925 9.012C10.1045 8.996 10.0085 8.944 9.90455 8.856C9.80055 8.76 9.70455 8.656 9.61655 8.544C9.53655 8.424 9.48455 8.324 9.46055 8.244C9.46055 8.228 9.44855 8.208 9.42455 8.184C9.40855 8.16 9.40055 8.148 9.40055 8.148C9.36855 8.124 9.34855 8.02 9.34055 7.836C9.34055 7.644 9.35255 7.432 9.37655 7.2C9.40055 6.968 9.42855 6.784 9.46055 6.648C9.50055 6.52 9.56055 6.348 9.64055 6.132C9.72055 5.908 9.78855 5.708 9.84455 5.532L10.1685 4.836L9.68855 4.704C9.63255 4.688 9.58455 4.656 9.54455 4.608C9.51255 4.56 9.49655 4.52 9.49655 4.488C9.49655 4.424 9.53255 4.332 9.60455 4.212C9.67655 4.092 9.72855 4.032 9.76055 4.032C9.80055 4.04 9.87255 4.044 9.97655 4.044C10.0885 4.044 10.1965 4.04 10.3005 4.032C10.4045 4.024 10.4685 4.016 10.4925 4.008C10.5245 3.992 10.5565 3.972 10.5885 3.948C10.6205 3.916 10.6445 3.872 10.6605 3.816C10.7005 3.728 10.7365 3.66 10.7685 3.612C10.8005 3.564 10.8445 3.492 10.9005 3.396C10.9565 3.292 11.0005 3.204 11.0325 3.132C11.0725 3.06 11.1325 2.96 11.2125 2.832C11.2525 2.776 11.2965 2.708 11.3445 2.628C11.3925 2.548 11.4525 2.48 11.5245 2.424C11.5965 2.36 11.7125 2.316 11.8725 2.292C12.0405 2.26 12.1845 2.296 12.3045 2.4C12.3685 2.48 12.4045 2.556 12.4125 2.628C12.4205 2.7 12.3885 2.792 12.3165 2.904C12.2525 3.04 12.1765 3.164 12.0885 3.276C12.0085 3.38 11.9325 3.5 11.8605 3.636C11.7325 3.812 11.7085 3.912 11.7885 3.936C11.8685 3.96 12.0925 3.944 12.4605 3.888C12.6925 3.848 12.8605 3.872 12.9645 3.96C13.0685 4.048 13.1285 4.16 13.1445 4.296C13.1685 4.488 13.1485 4.604 13.0845 4.644C13.0205 4.684 12.8365 4.704 12.5325 4.704C12.3405 4.736 12.1765 4.756 12.0405 4.764C11.9045 4.764 11.8045 4.764 11.7405 4.764C11.6365 4.772 11.5685 4.776 11.5365 4.776C11.5045 4.776 11.4565 4.784 11.3925 4.8C11.3285 4.816 11.2805 4.844 11.2485 4.884C11.2245 4.916 11.1965 4.964 11.1645 5.028C11.1325 5.06 11.0845 5.144 11.0205 5.28C10.9565 5.416 10.8765 5.564 10.7805 5.724C10.6685 6.06 10.5725 6.384 10.4925 6.696C10.4205 7 10.3565 7.304 10.3005 7.608C10.2765 7.76 10.2805 7.872 10.3125 7.944C10.3525 8.008 10.4565 8.048 10.6245 8.064C10.7125 8.072 10.8405 8.072 11.0085 8.064C11.1765 8.048 11.3165 8.024 11.4285 7.992C11.5165 7.952 11.6085 7.912 11.7045 7.872C11.8005 7.824 11.8885 7.776 11.9685 7.728C12.0405 7.688 12.1125 7.648 12.1845 7.608C12.2565 7.56 12.2925 7.536 12.2925 7.536C12.3325 7.472 12.3885 7.484 12.4605 7.572C12.5405 7.652 12.5965 7.74 12.6285 7.836C12.6285 7.932 12.6085 8.048 12.5685 8.184C12.5285 8.312 12.3805 8.448 12.1245 8.592C11.7645 8.816 11.4045 8.952 11.0445 9C10.6845 9.048 10.4005 9.052 10.1925 9.012ZM14.5492 3.792C14.4692 3.8 14.3692 3.8 14.2492 3.792C14.1372 3.784 14.0692 3.708 14.0452 3.564C14.0372 3.508 14.0452 3.456 14.0692 3.408C14.0932 3.36 14.1252 3.308 14.1652 3.252C14.2612 3.092 14.3692 2.916 14.4892 2.724C14.6172 2.532 14.7012 2.376 14.7412 2.256C14.7412 2.224 14.7452 2.196 14.7532 2.172C14.6172 2.196 14.4772 2.148 14.3332 2.028C14.1812 1.884 14.1372 1.696 14.2012 1.464C14.2732 1.224 14.4132 1.032 14.6212 0.887999C14.7652 0.799999 14.9012 0.752 15.0292 0.744C15.1572 0.736 15.2932 0.764 15.4372 0.827999C15.5732 0.908 15.6852 1.032 15.7732 1.2C15.8612 1.36 15.8852 1.492 15.8452 1.596C15.8212 1.78 15.7772 1.952 15.7132 2.112C15.6572 2.272 15.6052 2.428 15.5572 2.58C15.5092 2.756 15.4092 2.944 15.2572 3.144C15.1132 3.336 14.9732 3.512 14.8372 3.672C14.8452 3.704 14.8212 3.724 14.7652 3.732C14.7092 3.74 14.6372 3.76 14.5492 3.792ZM14.9955 9.072C14.7235 8.96 14.5235 8.844 14.3955 8.724C14.2755 8.596 14.2275 8.484 14.2515 8.388C14.2675 8.34 14.2955 8.296 14.3355 8.256C14.3755 8.216 14.4635 8.2 14.5995 8.208C14.7435 8.208 14.9635 8.244 15.2595 8.316C15.3475 8.316 15.4355 8.312 15.5235 8.304C15.6115 8.296 15.6915 8.284 15.7635 8.268C15.8435 8.252 15.9075 8.232 15.9555 8.208C15.9955 8.192 16.0075 8.172 15.9915 8.148C15.9755 8.116 15.9475 8.084 15.9075 8.052C15.8755 8.012 15.8395 7.988 15.7995 7.98C15.7595 7.964 15.7235 7.956 15.6915 7.956C15.6755 7.916 15.6395 7.876 15.5835 7.836C15.5355 7.796 15.4755 7.752 15.4035 7.704C15.2275 7.56 15.0675 7.432 14.9235 7.32C14.7795 7.208 14.7235 7.124 14.7555 7.068C14.7555 7.036 14.7555 7.02 14.7555 7.02C14.7555 7.012 14.7555 7.008 14.7555 7.008C14.6995 7.008 14.6475 6.932 14.5995 6.78C14.5515 6.62 14.5275 6.476 14.5275 6.348C14.5275 6.188 14.5595 6.028 14.6235 5.868C14.6955 5.708 14.7835 5.556 14.8875 5.412C14.9995 5.268 15.1115 5.14 15.2235 5.028C15.3755 4.884 15.5355 4.744 15.7035 4.608C15.8795 4.464 16.0675 4.336 16.2675 4.224C16.4755 4.112 16.7035 4.024 16.9515 3.96C17.0635 3.936 17.1915 3.924 17.3355 3.924C17.4795 3.924 17.5835 3.944 17.6475 3.984C17.7115 3.944 17.7915 3.956 17.8875 4.02C17.9835 4.076 18.0795 4.156 18.1755 4.26C18.2715 4.364 18.3435 4.468 18.3915 4.572C18.3915 4.668 18.3875 4.788 18.3795 4.932C18.3795 5.068 18.3715 5.188 18.3555 5.292C18.3395 5.396 18.3035 5.448 18.2475 5.448C18.2475 5.448 18.2355 5.452 18.2115 5.46C18.1955 5.46 18.1875 5.48 18.1875 5.52C18.1875 5.6 18.1275 5.692 18.0075 5.796C17.8555 5.9 17.7115 5.984 17.5755 6.048C17.4395 6.112 17.3355 6.116 17.2635 6.06C17.2155 6.028 17.1715 5.996 17.1315 5.964C17.0915 5.932 17.0555 5.892 17.0235 5.844C17.0235 5.844 17.0115 5.828 16.9875 5.796C16.9715 5.756 16.9635 5.72 16.9635 5.688C16.9635 5.656 16.9755 5.628 16.9995 5.604C17.0235 5.572 17.0355 5.556 17.0355 5.556C17.1475 5.452 17.2315 5.356 17.2875 5.268C17.3515 5.18 17.3955 5.104 17.4195 5.04C17.4435 4.968 17.4555 4.912 17.4555 4.872C17.4555 4.824 17.4435 4.796 17.4195 4.788C17.4035 4.772 17.3635 4.764 17.2995 4.764C17.2595 4.764 17.1715 4.796 17.0355 4.86C16.9075 4.924 16.7715 5.004 16.6275 5.1C16.4835 5.188 16.3715 5.268 16.2915 5.34C16.2595 5.396 16.2355 5.432 16.2195 5.448C16.2115 5.464 16.1915 5.472 16.1595 5.472C16.1595 5.44 16.1395 5.444 16.0995 5.484C16.0595 5.524 16.0115 5.58 15.9555 5.652C15.8995 5.724 15.8435 5.8 15.7875 5.88C15.7315 5.96 15.6875 6.024 15.6555 6.072C15.6475 6.144 15.6275 6.212 15.5955 6.276C15.5715 6.332 15.5635 6.392 15.5715 6.456C15.5795 6.536 15.6195 6.612 15.6915 6.684C15.7635 6.756 15.8675 6.848 16.0035 6.96C16.2835 7.168 16.4915 7.332 16.6275 7.452C16.7715 7.572 16.8715 7.668 16.9275 7.74C16.9835 7.812 17.0195 7.884 17.0355 7.956C17.1715 8.204 17.1875 8.42 17.0835 8.604C16.9795 8.78 16.8195 8.916 16.6035 9.012C16.5235 9.052 16.3835 9.088 16.1835 9.12C15.9835 9.16 15.7715 9.176 15.5475 9.168C15.3315 9.168 15.1475 9.136 14.9955 9.072ZM24.9553 9.732C24.6353 9.652 24.3753 9.484 24.1753 9.228C23.9833 8.98 23.8273 8.68 23.7073 8.328C23.6993 8.224 23.6953 8.08 23.6953 7.896C23.7033 7.712 23.7153 7.54 23.7313 7.38C23.7473 7.22 23.7633 7.128 23.7793 7.104C23.8033 7.088 23.8153 7.04 23.8153 6.96C23.8073 6.928 23.8113 6.876 23.8273 6.804C23.8513 6.724 23.8753 6.644 23.8993 6.564C23.9393 6.468 23.9593 6.392 23.9593 6.336C23.9593 6.272 23.9553 6.224 23.9473 6.192C23.9473 6.192 23.9593 6.168 23.9833 6.12C24.0073 6.064 24.0353 6.02 24.0673 5.988C24.1153 5.94 24.1353 5.892 24.1273 5.844C24.1273 5.796 24.1273 5.772 24.1273 5.772C24.1193 5.74 24.1273 5.696 24.1513 5.64C24.1753 5.584 24.1993 5.54 24.2233 5.508C24.2393 5.492 24.2593 5.46 24.2833 5.412C24.3153 5.356 24.3313 5.328 24.3313 5.328C24.3313 5.304 24.3473 5.24 24.3793 5.136C24.4193 5.032 24.4633 4.92 24.5113 4.8C24.5593 4.672 24.6033 4.556 24.6433 4.452C24.6913 4.348 24.7273 4.28 24.7513 4.248V4.224C24.7833 4.144 24.8273 4.06 24.8833 3.972C24.8913 3.932 24.9113 3.868 24.9433 3.78C24.9753 3.684 25.0113 3.592 25.0513 3.504C25.1393 3.312 25.2473 3.096 25.3753 2.856C25.5113 2.608 25.6553 2.364 25.8073 2.124C25.9593 1.876 26.1033 1.656 26.2393 1.464C26.3833 1.264 26.5073 1.116 26.6113 1.02C26.7473 0.868 26.8833 0.76 27.0193 0.696C27.1633 0.624 27.2953 0.648 27.4153 0.767999C27.4713 0.824 27.5193 0.908 27.5593 1.02C27.5993 1.124 27.6153 1.224 27.6073 1.32C27.6073 1.408 27.5753 1.456 27.5113 1.464C27.4553 1.496 27.3793 1.588 27.2833 1.74C27.1873 1.884 27.0793 2.056 26.9593 2.256C26.8473 2.456 26.7353 2.664 26.6233 2.88C26.5113 3.088 26.4073 3.276 26.3113 3.444C26.2073 3.676 26.1113 3.88 26.0233 4.056C25.9353 4.224 25.8913 4.308 25.8913 4.308C25.8833 4.332 25.8753 4.352 25.8673 4.368C25.8593 4.384 25.8513 4.4 25.8433 4.416C25.7233 4.664 25.6233 4.892 25.5433 5.1C25.4633 5.3 25.3833 5.512 25.3033 5.736C25.2553 5.792 25.2273 5.848 25.2193 5.904C25.2113 5.96 25.2073 5.988 25.2073 5.988C25.1913 5.98 25.1793 6 25.1713 6.048C25.1633 6.088 25.1473 6.136 25.1233 6.192C25.0833 6.224 25.0593 6.276 25.0513 6.348C25.0433 6.412 25.0393 6.476 25.0393 6.54C24.9833 6.684 24.9313 6.86 24.8833 7.068C24.8353 7.268 24.7993 7.464 24.7753 7.656C24.7593 7.84 24.7553 7.984 24.7633 8.088C24.7793 8.224 24.8153 8.34 24.8713 8.436C24.9353 8.524 25.0233 8.596 25.1353 8.652C25.2233 8.692 25.3033 8.728 25.3753 8.76C25.4473 8.784 25.5113 8.796 25.5673 8.796C25.6313 8.804 25.7113 8.804 25.8073 8.796C25.9113 8.78 26.0513 8.756 26.2273 8.724H26.2153C26.3193 8.708 26.4273 8.688 26.5393 8.664C26.6593 8.632 26.7713 8.604 26.8753 8.58C26.9713 8.564 27.0633 8.548 27.1513 8.532C27.2393 8.508 27.3073 8.488 27.3553 8.472C27.5313 8.424 27.6713 8.384 27.7753 8.352C27.8873 8.32 27.9633 8.32 28.0033 8.352C28.0433 8.384 28.0873 8.444 28.1353 8.532C28.1833 8.62 28.1953 8.7 28.1713 8.772C28.1553 8.812 28.0753 8.892 27.9313 9.012C27.7873 9.14 27.6233 9.264 27.4393 9.384C27.2553 9.512 27.0873 9.6 26.9353 9.648C26.7753 9.72 26.5593 9.768 26.2873 9.792C26.0233 9.824 25.7673 9.832 25.5193 9.816C25.2713 9.8 25.0833 9.772 24.9553 9.732ZM31.0726 8.76C30.8326 8.896 30.5766 8.976 30.3046 9C30.0406 9.016 29.7926 8.98 29.5606 8.892C29.3286 8.796 29.1406 8.656 28.9966 8.472C28.9166 8.368 28.8406 8.204 28.7686 7.98C28.6966 7.748 28.6846 7.436 28.7326 7.044C28.7806 6.676 28.8926 6.304 29.0686 5.928C29.2526 5.552 29.4766 5.22 29.7406 4.932C30.0046 4.644 30.2926 4.448 30.6046 4.344C30.7166 4.304 30.8286 4.276 30.9406 4.26C31.0606 4.236 31.2166 4.232 31.4086 4.248C31.5926 4.272 31.7566 4.32 31.9006 4.392C32.0446 4.456 32.1486 4.528 32.2126 4.608C32.3406 4.736 32.4246 4.86 32.4646 4.98C32.5046 5.1 32.5206 5.216 32.5126 5.328C32.4726 5.584 32.3566 5.86 32.1646 6.156C31.9806 6.452 31.7206 6.672 31.3846 6.816C31.2486 6.872 31.0886 6.908 30.9046 6.924C30.7206 6.94 30.4686 6.916 30.1486 6.852C29.9566 6.812 29.8286 6.832 29.7646 6.912C29.7086 6.992 29.6846 7.148 29.6926 7.38C29.7086 7.524 29.7406 7.652 29.7886 7.764C29.8446 7.868 29.9446 7.94 30.0886 7.98C30.2726 8.012 30.4046 8.016 30.4846 7.992C30.5646 7.96 30.6646 7.916 30.7846 7.86C30.8486 7.82 30.9086 7.776 30.9646 7.728C31.0286 7.68 31.0886 7.632 31.1446 7.584C31.2086 7.536 31.2606 7.5 31.3006 7.476C31.3406 7.444 31.3806 7.424 31.4206 7.416C31.4606 7.408 31.5006 7.404 31.5406 7.404C31.6286 7.412 31.7126 7.46 31.7926 7.548C31.8726 7.636 31.9246 7.72 31.9486 7.8C31.9486 7.864 31.9086 7.956 31.8286 8.076C31.7486 8.188 31.6406 8.308 31.5046 8.436C31.3766 8.556 31.2326 8.664 31.0726 8.76ZM30.9166 6.084C30.9726 6.06 31.0526 6.004 31.1566 5.916C31.2686 5.828 31.3686 5.736 31.4566 5.64C31.5446 5.536 31.5886 5.456 31.5886 5.4C31.5886 5.312 31.5286 5.236 31.4086 5.172C31.2966 5.108 31.1486 5.096 30.9646 5.136C30.9006 5.152 30.8246 5.196 30.7366 5.268C30.6486 5.34 30.5606 5.424 30.4726 5.52C30.3846 5.608 30.3086 5.696 30.2446 5.784C30.1806 5.864 30.1366 5.928 30.1126 5.976C30.1446 6.016 30.2086 6.048 30.3046 6.072C30.4006 6.096 30.5046 6.108 30.6166 6.108C30.7366 6.108 30.8366 6.1 30.9166 6.084ZM33.6525 8.832C33.5885 8.848 33.5045 8.856 33.4005 8.856C33.2965 8.848 33.2045 8.836 33.1245 8.82C33.0525 8.796 33.0165 8.772 33.0165 8.748C33.0165 8.708 32.9965 8.688 32.9565 8.688C32.9565 8.688 32.9125 8.656 32.8245 8.592C32.7365 8.52 32.6565 8.468 32.5845 8.436C32.5125 8.324 32.4645 8.196 32.4405 8.052C32.4245 7.9 32.4725 7.636 32.5845 7.26C32.5925 7.004 32.6645 6.736 32.8005 6.456C32.9365 6.168 33.1085 5.888 33.3165 5.616C33.5245 5.344 33.7405 5.104 33.9645 4.896C34.1885 4.68 34.3885 4.52 34.5645 4.416C34.6765 4.304 34.8245 4.244 35.0085 4.236C35.2005 4.228 35.3685 4.264 35.5125 4.344C35.5925 4.384 35.6805 4.464 35.7765 4.584C35.8725 4.704 35.9645 4.832 36.0525 4.968C36.1405 5.096 36.2085 5.212 36.2565 5.316C36.2805 5.404 36.3005 5.484 36.3165 5.556C36.3405 5.62 36.3565 5.7 36.3645 5.796C36.3725 5.892 36.3645 6.036 36.3405 6.228C36.3005 6.372 36.2645 6.52 36.2325 6.672C36.2085 6.816 36.1965 6.964 36.1965 7.116C36.1805 7.268 36.1965 7.376 36.2445 7.44C36.3005 7.504 36.3805 7.508 36.4845 7.452C36.5805 7.404 36.6805 7.4 36.7845 7.44C36.8885 7.472 36.9605 7.536 37.0005 7.632C37.0485 7.72 37.0365 7.836 36.9645 7.98C36.9165 8.084 36.8405 8.184 36.7365 8.28C36.6325 8.376 36.5165 8.456 36.3885 8.52C36.2605 8.576 36.1365 8.604 36.0165 8.604C35.9285 8.604 35.8405 8.572 35.7525 8.508C35.6645 8.436 35.5845 8.34 35.5125 8.22C35.4405 8.1 35.3805 7.968 35.3325 7.824L35.2605 7.548L34.8285 7.944C34.7245 8.056 34.6205 8.16 34.5165 8.256C34.4205 8.344 34.3605 8.408 34.3365 8.448C34.2965 8.52 34.2165 8.584 34.0965 8.64C33.9845 8.696 33.8365 8.76 33.6525 8.832ZM33.9765 7.68C34.1125 7.6 34.2285 7.504 34.3245 7.392C34.4285 7.28 34.5285 7.156 34.6245 7.02C34.7205 6.876 34.8245 6.724 34.9365 6.564C35.0725 6.38 35.1685 6.232 35.2245 6.12C35.2885 6.008 35.3365 5.888 35.3685 5.76C35.3365 5.672 35.2925 5.58 35.2365 5.484C35.1805 5.38 35.1245 5.324 35.0685 5.316C34.9565 5.316 34.8205 5.384 34.6605 5.52C34.5085 5.656 34.3405 5.852 34.1565 6.108C34.1245 6.148 34.0845 6.212 34.0365 6.3C33.9885 6.388 33.9405 6.472 33.8925 6.552C33.8525 6.624 33.8245 6.672 33.8085 6.696C33.7845 6.728 33.7485 6.804 33.7005 6.924C33.6605 7.036 33.6245 7.152 33.5925 7.272C33.5605 7.384 33.5445 7.464 33.5445 7.512C33.5445 7.56 33.5485 7.612 33.5565 7.668C33.5725 7.724 33.6125 7.76 33.6765 7.776C33.7405 7.792 33.8405 7.76 33.9765 7.68ZM38.2863 8.748C38.2623 8.756 38.2103 8.752 38.1303 8.736C38.0583 8.72 37.9823 8.7 37.9023 8.676C37.8303 8.652 37.7863 8.632 37.7703 8.616C37.7383 8.584 37.6943 8.528 37.6383 8.448C37.5823 8.36 37.5503 8.244 37.5423 8.1C37.5423 7.956 37.6103 7.784 37.7463 7.584C37.7863 7.504 37.8343 7.384 37.8903 7.224C37.9463 7.064 38.0023 6.896 38.0583 6.72C38.1223 6.536 38.1783 6.372 38.2263 6.228C38.2823 6.084 38.3223 5.984 38.3463 5.928C38.3623 5.792 38.3543 5.696 38.3223 5.64C38.2983 5.576 38.2303 5.54 38.1183 5.532C38.0383 5.532 37.9743 5.504 37.9263 5.448C37.8863 5.392 37.8663 5.292 37.8663 5.148C37.8823 5.036 37.9103 4.94 37.9503 4.86C37.9983 4.772 38.0623 4.7 38.1423 4.644C38.2223 4.604 38.3223 4.576 38.4423 4.56C38.5703 4.544 38.6943 4.54 38.8143 4.548C38.9343 4.556 39.0183 4.584 39.0663 4.632C39.1223 4.664 39.1663 4.736 39.1983 4.848C39.2383 4.952 39.2703 5.06 39.2943 5.172C39.3183 5.284 39.3343 5.368 39.3423 5.424C39.4223 5.36 39.5103 5.272 39.6063 5.16C39.7103 5.04 39.8143 4.928 39.9183 4.824C40.0463 4.736 40.1983 4.648 40.3743 4.56C40.5503 4.464 40.6783 4.416 40.7583 4.416C40.8463 4.416 40.9543 4.46 41.0823 4.548C41.2103 4.628 41.2903 4.7 41.3223 4.764C41.4023 4.9 41.4583 5.044 41.4903 5.196C41.5303 5.34 41.5063 5.468 41.4183 5.58C41.3383 5.684 41.2263 5.788 41.0823 5.892C40.9383 5.988 40.7583 6.016 40.5423 5.976C40.4943 5.96 40.4423 5.9 40.3863 5.796C40.3383 5.692 40.3103 5.616 40.3023 5.568C40.3023 5.544 40.2663 5.568 40.1943 5.64C40.1303 5.704 40.0503 5.784 39.9543 5.88C39.8663 5.976 39.7823 6.064 39.7023 6.144C39.5663 6.312 39.4223 6.54 39.2703 6.828C39.1183 7.116 38.9383 7.464 38.7303 7.872C38.6343 8.072 38.5543 8.264 38.4903 8.448C38.4263 8.624 38.3583 8.724 38.2863 8.748ZM42.0945 8.592C42.0625 8.592 41.9865 8.564 41.8665 8.508C41.7465 8.444 41.6705 8.396 41.6385 8.364C41.5825 8.3 41.5465 8.232 41.5305 8.16C41.5145 8.08 41.5065 7.928 41.5065 7.704C41.5065 7.448 41.5585 7.16 41.6625 6.84C41.7665 6.512 41.9425 6.076 42.1905 5.532L42.6825 4.536C42.7225 4.48 42.7585 4.432 42.7905 4.392C42.8225 4.344 42.8585 4.3 42.8985 4.26C42.9145 4.26 42.9345 4.26 42.9585 4.26C42.9905 4.26 43.0145 4.264 43.0305 4.272C43.1025 4.28 43.2145 4.324 43.3665 4.404C43.5265 4.484 43.6225 4.604 43.6545 4.764C43.6545 4.868 43.6385 4.992 43.6065 5.136C43.5745 5.272 43.4785 5.452 43.3185 5.676C43.2545 5.756 43.1905 5.872 43.1265 6.024C43.0705 6.176 43.0185 6.32 42.9705 6.456C42.9625 6.472 42.9385 6.512 42.8985 6.576C42.8665 6.632 42.8345 6.692 42.8025 6.756C42.7705 6.812 42.7545 6.848 42.7545 6.864L42.7065 6.972L43.2225 6.468C43.5825 6.108 43.8865 5.852 44.1345 5.7C44.3825 5.548 44.5905 5.484 44.7585 5.508C44.9345 5.532 45.0745 5.632 45.1785 5.808C45.2345 5.888 45.2745 5.976 45.2985 6.072C45.3225 6.16 45.3385 6.264 45.3465 6.384C45.3545 6.504 45.3505 6.656 45.3345 6.84V7.524C45.4865 7.484 45.6025 7.452 45.6825 7.428C45.7625 7.396 45.8425 7.368 45.9225 7.344C45.9865 7.328 46.0505 7.312 46.1145 7.296C46.1865 7.28 46.2745 7.268 46.3785 7.26C46.3705 7.364 46.3265 7.492 46.2465 7.644C46.1665 7.796 46.0665 7.948 45.9465 8.1C45.8345 8.252 45.7105 8.38 45.5745 8.484C45.4465 8.588 45.3265 8.64 45.2145 8.64C45.1105 8.64 44.9905 8.608 44.8545 8.544C44.7185 8.472 44.6025 8.336 44.5065 8.136C44.4745 8.032 44.4425 7.912 44.4105 7.776C44.3785 7.64 44.3625 7.496 44.3625 7.344V6.816C44.3625 6.768 44.3585 6.736 44.3505 6.72C44.3505 6.696 44.3465 6.684 44.3385 6.684C44.3065 6.684 44.2025 6.768 44.0265 6.936C43.8585 7.104 43.6865 7.28 43.5105 7.464C43.1425 7.848 42.8345 8.132 42.5865 8.316C42.3465 8.5 42.1825 8.592 42.0945 8.592ZM51.7086 9.504C51.6766 9.536 51.6406 9.548 51.6006 9.54C51.5606 9.54 51.4966 9.52 51.4086 9.48C51.2566 9.44 51.1206 9.352 51.0006 9.216C50.8886 9.08 50.8726 8.924 50.9526 8.748C50.9846 8.692 51.0246 8.572 51.0726 8.388C51.1286 8.196 51.1886 7.976 51.2526 7.728C51.3166 7.48 51.3806 7.232 51.4446 6.984C51.5086 6.736 51.5646 6.52 51.6126 6.336C51.6606 6.144 51.6926 6.016 51.7086 5.952C51.7086 5.888 51.7246 5.76 51.7566 5.568C51.7966 5.376 51.8326 5.16 51.8646 4.92C51.9526 4.752 52.0126 4.568 52.0446 4.368C52.0846 4.168 52.1126 4.024 52.1286 3.936C52.1606 3.808 52.1966 3.672 52.2366 3.528C52.2846 3.384 52.3246 3.24 52.3566 3.096C52.3886 2.968 52.4206 2.836 52.4526 2.7C52.4926 2.564 52.5126 2.476 52.5126 2.436V2.244H52.0686C51.9486 2.252 51.8126 2.252 51.6606 2.244C51.5086 2.236 51.3406 2.232 51.1566 2.232C50.7806 2.216 50.5286 2.18 50.4006 2.124C50.2806 2.06 50.2126 1.94 50.1966 1.764C50.1806 1.668 50.2006 1.584 50.2566 1.512C50.3126 1.432 50.4446 1.368 50.6526 1.32C50.8606 1.272 51.1806 1.256 51.6126 1.272C51.9486 1.256 52.2126 1.256 52.4046 1.272C52.5966 1.28 52.7086 1.284 52.7406 1.284C52.7726 1.252 52.7926 1.22 52.8006 1.188C52.8086 1.156 52.8206 1.124 52.8366 1.092C52.8366 1.052 52.8406 1.008 52.8486 0.96C52.8646 0.904 52.9046 0.864 52.9686 0.84C53.0326 0.72 53.1526 0.671999 53.3286 0.696C53.5126 0.711999 53.6486 0.783999 53.7366 0.912C53.7686 0.984 53.7766 1.06 53.7606 1.14C53.7526 1.22 53.7766 1.292 53.8326 1.356C53.8646 1.324 53.9486 1.304 54.0846 1.296C54.2206 1.288 54.3646 1.28 54.5166 1.272C54.7006 1.272 54.8646 1.268 55.0086 1.26C55.1526 1.244 55.2526 1.236 55.3086 1.236C55.3806 1.196 55.4726 1.176 55.5846 1.176C55.7046 1.176 55.8246 1.184 55.9446 1.2C56.1286 1.2 56.2566 1.248 56.3286 1.344C56.4086 1.432 56.4606 1.496 56.4846 1.536C56.4846 1.568 56.4846 1.6 56.4846 1.632C56.4926 1.664 56.5126 1.696 56.5446 1.728C56.5766 1.76 56.5926 1.784 56.5926 1.8C56.5926 1.808 56.5766 1.844 56.5446 1.908C56.5126 1.94 56.4566 1.968 56.3766 1.992C56.2966 2.008 56.2086 2.016 56.1126 2.016C56.0566 2.016 55.9606 2.024 55.8246 2.04C55.6886 2.048 55.5726 2.052 55.4766 2.052C55.2926 2.084 55.1126 2.112 54.9366 2.136C54.7606 2.152 54.5326 2.168 54.2526 2.184C54.1326 2.184 54.0206 2.192 53.9166 2.208C53.8126 2.216 53.7606 2.24 53.7606 2.28C53.7286 2.28 53.6846 2.364 53.6286 2.532C53.5806 2.7 53.5326 2.876 53.4846 3.06C53.4366 3.268 53.3846 3.448 53.3286 3.6C53.2806 3.752 53.2406 3.852 53.2086 3.9C53.2406 3.932 53.2526 3.972 53.2446 4.02C53.2446 4.068 53.2206 4.152 53.1726 4.272C53.1406 4.384 53.1086 4.472 53.0766 4.536C53.0526 4.6 53.0406 4.664 53.0406 4.728C53.0406 4.728 53.0206 4.792 52.9806 4.92C52.9486 5.04 52.9166 5.192 52.8846 5.376C52.8686 5.552 52.8446 5.7 52.8126 5.82C52.7886 5.94 52.7606 6.016 52.7286 6.048C52.7286 6.048 52.7126 6.076 52.6806 6.132C52.6486 6.18 52.6326 6.236 52.6326 6.3C52.6326 6.372 52.6166 6.492 52.5846 6.66C52.5606 6.82 52.5326 6.972 52.5006 7.116C52.4686 7.26 52.4406 7.34 52.4166 7.356C52.4966 7.372 52.4846 7.48 52.3806 7.68C52.3806 7.76 52.3686 7.84 52.3446 7.92C52.3206 8 52.3086 8.056 52.3086 8.088C52.2606 8.24 52.1926 8.424 52.1046 8.64C52.0166 8.856 51.9326 9.048 51.8526 9.216C51.7806 9.384 51.7326 9.48 51.7086 9.504ZM55.047 8.892C54.735 8.764 54.519 8.556 54.399 8.268C54.279 7.98 54.247 7.596 54.303 7.116C54.319 6.868 54.311 6.704 54.279 6.624C54.247 6.536 54.187 6.452 54.099 6.372C54.075 6.34 54.019 6.288 53.931 6.216C53.843 6.136 53.803 6.076 53.811 6.036C53.803 5.98 53.815 5.912 53.847 5.832C53.879 5.744 53.907 5.696 53.931 5.688C53.987 5.664 54.043 5.636 54.099 5.604C54.163 5.572 54.211 5.564 54.243 5.58C54.275 5.58 54.323 5.6 54.387 5.64C54.459 5.68 54.495 5.716 54.495 5.748C54.527 5.804 54.575 5.78 54.639 5.676C54.711 5.572 54.787 5.44 54.867 5.28C54.947 5.152 55.047 5.032 55.167 4.92C55.287 4.808 55.407 4.708 55.527 4.62C55.655 4.524 55.763 4.452 55.851 4.404C55.891 4.388 55.967 4.364 56.079 4.332C56.199 4.3 56.323 4.276 56.451 4.26C56.579 4.236 56.675 4.228 56.739 4.236C56.883 4.244 57.035 4.304 57.195 4.416C57.355 4.528 57.479 4.632 57.567 4.728C57.671 4.8 57.739 4.912 57.771 5.064C57.811 5.208 57.827 5.36 57.819 5.52C57.811 5.68 57.779 5.816 57.723 5.928C57.699 6.008 57.615 6.12 57.471 6.264C57.327 6.408 57.167 6.548 56.991 6.684C56.823 6.812 56.679 6.9 56.559 6.948C56.455 6.972 56.331 6.992 56.187 7.008C56.043 7.016 55.907 7.016 55.779 7.008C55.659 6.992 55.575 6.972 55.527 6.948C55.471 6.916 55.423 6.928 55.383 6.984C55.351 7.032 55.323 7.168 55.299 7.392C55.291 7.48 55.291 7.556 55.299 7.62C55.315 7.684 55.331 7.732 55.347 7.764C55.403 7.86 55.459 7.932 55.515 7.98C55.571 8.02 55.675 8.032 55.827 8.016C55.979 8 56.131 7.908 56.283 7.74C56.443 7.564 56.587 7.424 56.715 7.32C56.747 7.264 56.815 7.228 56.919 7.212C57.031 7.188 57.163 7.196 57.315 7.236C57.403 7.292 57.443 7.38 57.435 7.5C57.435 7.62 57.371 7.796 57.243 8.028C57.219 8.084 57.151 8.168 57.039 8.28C56.935 8.384 56.819 8.492 56.691 8.604C56.571 8.708 56.471 8.784 56.391 8.832C56.151 8.96 55.915 9.02 55.683 9.012C55.451 9.004 55.239 8.964 55.047 8.892ZM55.935 6.192C56.055 6.16 56.155 6.128 56.235 6.096C56.323 6.064 56.407 6.012 56.487 5.94C56.567 5.868 56.659 5.76 56.763 5.616C56.795 5.528 56.811 5.452 56.811 5.388C56.819 5.324 56.815 5.284 56.799 5.268C56.735 5.204 56.663 5.184 56.583 5.208C56.511 5.224 56.431 5.264 56.343 5.328C56.287 5.352 56.207 5.404 56.103 5.484C56.007 5.556 55.911 5.64 55.815 5.736C55.727 5.824 55.655 5.908 55.599 5.988C55.551 6.06 55.543 6.104 55.575 6.12C55.559 6.152 55.603 6.172 55.707 6.18C55.819 6.188 55.895 6.192 55.935 6.192ZM59.5229 9.048C59.2909 9.088 59.0589 9.068 58.8269 8.988C58.6029 8.908 58.4149 8.78 58.2629 8.604C58.1189 8.42 58.0469 8.2 58.0469 7.944C58.0229 7.704 58.0429 7.42 58.1069 7.092C58.1789 6.756 58.2829 6.42 58.4189 6.084C58.5629 5.748 58.7269 5.464 58.9109 5.232C59.0709 5.04 59.2309 4.864 59.3909 4.704C59.5509 4.544 59.6949 4.436 59.8229 4.38C59.9349 4.332 60.0709 4.296 60.2309 4.272C60.3989 4.24 60.5149 4.224 60.5789 4.224C60.7069 4.256 60.8469 4.308 60.9989 4.38C61.1589 4.452 61.2389 4.536 61.2389 4.632C61.2389 4.632 61.2469 4.644 61.2629 4.668C61.2869 4.684 61.2989 4.692 61.2989 4.692C61.3469 4.692 61.3989 4.752 61.4549 4.872C61.5189 4.984 61.5669 5.116 61.5989 5.268C61.6309 5.412 61.6229 5.528 61.5749 5.616C61.5429 5.768 61.4789 5.916 61.3829 6.06C61.2949 6.204 61.2189 6.276 61.1549 6.276C61.1229 6.276 61.0909 6.28 61.0589 6.288C61.0349 6.288 61.0229 6.308 61.0229 6.348C61.0229 6.388 60.9789 6.408 60.8909 6.408C60.8109 6.408 60.7269 6.392 60.6389 6.36C60.5509 6.328 60.4949 6.28 60.4709 6.216C60.4709 6.176 60.4789 6.124 60.4949 6.06C60.5109 5.996 60.5349 5.888 60.5669 5.736C60.6149 5.512 60.6189 5.364 60.5789 5.292C60.5389 5.212 60.4389 5.204 60.2789 5.268C60.0789 5.38 59.9149 5.512 59.7869 5.664C59.6589 5.808 59.5429 6.012 59.4389 6.276C59.3429 6.54 59.2349 6.908 59.1149 7.38C59.0669 7.564 59.0589 7.708 59.0909 7.812C59.1309 7.916 59.1629 7.972 59.1869 7.98C59.2989 8.012 59.4189 8.02 59.5469 8.004C59.6829 7.98 59.7949 7.944 59.8829 7.896C60.0109 7.832 60.1229 7.764 60.2189 7.692C60.3229 7.612 60.4349 7.528 60.5549 7.44C60.5949 7.416 60.6309 7.372 60.6629 7.308C60.6949 7.236 60.7429 7.184 60.8069 7.152C60.8709 7.056 60.9509 7.008 61.0469 7.008C61.1509 7 61.2509 6.996 61.3469 6.996C61.4109 7.012 61.4789 7.052 61.5509 7.116C61.6229 7.18 61.6749 7.244 61.7069 7.308C61.7469 7.364 61.7429 7.404 61.6949 7.428C61.6629 7.428 61.6429 7.44 61.6349 7.464C61.6349 7.48 61.6349 7.488 61.6349 7.488C61.6509 7.52 61.6149 7.592 61.5269 7.704C61.4469 7.816 61.3429 7.936 61.2149 8.064C61.0869 8.192 60.9629 8.304 60.8429 8.4C60.7309 8.488 60.6509 8.532 60.6029 8.532C60.5229 8.532 60.4829 8.556 60.4829 8.604C60.4829 8.62 60.4229 8.66 60.3029 8.724C60.1909 8.788 60.0589 8.852 59.9069 8.916C59.7629 8.98 59.6349 9.024 59.5229 9.048ZM66.114 8.808C65.914 8.904 65.718 8.94 65.526 8.916C65.342 8.884 65.186 8.784 65.058 8.616C64.938 8.44 64.878 8.184 64.878 7.848C64.878 7.76 64.882 7.656 64.89 7.536C64.906 7.408 64.93 7.276 64.962 7.14C64.994 6.996 65.034 6.852 65.082 6.708C65.106 6.636 65.138 6.564 65.178 6.492C65.226 6.42 65.234 6.384 65.202 6.384C65.17 6.384 65.13 6.404 65.082 6.444C65.042 6.484 65.01 6.516 64.986 6.54C64.786 6.716 64.602 6.9 64.434 7.092C64.274 7.276 64.13 7.46 64.002 7.644C63.882 7.82 63.786 7.984 63.714 8.136C63.65 8.288 63.618 8.416 63.618 8.52C63.618 8.64 63.558 8.724 63.438 8.772C63.318 8.82 63.214 8.816 63.126 8.76C62.974 8.672 62.834 8.536 62.706 8.352C62.586 8.168 62.538 7.928 62.562 7.632C62.586 7.256 62.618 6.92 62.658 6.624C62.698 6.328 62.762 6.008 62.85 5.664C62.946 5.312 63.07 4.884 63.222 4.38C63.326 4.1 63.422 3.836 63.51 3.588C63.598 3.332 63.674 3.116 63.738 2.94C63.81 2.764 63.854 2.656 63.87 2.616C63.91 2.576 63.962 2.48 64.026 2.328C64.09 2.168 64.146 2.008 64.194 1.848C64.25 1.688 64.278 1.592 64.278 1.56C64.278 1.496 64.29 1.44 64.314 1.392C64.346 1.344 64.374 1.3 64.398 1.26C64.446 1.148 64.486 1.072 64.518 1.032C64.558 0.984 64.594 0.96 64.626 0.96C64.666 0.96 64.73 0.98 64.818 1.02C64.914 1.06 65.002 1.112 65.082 1.176C65.17 1.232 65.222 1.292 65.238 1.356C65.294 1.468 65.326 1.584 65.334 1.704C65.342 1.816 65.314 1.956 65.25 2.124C65.186 2.292 65.074 2.524 64.914 2.82C64.786 3.068 64.67 3.324 64.566 3.588C64.462 3.852 64.362 4.128 64.266 4.416C64.226 4.536 64.174 4.696 64.11 4.896C64.046 5.088 63.982 5.288 63.918 5.496C63.862 5.696 63.814 5.876 63.774 6.036C63.734 6.196 63.714 6.3 63.714 6.348C63.714 6.404 63.746 6.432 63.81 6.432C63.874 6.424 63.938 6.376 64.002 6.288C64.034 6.224 64.086 6.164 64.158 6.108C64.23 6.044 64.294 5.98 64.35 5.916C64.414 5.836 64.49 5.744 64.578 5.64C64.674 5.528 64.774 5.424 64.878 5.328C64.99 5.224 65.09 5.14 65.178 5.076C65.274 5.012 65.354 4.98 65.418 4.98C65.57 4.98 65.698 5.024 65.802 5.112C65.906 5.2 65.994 5.336 66.066 5.52C66.09 5.544 66.114 5.576 66.138 5.616C66.162 5.648 66.178 5.672 66.186 5.688C66.226 5.72 66.246 5.848 66.246 6.072C66.246 6.288 66.182 6.588 66.054 6.972C65.982 7.268 65.938 7.488 65.922 7.632C65.914 7.776 65.942 7.848 66.006 7.848C66.006 7.848 66.046 7.824 66.126 7.776C66.214 7.728 66.306 7.676 66.402 7.62C66.634 7.468 66.802 7.42 66.906 7.476C67.01 7.532 67.062 7.604 67.062 7.692C67.062 7.764 67.034 7.848 66.978 7.944C66.93 8.04 66.906 8.104 66.906 8.136C66.906 8.136 66.906 8.14 66.906 8.148C66.906 8.148 66.906 8.164 66.906 8.196C66.906 8.212 66.854 8.268 66.75 8.364C66.646 8.46 66.53 8.556 66.402 8.652C66.282 8.74 66.186 8.792 66.114 8.808Z"
                                  fill={curstyle().colors.main_s}/>
                        </svg>
                    </div>
                </Box>
                {/*<div className={headline.title}>localpiazza</div>*/}

                <HeadLineLogPart></HeadLineLogPart>
                {/*</Box>*/}
            </Box>
        );
    }
}