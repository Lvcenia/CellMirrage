// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { EffectParam } from "../Combat/Effects";
import { EffectTemplates } from "../Combat/EffectTemplates";

const {ccclass, property} = cc._decorator;

/**这个类是整个游戏流程的管理类 
 * 游戏开始的时候在StartScene 点击了开始游戏后跳转到MainHallScene
 * 点击了进入梦境？按钮后跳转到CombatScene
 * 在战斗中点击退出时回退到MainHallScene
*/
@ccclass
export default class GameManager extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.game.addPersistRootNode(this.node);
        cc.director.getPhysicsManager().enabled = true;
    }

    start () {
        

    }

    private toMainHallScene(){
        cc.director.loadScene("MainHallScene",()=>{

        });
    }

    private toCombatScene(){
        cc.director.loadScene("CombatScene",()=>{

        });
    }

    private toStartScene(){
        cc.director.loadScene("StartScene",()=>{

        });
    }

    // update (dt) {}
}
