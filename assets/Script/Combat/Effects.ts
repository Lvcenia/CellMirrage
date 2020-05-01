// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { MessageManager } from "../MessageSystem/MessageManager";
import { Message } from "../MessageSystem/Message";
import Effector from "./Effector";
import CharacterStatus from "./CharacterStatus";
import { EffectTemplates } from "../DataTemplates/EffectTemplates";

const {ccclass, property} = cc._decorator;


/**
 * 效果系统可以改变的属性种类
 * C代表战斗属性CombatProperties
 * T代表Transform
 * P代表Physics
 */
export var EffectBehaviour = {
    Instant:"Instant",
    OnOff:"OnOff",
    TimeBased:"TimeBased"

}



/**
 * 游戏中一切对玩家和怪物的属性造成改变的对象都是效果
 * (学的是只狼的设计模式)
 * 战斗系统的扣血、异常状态等等都通过效果来实现
 * 这个类用来描述一个效果的具体参数，因为可能也不需要很多种继承
 * 所以就直接把一堆属性全都搬到一起了
 */
@ccclass("EffectParam")
export class EffectParam{
    /**构造函数，填的时候使用EffectTemplates.xxxx.Name这样的格式 */
    constructor(effectName:string){
        var dv = EffectTemplates[effectName].deltaValue;
        this.ID = EffectTemplates[effectName].ID;
        this.Name = EffectTemplates[effectName].Name;
        this.Duratin = EffectTemplates[effectName].Duration;
        this.Type = EffectTemplates[effectName].Type;
        this.cycleTime = EffectTemplates[effectName].cycleTime;
        this.deltaValue = new cc.Vec3(dv.x,dv.y,dv.z);
        this.isCycle = EffectTemplates[effectName].isCycle;
        this.isPercentage = EffectTemplates[effectName].isPercentage;
        this.isTemporary = EffectTemplates[effectName].isTemporary;
        this.isStackable = EffectTemplates[effectName].isStackable;
        this.maxStackNum = EffectTemplates[effectName].maxStackNum;
        this.percentFactor = EffectTemplates[effectName].percentFactor;
        this.percentBase = EffectTemplates[effectName].percentBase;
        
    }
    /**
     * 效果的ID
     */
    @property()
    public ID:number = 0;
    /**
     * 效果名
     */
    @property()
    public Name:string ;
    /**
     * 效果的大类
     */
    @property()
    public Type:string
    /**
     * 是否会在结束以后把属性值恢复到使用前的状态
     */
    @property()
    public isTemporary:boolean;
    /**
     * 效果的持续时间
     */
    @property()
    public Duratin:number;
    /** 
     * 能否叠加
    */
    @property()
    public isStackable:boolean;
    /** 
     * 最大层数
    */
   @property()
   public maxStackNum:number;
    /**
     * 修改的数值量，四维向量
     * 一维属性取第一位，二维取头两位，以此类推
     * 如果isOffset为假，用该值直接替换原值
     */
    @property()
    public deltaValue:cc.Vec3;
    /**
     * 是否周期性施加
     */
    @property()
    public isCycle:boolean;
    /**
     * 单个周期的长度
     * 总周期数等于Duration/cycleTime
     */
    @property()
    public cycleTime:number;
    /**
     * 是否是百分比改变效果
     */
    @property()
    public isPercentage:boolean
    /**
     * 百分比效果的百分比数
     */
    @property()
    public percentFactor:number
    /**百分比的基准属性 */
    @property()
    public percentBase:string
    /**是否设置偏移量，如果为false则直接将目标值设为deltaValue */
    @property()
    public isOffset:boolean;
    @property()
    public behaviourMode:string;

}


@ccclass("EffectBase")
export class EffectBase  {
    /**效果需要的参数 */
    @property(EffectParam)
    public Param:EffectParam
    /**效果的发送者 */
    @property(cc.Node)
    public Sender:cc.Node
    /**效果的接收者 */
    @property(cc.Node)
    public Target:cc.Node

        /**这三个消息用来进行效果自身的三个阶段顺序管理 */
    public ToStartMessage:string;
    public ToStayMessage:string;
    public ToEndMessage:string;

    /** 这两个消息用来和Effector通信*/
    public Started:string;
    public Ended:string;

    dataBefore:cc.Vec3;
    currentCycleNum:number;
    targetStat:CharacterStatus;

