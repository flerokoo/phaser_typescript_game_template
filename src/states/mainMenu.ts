import { ScreenSpace } from "../framework/gameobject/ScreenSpace";
import { Group } from "phaser-ce";
import { AdaptiveGroup } from "../framework/gameobject/adaptiveGroup";


export class MainMenu extends Phaser.State {

    preload() {
        
    }

    create() {      

        var ss = new ScreenSpace(this.game).setPositioning(true);
        this.game.add.existing( ss );
        
        /*var spr = new Phaser.Sprite(this.game, 0, 0, 'gold_texture477');
        ss.addChild( spr );
        spr.inputEnabled = true;
        spr.events.onInputDown.add( () => {
            spr.y += 20;
        }, this);*/
        
        //this.game.add.sprite( 0, 0, 'jake.png')

        let gr = this.game.add.graphics(0, 0, ss);
        gr.beginFill(0xff0000);
        gr.drawRect(0, 0, GAME_W, GAME_H);
        gr.endFill();
        gr.lineStyle( 2, 0x00ff00 );
        gr.moveTo( GAME_W/2, 0);
        gr.lineTo( GAME_W/2, GAME_H );
        gr.moveTo( 0, GAME_H/2 );
        gr.lineTo( GAME_W, GAME_H/2 );

        let g = new AdaptiveGroup(this.game, ss).setPos( 0.5, 1 ).setOffsets( 0, -50);

        this.game.add.tween(g).delay(1000).to( {posX:0.1, posY:0.5}, 1300, Phaser.Easing.Elastic.Out ).start();

        let s = this.game.make.sprite(0, 0, "pack/jake" );
        g.add(s);
    }

    onDown() {

    }

}

