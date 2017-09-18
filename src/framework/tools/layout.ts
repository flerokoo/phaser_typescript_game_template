export class Layout {

    static scaleFactor:number = 1;
    static supposedWidth:number = 640;
    static supposedHeight:number = 800;
    static onRelayout:Phaser.Signal;
    static afterRelayout:Phaser.Signal;
    static stretchOnDesktop:boolean = STRETCHED_ON_DESKTOP;

    private static game:Phaser.Game;
    private static dirty:boolean = true;

    static init( game:Phaser.Game, w:number = 640, h:number = 800 ) {
    
        Layout.game = game;
        Layout.supposedHeight = h;
        Layout.supposedWidth = w;
        Layout.onRelayout = new Phaser.Signal();
        Layout.afterRelayout = new Phaser.Signal();

        game.scale.pageAlignHorizontally = false;
		game.scale.pageAlignVertically = false;
        game.scale.scaleMode = Phaser.ScaleManager.NO_SCALE;     
        game.scale.fullScreenScaleMode = Phaser.ScaleManager.NO_SCALE;
        game.scale.fullScreenTarget = document.getElementById('content');

        var reaction = () => {
            Layout.dirty = true;
            window.setTimeout( Layout.relayout, 300 );
        };

        game.scale.onFullScreenChange.add( reaction, Layout );           
        window.addEventListener("resize", reaction);
        Layout.relayout();
    }

    static relayout() {
        if( !Layout.dirty ) return;
        Layout.dirty = false;

        var canvas:HTMLCanvasElement = Layout.game.canvas;
        var div:HTMLElement = document.getElementById('content');
        var body:HTMLElement = document.body;
      
        if( Layout.game.device.desktop && !Layout.stretchOnDesktop && !Layout.game.scale.isFullScreen ) {
            Layout.game.scale.setGameSize( Layout.supposedWidth, Layout.supposedHeight );
            div.style.width = Layout.supposedWidth + 'px';
            div.style.height = Layout.supposedHeight + 'px';
            
            var margin = (window.innerHeight - Layout.supposedHeight)/2 - 1;
            div.style.margin = margin + 'px auto';      
            body.style.padding = '0.06px 0 0' ;       
        } else {
            Layout.game.scale.setGameSize( window.innerWidth, window.innerHeight );
            div.style.margin = '0';
            div.style.width = window.innerWidth + 'px';
            div.style.height = window.innerHeight + 'px';
            body.style.padding = '0';

        }
        Layout.updateScaleFactor();
        Layout.onRelayout.dispatch();
        Layout.afterRelayout.dispatch();
        
    }

    static updateScaleFactor() {
        Layout.scaleFactor = Math.min(
            Layout.game.scale.width/Layout.supposedWidth,
            Layout.game.scale.height/Layout.supposedHeight
        );
    }

    static setSupposedSize( w:number, h:number ) {
        Layout.supposedWidth = w;
        Layout.supposedHeight = h;
    }

}