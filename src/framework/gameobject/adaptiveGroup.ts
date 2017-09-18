import { Group, Game, Point } from "phaser-ce";
import { Layout } from "../tools/layout";
import { SMath } from "../tools/smath";

export class AdaptiveGroup extends Group {
    
    private binding;
    private _posX:number = 0;
    private _posY:number = 0;
    private _offsetX:number = 0;
    private _offsetY:number = 0;
    private _scaleOffsetX:number = 0;
    private _scaleOffsetY:number = 0;

    set posX(newVal:number) {
        this._posX = newVal;
        this.updatePosition();
    }

    get posX() {
        return this._posX;
    }

    set posY(newVal:number) {
        this._posY = newVal;
        this.updatePosition();
    }

    get posY() {
        return this._posY;
    }

    set offsetX(newVal:number) {
        this._offsetX = newVal;
        this.updatePosition();
    }

    get offsetX() {
        return this._offsetX;
    }

    set offsetY(newVal:number) {
        this._offsetY = newVal;
        this.updatePosition();
    }

    get offsetY() {
        return this._offsetY;
    }

    constructor( game:Game, parent?:PIXI.DisplayObjectContainer, name?:string, addToStage?:boolean ) {
        super( game, parent, name, addToStage );
        Layout.onRelayout.add( this.updatePosition, this );
    }

    setPos( x:number, y:number ):AdaptiveGroup {
        this._posX = x;
        this._posY = y;
        this.updatePosition();
        return this;
    }

    setOffsets( x:number, y:number ):AdaptiveGroup {
        this._offsetX = x;
        this._offsetY = y;
        this.updatePosition();
        return this;
    }

    updatePosition(): any {   
        var gpos = new Point( this._posX * this.game.width, this._posY * this.game.height );        
        var pos = this.parent.toLocal( gpos, null );
        this.position.set( 
            pos.x + SMath.lerp( this._scaleOffsetX, this._offsetX, this._offsetX * Layout.scaleFactor ),
            pos.y + SMath.lerp( this._scaleOffsetY, this._offsetY, this._offsetY * Layout.scaleFactor )
        );
        
    }


}
