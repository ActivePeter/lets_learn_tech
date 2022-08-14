export namespace Rules{
    export function check_email(email:string){
        var reg = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/;
        return reg.test(email);
    }
    export function check_verify(v:string){
        var reg=/^[0-9]*$/;
        return reg.test(v)
    }
}