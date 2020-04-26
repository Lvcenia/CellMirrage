// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { MessageManager } from "../MessageSystem/MessageManager";
import { SubWeaponComponentData, WeaponComponentData } from "./ItemsData";

const {ccclass, property} = cc._decorator;

const ItemType = {
    WeaponComponent : "W_C",
    SubWeaponComponent : "SW_C"

}

/**背包管理类 单例 随游戏初始化而创建 */
@ccclass
export default class ItemBackBag extends cc.Component {


    /**背包中装载的武器和子组件列表 */
    private EquippedWeapons:WeaponComponentData[] = [];
    private SubComponents:SubWeaponComponentData[] = [];
    private WeaponComponents:WeaponComponentData[] = [];
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    //初始化函数中注册各种事件的回调
    start () {
        //MessageManager.getInstance().Register();

    }
    /**返回玩家拥有的子组件物品列表 */
    public GetPlayerSubComps():SubWeaponComponentData[]{
        return this.SubComponents;
    }

    /**返回玩家拥有的武器组件物品列表 */
    public GetPlayerWeapons():WeaponComponentData[]{
        return this.WeaponComponents;
    }

    /**处理交换两个物品位置的逻辑 */
    public onSwitchPositionRequest(){

    }

    /**武器被装备时的逻辑 */
    public onEquipWeaponRequest(){

    }

    /**武器合成成功时的逻辑 */
    public onSubCompMergeSuccess(){

    }

    /**捡取获得物品时的逻辑 */
    public onItemPickedUp(){

    }

    /**武器分解成功时的逻辑 */
    public onDecomposeSuccess(){

    }

    /**基础功能 添加条目到某个位置 */
    private addItem(type:string,){

    }

    /**基础功能 删除某个位置的条目 */
    private removeItem(type:string){

    }


    // update (dt) {}
}
