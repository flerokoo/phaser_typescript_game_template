import { State } from "phaser-ce";
import { AssetPackManager } from "../framework/assets/assetPackManager";
import { Mask } from "../framework/gameobject/mask";
import { LoaderMask } from "../framework/gameobject/loaderMask";
import { Factory } from "../framework/tools/factory";

export class GameState extends State {

    mask:LoaderMask;
    gameObject:Phaser.Sprite;

    create() {
        this.mask = new LoaderMask( this.game );
        AssetPackManager.callWhenReady( ["game"], this.onAssetsLoad, this, true, true );        
        this.mask.startLoading();
    }

    onAssetsLoad() {
        var background = Factory.fillerImage( this.game, "game/background" );


        var gameLayer = Factory.screenSpace( this.game );
        var uiLayer = Factory.screenSpace( this.game );

        
        this.gameObject = this.game.add.sprite( GAME_W/2, GAME_H/2, "game/sprites", "sprite.png", gameLayer );
        this.gameObject.anchor.set(0.5);

        var pauseButton = Factory.adaptiveImage( this.game, "game/sprites", "pauseButton.png", uiLayer );
        pauseButton.group.setPos( 1, 0 ).setOffsets( -206/2 - 20, 20 + 90/2 );
        pauseButton.image.anchor.set(0.5);

        this.game.world.bringToTop( this.mask.stopLoading().fadeOut() );        
    }

    update() {
        if( this.gameObject ) this.gameObject.rotation += Math.PI/2 * this.game.time.physicsElapsed;
    }
}