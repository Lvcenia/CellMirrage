// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import ConnectiveSubWeaponComp from "../ConnectiveSubComp";
import { ConnectiveComponentData } from "../../../ItemsData";
import { ConnectiveSCompTemplates } from "../../../../DataTemplates/ConnectiveSCompTemplates";

const {ccclass, property} = cc._decorator;

/**连接型子组件，三叉戟类 */
@ccclass
export default class Trident extends ConnectiveSubWeaponComp {


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        super.start();
        this.subWeaponCompParam = new ConnectiveComponentData(ConnectiveSCompTemplates.三叉戟.Name);

    }

    ExecAction(){
        
    }



    // update (dt) {}
}
