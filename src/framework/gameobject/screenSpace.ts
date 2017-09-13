import { Layout } from './../tools/layout';



export class ScreenSpace extends Phaser.Group {

    binding:Phaser.SignalBinding;

    constructor( game:Phaser.Game, parent?:PIXI.DisplayObjectContainer, name?:string, addToStage?:boolean, enableBody?:boolean, physicsBodyType?:number ) 
    {
        super(game, parent, name, addToStage, enableBody, physicsBodyType );
                
        this.binding = Layout.onRelayout.add( this.onRelayout, this )
        this.onRelayout()
        
    }

    onRelayout() 
    {
        
        this.scale.set( Layout.scaleFactor, Layout.scaleFactor )
        this.position.set(
            (this.game.scale.width - Layout.scaleFactor * Layout.supposedWidth)/2,
            (this.game.scale.height - Layout.scaleFactor * Layout.supposedHeight)/2
        )
    }

    destroy( destroyChildren?:boolean, soft?:boolean) 
    {
        super.destroy( destroyChildren, soft)
        this.binding.detach()
    }
}