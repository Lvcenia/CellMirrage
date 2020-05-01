

const {ccclass, property} = cc._decorator;

@ccclass
export default class joystick extends cc.Component {

    @property(cc.Node)
    stick: cc.Node = null;

    @property
    max_R:number=80;
    text: string = 'hello';
    @property
    min_R:number=20;

    public dir:cc.Vec2=cc.v2(0,0);
    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.stick.setPosition(cc.v2(0,0));
        
        this.stick.on(cc.Node.EventType.TOUCH_MOVE,this.on_stick_move,this);
        //cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.trykeyboard,this);
        //cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP,this.trykeyboard1,this);
        this.stick.on(cc.Node.EventType.TOUCH_END,function(){
            this.on_stick_end();
        },this);
        this.stick.on(cc.Node.EventType.TOUCH_CANCEL,function(){
            this.on_stick_end();
        },this);
    }
    /*trykeyboard(event:cc.Event.EventKeyboard):void{
        
        switch(event.keyCode) {
            case cc.macro.KEY.n:
                console.log('Press a key');
                break;
        }
        
    }
    trykeyboard1(event:cc.Event.EventKeyboard):void{
        
        switch(event.keyCode) {
            case cc.macro.KEY.n:
                console.log('release a key');
                break;
        }
        

    }
*/
    on_stick_move(e:cc.Touch): void{
        var screen_pos:cc.Vec2=e.getLocation();
        var pos:cc.Vec2 = this.node.convertToNodeSpaceAR(screen_pos);
        var len:number=pos.mag();
        if(len<=this.min_R)
        {
            this.stick.setPosition(pos);
            return;
        }
        this.dir.x=pos.x/len;
        this.dir.y=pos.y/len;
        if(len>this.max_R)
        {
            pos.x=pos.x*this.max_R/len;
            pos.y=pos.y*this.max_R/len;
        }
        this.stick.setPosition(pos);
        

    }
    on_stick_end():void{
        this.dir=cc.v2(0,0);
        this.stick.setPosition(cc.v2(0,0));
        
    }
 
    // update (dt) {}
}
