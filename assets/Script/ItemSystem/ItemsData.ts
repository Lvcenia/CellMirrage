// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

export const SubWeaponComponentDomain = {
    Connective:"ConnectiveComp",
    Damage:"DamageMakeComp"
}

/**武器的数据类  */
@ccclass
export class WeaponComponentData{
    constructor(topName:string,midName:string,buttomName:string){
       

    }
    public ID:number;
    public Name:string;
    public Description:string;
    public TopSubComp:SubWeaponComponentData;
    public MidSubComp:SubWeaponComponentData;
    public ButtomSubComp:SubWeaponComponentData;

}

/**子组件的数据基类 主要用来做背包和背包UI的交互*/
@ccclass
export class SubWeaponComponentData{
    constructor(name:string){

    }
    public ID:number;
    public Name:string;
    public Description:string;

    /**子组件类型 */
    public Domian:string;
    /**贴图的文件名 */
    public SpriteName:string;
    /**音效文件名 */
    public SFX_Name:string;

}

/**连接型子组件的数据类 用来在连接效果叠加时传递参数*/
@ccclass
export class ConnectiveComponentData extends SubWeaponComponentData{
    constructor(name:string){
        super(name);
        this.Domian = SubWeaponComponentDomain.Connective;

    }



}

/**伤害型子组件的数据类 记录参数*/
@ccclass
export class DamageComponentData extends SubWeaponComponentData{
    constructor(name:string){
        super(name);
        this.Domian = SubWeaponComponentDomain.Damage;
    }

    

}




