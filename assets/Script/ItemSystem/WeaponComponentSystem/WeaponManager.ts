// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { WeaponComponentData } from "../ItemsData";

const {ccclass, property} = cc._decorator;

/**单例 管理武器的结点实例、入池等 在CombatScene内部使用*/
@ccclass
export default class WeaponManager extends cc.Component  {
    PrefabUrl: string = 'Prefabs/WeaponComponentSystem/';

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        
    }

    /**游戏开始的时候加载武器和子组件的prefab资源 并入池*/
    public InitWeaponInstantiation(){
    //加载
    //     cc.loader.loadRes(this.PrefabUrl + "WeaponPrefab", function(errorMessage,loadedResource){
    //         //检查资源加载
    //         if( errorMessage ) { cc.log( '载入预制资源失败, 原因:' + errorMessage ); return; }
    //         if( !( loadedResource instanceof cc.Prefab ) ) { cc.log( '你载入的不是预制资源!' ); return; } 
    //         //开始实例化预制资源
    //         var WeaponPrefab = cc.instantiate(loadedResource);

    //         //将预制资源添加到父节点
    //          CanvasNode.addChild(TipBoxPrefab);

    //         //获取预制资源中的js组件，并作出相应操作
    //         var TipBoxScript = TipBoxPrefab.getComponent('tipbox');
    //         //开始操作JS组件脚本
    //         TipBoxScript.action(ButtonNumber,callbackObj); //开始为JS组件进行初始化操作,action 为自定义初始化方法
    //         TipBoxScript.setTipContent(content); //设置提示框的内容
    //         SelfCallBack(TipBoxPrefab,TipBoxScript);
    //    });

    }


    /**创建武器的节点实例并返回引用，在将武器装备到玩家身上时会调用 */
    public InstantiateWeapon(param:WeaponComponentData):cc.Node{
        return null;
    }

    // update (dt) {}
}
