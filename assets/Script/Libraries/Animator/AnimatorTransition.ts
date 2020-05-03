import { AnimatorCondition } from "./AnimatorCondition";
import { AnimationController } from "./AnimatorController";

export class AnimatorTransition{
    toStateName:string;
    conditons:Array<AnimatorCondition>;
    ac:AnimationController;
    constructor(data:any,ac:AnimationController){
        this.toStateName = data.nextState;
        this.conditons = new Array<AnimatorCondition>();
        this.ac = ac;
        for (let i = 0; i < data.condition.length; i++) {
            let condition:AnimatorCondition = new AnimatorCondition(data.condition[i],ac) ;
            this.conditons.push(condition);
        }
    }

    public can(checkType:number,triggerName?:string):boolean{
        if(this.toStateName == this.ac.curStateName){
            return false;
        }

        let cando:boolean = true;
        for (let i = 0; i < this.conditons.length; i++) {
            cando = (cando && this.conditons[i].check(checkType,triggerName));
        }
        return cando;
    }
    public doTrans():void{
        this.ac.ChangeState(this.toStateName);
    }


}
// ————————————————
// 版权声明：本文为CSDN博主「叫我上上」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/vikingsc2007_1/java/article/details/81070029