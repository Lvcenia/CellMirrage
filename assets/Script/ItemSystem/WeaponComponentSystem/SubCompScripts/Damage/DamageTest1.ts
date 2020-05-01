// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import DamageSubWeaponComp from "../DamageSubComp";
import { DamageComponentData } from "../../../ItemsData";
import { DamageSCompTemplates } from "../../../../DataTemplates/DamageSCompTemplates";

const {ccclass, property} = cc._decorator;

@ccclass
export default class DamageTest1 extends DamageSubWeaponComp {

    start () {
        super.start();
        /**在start里初始化参数 */
        this.subWeaponCompParam = new DamageComponentData(DamageSCompTemplates.DDD.Name);

    }

    // update (dt) {}
    public 
}
