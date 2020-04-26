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

    /**重写Exec 对于连接型子组件 会将自己的功能传递到上层去 */
    public Exec(){

    }
}
