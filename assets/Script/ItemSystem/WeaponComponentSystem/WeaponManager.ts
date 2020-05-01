// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { WeaponComponentData } from "../ItemsData";
import WeaponComponent from "./WeaponComponent";

const {ccclass, property} = cc._decorator;

/**挂在玩家上 管理武器组件、子组件Prefab的实例化、入池、出池，以及玩家对武器的装备和卸下*/
@ccclass
export default class WeaponManager extends cc.Component  {
    @property
    PrefabUrl: string = 'Prefabs/WeaponComponentSystem/';

    private equippedWeapons:WeaponComponent[] = [];
    private curWeaponIndex = 0;
    private currentWeapon:WeaponComponent;

    private WeaponNodePool:cc.NodePool;
    private 




    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //this.InstantiatePrefabs();
        

    }

    start () {
        
        
    }

    /**场景开始的时候加载武器和子组件的prefab资源 并入池*/
    public InstantiatePrefabs(){
    //加载武器的prefab
        cc.loader.loadRes(this.PrefabUrl + "WeaponPrefab", function(errorMessage,loadedResource){
            //检查资源加载
            if( errorMessage ) { cc.log( '载入预制资源失败, 原因:' + errorMessage ); return; }
            if( !( loadedResource instanceof cc.Prefab ) ) { cc.log( '你载入的不是预制资源!' ); return; } 
            //开始实例化预制资源
            var WeaponPrefab = cc.instantiate(loadedResource);

            

           
       });
    //加载子组件的prefab

    }


    /**创建武器的节点实例并返回引用，在将武器装备到玩家身上时会调用 */
    public InstantiateWeapon(param:WeaponComponentData):cc.Node{
        return null;
    }

    /**玩家装备某个武器时 */
    public onWeapon_Equipped(param:WeaponComponentData){

    }

    /**玩家卸下某个装备时 */
    public onWeapon_Unequipped(slotNumber:number){

    }

    /**玩家切换当前活跃装备 */
    public SwitchCurrentWeapon(){

    }

    // update (dt) {}
}
