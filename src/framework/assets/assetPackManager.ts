import { AssetPack, AssetPackState } from "./assetPack";
import { Signal, Loader, Game } from "phaser-ce";
import { Entry } from "../../entry";
import { Assert } from "../tools/assert";

type LoadingTaskDef = { pack:string, handle: LoadingTaskHandle }  

export class AssetPackManager {
    
    private static conf:Object;    
    private static queue:LoadingTaskDef[];
    static packs:Object;
    static runningTask:LoadingTask;
    static onPackLoad:Signal;

    static init() {        
        let json = Entry.game.cache.getJSON("manifest");     
        this.queue = [];        
        this.onPackLoad = new Signal();
        this.onPackLoad.add( () => {
            this.runningTask = null;
            this.processQueue();
        });
        AssetPackManager.conf = json;
        AssetPackManager.packs = {};
        for( var packName in json ) {
            AssetPackManager.packs[packName] = new AssetPack(json[packName], packName);
        }
    }

    static isReady( packList:string[] ):boolean {        
        for (var i = 0; i < packList.length; i++) {
            var packName = packList[i];
            var pack = AssetPackManager.packs[packName];
            Assert.that( pack, 'No asset pack with named $packName' );
            if( pack.state !== AssetPackState.READY )
                return false;
        }
        return true;
    }
  
    static addToQueue( name:string ) : LoadingTaskHandle {     
        Assert.that( this.packs[name], "No pack with name = " + name)
        Assert.that( this.packs[name].state != AssetPackState.READY, `Pack ${name} is ready`);
        if( this.runningTask != null && this.runningTask.def.pack == name) {
            // already loading this pack
            return this.runningTask.def.handle;
        } else {
            // if pack is already in the queue -- return its handle
            for( var i in this.queue ) {
                if( this.queue[i].pack == name )
                    return this.queue[i].handle;
            }
            // pack is not in queue -- create new entry
            var handle = new LoadingTaskHandle( name );
            this.queue.push({
                pack: name,
                handle: handle
            })
            this.processQueue();
            return handle;
        }
    }

    static prioritize( name:string ) {
        Assert.that( this.packs[name], "No pack with name = " + name)
        // do nothing if already loading this pack
        if( this.runningTask.def.pack.toLowerCase() == name.toLowerCase()) return;
        
        // trying to find existing definition and put it in beginning of the queue
        for( let i in this.queue ) {
            var def = this.queue[i];
            if( def.pack == name ) {
                let t = this.queue[0];
                this.queue[0] = def;
                this.queue[i] = t;
                return;
            }
        }
        
        // pack was not found 
        if( DEBUG )
            console.warn(`Pack ${name} was not prioritized (not in queue)`)
        return;
    }

    private static processQueue() {
        if( this.runningTask || this.queue.length == 0 ) return;
                
        let def = this.queue.shift(); 
        let task = new LoadingTask( def );               
        AssetPackManager.packs[def.pack].state = AssetPackState.LOADING;
        task.start(); 
        this.runningTask = task;
    }

}


class LoadingTaskHandle {
    readonly onProgressChange:Signal;
    readonly onComplete:Signal;

    constructor( public pack:string ){
        this.onComplete = new Signal();
        this.onProgressChange = new Signal();
    }

    dispose() {
        this.onProgressChange.dispose();
        this.onComplete.dispose();
        this.pack = null;
    }
}

class LoadingTask {
    private loading:boolean = false;
    private loader:Loader;

    constructor( public def:LoadingTaskDef ) {        
        this.loader = new Loader( Entry.game );             
        this.addPack(def.pack);
    }

    private addPack( name:string ) {        
        if( this.loading ) return;  

        let pack = AssetPackManager.packs[name];

        if( pack.entries["image"] )
            for( var imageName in pack.entries["image"] ) {
                var entry = pack.entries["image"][imageName];
                this.loader.image( (<string>entry.name).replace(/\\/g, '/'), entry.url );
            }
        
        if( pack.entries["audio"] )
            for( var name in pack.entries["audio"] ) {
                var entry = pack.entries["audio"][name];
                this.loader.audio((<string>entry.name).replace(/\\/g, '/'), entry.url );
            }

        if( pack.entries["json"] )
            for( var name in pack.entries["json"] ) {
                var entry = pack.entries["json"][name];
                this.loader.json((<string>entry.name).replace(/\\/g, '/'), entry.url );
            }

        if( pack.entries["raw"] )
            for( var name in pack.entries["raw"] ) {
                var entry = pack.entries["raw"][name];
                this.loader.text((<string>entry.name).replace(/\\/g, '/'), entry.url );
            }

        if( pack.entries["font"] )
            for( var name in pack.entries["font"] ) {
                var entry = pack.entries["font"][name];
                this.loader.bitmapFont((<string>entry.name).replace(/\\/g, '/'), entry.image, entry.url );
            }

        if( pack.entries["spritesheet"] )
            for( var name in pack.entries["spritesheet"] ) {
                var entry = pack.entries["spritesheet"][name];
                console.log(entry)
                this.loader.atlasJSONHash((<string>entry.name).replace(/\\/g, '/'), entry.image, entry.url );
            }

        return this;
    }   

    start() {
        if( this.loading ) return;

        this.loading = true;
        this.loader.onLoadComplete.addOnce( this.complete, this );
        this.loader.onFileComplete.add(() => this.def.handle.onProgressChange.dispatch(this.loader.progress/100), this);
        this.loader.start();
        return this;
    }

    dispose() {
        this.def.handle.dispose();
    }

    private complete() {
        AssetPackManager.packs[this.def.pack].state = AssetPackState.READY;
        AssetPackManager.onPackLoad.dispatch( name );
        this.def.handle.onComplete.dispatch();
        this.dispose();
        return this;
    }
}