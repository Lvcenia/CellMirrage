
import joystick from "./joystick"
const {ccclass, property} = cc._decorator;

@ccclass
export default class ball_ctrl extends cc.Component {

    @property(joystick)
    stick: joystick = null;

    @property
    speed: number = 200;
    public degree:number=90;

    public body:cc.RigidBody=null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.body=this.getComponent(cc.RigidBody);

    }

    start () {

    }
    onBeginContact(contact:cc.PhysicsContact,selfCollider:cc.PhysicsCollider,otherCollider:cc.PhysicsCollider){
        console.log("tank collider");

        
    }

    update (dt) {
        if(this.stick.dir.x===0&&this.stick.dir.y===0)
        {
            this.body.linearVelocity = cc.v2(0,0);
            return;
        }
        var vx:number=this.speed*this.stick.dir.x;
        var vy:number=this.speed*this.stick.dir.y;
        this.body.linearVelocity=cc.v2(vx,vy);
        var r:number =Math.atan2(this.stick.dir.y,this.stick.dir.x);
        var degree :number=r*180/Math.PI;
        degree=360-degree;
        degree=-degree+270;
        this.node.angle=degree;
        //console.log(degree);
    }
}
