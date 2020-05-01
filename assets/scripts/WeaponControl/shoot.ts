// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import SwitchMode from "./SwitchMode";
import Bullet from "./bullet";

const {ccclass, property} = cc._decorator;

@ccclass
export default class shoot extends cc.Component {

    @property(cc.Prefab)
    bullet:cc.Prefab=null;
    
    bullets:cc.Node=null;
    @property(cc.Node)
    bulletRoot:cc.Node=null;
    firePos:cc.Vec2 = null;

    // LIFE-CYCLE CALLBACKS:
    public firemode:number=1;

    onLoad () {

        
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.shoot, this);
        
    }

    start () {
        this.firePos=this.node.getPosition();
    }
    shoot()
    {
        this.firemode=cc.find("Canvas/switch").getComponent(SwitchMode).CurrentMode;
        switch (this.firemode)
        {
            case 1:
                
                this.bullets=cc.instantiate(this.bullet);
                this.bullets.getComponent(Bullet).speed=500;
                cc.find("Canvas/map").addChild(this.bullets);
                console.log("shoot");
                this.firePos=this.node.getPosition();
                this.bullets.setPosition(this.firePos);
                break;
            case 2:
                this.bullets=cc.instantiate(this.bullet);
                this.bullets.getComponent(Bullet).speed=2000;
                cc.find("Canvas/map").addChild(this.bullets);
                console.log("shoot");
                this.firePos=this.node.getPosition();
                this.bullets.setPosition(this.firePos);
                
                break;

        }

 //       console.log("firepos");
 //       console.log(this.firePos.x);
 //       console.log(this.firePos.y);
        
    }


    update (dt) {

    }
}
