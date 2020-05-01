// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class SwitchMode extends cc.Component {
    @property
    CurrentMode:number=1;

    public dir:cc.Vec2=cc.v2(0,0);
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
        
        this.node.on(cc.Node.EventType.TOUCH_START,this.SwitchMode,this);
        //cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.trykeyboard,this);
        //cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.trykeyboard1,this);

    }
    SwitchMode():void{
        console.log("touch success");
        let sprite=this.node.getComponent(cc.Sprite);
        if(this.CurrentMode<3)
        {
            this.CurrentMode+=1;
        }
        else
        {
            this.CurrentMode=1;
        }
        let self = this;
        cc.loader.loadRes("switches/switch_"+this.CurrentMode.toString(), cc.SpriteFrame, function (err, spriteFrame) {
            self.node.getComponent(cc.Sprite).spriteFrame = spriteFrame;
        });
        console.log("switch="+this.CurrentMode);

    }



}
