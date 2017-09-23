import { Mask } from "./mask";
import { Graphics, Game } from "phaser-ce";

export class LoaderMask extends Mask {

    speed:number = 2 * Math.PI;
    loader:Graphics;
    showLoaderTimer:number = 1;
    problemsTimer:number = 25;

    private loadTimer:number = 0;
    private loadInProgress:boolean = false;

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

        if( this.loadInProgress ) {
            this.loadTimer += this.game.time.physicsElapsed;

            // show loader if loading taking long enough
            if( this.loadTimer > this.showLoaderTimer && this.loader.alpha == 0 ) {
                this.showLoader();
            }

            // loding taking too much time -- looks like we are in trouble
            if( this.loadTimer > this.problemsTimer ) {
                this.loadInProgress = false;
                console.warn("Connection issues");
            }
        }
    }

    startLoading() {
        this.loadTimer = 0;
        this.loadInProgress = true;
        return this;
    }

    stopLoading() {
        this.loadInProgress = false;
        this.hideLoader();
        return this;
    }
}