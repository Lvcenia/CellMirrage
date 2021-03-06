// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Effector from "./Effector";
import Damager from "./Damager";
import { EffectManager, EffectParam } from "./Effects";
import { EffectTemplates } from "../DataTemplates/EffectTemplates";
import { MessageManager } from "../MessageSystem/MessageManager";

const {ccclass, property} = cc._decorator;

/**游戏物体拥有的、效果可以修改的战斗属性定义 */
export const CombatPropertyTypes = {
    MaxHP:"MaxHP",
    HP:"HP",
    Position:"Position",
    Scale:"Scale",
    Rotation:"Rotation",
    Velocity:"Velocity",
    Acceleration:"Acceleration",
    hasHitBox:"hasHitBox",
    Color:"Color",
    AttackSpeed:"AttackSpeed"

}

/**Rotation是一维数字，基于cc.Noed.angle */
@ccclass("CombatProperty")
export class CombatProperty{
    constructor(){
        this.MaxHP = 100;
        this.HP = this.MaxHP;
        this.Position = new cc.Vec3(0,0,0);
        this.Rotation = 0;
        this.Scale = new cc.Vec3(1,1,1);
        this.Velocity = new cc.Vec3(0,0,0);
        this.Acceleration = new cc.Vec3(0,0,0);
        this.hasHitBox = true;
        this.Color = new cc.Vec3(0,0,0);
        this.AttackSpeed = 1;
    }
    @property()
    MaxHP:number;
    @property()
    HP:number;
    @property()
    hasHitBox:boolean;
    @property()
    Position:cc.Vec3;
    @property()
    Rotation:number;
    @property()
    Scale:cc.Vec3;
    @property()
    Velocity:cc.Vec3;
    @property()
    Acceleration:cc.Vec3;
    @property()
    Color:cc.Vec3;
    @property()
    AttackSpeed:number;

};

/**这个类是挂在玩家和敌人物体上的战斗管理类，管理各种可能的战斗属性和战斗生命周期 */
@ccclass
export default class CharacterStatus extends cc.Component {

    @property(CombatProperty)
    public Property:CombatProperty = new CombatProperty();

    @property(Effector)
    public Effector:Effector;


    
    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    }

    start () {
        this.Effector = new Effector(this.node);

    }

    update (dt) {


    }

    onBeginContact(contact:cc.PhysicsContact,selfCollider:cc.PhysicsCollider,otherCollider:cc.PhysicsCollider){
        var damager = otherCollider.node.getComponent(Damager);
        if(damager == null) return;
        console.log("onBeginContact");
        this.onDamaged(damager)


    }

    
    onPreSolve(contact:cc.PhysicsContact,selfCollider:cc.PhysicsCollider,otherCollider:cc.PhysicsCollider){
        //console.log("onPre");

    }

    
    onPostSolve(contact:cc.PhysicsContact,selfCollider:cc.PhysicsCollider,otherCollider:cc.PhysicsCollider){
        //console.log("onPost");

    }

    onEndContact(contact:cc.PhysicsContact,selfCollider:cc.PhysicsCollider,otherCollider:cc.PhysicsCollider){


    }

    onDamaged(damager:Damager){
        //EffectManager.getInstance().TriggerEffect(damager.GetDamage(),this.node,damager.Owner);
        EffectManager.getInstance().TriggerEffect(damager.GetDamage(),this.node,this.node);

    }

    public GetProperty(type:string):cc.Vec3{
        switch(type){
            case CombatPropertyTypes.MaxHP:
                return new cc.Vec3(this.Property.MaxHP,0,0);
            case CombatPropertyTypes.HP:
                return new cc.Vec3(this.Property.HP,0,0);
            case CombatPropertyTypes.Position:
                return this.Property.Position;
            case CombatPropertyTypes.Rotation:
                return new cc.Vec3(this.Property.Rotation,0,0);
            case CombatPropertyTypes.Scale:
                return this.Property.Scale;
            case CombatPropertyTypes.Acceleration:
                return this.Property.Acceleration;
            case CombatPropertyTypes.Velocity:
                return this.Property.Velocity;
            case CombatPropertyTypes.hasHitBox:
                return new cc.Vec3(this.Property.hasHitBox? 1:0,0,0);
            case CombatPropertyTypes.Color:
                return this.Property.Color;
            case CombatPropertyTypes.AttackSpeed:
                break;

            default:break;
        }
    }

    public SetProperty(type:string,value:cc.Vec3){
        switch(type){
            case CombatPropertyTypes.MaxHP:
                this.Property.MaxHP = value.x;
                break;
            case CombatPropertyTypes.HP:
                console.log("Setting Value" + this.Property.HP + "to " + value.x);
                this.Property.HP = value.x;
                console.log("Set Value" + this.Property.HP + "Complete");
                MessageManager.getInstance().Send("HP_Player_Changed",this.Property.HP);
                break;
            case CombatPropertyTypes.Position:
                this.Property.Position = value;
                this.node.setPosition(value);
                break;
            case CombatPropertyTypes.Rotation:
                this.Property.Rotation = value.x;
                this.node.angle = this.Property.Rotation;
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
            case CombatPropertyTypes.hasHitBox:
                var selfCol = this.getComponent(cc.PhysicsCollider);
                var colliders = this.getComponentsInChildren(cc.PhysicsCollider);
                var hasHitBox = (value.x > 0 ? false:true);
                selfCol.sensor = hasHitBox;
                this.Property.hasHitBox = hasHitBox;
                    colliders.forEach(element => {
                        element.sensor = hasHitBox;
                    });
                    break;
            case CombatPropertyTypes.Color:
                this.Property.Color = value;
            
            case CombatPropertyTypes.AttackSpeed:
                break;

                
                
            
            default:break;
        }

    }

}
