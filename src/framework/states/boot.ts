import { AssetPackManager } from "../assets/assetPackManager";


export class Boot extends Phaser.State {

    preload() {
        this.game.load.json("manifest", "assets/manifest.json");
        this.game.load.start();
    }

    create() {            
        AssetPackManager.init();
        this.game.state.start("preloader");
    }



}