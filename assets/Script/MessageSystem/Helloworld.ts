import {MessageManager} from "./MessageManager";
import * as MSG  from "./Message";

const {ccclass, property} = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {

    @property
    text: string = 'hello';

    testNum:number = 0;
    self = this;

    test :MSG.MessageCallback = (msg:MSG.Message)=> {
        //console.log("test 脚本内部" + "name: " +msg.MessageName +"data: " + msg.Data);
    }
    start () {
        // init logic
        console.log("started");
        this.test.bind(this);
        MessageManager.getInstance().Register("test",this.test);
    }

    update(){
        if(this.testNum < 5){
        MessageManager.getInstance().Send("test",233333);
        }
        this.testNum++;
        if(this.testNum == 5)
        {
           MessageManager.getInstance().Drop("test",this.test);
        }
    }
}
