/// <reference path="../lib/phaser.comments.d.ts"/>

class GameState extends Phaser.State {

    init(gameInfo:any) : void {
        var ex:COP444 = new COP444(new DummyHardware());
        for (var n = 0;n < 2;n++) ex.execute();
        for (var x = 0;x < 14;x++) {
            for (var y = 0;y < 12;y++) {
                var s:number = 64;
                var img:Phaser.Image = this.game.add.sprite(x*s+10,y*s+10,"hologram",x+y*14);                
                img.width = img.height = s;
                //img.frame = 6;
            }
        }
    }

    create() : void {
    }

    destroy() : void {
    }

    update() : void {    
    }
}    
