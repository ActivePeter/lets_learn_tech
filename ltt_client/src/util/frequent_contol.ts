export class FrequentControl{
    private timeout:NodeJS.Timeout|undefined= undefined
    update(ms_threshold:number,cb:()=>void){
        if(this.timeout!=undefined){
            clearTimeout(this.timeout)
        }
        this.timeout=setTimeout(cb,ms_threshold)
    }
}