// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameCharacterBase from "../GameCharacterBase";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MobBase extends GameCharacterBase {


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}


    start () {
        super.start();
        

    }
    // update (dt) {}
}
