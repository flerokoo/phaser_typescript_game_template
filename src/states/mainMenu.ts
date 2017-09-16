import { ScreenSpace } from "../framework/gameobject/ScreenSpace";
import { Group } from "phaser-ce";


export class MainMenu extends Phaser.State {

    preload() {
        
    }

    create() {      

        var ss = new ScreenSpace(this.game).setPositioning(false);
        this.game.add.existing( ss );
        
        /*var spr = new Phaser.Sprite(this.game, 0, 0, 'gold_texture477');
        ss.addChild( spr );
        spr.inputEnabled = true;
        spr.events.onInputDown.add( () => {
            spr.y += 20;
        }, this);*/
        
        //this.game.add.sprite( 0, 0, 'jake.png')

        this.game.add.sprite(0,0,"pack/sprites","gold_texture477.jpg", ss )
    }

    onDown() {

    }

}

