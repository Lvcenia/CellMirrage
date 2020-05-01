// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

import { DamageSCompTemplates } from "../DataTemplates/DamageSCompTemplates";
import { ConnectiveSCompTemplates } from "../DataTemplates/ConnectiveSCompTemplates";

const {ccclass, property} = cc._decorator;

export const SubWeaponComponentDomain = {
    Connective:"Connective",
    Damage:"Damage"
}

/**武器的数据类 用来在合成和分解的时候传递信息 */
@ccclass
export class WeaponComponentData{
    constructor(topName:string,midName:string,bottomName:string){
        this.TopSubName = topName;
        this.MidSubName = midName;
        this.BottomSubName = bottomName;
        this.Name = topName+"的、"+midName+"的、"+ bottomName;
        this.Description = `由${topName}、${midName}、${bottomName}组合而成的武器`;
       

    }
    public ID:number;
    public Name:string;
    public Description:string;
    public TopSubName:string;
    public MidSubName:string;
    public BottomSubName:string;

}

/**子组件的数据基类 主要用来做背包和背包UI的交互*/
@ccclass
export class SubWeaponComponentData{
    constructor(name:string,id:number,description:string,domain:string,spriteName:string){
        this.Name = name;
        this.ID = id;
        this.Description = description;
        this.Domian = domain;
        this.SpriteName = spriteName;
    }

    public ID:number;
    public Name:string;
    public Description:string;

    /**子组件类型 */
    public Domian:string;
    /**贴图的文件名 */
    public SpriteName:string;



}

/**连接型子组件的数据类 用来在连接效果叠加时传递参数 构造函数参数是名字*/
@ccclass
export class ConnectiveComponentData extends SubWeaponComponentData{
    constructor(name:string){
        super(name,ConnectiveSCompTemplates[name].ID,ConnectiveSCompTemplates[name].Description,
            ConnectiveSCompTemplates[name].Domian,ConnectiveSCompTemplates[name].SpriteName);

            this.ObjectNumber_Mult = ConnectiveSCompTemplates[name].ObjectNumber_Mult;
            this.AttackSpeed_Mult = ConnectiveSCompTemplates[name].AttackSpeed_Mult;
            this.Damage_Mult = ConnectiveSCompTemplates[name].Damage_Mult;
            this.ElasticFactor = ConnectiveSCompTemplates[name].ElasticFactor;
            this.BulletVelocity = ConnectiveSCompTemplates[name].BulletVelocity;
            this.Force = ConnectiveSCompTemplates[name].Force;

    }
    /**物体数量加倍 */
    ObjectNumber_Mult:number;
    /**攻击速度倍率 */
    AttackSpeed_Mult:number;
    /**伤害倍率 */
    Damage_Mult:number;
    /**弹性系数 0是刚性，越大越弹*/
    ElasticFactor:number;
    /** 下一单位的基础速度*/
    BulletVelocity:number;
    /** 施加给下一单位的力 */
    Force:number;

}

/**伤害型子组件的数据类 构造函数参数是名字*/
@ccclass
export class DamageComponentData extends SubWeaponComponentData{
    constructor(name:string){
        super(name,DamageSCompTemplates[name].ID,DamageSCompTemplates[name].Description,
            DamageSCompTemplates[name].Domian,DamageSCompTemplates[name].SpriteName);

        this.Duration = DamageSCompTemplates[name].Duration;
        this.KickBackForce = DamageSCompTemplates[name].KickBackForce;
        this.PercentFactor = DamageSCompTemplates[name].PercentFactor;
        this.isDOT = DamageSCompTemplates[name].isDOT;
        this.isPercentage = DamageSCompTemplates[name].isPercentage;
        this.BaseDamage = DamageSCompTemplates[name].BaseDamage;
        
    }
    /**基础伤害值 */
    BaseDamage:number;
    /** 是否是持续伤害*/
    isDOT:boolean;
    /**持续时间 */
    Duration:number;
    /**是否是百分比 */
    isPercentage:number;
    /**百分比数值 */
    PercentFactor:number;
    /** 对受伤对象施加的力*/
    KickBackForce:number;

    

}




