// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { EffectParam } from "../Combat/Effects";
import { EffectTemplates } from "../Combat/EffectTemplates";

const {ccclass, property} = cc._decorator;

/**这个类是整个游戏流程的管理类 */
@ccclass
export default class GameManager extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled = true;
    }

    start () {
        var s =new EffectParam(EffectTemplates.HP_DOWN_NORMAL.Name);
        console.log(JSON.stringify(s.deltaValue));

    }

    // update (dt) {}
}
