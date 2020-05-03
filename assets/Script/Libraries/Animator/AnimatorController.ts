import { AnimatorState } from "./AnimatorState";
import { XDictionary } from "./Base/XDictionary";
import { AnimatorParams } from "./AnimatorParams";
import Animator from "./Animator";

export interface AnimationPlayer{
    PlayAnimation(aniName:string,loop?:boolean):void;
    ScaleTime(scale:number):void;

}

//状态机逻辑事件处理的对外接口
//!!! AnimationPlayer 与  StateLogicEvent 触发条件很类似，后期需要优化成一个接口或者一个基类
export interface AnimatorStateLogicEvent {
    OnStateChange(fromState:string, toState:string):void;
}

export class AnimationController{
    private m_loaded:boolean = false;
    private m_stateData:any;

    private m_states:XDictionary<AnimatorState>;

    private m_curState:AnimatorState;

    private m_param:AnimatorParams;
    private m_player:AnimationPlayer;
    private m_anyState:AnimatorState;

    public get Params():AnimatorParams{
        return this.m_param;
    }

    constructor(player:AnimationPlayer,resUrl:string){
        this.m_player = player;
        this.m_states = new XDictionary<AnimatorState>();
        this.m_param = new AnimatorParams();
        cc.loader.load(resUrl, function(err,res){       
            if (err) {  
                cc.log(err);  
            }else{  
                console.log("Res:" + JSON.stringify(res));
                this.m_stateData=res;
                this.m_loaded = true;
                this.onLoad(res["json"]);
            }  
        }.bind(this));  
    }

    private onLoad(res:any):void{
        if(res.state.length!==0){
            let defaultState:string;
            for (let i = 0; i < res.state.length; i++) {
                let state:AnimatorState = new AnimatorState(res.state[i],this);
                this.m_states.Add(state.name,state);
                if(state.default){
                    defaultState = state.name;
                }

                if(state.name == "anyState"){
                    this.m_anyState = state;
                }
            }
            this.ChangeState(defaultState);

        }
    }



    private onAnimationComplete():void{
        this.m_curState.onComplete();
        if(this.m_curState!=this.m_anyState && this.m_anyState!=null)
            this.m_anyState.onComplete();
    }

    public onAnimationEvent():void{
        this.onAnimationComplete();
    }
    public onTriggerEvent(eventName:string):boolean{
        if(this.m_curState.onTrigger(eventName)){
            return true;
        }

        if(this.m_curState!=this.m_anyState && this.m_anyState!=null){
            return this.m_anyState.onTrigger(eventName);
        }

        return false;
    }


    public PlayAnimation(aniName:string):void{
        this.m_player.PlayAnimation(aniName);
    }

    public ScaleTime(scale:number):void{
        this.m_player.ScaleTime(scale);
    }

    public ChangeState(stateName:string):void{
        // if (this.m_curState != null) {
        //     cc.log("==== m_curState " + this.m_curState.name + "  newState  " + stateName);
        // }

        if( this.m_states.ContainsKey(stateName) && (this.m_curState==null || this.m_curState.name!=stateName )){
            // if(this.m_curState!=null)
            //     cc.log("ChangeState:{"+this.m_curState.name+"===>"+stateName+"}");
            // else 
            //     cc.log("ChangeState:{ Empty ===>"+stateName+"}");
            let oldState = this.m_curState;
            this.m_curState = this.m_states[stateName];

            if(this.m_curState.animation && this.m_curState.animation!=""){
               this.m_player.PlayAnimation(this.m_curState.animation,this.m_curState.loop);
                if (this.m_player instanceof Animator) {
                    let oldStateName = "";
                    if (oldState) {
                        oldStateName = oldState.name;
                    }
                    this.m_player.OnStateChange(oldStateName, this.m_curState.name);
                }

            }

            this.m_curState.update();
            if(this.m_curState!=this.m_anyState && this.m_anyState!=null)
                this.m_anyState.update();
        }
    }
    public get curStateName():string{
        return this.m_curState.name;
    }

    public update():void{
        if(!this.m_loaded) return;
        this.m_curState.update();
        if(this.m_curState!=this.m_anyState && this.m_anyState!=null)
            this.m_anyState.update();
    }
}
// ————————————————
// 版权声明：本文为CSDN博主「叫我上上」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/vikingsc2007_1/java/article/details/81070029