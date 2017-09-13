import { ScreenSpace } from "../framework/gameobject/ScreenSpace";


export class MainMenu extends Phaser.State {

    preload() {
        
    }

    create() {      

        var ss = new ScreenSpace(this.game)
        this.game.add.existing( ss )
        
        var spr = new Phaser.Sprite(this.game, 0, 0, 'jake.png');
        spr.scale.set(640/40, 800/50)
        ss.addChild( spr )
        

        //this.game.add.sprite( 0, 0, 'jake.png')
    }

    onDown() {

    }


}