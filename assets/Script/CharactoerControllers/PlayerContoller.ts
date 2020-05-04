// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { MessageManager } from "../MessageSystem/MessageManager";

const {ccclass, property} = cc._decorator;

/**在这里编写玩家的行动控制代码，使用cc.Node.EventType.TOUCH系列的系统自带event
 * 回调绑定也使用系统的cc.Node.on函数
 */
@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    label: cc.Label = null;

    @property
    text: string = 'hello';

    dir:number = 1;
    
    rb:cc.RigidBody = null;
    // LIFE-CYCLE CALLBACKS:
    MoveHorizontal(e){
        console.log("keyDown");
        switch(e.keyCode)
        {
            case cc.macro.KEY.a:
                console.log("a");
                
                this.dir = -1;
                this.rb.applyForceToCenter(new cc.Vec2(725000,0).mulSelf(this.dir),true);
                break;
            case cc.macro.KEY.d:
                console.log("d");
                this.dir = 1;
                this.rb.applyForceToCenter(new cc.Vec2(725000,0).mulSelf(this.dir),true);
                break;
            default:break;
        }
    }

    StopMoveHorizontal(e){
        console.log("keyUp");
        switch(e.keyCode)
        {
            case cc.macro.KEY.a:
            case cc.macro.KEY.d:
                this.rb.linearVelocity = new cc.Vec2(0,0);
                break;
            default:break;
        }

       
    }

    

     onLoad () {
         this.rb = this.getComponent(cc.RigidBody);
         this.rb.active
         cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.MoveHorizontal.bind(this),this);
         cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.MoveHorizontal.bind(this),this);
         
     }

    start () {

    }

    update (dt) {
       // this.rb.applyForceToCenter(new cc.Vec2(15000,0).mulSelf(this.dir),true);
    }

    Attack(){
        
    }




}
