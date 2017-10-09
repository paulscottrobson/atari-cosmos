/// <reference path="../lib/phaser.comments.d.ts"/>

class GameState extends Phaser.State {

    init(gameInfo:any) : void {
        var img:Phaser.Image = this.game.add.image(this.game.width/2,this.game.height-16,"sprites","logo");
        img.anchor.x = 0.5;img.anchor.y = 1;
        img.width = this.game.width * 2 / 3;img.height = img.width / 6;
        var ex:COP444 = new COP444(new DummyHardware());
        for (var n = 0;n < 2;n++) ex.execute();
        for (var x = 0;x < 7;x++) {
            for (var y = 0;y < 6;y++) {
                var s:number = this.game.width / 8;
                var led:LEDHoloCell = new LEDHoloCell(this.game,this.game.width/2-s*3.5+x*s,y*s+310,s,x,y);
                //led.setLightState((x+y) % 2 == 0);
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
