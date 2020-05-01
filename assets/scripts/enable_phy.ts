
const {ccclass, property} = cc._decorator;

@ccclass
export default class enable_phy extends cc.Component {

    @property(cc.Vec2)
    gravity: cc.Vec2 = cc.v2(0,-320);

    @property
    is_debug:boolean=false;


    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        //step1 开启物理引擎
        cc.director.getPhysicsManager().enabled=true;
        cc.director.getPhysicsManager().enabled = true;
        //step2 配置重力
        cc.director.getPhysicsManager().gravity=this.gravity;

        if(this.is_debug)
        {
            var Bits:any=cc.PhysicsManager.DrawBits;
            cc.director.getPhysicsManager().debugDrawFlags=Bits.e_aabbBit|Bits.e_pairBit|Bits.e_centerofMassBit|Bits.e_joinBit|Bits.e_shapeBit;
        }
        else{
            cc.director.getPhysicsManager().debugDrawFlags=0;
        }

    }

    start () {

    }

    // update (dt) {}
}
