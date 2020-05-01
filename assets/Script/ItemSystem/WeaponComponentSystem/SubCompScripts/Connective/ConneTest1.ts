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

@ccclass
export default class ConneTest1 extends ConnectiveSubWeaponComp {



    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        super.start();
        this.subWeaponCompParam = new ConnectiveComponentData(ConnectiveSCompTemplates.AAAAAAA.Name);

    }

    // update (dt) {}
}
