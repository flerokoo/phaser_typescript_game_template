export class Assert {
    public static that( cond:boolean, msg?:String) {
        msg = msg || "Error";
        if(!cond) throw msg;
    }
}