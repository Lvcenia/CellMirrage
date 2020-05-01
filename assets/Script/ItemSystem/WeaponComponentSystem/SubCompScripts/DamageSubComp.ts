// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { SubWeaponComponentData, DamageComponentData, ConnectiveComponentData } from "../../ItemsData";
import Damager from "../../../Combat/Damager";
import { SubWeaponComponent } from "./SubWeaponComponent";



const {ccclass, property} = cc._decorator;

/**伤害型子组件的基类 所有伤害型子组件继承于此*/
@ccclass
export default class DamageSubWeaponComp extends SubWeaponComponent {

    //子组件的核心，参数
    protected subWeaponCompParam:DamageComponentData;
    protected damager:Damager;
    
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        super.start();
        this.damager = this.getComponent(Damager);
    }

    // update (dt) {}

    /**重写Exec，对于伤害型子组件，会把下层传来的参数赋给Damager*/
    public ParseParam(paramFromLower:ConnectiveComponentData){
        this.damager.damageFactor = paramFromLower.Damage_Mult;
        
        

        

    }
    
    /**处理攻击相关的逻辑 主要是动画控制*/
    public ExecAction(param:ConnectiveComponentData){
        //首先要播放动画
        this.anim.play();

    }
}
