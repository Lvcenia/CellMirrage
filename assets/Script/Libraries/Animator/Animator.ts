import { AnimationController, AnimationPlayer, AnimatorStateLogicEvent } from "./AnimatorController";
import { AnimatorParams } from "./AnimatorParams";


const {ccclass, property,requireComponent} = cc._decorator;

@ccclass
@requireComponent(cc.Animation)
export default class AnimatorCocos extends cc.Component implements AnimationPlayer,AnimatorStateLogicEvent{


    @property(
        {
            url:cc.RawAsset;
            displayName: '状态机文件',
            tooltip: "文件名 *_anim.json",
        }
    )
    assetRawUrl:string = "";


    @property(
        {
            type: cc.Boolean,
            displayName: '自身触发更新',
            tooltip: "是否由自身触发状态更新"
        }
    )
    autoUpdate:boolean = true;



    animation:cc.Animation = null;

    listeners:Array<Function>;

    onLoad():void{
        this.listeners = new Array<Function>();
        this.animation = this.getComponent(cc.Animation);
        if(this.assetRawUrl!=null){
            this.setUrl(this.assetRawUrl);
        }

        this.animation.on('finished',  this.onFinished,    this);
    }

    private onFinished():void
    {
        this.animatorController.onAnimationEvent();
    } 


    public Trigger(eventName:string):boolean{
        return this.animatorController.onTriggerEvent(eventName);
    }

    public addEventListener(cb:Function):void{
        this.listeners.push(cb);
    }


    public get curStateName():string{
        return this.animatorController.curStateName;
    }


    private animatorController:AnimationController;

    public setUrl(url:string){
        this.animatorController = new AnimationController(this,url);
    }


    public get Params():AnimatorParams{
        return this.animatorController.Params;
    }

    update(dt:number){
        if(this.autoUpdate)
            this.animatorController.update();
    }


    fixUpdate(dt:number){
        if(!this.autoUpdate)
            this.animatorController.update();
    }

    private animState:cc.AnimationState;

    PlayAnimation(aniName: string,loop?:boolean): void {
        loop = loop?loop:false;

        this.animState = this.animation.play(aniName);
        this.animState.wrapMode = loop?cc.WrapMode.Loop:cc.WrapMode.Default;
    }
    ScaleTime(scale: number): void {
        if(scale>0 &&  this.animState)
            this.animState.speed = scale;
    }

    OnStateChange(from:string,to:string)
    {
        console.log("from:" + from + " " + "to: " + to);
    }

}
// ————————————————
// 版权声明：本文为CSDN博主「叫我上上」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/vikingsc2007_1/java/article/details/81070029