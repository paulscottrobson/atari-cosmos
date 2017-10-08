/// <reference path="../lib/phaser.comments.d.ts"/>

class GameState extends Phaser.State {

    init(gameInfo:any) : void {
        var v:IView = new GameView(this.game,5,3,64);
        var i:Number;
        v.plot(1,1,CELLTYPE.CASTLE);
        v.plot(1,1,CELLTYPE.BUILDING);
        v.setPlayerClass(new TypeFactory().get(PLAYERTYPE.CLERIC));        
    }

    create() : void {
    }

    destroy() : void {
    }

    update() : void {    
    }


}    
