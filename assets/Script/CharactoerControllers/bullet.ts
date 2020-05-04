

import Joystick from "./Joystick"

const {ccclass, property} = cc._decorator;

@ccclass
export default class Bullet extends cc.Component {

    @property
    speed: number=1000;

    counter:number=1;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        cc.director.getPhysicsManager().enabled=true;
        //step2 配置重力
        console.log("shoot");


    }
    private body:cc.RigidBody=null;
    start () {
        this.body=this.getComponent(cc.RigidBody);
        this.node.angle=cc.find("Canvas/tank?").angle;
        console.log("angle="+this.node.angle);
        this.node.setPosition(this.node.getPosition());

    }


    update (dt) {

            let direction:cc.Vec2 =cc.v2(Math.sin(this.node.angle*0.017453293)*100,Math.cos(this.node.angle*0.017453293)*100);
            direction.x=-Math.sin(this.node.angle*0.017453293)*this.speed;
            direction.y=Math.cos(this.node.angle*0.017453293)*this.speed;
            this.body.linearVelocity=direction;        
            
            if(this.node.x<=-cc.winSize.width*0.5||this.node.x>=cc.winSize.width*0.5||this.node.y<=-cc.winSize.height*0.5||this.node.y>=cc.winSize.height*0.5)
            {
                this.node.removeFromParent();
                
            }
        
    }
}
