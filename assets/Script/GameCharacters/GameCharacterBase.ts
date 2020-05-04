// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import Effector from "../Combat/Effector";
import Damager from "../Combat/Damager";
import { EffectManager, EffectParam } from "../Combat/Effects";
import { EffectTemplates } from "../DataTemplates/EffectTemplates";
import { MessageManager } from "../MessageSystem/MessageManager";
let StateMachine = require('state-machine');

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

export enum CharacterGroup {
    Player = "Player",
    PlayerAttack = "PlayerAttack",
    Mob = "Mob",
    MobAttack = "MobAttack",
    Neutral = "Neutral"
}

/**这个类是挂在玩家和敌人物体上的战斗管理类，管理各种可能的战斗属性和战斗生命周期 */
@ccclass
export default class GameCharacterBase extends cc.Component {


    @property({displayName:"角色分组"})
    protected CharaGroup:string = "";

    @property(CombatProperty)
    public Property:CombatProperty = new CombatProperty();

    public Effector:Effector = null;

    @property({type:[cc.String]})
    public GetDamageFrom:string[] = [];

    /**状态机 */
    private characterStates:any = {};



    
    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    }

    start () {
        this.Effector = new Effector(this.node);

    }

    update (dt) {


    }

    protected onBeginContact(contact:cc.PhysicsContact,selfCollider:cc.PhysicsCollider,otherCollider:cc.PhysicsCollider){
        console.log("onBeginContact");
        if(this.GetDamageFrom.indexOf(otherCollider.node.group) !== -1)
        {
            var damager = otherCollider.node.getComponent(Damager);
            if(damager == null) return;
            this.onDamaged(damager);
        } else {
            console.log("in " + this.node.name + " " + otherCollider.node.group);
        }



    }

    
    protected onDamaged(damager:Damager){
        //EffectManager.getInstance().TriggerEffect(damager.GetDamage(),this.node,damager.Owner);
        EffectManager.getInstance().TriggerEffect(damager.GetDamage(),this.node,this.node);

    }

    protected MoveHorizontal(){

    }

    protected MoveVertical(){

    }

    protected Die(){

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
