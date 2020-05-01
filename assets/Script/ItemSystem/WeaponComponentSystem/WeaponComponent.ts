// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { SubWeaponComponent } from "./SubCompScripts/SubWeaponComponent";
import { MessageManager } from "../../MessageSystem/MessageManager";


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

    private hasNullChild:boolean = false;



    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.getSubWeaponComps();
    }

    /**拿到子物体里的子组件引用 子物体必须都存在*/
    private getSubWeaponComps(){
        this.topSub = cc.find("/Top",this.node);
        this.midSub = cc.find("/Mid",this.node);
        this.bottomSub = cc.find("/Bottom",this.node);

        if(this.topSub == null || this.midSub == null || this.bottomSub == null)
        {
            this.hasNullChild = true;
            return;
        } 

        this.topSubComp = this.topSub.getComponent(SubWeaponComponent);
        this.midSubComp = this.midSub.getComponent(SubWeaponComponent);
        this.bottomSubComp = this.bottomSub.getComponent(SubWeaponComponent);

    }

    /**需要攻击时调用 */
    public onAttackRequest(){
        if(this.hasNullChild) {
            console.log(this.node.name + "有子物体为空");
            return;
        }

        /**逐级传递并计算连接参数 */
        let connectParam1 = this.bottomSubComp.ParseParam();
                //把第一级的连接参数传到第二级 得到叠加后的连接参数
        let connectParam2 = this.midSubComp.ParseParam(connectParam1);
                /**把叠加完成后的连接参数传到伤害组件中去*/
        this.topSubComp.ParseParam(connectParam2);
        /**执行动作 */
        this.bottomSubComp.ExecAction(null);

        
        /**执行动作 */
        this.midSubComp.ExecAction(connectParam1);


        /** 执行武器的动作*/
        this.topSubComp.ExecAction(connectParam2);

        




    }

    /**需要胞吞时调用 */
    public onEndocytosis(){

    }

    // update (dt) {}
}
