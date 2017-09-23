import { ScreenSpace } from "../framework/gameobject/ScreenSpace";
import { Group } from "phaser-ce";
import { AdaptiveGroup } from "../framework/gameobject/adaptiveGroup";
import { Mask } from "../framework/gameobject/mask";
import { LoaderMask } from "../framework/gameobject/loaderMask";
import { Factory } from "../framework/tools/factory";


export class MainMenu extends Phaser.State {

    mask:Mask;

    preload() {
        
    }

    create() {      
        if( !DEBUG ) {
            this.game.input.onDown.add(() => {
                this.game.scale.startFullScreen();
            });
        }

        this.game.stage.backgroundColor = '#ffe15b';

        var screenSpace = Factory.screenSpace( this.game ).setPositioning(false);

        this.mask = new Mask( this.game ).fadeOut(500);
        
        var logo = Factory.adaptiveImage( this.game, "mainmenu/logo", undefined, screenSpace );
        logo.group.setPos( 0.5, -0.3 );
        logo.image.anchor.set( 0.5 );        
        
        var buttonGroup = Factory.adaptiveGroup( this.game, screenSpace ).setPos( 0.5, 1.3 );
        var button = this.game.add.button(0,0, "mainmenu/playButton", this.toGameState, this, null, null, null, null, buttonGroup);
        button.anchor.set(0.5);

        this.game.add.tween(logo.group).to({posY: 0.3}, 1200, Phaser.Easing.Elastic.Out).start();
        this.game.add.tween(logo.image.scale).from({ x: 0.5}, 1500, Phaser.Easing.Elastic.Out).start();
        this.game.add.tween(logo.image.scale).from({ y: 1.5}, 1200, Phaser.Easing.Elastic.Out).start();

        this.game.add.tween(buttonGroup).to({posY: 0.7}, 1200, Phaser.Easing.Elastic.Out).delay(1000).start();

        

        /*var ss = new ScreenSpace(this.game).setPositioning(true);
        this.game.add.existing( ss );
        
        let gr = this.game.add.graphics(0, 0, ss);
        gr.beginFill(0xff0000);
        gr.drawRect(0, 0, GAME_W, GAME_H);
        gr.endFill();
        gr.lineStyle( 2, 0x00ff00 );
        gr.moveTo( GAME_W/2, 0);
        gr.lineTo( GAME_W/2, GAME_H );
        gr.moveTo( 0, GAME_H/2 );
        gr.lineTo( GAME_W, GAME_H/2 );

        let group = new AdaptiveGroup(this.game, ss).setPos( 0.5, 1 ).setOffsets( 0, -50);

        this.game.add.tween(group).delay(1000).to( {posX:0.6, posY:0.5}, 1300, Phaser.Easing.Elastic.Out ).start();
        
        let s = this.game.make.sprite(0, 0, "pack/jake" );
        group.add(s);
        
        let mask = new LoaderMask( this.game, 0x000000 );
        mask.fadeOut();
        // this.game.add.existing( mask );
        setTimeout( () => {
            mask.showLoader();
        }, 2000);*/
    }

    toGameState() {
        this.game.input.enabled = false;
        this.mask.fadeIn(500).onActionComplete.addOnce( () => {
            this.game.state.start("game");
        }, this);
    }

}

