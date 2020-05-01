// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

/// <reference path = "../state-machine.d.ts" /> 
import JSM =   require('../state-machine')

const {ccclass, property} = cc._decorator;



@ccclass
export default class ControllerTest extends cc.Component {

    enemystate;
    
    start(){
        this.enemystate = new JSM(
            {
            init:'patrol',
            //状态转换.
            transitions:[
                {name:'patrol_approach',   from:'patrol',   to:'approach'},
                {name:'patrol_attack',     from:'patrol',   to:'attack'},
                {name:'approach_attack',   from:'approach', to:'attack'},
                {name:'approach_death',    from:'approach', to:'death'},
                {name:'attack_death',      from:'attack',   to:'death'}
            ],
            //函数
            methods:{
                onPatrol_approach:
                function(){
                    console.log("approaching");
                },
    
                onPatrol_attack:
                function(){
                    console.log("attacking");
    
                },
                onApproach_attack:
                function(){
                    console.log("")
    
                },
    
                onApproach_death:
                function(){
    
                },
    
                onAttack_death:
                function(){
                }
    
            }
    
        });


        this.enemystate.patrol_approach();

    }

    // update (dt) {}
}
