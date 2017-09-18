import { Mask } from "./mask";
import { Graphics, Game } from "phaser-ce";

export class LoaderMask extends Mask {

    speed:number = 2 * Math.PI;
    loader:Graphics;

    constructor( game:Game, clr = 0x000000, loaderClr = 0xffffff ) {
        super( game, clr );
        this.loader = this.game.add.graphics(0, 0, this );
        this.loader.beginFill( loaderClr );
        let n = 8;
        let r = 4;
        let R = r * 4;
        for (var i = 0; i < n; i++) {
            this.loader.drawCircle( R * Math.cos(i/n * 2 * Math.PI), R * Math.sin(i/n * 2 * Math.PI), r*2 );    
        }
        this.loader.endFill();
        this.loader.alpha = 0;
        this.redraw();

    }

    showLoader( time = 150 ) {
        this.game.add.tween(this.loader).to({alpha: 1}, time).start();
        return this;
    }

    hideLoader( time = 150 ) {
        this.game.add.tween(this.loader).to({alpha: 0}, time).start();
        return this;
    }

    redraw() {
        super.redraw();
        if( this.loader ) this.loader.position.set( this.game.width/2, this.game.width/2 );
    }

    update() {
        this.loader.rotation += this.speed * this.game.time.physicsElapsed;
    }
}