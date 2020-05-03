export interface IDictionary<K>{
    Add(key: string, value: K): void;
    Remove(key: string): void;
    ContainsKey(key: string): boolean;
    keys(): string[];
    values(): K[];
}
export class XDictionary<K> implements IDictionary<K>{

    _keys: Array<string> = new Array<string>();
    _values: Array<K> = new Array<K>();

    constructor(init: { key: string; value: K; }[] = null) {
        if(init==null)
            return;
        for (var x = 0; x < init.length; x++) {
                    this[init[x].key] = init[x].value;
                    this._keys.push(init[x].key);
                    this._values.push(init[x].value);
        }
    }


    private  HashCode():void{

    }


    Add(key: string, value: K) {
                this[key] = value;
                this._keys.push(key);
                this._values.push(value);
    }

    Remove(key: string) {
                var index = this._keys.indexOf(key, 0);
                this._keys.splice(index, 1);
                this._values.splice(index, 1);

                delete this[key];
    }

    keys(): string[] {
                return this._keys;
    }

    values(): K[] {
        return this._values;
    }

    ContainsKey(key: string) {
        if (typeof this[key] === "undefined") {
            return false;
         }

        return true;
    }

    toLookup(): IDictionary<K> {
        return this;
    }


    get Count(): number {
        return this._values.length;
    }
}
// ————————————————
// 版权声明：本文为CSDN博主「叫我上上」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/vikingsc2007_1/java/article/details/81070029