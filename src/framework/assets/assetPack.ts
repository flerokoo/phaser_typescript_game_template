export class AssetPack {

    public readonly state:AssetPackState;
    public readonly entries:Object;
    public readonly name:String;
    public numFiles:number;

    constructor( conf:Object, name:String ) {
        this.name = name;
        this.entries = conf;
        this.state = AssetPackState.UNLOADED;  
        this.calcFiles();
    }

    private calcFiles() {
        this.numFiles = 0;
        if( this.entries["image"] ) this.numFiles += this.entries["image"].length;
        if( this.entries["audio"] ) this.numFiles += this.entries["audio"].length;
        if( this.entries["json"] ) this.numFiles += this.entries["json"].length;
        if( this.entries["raw"] ) this.numFiles += this.entries["raw"].length;
        if( this.entries["font"] ) this.numFiles += 2 * this.entries["font"].length;
        if( this.entries["spritesheet"] ) this.numFiles += 2 * this.entries["spritesheet"].length;
        
    }
}

export enum AssetPackState {
    READY,
    LOADING,
    UNLOADED
}