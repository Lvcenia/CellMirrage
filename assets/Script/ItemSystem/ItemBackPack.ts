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
export default class ItemBackPack extends cc.Component {


    /**背包中装载的武器和子组件列表 */
    /**保存子组件名字和个数的键值对 */
    private SubComps = {};
    private EquippedWeapons:WeaponComponentData[] = [];
    private SubComponents:SubWeaponComponentData[] = [];
    private WeaponComponents:WeaponComponentData[] = [];
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    //初始化函数中注册各种事件的回调
    start () {
        this.backBagInit();
        //MessageManager.getInstance().Register();

    }

    private backBagInit(){
        this.SubComps["A"] = {};
        this.SubComps["B"] = {};

    }

    /**返回玩家拥有的子组件物品列表 */
    public GetPlayerSubComps():SubWeaponComponentData[]{
        return this.SubComponents;
    }

    /**返回玩家拥有的武器组件物品列表 */
    public GetPlayerWeapons():WeaponComponentData[]{
        return this.WeaponComponents;
    }


    /**武器被装备时的逻辑 position是装备在背包中的位置
     * 这个函数会返回当前被装备的武器的Data
    */
    public onWeaponEquipRequest(position:number,slotNumber:number):WeaponComponentData{
        if(this.WeaponComponents[position]!=null){
            this.EquippedWeapons[slotNumber] = this.WeaponComponents[position];
            this.WeaponComponents.splice(position);
            return this.EquippedWeapons[slotNumber];
        }
        return null;

    }

    /**武器被从玩家身上卸下时的逻辑 slotNumber是武器的槽编号*/
    public onWeaponUnequipRequest(slotNumber:number){
        if(slotNumber>2) return;
        this.WeaponComponents.push(this.EquippedWeapons[slotNumber]);
        this.EquippedWeapons.splice(slotNumber);
    }

    /**处理武器合成请求的逻辑 */
    public onWeaponCraftRequest(param:WeaponComponentData):string{
        if( this.SubComps[param.TopSubName] > 0 && 
            this.SubComps[param.MidSubName] > 0 && 
            this.SubComps[param.BottomSubName] >0)
            {
                this.SubComps[param.TopSubName] -= 1;
                this.SubComps[param.MidSubName] -= 1;
                this.SubComps[param.BottomSubName] -= 1;
                this.WeaponComponents.push(param);
                return "合成成功！";
            }
        else{
            return "子组件不足，合成失败！";
        }

    }

    /**捡取获得武器时的逻辑 */
    public onWeaponObtained(param:WeaponComponentData){
        this.WeaponComponents.push(param);

    }

    /**武器分解的处理逻辑 */
    public onDecomposeWeaponRequest(param:WeaponComponentData):string{
        this.SubComps[param.TopSubName]++;
        this.SubComps[param.MidSubName]++;
        this.SubComps[param.BottomSubName]++;
        this.WeaponComponents.splice(this.WeaponComponents.indexOf(param));
        return "分解成功！";

    }

    /**基础功能 添加条目到某个位置 */
    private addItem(type:string,){

    }

    /**基础功能 删除某个位置的条目 */
    private removeItem(type:string){

    }


    // update (dt) {}
}
