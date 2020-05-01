// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html

/**这个文件存放各种已经写好的由EXCEL转换过来的伤害子组件数据的模板 */
export var DamageSCompTemplates =  {
	"DDD": {
		"ID": 2101,
		"Name": "DDD",
		"Description": "测试物品A，伤害型，普通",
		"SpriteName": "",
		"Domian": "Damage",
		"BaseDamage": 10,
		"isDOT": false,
		"Duration": 0,
		"isPercentage": false,
		"PercentFactor": 0,
		"KickBackForce": 5
	},
	"EEE": {
		"ID": 2102,
		"Name": "EEE",
		"Description": "测试物品B，伤害型，持续伤害",
		"SpriteName": "",
		"Domian": "Damage",
		"BaseDamage": 5,
		"isDOT": false,
		"Duration": 5,
		"isPercentage": false,
		"PercentFactor": 0,
		"KickBackForce": 0.5
	},
	"FFF": {
		"ID": 2103,
		"Name": "FFF",
		"Description": "测试物品C，伤害型，剧烈击退",
		"SpriteName": "",
		"Domian": "Damage",
		"BaseDamage": 3,
		"isDOT": false,
		"Duration": 0,
		"isPercentage": false,
		"PercentFactor": 0,
		"KickBackForce": 30
	}
};
