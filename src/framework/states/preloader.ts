
export class Preloader extends Phaser.State {

    static nextStateName = 'mainmenu';

    preload() {
        // reading assets list (loaded in boot) and loading all assets from it
        var list = this.game.cache.getJSON("assets");
        if( ! (list instanceof Array) ) console.error("No assets found")
        this.game.load.reset()
        for( var i in list ) {
            console.log(list[i])
            this.game.load.image(list[i].key, list[i].url)
        }        
        this.game.load.onLoadComplete.addOnce( this.startGame )
        this.game.load.start()

        
    }

    create() {            
        this.game.state.start( Preloader.nextStateName )
    }

    startGame() {

    }

    onDown() {

    }


}