    constructor(param:EffectParam,sender:cc.Node,target:cc.Node){
        this.Param = param;
        this.Sender = sender;
        this.Target = target;

        console.log("In Constructor" + this.Param.Name);
        this.ToStartMessage = this.Param.ID + this.Sender.name+ this.Target.name+"Start";
        this.ToStayMessage = this.Param.ID + this.Sender.name+ this.Target.name+"Stay";
        this.ToEndMessage = this.Param.ID + this.Sender.name+ this.Target.name+"End";

        this.Started = this.ToStartMessage + "Public";
        this.Ended = this.ToEndMessage + "Public";
    }

    public ResetParam(newParam:EffectParam){
        this.Param = newParam;
    }

    /**对外暴露的执行接口，注册消息回调，触发开始事件 */
    public Execute(){
        MessageManager.getInstance().Register(this.ToStartMessage,this.OnBegin,this);
        MessageManager.getInstance().Register(this.ToStayMessage,this.OnStay,this);
        MessageManager.getInstance().Register(this.ToEndMessage,this.OnEnd,this);

        MessageManager.getInstance().Send(this.ToStartMessage);

    }

    /**对外暴露的注销接口，注销本消息注册的回调 */
    public RemoveCallbacks(){
        MessageManager.getInstance().Drop(this.ToStartMessage,this.OnBegin);
        MessageManager.getInstance().Drop(this.ToStayMessage,this.OnStay);
        MessageManager.getInstance().Drop(this.ToEndMessage,this.OnEnd);
    }

    public Quit(){
        MessageManager.getInstance().Send(this.ToEndMessage);
    }

    /**修改目标值的函数 
     * 主要看是增加偏移量还是直接覆盖
     * 以及是按百分比增加还是按固定值增加
    */
    protected updateTargetValue(){
        if(this.Param.isPercentage == false)//如果不是百分比作用，按固定值处理
        {
            if(this.Param.isOffset == true)//如果是偏移量
            {
                this.targetStat.SetProperty(this.Param.Type,this.dataBefore.add(this.Param.deltaValue));
            }
            else//直接覆盖
            {
                this.targetStat.SetProperty(this.Param.Type,this.Param.deltaValue);
            }

        }
        
        else {//如果是百分比作用，先取到百分比的基准值，然后乘百分比，再加
            if(this.Param.isOffset == true)//如果是偏移量
            {
                this.targetStat.SetProperty(this.Param.Type,
                    this.dataBefore.add(this.targetStat.GetProperty(this.Param.percentBase).mulSelf(this.Param.percentFactor)));
            }
            else//直接覆盖
            {
                this.targetStat.SetProperty(this.Param.Type,
                    this.targetStat.GetProperty(this.Param.percentBase).mulSelf(this.Param.percentFactor));
            }
         }


    }

    /**效果开始时执行 主要是效果的初始化工作 在需要的逻辑结束以后触发Stay事件*/
    protected OnBegin(){
        //非空检查
        console.log("效果" + this.Param.Name +"Begin");
        if(this.Target == null) {
            console.warn("效果" + this.Param.Name + "target为空");
            return;
        }
        this.targetStat = this.Target.getComponent(CharacterStatus);
        if(this.targetStat == null){
            console.warn(this.Target.name +  "属性为空");
            return;
        }
        //储存旧值
        this.dataBefore = this.targetStat.GetProperty(this.Param.Type);
        console.log("旧：" + this.dataBefore.x + " " + this.dataBefore.y + " " + this.dataBefore.z);
        //进入活跃状态
        MessageManager.getInstance().Send(this.ToStayMessage);
    }

    /**效果进行中执行  消息的主要逻辑 在需要的逻辑结束以后触发End事件*/
    protected OnStay(){
        console.log("效果" + this.Param.Name + "Stay");
        if(this.Param.Duratin == 0){//即时的效果
            console.log("duration 0");
            if(this.Param.isPercentage == false)//如果不是百分比作用，直接加上deltaV
            this.targetStat.SetProperty(this.Param.Type,this.dataBefore.add(this.Param.deltaValue));
            else {//如果是百分比作用，先取到百分比的基准值，然后乘百分比，再加
                this.targetStat.SetProperty(this.Param.Type,
                    this.dataBefore.add(this.targetStat.GetProperty(this.Param.percentBase).mulSelf(this.Param.percentFactor)));
             }
             MessageManager.getInstance().Send(this.ToEndMessage);
            return;
        }
        else{//如果不是即时效果
            console.log("duration" + this.Param.Duratin);
            if(this.Param.isCycle == false){//如果不是循环改变 设一个定时器，在到达时间后触发
                setTimeout(()=>{
                    if(this.Param.isPercentage == false)//如果不是百分比作用，直接加上deltaV
                    this.targetStat.SetProperty(this.Param.Type,this.dataBefore.add(this.Param.deltaValue));
                    else {//如果是百分比作用，先取到百分比的基准值，然后乘百分比，再加
                        this.targetStat.SetProperty(this.Param.Type,
                            this.dataBefore.add(this.targetStat.GetProperty(this.Param.percentBase).mulSelf(this.Param.percentFactor)));
                     }
                     MessageManager.getInstance().Send(this.ToEndMessage);
                },this.Param.Duratin*1000);
            } else {//如果是循环改变的
                this.ChangeValueOverTime();
            }
        }
    }

