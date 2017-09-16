import { Layout } from './../tools/layout';



export class ScreenSpace extends Phaser.Group {

    binding:Phaser.SignalBinding;
    enablePositioning:boolean = true;

    constructor( game:Phaser.Game, parent?:PIXI.DisplayObjectContainer, name?:string, addToStage?:boolean ) 
    {
        super(game, parent, name, addToStage );
                
        this.binding = Layout.onRelayout.add( this.onRelayout, this )
        this.onRelayout()
        
    }

    setPositioning( state:boolean ) {
        this.enablePositioning = state;
        this.onRelayout();
        return this;
    }

    onRelayout() 
    {
        
        this.scale.set( Layout.scaleFactor, Layout.scaleFactor )
        if(this.enablePositioning)
            this.position.set(
                (this.game.scale.width - Layout.scaleFactor * Layout.supposedWidth)/2,
                (this.game.scale.height - Layout.scaleFactor * Layout.supposedHeight)/2
            )
        else
            this.position.set(0,0);
    }

    destroy( destroyChildren?:boolean, soft?:boolean) 
    {
        super.destroy( destroyChildren, soft)
        this.binding.detach()
    }
}