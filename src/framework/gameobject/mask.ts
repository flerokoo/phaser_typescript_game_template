import { Graphics, Game, SignalBinding, Group } from "phaser-ce";
import { Layout } from "../tools/layout";


export class Mask extends Group {

    protected gr:Graphics;
    protected color;
    protected binding:SignalBinding;

    constructor( game:Game, clr = 0x000000, parent?:PIXI.DisplayObjectContainer, name?:string, addToStage?:boolean ) {        
        super( game, parent, name, addToStage );
        this.gr = this.game.add.graphics(0,0,this);
        this.color = clr;
        this.redraw();
        this.binding = Layout.onRelayout.add( this.redraw, this );        
    }

    setColor( c = 0x000000) {
        this.color = c;
        this.redraw();
    }

    protected redraw() {
        this.gr.clear();
        this.gr.beginFill(this.color);
        this.gr.drawRect(0, 0, this.game.width, this.game.height );
        this.gr.endFill();
    }

    destroy( destroyChildren?:boolean ) {
        super.destroy(destroyChildren);
        this.binding.detach();
    }

    fadeIn( time = 300 ) {
        this.game.add.tween(this).to( {alpha: 1}, time ).start();
        return this;
    }

    fadeOut( time = 300 ) {
        this.game.add.tween(this).to( {alpha: 0}, time ).start();
        return this;
    }

    fadeInOut( time = 300, fn?:Function ) {
        this.game.add.tween( this ).to( {alpha: 1}, time ).start().onComplete.addOnce( () => {
            if( fn ) fn();
            this.game.add.tween( this ).to( {alpha: 0 }).start();
        });
        return this;
    }
}
