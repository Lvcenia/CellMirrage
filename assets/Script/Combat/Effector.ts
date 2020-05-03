// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { EffectBase, EffectParam, EffectBehaviour } from "./Effects";
import { MessageManager } from "../MessageSystem/MessageManager";
import Dictionary from "../Generic/Dictionary";

const {ccclass, property} = cc._decorator;

@ccclass("Effector")
export default class Effector {

    constructor(node:cc.Node){
        console.log(node.name + "Effector Constructed");
        this.node = node;
    }

    @property(cc.Node)
    node:cc.Node

    @property()
    private activeEffects:Dictionary<EffectBase> = new Dictionary<EffectBase>();
    @property()
    private expiredEffects:Dictionary<EffectBase> = new Dictionary<EffectBase>();


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}


    // update (dt) {}

    public isExipiredEffect(effectParam:EffectParam):boolean{//判断是否有已经过期的同ID效果在
        return this.expiredEffects.get(effectParam.Name) === undefined ? false:true;
    }

    public isActiveEffect(effectParam:EffectParam):boolean{//判断是否有激活状态的同ID效果
        return this.activeEffects.get(effectParam.Name) === undefined ? false:true;
    }

    private DeactivateEffect(effect:EffectBase){
        MessageManager.getInstance().Drop(effect.Ended,this.DeactivateEffect);
        console.log("Deactivate" + effect.Param.Name);
        effect.RemoveCallbacks();
        this.expiredEffects.set(effect.Param.Name,effect);
        this.activeEffects.delete(effect.Param.Name);//从active里面去掉

    }

    private ReactivateEffect(effectParam:EffectParam){
        var effect = this.expiredEffects.get(effectParam.Name);

        effect.Param = effectParam;
        this.activeEffects.set(effectParam.Name,effect);
        this.expiredEffects.delete(effectParam.Name);//从expire里面去掉
        console.log("Reactivate " + effectParam.Name);
        MessageManager.getInstance().Register(effect.Ended,this.DeactivateEffect,this);
        effect.Execute();
        
    }

    /**处理一个触发效果的请求,负责将效果参数实体化并进行生命周期管理 */
    public TriggerNewEffect(effectParam:EffectParam,sender:cc.Node){
        console.log("effectParam.ID + effectParam.Name");
        if(this.isActiveEffect(effectParam)){//先看这个效果是否正在被激活，如果是，如果可以层叠，继续，不能层叠，就返回
            if(effectParam.isStackable == false) return;

        } else {//效果不是活跃状态
            if(this.isExipiredEffect(effectParam)){//如果池子里已经有和它同类的效果，抽出来用,减少new
                console.log("已经存在");
                this.ReactivateEffect(effectParam);
            } else {//不存在这个效果，创建，并且这个效果插入到队列里去，插入的时候要事件绑定,在效果完成之后送到过期列表里
                let effectNew;
                switch(effectParam.behaviourMode){
                    case EffectBehaviour.Instant:
                        
                        break;
                    case EffectBehaviour.OnOff:
                        break;
                    case EffectBehaviour.TimeBased:
                        break;
                    default:break;
                }
                var effect:EffectBase = new EffectBase(effectParam,sender,this.node);
                
                this.activeEffects.set(effectParam.Name,effect);
                MessageManager.getInstance().Register(effect.Ended,this.DeactivateEffect,this);
                effect.Execute();
            }

        }

    } 

}
