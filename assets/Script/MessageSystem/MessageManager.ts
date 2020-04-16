// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html


const {ccclass, property} = cc._decorator;
import * as MSG  from "./Message"
import Dictionary from "../Generic/Dictionary";


class CallbackStoreStruct {
    constructor(callback:MSG.MessageCallback,caller:any){
        this.Callback = callback;
        this.Caller = caller;
    }
    Callback:MSG.MessageCallback;
    Caller:any
}

@ccclass
export class MessageManager {
    constructor(){
        
    }
    private eventTarget:cc.EventTarget = new cc.EventTarget();
    private static _instance: MessageManager = new MessageManager();
    private messageDict:Dictionary<MSG.MessageCallback[]> = new Dictionary<MSG.MessageCallback[]>();//注册的消息字典,键是消息名字，值是对应的回调数组
    public static getInstance() : MessageManager{
        return this._instance;
    }

    /**
     * 注册一个消息回调，参数是消息名称和消息回调 
     * 填消息回调的时候记得写.bind(this)
             */
    public Register(msgName:string,callback:MSG.MessageCallback,caller:any = null) {
        console.log("注册" + msgName);
        if(this.messageDict.has(msgName)){
            var callbacks = this.messageDict.get(msgName);
            if(callbacks.indexOf(callback) === -1)//回调不存在，插入
            {
                callbacks.push(callback);
            }
        } else {
            var callbacks: MSG.MessageCallback[] = [callback];
            this.messageDict.set(msgName,callbacks); 
        }
    }
    /**
     * 发送一个消息，参数是消息名称和你要附加的数据
     * 所有绑定到这个消息的回调函数都会传入你填入的data参数然后执行
     * 如果没有数据 可以不填 默认是null
             */
    public Send(msgName:string,caller:any,data:any = null){
        //this.eventTarget.emit(msgName,new GameMessage.Message(msgName,data));
        console.log("Send" + msgName);
        var callbacks = this.messageDict.get(msgName);
        if(callbacks === undefined){
            console.log(`消息${msgName}没有绑定回调`);
            return
            } 
            callbacks.forEach(callback => {
                callback.call(caller,new MSG.Message(msgName,data));
              });
        
    }
        /**
     * 移除一个已经注册的消息回调，参数是消息名称和消息回调
     * 如果不填回调，就移除该消息的所有回调
     * 请注意，对于非常驻的监听，一定要在适当的位置移除，否则可能会导致游戏物体已经删除
     * 但仍然保留了监听的情况
             */
    public Drop(msgName:string,callback:MSG.MessageCallback = null){
        //this.eventTarget.off(msgName,callback);
        var callbacks = this.messageDict.get(msgName);
        if(callbacks === undefined) {
            console.log(`消息${msgName}回调组不存在`)
            return false;
        }
        if(callback === null) {
            console.log("没有提供回调，删除消息下的全部回调函数");
            this.messageDict.delete(msgName);
            return true;
        }

        var index = callbacks.indexOf(callback)
        //console.log("试图删除：" + callback.toString());
        for(let i = 0; i <callbacks.length; i++){
            //console.log(callbacks[i].toString())
        }
        if(index === -1){//如果不存在这个函数，就返回
             console.log(callback.toString()+ "回调不存在");return false;
        } 
        console.log("回调存在 删除" + index);
        callbacks.splice(index,1);
        if(callbacks.length === 0){//如果删完以后没有回调了，就删掉这个消息
            this.messageDict.delete(msgName);
        } else {//否则更新回调数组
            this.messageDict.set(msgName,callbacks);
        }
        return true;
        
    }

    /**
     * 清空所有注册过的消息,场景切换之前调用一下
     */
    public Clear(){
        this.messageDict.clear();
    }


}
