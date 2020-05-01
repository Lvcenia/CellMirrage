/** 有限状态机 
 * init 初始化状态
 * transitions 状态列表
 * methods 事件绑定列表
 * onBefore[transition] 开始转换状态前
 * onLeave[state] 离开某个状态前
 * onEnter[state] 进入某个状态前
 * on[state] 进入某个状态
 * onAfter[transition] 开始转换状态后
 * on[transition] 执行某个状态的绑定
*/

interface options{
    /** 初始化状态 */
    init:string
    /** 状态 */
    transitions:transition[]
    /** 数据 */
    data?:{}
    /** 事件 */
    methods?:any
    /** 插件 */
    plugins?:[]
}

/**
 * plugins 插件
 * 1 历史插件 做步进时使用 可以记录历史 历史回放 清空历史 等
 * 
 */


/**
 * 状态
 */
interface transition{
    /** 状态名 */
    name:string
    /** 从form状态转换到to状态  */
    from?:string|string[]
    /** 从form状态转换到to状态 如果from状态不存在，则可以从任何状态转换 */
    to?:string
}


/**
 * 状态机
 * 实例化一 new StateMachine(options)
 * 实例化二 StateMachine.factory(obj,options) //将状态机挂载到某个对象上
 */
declare class StateMachine{
    constructor(options:options)
    /** 当前状态 */
    state:any
    /** 工厂创建 */
    factory(obj:object,options:options)
    /** 返回所有可能状态的列表 */
    allStates()
    /** 返回所有可能转换的列表 */
    allTransitions()
    /** 检测当前状态是否可以转换到某状态 可以返回true 不可以返回false
     * transition 状态名
    */
    can(transition:any)
    /** 检测当前状态是否可以转换到某状态 可以返回false 不可以返回true
     * transition 状态名
    */
    cannot(transition:any)

    init()
    /** 
     * 判断当前状态是否是 State 是返回 true  否 返回false
     * state 状态
     */
    is(state:any)
    observe()
    /** 转换状态时 产生错误的 exception */
    onInvalidTransition(t,from,to)    
    /** 异常??? */
    onPendingTransition(t,from,to)
    /** 当前状态允许转换的列表 */
    transitions() 
}