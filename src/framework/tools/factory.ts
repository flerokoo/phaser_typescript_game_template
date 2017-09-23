import { Game } from "phaser-ce";
import { ScreenSpace } from "../gameobject/ScreenSpace";
import { AdaptiveGroup } from "../gameobject/adaptiveGroup";
import { FillerImage } from "../gameobject/fillerImage";

export class Factory {


    static screenSpace( game:Game, parent?:PIXI.DisplayObjectContainer, name?:string, addToStage?:boolean ):ScreenSpace {
        return new ScreenSpace( game, parent, name, addToStage );
    }

    static adaptiveGroup( game:Game, parent?:PIXI.DisplayObjectContainer, name?:string, addToStage?:boolean) {
        return new AdaptiveGroup(game, parent, name, addToStage);
    }

    static adaptiveImage( game:Game, key:string, frame?:string, parent?:PIXI.DisplayObjectContainer, name?:string, addToStage?:boolean ) {        
        var g = new AdaptiveGroup( game, parent, name, addToStage );
        var s = game.add.image(0, 0, key, frame, g );
        return {
            group: g,
            image: s
        };
    }

    static adaptiveSprite( game:Game, key:string, frame?:string, parent?:PIXI.DisplayObjectContainer, name?:string, addToStage?:boolean ) {        
        var g = new AdaptiveGroup( game, parent, name, addToStage );
        var s = game.add.sprite( 0, 0, key, frame, g );
        return {
            group: g,
            image: s
        };
    }

    static fillerImage( game:Game, key:string, frame?:string ) {
        var i = new FillerImage( game, key, frame );
        game.add.existing( i );        
        return i;
    }


}