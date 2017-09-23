import { Game, SignalBinding } from "phaser-ce";
import { Layout } from "../tools/layout";

export class FillerImage extends Phaser.Image {

    binding:SignalBinding;
    fillModeY:FillModeY = FillModeY.Center;
    fillModeX:FillModeX = FillModeX.Center;

    constructor( game:Game, key:string, frame?:string ) {
        super( game, 0, 0, key, frame );
        this.binding = Layout.onRelayout.add( this.relayout, this );
        this.relayout();
    }

    setFillModes( x:FillModeX, y:FillModeY ) {
        this.fillModeX = x;
        this.fillModeY = y;
        this.relayout();
        return this;
    }

    relayout() {
        var scale = Math.max(
            this.game.width/this.texture.width,
            this.game.height/this.texture.height
        );

        this.scale.set(scale);

        let x = 0;
        let y = 0;
        switch(this.fillModeY) {
            case FillModeY.Top:
                y = 0;
                break;
            case FillModeY.Bottom:
                y = -this.height + this.game.height;
                break;
            default:
                y = -this.height/2 + this.game.height/2;
        }

        switch(this.fillModeX) {
            case FillModeX.Left:
                x = 0;
                break;
            case FillModeX.Right:
                x = -this.width + this.game.width;
                break;
            default:
                x = -this.width/2 + this.game.width/2;
        }

        this.position.set( x, y );

        return this;
    }

    destroy() {
        super.destroy();
        this.binding.detach();
    }

    
}

export enum FillModeY {
    Center,
    Bottom,
    Top
}

export enum FillModeX {
    Left,
    Center,
    Right
}