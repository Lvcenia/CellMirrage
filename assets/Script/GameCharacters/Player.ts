// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import GameCharacterBase from "../GameCharacterBase";
let StateMachine = require("state-machine");

const {ccclass, property} = cc._decorator;


/**玩家角色的行为和状态的控制类 */
@ccclass
export default class Player extends GameCharacterBase {


    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        

    }

    // update (dt) {}

    public Attack(){

    }

    public SwitchWeapon(){

    }
}
