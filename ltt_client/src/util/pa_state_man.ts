import {PaState, PaStateProxy} from "@/store/pastate";

class _PaStateMan{
    private _state=new PaState();
    private _comps:any={}
    private _nextcompid=0;
    private _valkey2compids:any={}
    private _recentgetkey=""
    private _recentgetkeystack:string[]=[]
    private _recentgetkeystackpos=0
    private recentgetkeystackcombine(){
        let c=""
        for(let i=0;i<=this._recentgetkeystackpos;i++){
            c+="$"+this._recentgetkeystack[i];
        }
        return c;
    }
    regist_comp(comp:any,
                cb:(registval:(valinstate:any,aftchange?:(from:any)=>void)=>void,
                    state:PaState)=>void){
        this._comps[this._nextcompid+""]=comp;
        comp.___id___=this._nextcompid;
        this._nextcompid++;
        const regist_val2comp=(valaddr:any,aftchange?:(from:any)=>void)=>{
            const c=this.recentgetkeystackcombine()
            if(!(c in this._valkey2compids)){
                this._valkey2compids[c]={}
            }
            if(!aftchange){
                aftchange=()=>{}
            }
            this._valkey2compids[c][comp.___id___+""]=aftchange;

            console.log("regist val",c,comp.___id___,)
        }
        cb(regist_val2comp,this._state);
    }
    unregist_comp(comp:any){
        delete this._comps[comp.___id___]
    }
    private statep=new PaStateProxy(this._state);
    getstate():PaStateProxy{
        return this.statep
    }
    private _val_ope(oldval:any,val:any){
        const id_2_afterchange:any={}
        const key=this.recentgetkeystackcombine();
        console.log("_val_ope",key,val)
        if(key in this._valkey2compids){
            let delids:string[]=[]
            const ids=Object.keys(this._valkey2compids[key]);

            // console.log("notify comp",ids)
            for(const i in ids){
                const id:string=ids[i];

                if(this._comps[id]){
                    id_2_afterchange[id]=()=>{
                        this._valkey2compids[key][id]();//执行afterchange
                        this._comps[id].forceUpdate();
                    }
                }else{
                    delids.push(id)
                }
            }
            delids.forEach((v)=>{
                delete this._valkey2compids[v]
            })
        }


        if(!(val instanceof Array)&&val instanceof Object){
            for(const key in val){
                if(key.indexOf("_")==0){
                    const kk=key.slice(1)
                    const v1=oldval?.[kk]
                    const v2=val?.[kk]
                    if(v1!=v2){
                        // console.log(v1,v2)
                        this._val_ope(v1,v2)
                    }
                }
            }
        }

        for(const key in id_2_afterchange){
            id_2_afterchange[key]()
        }
    }

    constructor() {
        let keylisten=(state:object,level:number)=>{
            if(level+1>this._recentgetkeystack.length){
                //记录访问state的key的层数
                this._recentgetkeystack.push("");
            }
            let keys=Object.keys(state);
            let _this=this
            // console.log("state loaded")
            for(const keyi in keys){
                const key=keys[keyi];
                // console.log("state hook",key)
                // @ts-ignore
                const obj=state["_"+key]=state[key];
                let isobj=false
                if(!(obj instanceof Array)&&obj instanceof Object){
                    // @ts-ignore
                    keylisten(obj,level+1)
                    isobj=true
                }
                // @ts-ignore
                delete state[key];

                //覆盖state访问key操作
                Object.defineProperty(state, key, {
                    get: function() { //取值的时候会触发
                        _this._recentgetkey=key
                        _this._recentgetkeystackpos=level
                        _this._recentgetkeystack[_this._recentgetkeystackpos]=_this._recentgetkey
                        // console.log("gethook")
                        // console.log('get: ', age);
                        // @ts-ignore
                        return state["_"+key];
                    },
                    set: function(value) { //更新值的时候会触发
                        _this._recentgetkey=key
                        _this._recentgetkeystackpos=level
                        _this._recentgetkeystack[_this._recentgetkeystackpos]=_this._recentgetkey
                        // @ts-ignore
                        // console.log("sethook",state["_"+key],value)
                        // @ts-ignore
                        if(state["_"+key]!=value){
                            // @ts-ignore
                            const old=state["_"+key];
                            // @ts-ignore
                            state["_"+key]=value;
                            if(isobj&&value){
                                keylisten(value,level+1)
                            }
                            _this._val_ope(old,value)
                        }
                    }
                });
            }
        }
        keylisten(this._state,0)
    }
}
export function ResetPaStateMan(){
    PaStateMan= new _PaStateMan()
}
export var PaStateMan= new _PaStateMan()