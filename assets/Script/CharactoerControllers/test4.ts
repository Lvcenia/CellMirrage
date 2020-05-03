let StateMachine = require('state-machine');

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    // @property(cc.Label)
    // label: cc.Label = null;

    // @property
    // text: string = 'hello';

    state=new StateMachine.create({
        initial: 'a1',
        //please select the enter-state here ↓
        events: [
        //{"name":"startup","from":"nope","to":/*enter-state*/},
        {"name":"fx","from":"a1","to":"a2"},
        {"name":"gx","from":"a2","to":"a1"}
        ],  
        methods: {
            onFx:  ()=> { 
                console.log('1-2')    
            },


            onGx:  ()=> { 
                 console.log('2-1')     
            },
          }      
    });



    // LIFE-CYCLE CALLBACKS:

    onLoad () {

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onkeydown, this); 
    }

    onkeydown(e: { keyCode: cc.macro.KEY; }){
        if(e.keyCode==cc.macro.KEY.tab){

            if(this.state.is("a1")){
                this.node.runAction(
                    cc.callFunc(()=>{
                        //this.state.fx();
                    })
                );
                this.state.fx();
                console.log("a1");
            }

            if(this.state.is("a2")){
                this.node.runAction(
                    cc.callFunc(()=>{
                        //this.state.gx();
                    })
                )
                this.state.gx();
                console.log("a2");
            }

        }
    }


    
        
    start () {

    }


    // update (dt) {}
}
