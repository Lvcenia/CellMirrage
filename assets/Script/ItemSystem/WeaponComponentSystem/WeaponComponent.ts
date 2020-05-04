// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { SubWeaponComponent } from "./SubCompScripts/SubWeaponComponent";
import { MessageManager } from "../../MessageSystem/MessageManager";

///<refernce>
const {ccclass, property} = cc._decorator;

/**武器的脚本 挂在武器的物体上使用 */
@ccclass
export default class WeaponComponent extends cc.Component {

    //这把武器被装备的位置
    private slotNumber:number = 0;
    /**子组件结点的引用 */
    private topSub:cc.Node = null;
    private midSub:cc.Node = null;
    private bottomSub:cc.Node = null;

    /**子组件结点的子组件引用 */
    private topSubComp:SubWeaponComponent = null;
    private midSubComp:SubWeaponComponent = null;
    private bottomSubComp:SubWeaponComponent = null;

    /**子组件的数组，存的也是上面这几个东西，0是底部，2是顶部 */
    public SubCompList:SubWeaponComponent[] = [];

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

        this.SubCompList[0] = this.bottomSubComp;
        this.SubCompList[1] = this.midSubComp;
        this.SubCompList[2] = this.bottomSubComp;

    }

    /**需要攻击时调用 */
    public onAttackRequest(){
        if(this.hasNullChild) {
            console.log(this.node.name + "有子物体为空");
            return;
        }


        /**逐级传递并计算连接参数 */
        let connectParam1 = this.bottomSubComp.ParseParam();
        let connectParam2;
                //把第一级的连接参数传到第二级 得到叠加后的连接参数
        if(this.midSubComp != null){
            connectParam2 = this.midSubComp.ParseParam(connectParam1);
        }

                /**把叠加完成后的连接参数传到伤害组件中去*/
        if(this.topSubComp != null){
        this.topSubComp.ParseParam(connectParam2);
        }

        /**执行动作 */
        this.bottomSubComp.ExecAction(null);

        /**执行动作 */
        if(this.midSubComp != null)
        this.midSubComp.ExecAction(connectParam1);

        /** 执行武器的动作*/
        if(this.topSubComp != null)
        this.topSubComp.ExecAction(connectParam2);

        let ani = this.node.getComponent(dragonBones.ArmatureDisplay);
        

        




    }

    /**需要胞吞时调用 */
    public onEndocytosis(){

    }

    // update (dt) {}
}