    /**效果结束时执行 */
    protected OnEnd(){
        console.log("效果" + this.Param.Name + "End");
        if(this.Param.isTemporary){//如果是临时的可逆效果   恢复原来的值
            this.targetStat.SetProperty(this.Param.Type,this.dataBefore);
        }
        //结束
        MessageManager.getInstance().Send(this.Ended,this);
    }

    /**每隔一段时间修改一次值 */
    protected ChangeValueOverTime(){
        this.currentCycleNum++;
        if(this.currentCycleNum < Math.floor(this.Param.Duratin/this.Param.cycleTime)){
            this.updateTargetValue()
            setTimeout(()=>{this.updateTargetValue()},this.Param.cycleTime*1000);
        }
        else{//结束
            MessageManager.getInstance().Send(this.ToEndMessage);
        }
    }
}


/**这个类是瞬时、单次效果的实现 例如单次的扣血、加血等 */
@ccclass("InstantEffect")
export class InstantEffect extends EffectBase {
    @property()
    propertyType:string;
    constructor(param:EffectParam,sender:cc.Node,target:cc.Node){
        super(param,sender,target);
    }


    protected OnBegin(){
        super.OnBegin();

    }

    protected OnStay(){
            console.log(this.Param.Name + "_InstantEffect_Stay");
            this.updateTargetValue();
             MessageManager.getInstance().Send(this.ToEndMessage);

    }

    protected OnEnd(){
        console.log("效果" + this.Param.Name + "End");
        if(this.Param.isTemporary){//如果是临时的可逆效果   恢复原来的值
            this.targetStat.SetProperty(this.Param.Type,this.dataBefore);
        }
        //结束
        MessageManager.getInstance().Send(this.Ended,this);

    }

}



/** 这个类是开关类型效果的实现 例如穿上装备增加值，脱下时减少值
 * 这种效果需要外部调用.Quit()函数来手动结束，否则效果将一直存在*/ 
@ccclass("OnOffEffect")
export class OnOffEffect extends EffectBase {
    @property()
    propertyType:string;
    constructor(param:EffectParam,sender:cc.Node,target:cc.Node){
        super(param,sender,target);
    }

    protected OnBegin(){
        super.OnBegin();

    }

    /**开关型的OnStay不会触发ToEnd消息 */
    protected OnStay(){
        console.log(this.Param.Name + "_InstantEffect_Stay");
        if(this.Param.isCycle)
            this.ChangeValueOverTime();
        else
            this.updateTargetValue();

    }

    protected OnEnd(){
        console.log("效果" + this.Param.Name + "End");

        //因为是开关型的 在结束后会移除当前效果的影响
        this.targetStat.SetProperty(this.Param.Type,this.dataBefore);
        
        //结束
        MessageManager.getInstance().Send(this.Ended,this);
        
    }

}

    


/**这个类是处理基于时间执行的效果 这个效果将在给定的时间之后被移除*/
@ccclass("TimeBasedEffect")
export class TimeBasedEffect extends EffectBase {
    @property()
    propertyType:string;
    constructor(param:EffectParam,sender:cc.Node,target:cc.Node){
        super(param,sender,target);
    }

    protected OnBegin(){
        super.OnBegin();

    }

    protected OnStay(){
        super.OnStay();

    }

    protected OnEnd(){
        
    }

}


/**这个类负责集中处理效果的分发 */
@ccclass
export class EffectManager {
    constructor(){
        console.log("初始化EffectManager");

    }
    private static _instance: EffectManager = new EffectManager();

    public static getInstance() : EffectManager{
        return this._instance;
    }

    /**这个函数用来在外界触发一个效果
     * 参数1是效果的参数，参数2是效果的作用目标，参数3是效果的发送者
     */
    public TriggerEffect(effectParam:EffectParam,target:cc.Node,sender:cc.Node = null){
        if(target == null){
            console.error("目标物体为空，返回");
            return;
        }
        var status = target.getComponent(CharacterStatus);
        if(status == null) {
            console.error(`物体${target.name}没有CharactoerStatus组件`)
            return;
        }
        console.log("triggered" + effectParam.Name);
        status.Effector.TriggerNewEffect(effectParam,sender);

    }
}