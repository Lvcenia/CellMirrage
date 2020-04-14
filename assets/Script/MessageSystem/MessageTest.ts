// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html




import * as MSG from "./Message"
import {MessageManager} from "./MessageManager"

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {
    public test2(msg :MSG.Message){
        console.log("test 其他脚本" +"name: " +msg.MessageName +"data: " + msg.Data);
    }

    x = 0;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
       MessageManager.getInstance().Register("test",this.test2);

    }

     update (dt) {
        this.x++;
        if(this.x == 6){
            MessageManager.getInstance().Drop("test",this.test2);
        }
     }
}
