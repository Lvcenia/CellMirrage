// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { SubWeaponComponentData, DamageComponentData } from "../../ItemsData";
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

    }

    // update (dt) {}
    
    //重写Exec，对于连接型子组件，会执行自己的动画
    public Exec(){
        //首先要播放动画
        this.anim.play();
        //然后根据不同的名字做相应的调整
        switch(this.subWeaponCompParam.Name){
            case "":break;
        }

    }
}
