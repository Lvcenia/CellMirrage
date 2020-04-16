// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

const {ccclass, property} = cc._decorator;

/**这个文件存放各种已经写好的由EXCEL转换过来的效果的模板 */
export var EffectTemplates = {
	"HP_DOWN_NORMAL": {
		"ID": 1001,
		"Name": "HP_DOWN_NORMAL",
		"Type": "C_HP",
		"isDuration": false,
		"Duration": 0,
		"isStackable": false,
		"maxStackNum": 0,
		"deltaValue": {
			"x": 1,
			"y": 0,
			"z": 0,
			"w": 0
		},
		"isCycle": false,
		"cycleTime": 0,
		"isPercentage": false,
		"percentFactor": 0
	},
	"HP_DOWN_OVERTIME": {
		"ID": 1002,
		"Name": "HP_DOWN_OVERTIME",
		"Type": "C_HP",
		"isDuration": null,
		"Duration": 5,
		"isStackable": false,
		"maxStackNum": 0,
		"deltaValue": {
			"x": 1,
			"y": 0,
			"z": 0,
			"w": 0
		},
		"isCycle": null,
		"cycleTime": 1,
		"isPercentage": false,
		"percentFactor": 0
	},
	"HP_DOWN_DELAY": {
		"ID": 1003,
		"Name": "HP_DOWN_DELAY",
		"Type": "C_HP",
		"isDuration": null,
		"Duration": 1,
		"isStackable": false,
		"maxStackNum": 0,
		"deltaValue": {
			"x": 1,
			"y": 0,
			"z": 0,
			"w": 0
		},
		"isCycle": false,
		"cycleTime": 0,
		"isPercentage": false,
		"percentFactor": 0
	}
};