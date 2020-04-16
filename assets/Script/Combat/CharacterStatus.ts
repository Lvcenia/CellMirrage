// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Effector from "./Effector";
import Damager from "./Damager";
import { EffectManager, EffectParam } from "./Effects";

const {ccclass, property} = cc._decorator;

/**游戏物体拥有的、效果可以修改的战斗属性定义 */
export const CombatPropertyTypes = {
    MaxHP:"MaxHP",
    HP:"HP",
    Position:"Position",
    Scale:"Scale",
    Rotation:"Rotation",
    Velocity:"Velocity",
    Acceleration:"Acceleration"

}

@ccclass("CombatProperty")
export class CombatProperty{
    constructor(){
        this.MaxHP = 100;
        this.HP = this.MaxHP;
        this.Position = new cc.Vec3(0,0,0);
        this.Rotation = new cc.Vec3(0,0,0);
        this.Scale = new cc.Vec3(1,1,1);
        this.Velocity = new cc.Vec3(0,0,0);
        this.Acceleration =new cc.Vec3(0,0,0);;
    }
    @property()
    MaxHP:number;
    @property()
    HP:number;
    @property()
    Position:cc.Vec3;
    @property()
    Rotation:cc.Vec3;
    @property()
    Scale:cc.Vec3;
    @property()
    Velocity:cc.Vec3;
    @property()
    Acceleration:cc.Vec3;

};
/**这个类是挂在玩家和敌人物体上的战斗管理类，管理各种可能的战斗属性和战斗生命周期 */
@ccclass
export default class CharacterStatus extends cc.Component {

    @property(CombatProperty)
    public Property:CombatProperty = new CombatProperty();

    @property(Effector)
    public Effector:Effector;;

    
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.Effector = new Effector(this.node);
    }

    start () {
        


        
    }

    update (dt) {

    }

    onBeginContact(contact:cc.PhysicsContact,selfCollider:cc.PhysicsCollider,otherCollider:cc.PhysicsCollider){
        var damager = otherCollider.node.getComponent(Damager);
        if(damager == null) return;
        this.onDamaged(damager)
        console.log("onBeginContact");

    }

    
    onPreSolve(contact:cc.PhysicsContact,selfCollider:cc.PhysicsCollider,otherCollider:cc.PhysicsCollider){
        //console.log("onPre");

    }

    
    onPostSolve(contact:cc.PhysicsContact,selfCollider:cc.PhysicsCollider,otherCollider:cc.PhysicsCollider){
        //console.log("onPost");

    }

    onEndContact(contact:cc.PhysicsContact,selfCollider:cc.PhysicsCollider,otherCollider:cc.PhysicsCollider){
        console.log("onEnd");

    }

    onDamaged(damager:Damager){
        EffectManager.getInstance().TriggerEffect(damager.GetDamage(),this.node,damager.Owner);

    }

    public SetProperty(type:string,value:cc.Vec3){
        switch(type){
            case CombatPropertyTypes.MaxHP:
                this.Property.MaxHP = value.x;
                break;
            case CombatPropertyTypes.HP:
                this.Property.HP = value.x;
                break;
            case CombatPropertyTypes.Position:
                this.Property.Position = value;
                this.node.setPosition(value);
                break;
            case CombatPropertyTypes.Rotation:
                var q = new cc.Quat(value.x)
                this.Property.Rotation = value;
                this.node.setRotation(q);
                break;
            case CombatPropertyTypes.Scale:
                this.Property.Scale = value;
                this.node.setScale(value);
                break;
            case CombatPropertyTypes.Acceleration:
                this.Property.Acceleration = value;
                this.getComponent(cc.RigidBody).applyForceToCenter(new cc.Vec2(value.x,value.y),false);
                break;
            case CombatPropertyTypes.Velocity:
                this.Property.Velocity = value;
                this.getComponent(cc.RigidBody).applyLinearImpulse(new cc.Vec2(value.x,value.y),cc.Vec2.ZERO,false);
                break;
            default:break;
        }

    }

}
