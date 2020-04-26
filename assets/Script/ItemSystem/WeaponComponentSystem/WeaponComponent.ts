// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { SubWeaponComponent } from "./SubComps/SubWeaponComponent";


const {ccclass, property} = cc._decorator;

/**武器的脚本 挂在武器的物体上使用 */
@ccclass
export default class WeaponComponent extends cc.Component {

    /**子组件结点的引用 */
    private topSub:cc.Node;
    private midSub:cc.Node;
    private bottomSub:cc.Node;

    /**子组件结点的子组件引用 */
    private topSubComp:SubWeaponComponent
    private midSubComp:SubWeaponComponent;
    private bottomSubComp:SubWeaponComponent;

    /**子组件结点的动画机引用 */
    private topSubAnim:cc.Animation;
    private midSubAnim:cc.Animation;
    private bottomSubAnim:cc.Animation;

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.getSubWeaponComps();
    }

    /**拿到子物体里的子组件引用 */
    private getSubWeaponComps(){
        this.topSub = cc.find("/TopSubComp",this.node);
        this.midSub = cc.find("/MidSubComp",this.node);
        this.bottomSub = cc.find("/BottomSubComp",this.node);

        this.topSubComp = this.topSub.getComponent(SubWeaponComponent);
        this.midSubComp = this.midSub.getComponent(SubWeaponComponent);
        this.bottomSubComp = this.bottomSub.getComponent(SubWeaponComponent);

        this.topSubAnim = this.topSub.getComponent(cc.Animation);
        this.midSubAnim = this.midSub.getComponent(cc.Animation);
        this.bottomSubAnim = this.bottomSub.getComponent(cc.Animation);
    }

    /**需要攻击时调用 */
    private onAttackRequest(){


    }

    // update (dt) {}
}
