import { Store } from 'react-notifications-component';
type NotifyType="success"|"danger"|"info"|"default"|"warning"
export const NotifyTypes={
    success:"success" as NotifyType,
    danger:"danger" as NotifyType,
    info:"info" as NotifyType,
    default:"default" as NotifyType,
    warning:"warning" as NotifyType
}
export namespace Notify{

    export function common(type:NotifyType,title:string,msg:string){
        Store.addNotification({
            title: title,
            message: msg,
            type: type,
            insert: "bottom",
            container: "bottom-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        });
    }
    export function warn(title:string,msg:string){
        Store.addNotification({
            title: title,
            message: msg,
            type: NotifyTypes.warning,
            insert: "bottom",
            container: "bottom-right",
            animationIn: ["animate__animated", "animate__fadeIn"],
            animationOut: ["animate__animated", "animate__fadeOut"],
            dismiss: {
                duration: 5000,
                onScreen: true
            }
        });
    }
}