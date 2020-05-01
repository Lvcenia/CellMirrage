// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

@ccclass
export default class shoot extends cc.Component {

    @property(cc.Prefab)
    bullet:cc.Prefab=null;
    
    bullets:cc.Node=null;
    @property(cc.Node)
    bulletRoot:cc.Node=null;
    firePos:cc.Vec2 = null;

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.shoot, this);
        
    }

    start () {
        this.firePos=this.node.getPosition();
    }
    shoot()
    {

        this.bullets=cc.instantiate(this.bullet);
        cc.find("Canvas/map").addChild(this.bullets);
        console.log("shoot");
        
        //this.bullets.removeFromParent(true);
        this.firePos=this.node.getPosition();
        //this.firePos.x=this.firePos.x-Math.sin(this.node.angle*0.017453293)*10;
        //this.firePos.y=this.firePos.y+Math.sin(this.node.angle*0.017453293)*10;
        this.bullets.setPosition(this.firePos);
        //this.node.addChild(this.bullets);
        console.log("firepos");
        console.log(this.firePos.x);
        console.log(this.firePos.y);
        
    }


    update (dt) {

    }
}
