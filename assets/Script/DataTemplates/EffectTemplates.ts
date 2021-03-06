// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html



/**这个文件存放各种已经写好的由EXCEL转换过来的效果的模板 */
export var EffectTemplates = {
	"HP_DOWN_NORMAL": {
		"ID": 1001,
		"Name": "HP_DOWN_NORMAL",
		"Description": "普通的单次扣血deltaV",
		"Type": "HP",
		"behaviourMode": "Instant",
		"isTenporary": false,
		"Duration": 0,
		"isStackable": false,
		"maxStackNum": 0,
		"updateMode": "Add",
		"deltaValue": {
			"x": 10,
			"y": 0,
			"z": 0,
			"w": 0
		},
		"isCycle": false,
		"cycleTime": 0,
		"isPercentage": false,
		"percentFactor": 0,
		"percentBase": "MaxHP"
	},
	"HP_DOWN_OVERTIME": {
		"ID": 1002,
		"Name": "HP_DOWN_OVERTIME",
		"Description": "一段时间内每cycleTime扣deltaV血",
		"Type": "HP",
		"behaviourMode": "TimeBased",
		"isTenporary": false,
		"Duration": 5,
		"isStackable": false,
		"maxStackNum": 0,
		"updateMode": "Add",
		"deltaValue": {
			"x": 1,
			"y": 0,
			"z": 0,
			"w": 0
		},
		"isCycle": true,
		"cycleTime": 1,
		"isPercentage": false,
		"percentFactor": 0,
		"percentBase": "MaxHP"
	},
	"HP_DOWN_DELAY": {
		"ID": 1003,
		"Name": "HP_DOWN_DELAY",
		"Description": "延迟duration时间以后扣血deltaV",
		"Type": "HP",
		"behaviourMode": "TimeBased",
		"isTenporary": false,
		"Duration": 1,
		"isStackable": false,
		"maxStackNum": 0,
		"updateMode": "Add",
		"deltaValue": {
			"x": 1,
			"y": 0,
			"z": 0,
			"w": 0
		},
		"isCycle": false,
		"cycleTime": 0,
		"isPercentage": false,
		"percentFactor": 0,
		"percentBase": "MaxHP"
	},
	"HP_UP_FIXEDVALUE": {
		"ID": 1004,
		"Name": "HP_UP_FIXEDVALUE",
		"Description": "固定值加血",
		"Type": "HP",
		"behaviourMode": "Instant",
		"isTenporary": false,
		"Duration": 0,
		"isStackable": false,
		"maxStackNum": 0,
		"updateMode": "Add",
		"deltaValue": {
			"x": 1,
			"y": 0,
			"z": 0,
			"w": 0
		},
		"isCycle": false,
		"cycleTime": 0,
		"isPercentage": false,
		"percentFactor": 0,
		"percentBase": "MaxHP"
	},
	"HP_UP_PERCENTAGE": {
		"ID": 1005,
		"Name": "HP_UP_PERCENTAGE",
		"Description": "百分比加血",
		"Type": "HP",
		"behaviourMode": "Instant",
		"isTenporary": false,
		"Duration": 0,
		"isStackable": false,
		"maxStackNum": 0,
		"updateMode": "Add",
		"deltaValue": {
			"x": 0,
			"y": 0,
			"z": 0,
			"w": 0
		},
		"isCycle": false,
		"cycleTime": 0,
		"isPercentage": true,
		"percentFactor": 0.2,
		"percentBase": "MaxHP"
	},
	"ATTACKSPEED_UP_PERCENTAGE": {
		"ID": 1101,
		"Name": "ATTACKSPEED_UP_PERCENTAGE",
		"Description": "按百分比提高攻击速度",
		"Type": "AttackSpeed",
		"behaviourMode": "OnOff",
		"isTenporary": false,
		"Duration": 0,
		"isStackable": false,
		"maxStackNum": 0,
		"updateMode": "Add",
		"deltaValue": {
			"x": 0,
			"y": 0,
			"z": 0,
			"w": 0
		},
		"isCycle": false,
		"cycleTime": 0,
		"isPercentage": true,
		"percentFactor": 0.2,
		"percentBase": "AttackSpeed"
	},
	"MaxHP_UP_FIXEDVALUE": {
		"ID": 1201,
		"Name": "MaxHP_UP_FIXEDVALUE",
		"Description": "固定值加最大血量dV",
		"Type": "MaxHP",
		"behaviourMode": "OnOff",
		"isTenporary": false,
		"Duration": 0,
		"isStackable": false,
		"maxStackNum": 0,
		"updateMode": "Add",
		"deltaValue": {
			"x": 3,
			"y": 0,
			"z": 0,
			"w": 0
		},
		"isCycle": false,
		"cycleTime": 0,
		"isPercentage": false,
		"percentFactor": 0,
		"percentBase": "MaxHP"
	},
	"MaxHP_UP_PERCENTAGE": {
		"ID": 1202,
		"Name": "MaxHP_UP_PERCENTAGE",
		"Description": "百分比加最大血量",
		"Type": "MaxHP",
		"behaviourMode": "OnOff",
		"isTenporary": false,
		"Duration": 0,
		"isStackable": false,
		"maxStackNum": 0,
		"updateMode": "Add",
		"deltaValue": {
			"x": 0,
			"y": 0,
			"z": 0,
			"w": 0
		},
		"isCycle": false,
		"cycleTime": 0,
		"isPercentage": true,
		"percentFactor": 0.2,
		"percentBase": "MaxHP"
	},
	"hasHitBox_INVINCIBLE": {
		"ID": 1301,
		"Name": "hasHitBox_INVINCIBLE",
		"Description": "一段时间无敌（没有碰撞）",
		"Type": "hasHitBox",
		"behaviourMode": "TimeBased",
		"isTenporary": true,
		"Duration": 5,
		"isStackable": false,
		"maxStackNum": 0,
		"updateMode": "SetTo",
		"deltaValue": {
			"x": 0,
			"y": 0,
			"z": 0,
			"w": 0
		},
		"isCycle": false,
		"cycleTime": 0,
		"isPercentage": false,
		"percentFactor": 0,
		"percentBase": "hasHitBox"
	},
	"Color_ONHIT": {
		"ID": 1401,
		"Name": "Color_ONHIT",
		"Description": "被攻击时改变颜色一段时间",
		"Type": "Color",
		"behaviourMode": "TimeBased",
		"isTenporary": true,
		"Duration": 2,
		"isStackable": false,
		"maxStackNum": 0,
		"updateMode": "SetTo",
		"deltaValue": {
			"x": 50,
			"y": 50,
			"z": 50,
			"w": 0
		},
		"isCycle": false,
		"cycleTime": 0,
		"isPercentage": false,
		"percentFactor": 0,
		"percentBase": "Color"
	}
};