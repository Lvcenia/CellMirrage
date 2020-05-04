import { MessageManager } from "../MessageSystem/MessageManager";
import Joystick from "./Joystick"
const {ccclass, property} = cc._decorator;
/**此处为控制玩家移动脚本
 */
@ccclass
export default class ball_ctrl extends cc.Component {
    /**此处为控制玩家移动脚本
 */
    @property(Joystick)
    stick: Joystick = null;

    @property
    speed: number = 200;
    public degree:number=90;

    public body:cc.RigidBody=null;
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.body=this.getComponent(cc.RigidBody);
        MessageManager.getInstance().Register("JoystickMove",this.Joystick_Move,this);
    }

    start () {

    }
    onBeginContact(contact:cc.PhysicsContact,selfCollider:cc.PhysicsCollider,otherCollider:cc.PhysicsCollider){
        console.log("tank collider");
    }
    Joystick_Move(dirx,diry){
        // console.log(dirx);
        // console.log(diry);
        // if(dirx===0&&diry===0)
        // {
        //     this.body.linearVelocity = cc.v2(0,0);
        //     console.log("现在速度是0");
        //     return;
        // }
        // console.log("现在速度不是0");
        // var vx:number=this.speed*dirx;
        // var vy:number=this.speed*diry;
        // this.body.linearVelocity=cc.v2(vx,vy);
        // var r:number =Math.atan2(dirx,diry);
        // var degree :number=r*180/Math.PI;
        // degree=360-degree;
        // degree=-degree+270;
        // this.node.angle=degree;

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
        console.log(degree);
    }
}
