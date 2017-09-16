import { AssetPackManager } from "../assets/assetPackManager";
import { Signal } from "phaser-ce";


export class Preloader extends Phaser.State {

    static preloadPack:string;
    static nextStateName = 'mainmenu';
    static onComplete:Signal = new Signal();

    
    preload() {
        let task = AssetPackManager.addToQueue( Preloader.preloadPack );
        let g = this.game.add.graphics(0, this.game.height/2);
        task.onComplete.addOnce( this.toNextState, this );
        task.onProgressChange.add((progress) => {
            g.clear();
            g.beginFill(0xffffff);
            g.drawRoundedRect(this.game.width * 0.7/2, 0, this.game.width * 0.3, 20, 10 );
            g.beginFill(0);
            g.drawRoundedRect(this.game.width * 0.7/2+3, 3, progress * this.game.width * 0.3 - 6, 20-6, 10-3 );
            g.endFill();
        });
        
    }

    toNextState() {           
        Preloader.onComplete.dispatch(); 
        this.game.state.start( Preloader.nextStateName );
    }



}