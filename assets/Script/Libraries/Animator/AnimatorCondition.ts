import { AnimationController } from "./AnimatorController";



export class AnimatorCondition {

    public static LOGIC_EQUAL: number = 0;
    public static LOGIC_GREATER: number = 1;
    public static LOGIC_LESS: number = 2;
    public static LOGIC_NOTEQUAL: number = 3;


    public static TYPE_COMPLETE: number = 0;
    public static TYPE_BOOL: number = 1;
    public static TYPE_NUMBER: number = 2;
    public static TYPE_TRIGGER: number = 3;


    public static CHECK_ON_UPDATE: number = 1;
    public static CHECK_ON_COMPLETE: number = 2;
    public static CHECK_ON_TRIGGER: number = 3;

    ac: AnimationController;
    value: number = 0;// type == 1;0为false，1为true。  type ==2 为值
    logic: number = 0;//大于 小于 等于
    id: string = "";
    type: number = 3;// 1:真假 2:数值比较 3:触发器

    constructor(data: any, ac: AnimationController) {
        this.ac = ac;
        this.value = data.value;
        this.logic = data.logic;
        this.id = data.id;
        this.type = data.type;
    }

    public check(checkType:number,triggerName?:string): boolean {
        if (this.type == AnimatorCondition.TYPE_BOOL) {
            // cc.log("con:"+this.id +"["+this.value+"/"+this.ac.Params.getPropertyBool(this.id)+"]");
            return this.ac.Params.getPropertyBool(this.id)==(this.value==0?false:true);
        } else if (this.type == AnimatorCondition.TYPE_NUMBER) {
            let value: number = this.ac.Params.getPropertyValue(this.id);
            // cc.log("con:"+this.id +"["+this.value+"/"+value+"]");
            if (this.logic == AnimatorCondition.LOGIC_EQUAL) {
                return value == this.value;
            } else if (this.logic == AnimatorCondition.LOGIC_GREATER) {
                return value > this.value;
            } else if (this.logic == AnimatorCondition.LOGIC_LESS) {
                return value < this.value;
            } else if (this.logic == AnimatorCondition.LOGIC_NOTEQUAL) {
                return value != this.value;
            } else {
                return false;
            }
        } else if (this.type == AnimatorCondition.TYPE_COMPLETE) {
            if(checkType == AnimatorCondition.CHECK_ON_COMPLETE)
                return true;
            else
                return false;
        } else if (this.type == AnimatorCondition.TYPE_TRIGGER) {
            // if ("jumpPress" == triggerName) {
            //     cc.log("==== jumpPress this.id " + this.id);
            // }

            if(checkType == AnimatorCondition.CHECK_ON_TRIGGER)
                return this.id == triggerName;
            else
                return false;
        }
        else if (this.type == 0) {
            return false;
        }
    }
}
// ————————————————
// 版权声明：本文为CSDN博主「叫我上上」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/vikingsc2007_1/java/article/details/81070029