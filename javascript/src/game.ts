/// <reference path="../lib/phaser.comments.d.ts"/>

class GameState extends Phaser.State {

    init(gameInfo:any) : void {
        var x:COP444 = new COP444(new DummyHardware());
        for (var n = 0;n < 2000;n++) x.execute();
    }

    create() : void {
    }

    destroy() : void {
    }

    update() : void {    
    }
}    
