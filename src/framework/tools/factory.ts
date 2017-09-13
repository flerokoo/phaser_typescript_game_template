export class Factory {

    private static game:Phaser.Game

    static init( game:Phaser.Game) 
    {
        Factory.game = game;
    }

    static spriteHolder(x:number, y:number, key?:any, frame?:any)
    {
        var sprite = Factory.game.make.sprite(x,y,key,frame)
        var holder = Factory.game.make.group()
        Factory.game.add
        return holder;
       

    }

}