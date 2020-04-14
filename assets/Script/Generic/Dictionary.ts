// Learn TypeScript:
//  - https://docs.cocos.com/creator/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/manual/en/scripting/life-cycle-callbacks.html
const {ccclass, property} = cc._decorator;
@ccclass
export default class Dictionary<V> {
  items: {[key:string]:V};
  constructor() {
    this.items = {};
  }
  public has(key: string): boolean {
      //console.log("have :" + this.items[key] === undefined ? false:true);
    return this.items[key] === undefined ? false:true;
  }
  public set(key: string, val: V) {
    this.items[key] = val;
  }
  public delete(key: string): boolean {
    if (this.has(key)) {
      delete this.items[key];
    }
    return false;
  }
  public get(key: string): V {
    return this.has(key) ? this.items[key] : undefined;
  }
  public values(): V[] {
    let values: V[] = [];
    for (let k in this.items) {
      if (this.has(k)) {
        values.push(this.items[k]);
      }
    }
    return values;
  }
  public clear(){
    this.items = {};
  }
}

