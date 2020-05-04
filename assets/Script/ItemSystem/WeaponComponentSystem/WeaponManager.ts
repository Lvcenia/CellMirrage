// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { WeaponComponentData } from "../ItemsData";
import WeaponComponent from "./WeaponComponent";
import { SubWeaponComponent } from "./SubCompScripts/SubWeaponComponent";

const {ccclass, property} = cc._decorator;

/**挂在玩家上 管理武器组件、子组件Prefab的实例化、入池、出池，以及玩家对武器的装备和卸下
 * 在进入MainHallScene的时候加载，并且保留到后面的场景
*/
@ccclass
export default class WeaponManager extends cc.Component  {
    @property
    PrefabUrl: string = 'Prefabs/WeaponComponentSystem/';

    @property({type:cc.Node,displayName:"第1个武器的挂点"})
    private weapon0AttachNode:cc.Node = null;
    @property({type:cc.Node,displayName:"第2个武器的挂点"})
    private weapon1AttachNode:cc.Node = null;
    @property({type:cc.Node,displayName:"第3个武器的挂点"})
    private weapon2AttachNode:cc.Node = null;



    /**当前正在装备的武器数组 */
    private equippedWeapons:WeaponComponent[] = [];
    /**当前活跃的武器的数组索引 */
    private curWeaponIndex = 0;
    /**当前活跃的武器组件 */
    private currentWeapon:WeaponComponent;

    /**武器prefab引用 */
    private weaponPrefab:cc.Prefab;
    /**子组件prefab的引用 */
    private subCompPrefabs = {};

    /**武器的对象池 */
    private WeaponNodePool:cc.NodePool;
    /**子组件的对象池的列表 */
    private SubCompNodePoolList = {};


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.WeaponNodePool = new cc.NodePool("Weapons");
        this.InstantiatePrefabs();
        

    }

    start () {
        
        
        
    }

    /**场景开始的时候加载子组件的prefab资源 并入池*/
    public InstantiatePrefabs(){
    //加载武器的prefab
    //     cc.loader.loadRes(this.PrefabUrl + "WeaponPrefab", (errorMessage,loadedResource)=>{
    //         //检查资源加载
    //         if( errorMessage ) { cc.log( '载入预制资源失败, 原因:' + errorMessage ); return; }
    //         if( !( loadedResource instanceof cc.Prefab ) ) { cc.log( '你载入的不是预制资源!' ); return; } 
    //         this.weaponPrefab = loadedResource;
    //         //开始实例化预制资源
    //         for(let i = 0; i < 4; i++)
    //         {
    //             var WeaponObj = cc.instantiate(loadedResource);
    //             this.WeaponNodePool.put(WeaponObj);
    //         }
    //    });
    //加载子组件的prefab
       cc.loader.loadResDir(this.PrefabUrl+"SubComponents",cc.Prefab,(err,prefabs)=>{
              if (err) {
               cc.error(err);
               return;
               }
               for(let i = 0; i < prefabs.length;i++)//遍历所有prefab
               {
                   let SubCompPrefab:cc.Prefab = prefabs[i];
                   this.subCompPrefabs[SubCompPrefab.name] = SubCompPrefab;
                   this.SubCompNodePoolList[SubCompPrefab.name] = new cc.NodePool(SubCompPrefab.name)
                   for(let j = 0; j < 6;j++)//每种6个
                   {
                       let SubCompObj = cc.instantiate(SubCompPrefab);
                       this.SubCompNodePoolList[SubCompPrefab.name].put(SubCompObj);

                   }
               }
       });

    }


    /**创建武器的节点实例并返回引用，在将武器装备到玩家身上时会调用 */
    public InstantiateWeapon(param:WeaponComponentData):cc.Node[]{
        // let weapon:cc.Node = null;
        // if (this.WeaponNodePool.size() > 0) { // 通过 size 接口判断对象池中是否有空闲的对象
        //     weapon = this.WeaponNodePool.get();
        // } else { // 如果没有空闲对象，也就是对象池中备用对象不够时，我们就用 cc.instantiate 重新创建
        //     weapon = cc.instantiate(this.weaponPrefab);
        // }

        //拿到武器以后拿子组件
        let  topSub:cc.Node = null;
        let midSub:cc.Node = null;
        let bottomSub:cc.Node = null;

        /**底部的实例化 */
        if(this.SubCompNodePoolList[param.BottomSubName].size() > 0)
        {
            bottomSub = this.SubCompNodePoolList[param.BottomSubName].get();
        } 
        else 
        {
            bottomSub = cc.instantiate(this.subCompPrefabs[param.BottomSubName]);
        }

        /**中部实例化 */
        if(param.MidSubName !== "none")
        {
            if(this.SubCompNodePoolList[param.MidSubName].size() > 0)
            {
                midSub = this.SubCompNodePoolList[param.MidSubName].get();
            } 
            else 
            {
                midSub = cc.instantiate(this.subCompPrefabs[param.MidSubName]);
            }
        }


        /**顶层实例化 */
        if(param.TopSubName !== "none")
        {
            if(this.SubCompNodePoolList[param.TopSubName].size() > 0)
            {
                topSub = this.SubCompNodePoolList[param.TopSubName].get();
            } 
            else 
            {
                topSub = cc.instantiate(this.subCompPrefabs[param.TopSubName]);
            }
        }

        let subCompNodes:cc.Node[] = [bottomSub,midSub,topSub];

        return subCompNodes;
    }

    /**玩家装备某个武器时 */
    public onWeapon_Equipped(param:WeaponComponentData,slotNumber:number){
        if(slotNumber>2 || slotNumber<0 ) 
        {
            console.log("装备槽号不合法"); return;
        }

        let weapon:cc.Node;
        //武器挂到挂点下面
        switch(slotNumber){
            case 0:
                weapon = this.weapon0AttachNode;
                break;
            case 1:
                weapon = this.weapon1AttachNode;
                break;
            case 2:
                weapon = this.weapon2AttachNode;
                break;
        }

        let weaponCompnent = weapon.getComponent(WeaponComponent);
        if(weaponCompnent === null) return;

        let subSompNodes = this.InstantiateWeapon(param);

        /**设置好挂点下面的子组件实体 */
        weaponCompnent.SetRealSubCompNodes(subSompNodes[0],subSompNodes[1],subSompNodes[2]);
    }

    /**玩家卸下某个装备时 */
    public onWeapon_Unequipped(slotNumber:number){

    }

    /**玩家切换当前活跃装备 参数是将要切换到的槽*/
    public SwitchCurrentWeapon(toSlotNumber:number){

    }

    // update (dt) {}
}
