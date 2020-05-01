// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


import { SubWeaponComponent } from "./SubWeaponComponent";
import { SubWeaponComponentData, ConnectiveComponentData } from "../../ItemsData";

const {ccclass, property} = cc._decorator;

/**连接型子组件的基类 所有的连接型子组件继承于此 并实现Exec函数*/
@ccclass
export default class ConnectiveSubWeaponComp extends SubWeaponComponent {

    //子组件的核心，参数
    protected subWeaponCompParam:ConnectiveComponentData;
    
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        super.start();

    }

    // update (dt) {}

    /**重写Exec 对于连接型子组件 计算效果参数的叠加效果 */
    public ParseParam(paramFromLower:ConnectiveComponentData):any{
        this.anim.play();
        paramFromLower.AttackSpeed_Mult *= this.subWeaponCompParam.AttackSpeed_Mult;
        paramFromLower.BulletVelocity += this.subWeaponCompParam.BulletVelocity;
        paramFromLower.Damage_Mult *= this.subWeaponCompParam.Damage_Mult;
        paramFromLower.Force += this.subWeaponCompParam.Force;
        paramFromLower.ObjectNumber_Mult *= this.subWeaponCompParam.ObjectNumber_Mult;
        return paramFromLower;
    }

    /**执行自己的动作逻辑（如果有） */
    public ExecAction(param:ConnectiveComponentData){

    }
}
