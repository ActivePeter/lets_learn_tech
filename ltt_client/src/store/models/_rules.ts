export namespace Rules{
    export function check_email(email:string){
        var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        return reg.test(email);
    }
}