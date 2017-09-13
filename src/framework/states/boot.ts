
export class Boot extends Phaser.State {

    preload() {
        this.game.load.json("assets", "assets.json")
        this.game.load.start();
    }

    create() {            
        this.game.state.start("preloader")
    }



}