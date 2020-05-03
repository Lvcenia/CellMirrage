import { AnimatorTransition } from "./AnimatorTransition";
import { XDictionary } from "./Base/XDictionary";
import { AnimationController } from "./AnimatorController";
import { AnimatorCondition } from "./AnimatorCondition";

export class AnimatorState{
    name:string = "";
    animation:string;
    loop:boolean = false;

    speed:number = 1;
    multi:string = "";

    transitions:XDictionary<AnimatorTransition>;
    default:boolean= false;

    ac:AnimationController;
    constructor(data:any,ac:AnimationController){
        this.name = data.state;
        this.animation = data.animation;
        if(data.default)
            this.default = true;
        this.transitions = new XDictionary<AnimatorTransition>();
        this.ac = ac;
        this.loop = data.loop;

        this.speed = (data.speed==undefined || data.speed==null)?1:data.speed;
        this.multi = data.multi?data.multi:"None";

        for (let i = 0; i < data.transition.length; i++) {
            let transition:AnimatorTransition = new AnimatorTransition(data.transition[i],ac) ;
            this.transitions.Add(transition.toStateName,transition);
        }
    }

    public update():void{
        let playspeed = this.speed;
        if(this.multi != "None"){
            playspeed = playspeed * this.ac.Params.getPropertyValue(this.multi,1);
        }
        this.ac.ScaleTime(playspeed);

        for (let i = 0; i < this.transitions.values().length; i++) {
            let transition:AnimatorTransition = this.transitions.values()[i];
            if(transition.can(AnimatorCondition.CHECK_ON_UPDATE)){
                transition.doTrans();
                return;
            }
        }
    }


    public onComplete():void{
        for (let i = 0; i < this.transitions.values().length; i++) {
            let transition:AnimatorTransition = this.transitions.values()[i];
            if(transition.can(AnimatorCondition.CHECK_ON_COMPLETE)){
                transition.doTrans();
                return;
            }
        }
    }

    public onTrigger(triggName:string):boolean{
        for (let i = 0; i < this.transitions.values().length; i++) {
            let transition:AnimatorTransition = this.transitions.values()[i];

            if(transition.can(AnimatorCondition.CHECK_ON_TRIGGER,triggName)){
                transition.doTrans();
                return true;
            }
        }
        return false;
    }
}
// ————————————————
// 版权声明：本文为CSDN博主「叫我上上」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/vikingsc2007_1/java/article/details/81070029