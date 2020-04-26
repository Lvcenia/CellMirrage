// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { EffectParam } from "./Effects";
import { EffectTemplates } from "./EffectTemplates";

const {ccclass, property} = cc._decorator;

/**这个组件带有伤害信息，在发生碰撞的时候会被读取
 * 然后通过对方的effector施加到对方身上
 */
@ccclass
export default class Damager extends cc.Component {

    /**逻辑上的伤害来源，比如伤害组件的Owner应该是玩家结点而不是子组件本身
     * 这么做主要是为了伤害计算，方便从owner身上拿到决定伤害的数值
     * 默认值是本体结点，可以编辑器里面改
     */
    @property(cc.Node)
    public Owner:cc.Node = null;
    
    @property
    public baseDamage:number = 10;

    @property
    public damageFactor:number = 1;

    @property
    isDOT:boolean = false;

    @property
    isPercentage:boolean = false;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {

    }

      start () {
        this.Owner = this.node;
 
     }

    /**这个函数由被攻击者调用，计算伤害，然后返回效果给被攻击者，伤害值四舍五入 */
    public GetDamage():EffectParam{
        var damageParam = new EffectParam(EffectTemplates.HP_DOWN_NORMAL.Name);
        console.log("GetDamageCalledON" + this.Owner.name);
        damageParam.deltaValue.mulSelf(-1);
        return damageParam;
    }

    // update (dt) {}
}
