// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { SubWeaponComponentData, ConnectiveComponentData } from "../../ItemsData";



const {ccclass, property} = cc._decorator;

/**这个类是子组件的执行脚本，直接挂在子组件的物体上使用 */
@ccclass
export class SubWeaponComponent extends cc.Component {

    /**该子组件在武器中的位置，0是底部，1是中部，2是末端,在实际创建武器物体的时候被指定*/
    public Order:number;
    //子组件的核心，参数
    @property(SubWeaponComponentData)
    protected subWeaponCompParam:SubWeaponComponentData;
    //贴图
    protected sprite:cc.Sprite;
    //动画机
    protected anim:cc.Animation;
    //声音
    protected audioSource:cc.AudioSource;
    //刚体
    protected rb:cc.RigidBody;
    
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        this.sprite = this.getComponent(cc.Sprite);
        this.anim = this.getComponent(cc.Animation);
        this.audioSource = this.getComponent(cc.AudioSource);
        this.rb = this.getComponent(cc.RigidBody);

    }

    /**执行子组件功能的接口 参数是从底下一级传上来的连接效果参数*/
    public ParseParam(paramFromLower?:ConnectiveComponentData):any{

    }

    public ExecAction(param:ConnectiveComponentData){

    }
}
