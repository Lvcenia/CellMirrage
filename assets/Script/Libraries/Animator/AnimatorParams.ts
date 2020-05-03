export class AnimatorParams{

    private property:any = {};

    public setPropertyValue(key:string,value:number):void{
        // if(this.property[key]!=null)
            this.property[key] =value;
    }

    public setPropertyBool(key:string,value:boolean):void{
        // if(this.property[key]!=null )
            this.property[key] =value;
    }



    public getPropertyValue(key:string,defaultValue:number= 0):number{
        if(this.property[key]!=null  && typeof(this.property[key]) == "number")
            return this.property[key];
        else
            return defaultValue;
    }


    public getPropertyBool(key:string):boolean{
        if(this.property[key]!=null && typeof(this.property[key]) == "boolean")
            return this.property[key];
        else
            return false;
    }

    public Trigger(key:string){

    }
}
// ————————————————
// 版权声明：本文为CSDN博主「叫我上上」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/vikingsc2007_1/java/article/details/81070029