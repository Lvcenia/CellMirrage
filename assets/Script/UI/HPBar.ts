// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { MessageManager } from "../MessageSystem/MessageManager";

const {ccclass, property} = cc._decorator;

/**这是用来演示扣血的临时脚本 后面建议删掉 */
@ccclass
export default class HPBar extends cc.Component {

    @property(cc.Label)
    text: cc.Label = null;

    @property(cc.Sprite)
    slider:cc.Sprite;

    @property
    maxValue:number;

    init(maxValue:number){
        this.text.string = maxValue.toString();
        this.maxValue = maxValue;
        this.slider.fillRange = 1;
    }

    updateValue(value:number){
        this.text.string = value.toString();
        this.slider.fillRange = value/this.maxValue;

    }

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    }

    start () {
        this.slider = this.getComponentInChildren(cc.Sprite);
        this.text = this.getComponentInChildren(cc.Label);
        this.init(100);
        MessageManager.getInstance().Register("HP_Player_Spawned",this.init,this)
        MessageManager.getInstance().Register("HP_Player_Changed",this.updateValue,this)

    }

    // update (dt) {}
}
