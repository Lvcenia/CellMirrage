module.exports = {
	"HP_DOWN_NORMAL": {
		"ID": 1001,
		"Name": "HP_DOWN_NORMAL",
		"Description": "普通的单次扣血deltaV",
		"Type": "HP",
		"isTenporary": false,
		"Duration": 0,
		"isStackable": false,
		"maxStackNum": 0,
		"deltaValue": {
			"x": 10,
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
		"Description": "一段时间内每cycleTime扣deltaV血",
		"Type": "HP",
		"isTenporary": false,
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
		"Description": "延迟duration时间以后扣血deltaV",
		"Type": "HP",
		"isTenporary": false,
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