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
import { EffectTemplates } from "./EffectTemplates";

const {ccclass, property} = cc._decorator;


/**
 * 效果系统可以改变的属性种类
 * C代表战斗属性CombatProperties
 * T代表Transform
 * P代表Physics
 */
export enum EffectType{
    C_MaxHP = "C_MaxHP",
    C_HP = "C_HP",
    C_AttackPower = "C_AttackPower",
    C_Defense = "C_Defense",
    T_Position = "T_Position",
    T_Rotation = "T_Rotation",
    T_Scale = "T_Scale",
    T_Color = "T_Color",
    T_Opacity = "T_Opacity",
    P_Velocity = "P_Velocity",
    P_Acceleration = "P_Acceleration",
}

/**
 * 游戏中一切对玩家和怪物的属性造成改变的对象都是效果
 * (学的是只狼的设计模式)
 * 战斗系统的扣血、异常状态等等都通过效果来实现
 * 这个类用来描述一个效果的具体参数，因为可能也不需要很多种继承
 * 所以就直接把一堆属性全都搬到一起了
 */
export class EffectParam{
    /**构造函数，填的时候使用EffectTemplates.xxxx.Name这样的格式 */
    constructor(effectName:string){
        var dv = EffectTemplates[effectName].deltaValue;
        this.ID = EffectTemplates[effectName].ID;
        this.Name = EffectTemplates[effectName].Name;
        this.Duratin = EffectTemplates[effectName].Duration;
        this.Type = <EffectType>EffectTemplates[effectName].Type;
        this.cycleTime = EffectTemplates[effectName].cycleTime;
        this.deltaValue = new cc.Vec4(dv.x,dv.y,dv.z,dv.w);
        this.isCycle = EffectTemplates[effectName].isCycle;
        this.isPercentage = EffectTemplates[effectName].isPercentage;
        this.isDuration = EffectTemplates[effectName].isDuration;
        this.isPercentage = EffectTemplates[effectName].isPercentage;
        this.isStackable = EffectTemplates[effectName].isStackable;
        this.maxStackNum = EffectTemplates[effectName].maxStackNum;
        this.percentFactor = EffectTemplates[effectName].percentFactor;
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
    public Name:string = "Effect1";
    /**
     * 效果的大类
     */
    @property()
    public Type:EffectType
    /**
     * 是否时间持续
     */
    @property()
    public isDuration:boolean;
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
     */
    @property()
    public deltaValue:cc.Vec4;
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

}

enum EffectState{
    isToStart,
    isToStay,
    isToEnd,
    Ended
}

@ccclass
export class EffectBase  {
    /**效果需要的参数 */
    @property()
    public Param:EffectParam
    /**效果的发送者 */
    @property(cc.Node)
    public Sender:cc.Node
    /**效果的接收者 */
    @property(cc.Node)
    public Target:cc.Node

    protected state:EffectState;

        /**这三个消息用来进行效果自身的三个阶段顺序管理 */
    public ToStartMessage:string;
    public ToStayMessage:string;
    public ToEndMessage:string;

    /** 这两个消息用来和Effector通信*/
    public Started:string;
    public Ended:string;

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

    public ResetCallbacks(){
        MessageManager.getInstance().Register(this.ToStartMessage,this.OnBegin);
        MessageManager.getInstance().Register(this.ToStayMessage,this.OnStay);
        MessageManager.getInstance().Register(this.ToEndMessage,this.OnEnd);
    }

    /**对外暴露的执行接口，注册消息回调，触发开始事件 */
    public Execute(){
        MessageManager.getInstance().Register(this.ToStartMessage,this.OnBegin);
        MessageManager.getInstance().Register(this.ToStayMessage,this.OnStay);
        MessageManager.getInstance().Register(this.ToEndMessage,this.OnEnd);

        MessageManager.getInstance().Send(this.ToStartMessage,this);

    }

    /**对外暴露的注销接口，注销本消息注册的回调 */
    public Quit(){
        MessageManager.getInstance().Drop(this.ToStartMessage,this.OnBegin);
        MessageManager.getInstance().Drop(this.ToStayMessage,this.OnStay);
        MessageManager.getInstance().Drop(this.ToEndMessage,this.OnEnd);
    }

    /**效果开始时执行 在需要的逻辑结束以后触发Stay事件*/
    protected OnBegin(){
        console.log("效果" + this.Param.Name +"Begin");

        if(this.Target == null) {
            console.warn("效果" + this.Param.Name + "target为空");
            return;
        }
        var targetStat = this.Target.getComponent(CharacterStatus);
        if(targetStat == null){
            console.warn(this.Target.name +  "属性为空");
            return;
        }
        MessageManager.getInstance().Send(this.ToStayMessage,this);
    }

    /**效果进行中执行  在需要的逻辑结束以后触发End事件*/
    protected OnStay(){
        console.log("效果" + this.Param.Name + "Stay");
        MessageManager.getInstance().Send(this.ToEndMessage,this);
    }

    /**效果结束时执行 */
    protected OnEnd(){
        console.log("效果" + this.Param.Name + "End");
        MessageManager.getInstance().Send(this.Ended,this);
    }
}


/** 这个类负责处理战斗属性的修改*/ 
@ccclass
export class C_Effect extends EffectBase {
    @property()
    propertyType:string;
    constructor(param:EffectParam,sender:cc.Node,target:cc.Node){
        super(param,sender,target);
    }

    protected OnBegin(){
        console.log("C_Effect_OnBegin()");
        super.OnBegin();
        //this.propertyType = this.Param.Type.split("_")[0];
        MessageManager.getInstance().Send(this.ToStayMessage,this);
        }
    protected OnStay(){
        console.log("C_Effect_OnStay()");
        super.OnStay();
        //this.propertyType = this.Param.Type.split("_")[0];

        MessageManager.getInstance().Send(this.ToEndMessage,this);
    }
    protected OnEnd(){
        console.log("C_Effect_OnEnd()");
        super.OnEnd();
        this.propertyType = this.Param.Type.split("_")[0];

        MessageManager.getInstance().Send(this.Ended,this);
    }

}

    



@ccclass
export class T_Effect extends EffectBase {

}


/**这个类负责集中处理效果的分发 */
@ccclass
export class EffectManager {
    constructor(){

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