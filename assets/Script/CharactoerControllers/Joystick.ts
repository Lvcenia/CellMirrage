import { MessageManager } from "../MessageSystem/MessageManager";


const {ccclass, property} = cc._decorator;
/**此处为摇杆代码，将此摇杆脚本绑定在绑定在摇杆上
 */
@ccclass
export default class Joystick extends cc.Component {

    /**stick为对应的摇杆中心球
     */
    @property(cc.Node)
    stick: cc.Node = null;
    /**max_R和min_R分别对应摇杆可以移动的最大半径和判定检测摇杆移动的最小半径
     */
    @property
    max_R:number=80;
    text: string = 'hello';
    @property
    min_R:number=20;

    public dir:cc.Vec2=cc.v2(0,0);
    onLoad () {
        this.stick.setPosition(cc.v2(0,0));
        this.stick.on(cc.Node.EventType.TOUCH_MOVE,this.on_stick_move,this);
        
        this.stick.on(cc.Node.EventType.TOUCH_END,function(){
            this.on_stick_end();
        },this);
        this.stick.on(cc.Node.EventType.TOUCH_CANCEL,function(){
            this.on_stick_end();
        },this);
    }
    /**设置当摇杆移动时移动中心球的位置
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
        MessageManager.getInstance().Send("JoystickMove",this.dir.x,this.dir.y);
        if(len>this.max_R)
        {
            pos.x=pos.x*this.max_R/len;
            pos.y=pos.y*this.max_R/len;
        }
        this.stick.setPosition(pos);
    }
    on_stick_end():void{
        this.dir=cc.v2(0,0);
        MessageManager.getInstance().Send("JoystickMove",this.dir.x,this.dir.y);
        this.stick.setPosition(cc.v2(0,0));
        
    }
 
    // update (dt) {}
}
