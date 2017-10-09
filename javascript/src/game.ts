/// <reference path="../lib/phaser.comments.d.ts"/>

class GameState extends Phaser.State {

    init(gameInfo:any) : void {
        var img:Phaser.Image = this.game.add.image(this.game.width/2,this.game.height-100,"sprites","logo");
        img.anchor.x = 0.5;img.anchor.y = 0.5;
        img.width = this.game.width * 0.75;img.height = img.width / 6;
        var ex:COP444 = new COP444(new DummyHardware());
        for (var n = 0;n < 2;n++) ex.execute();
        
        var dsp:HolographicDisplay  = new HolographicDisplay(this.game,-1,270,Math.floor(this.game.width/7.5));
        var s1:SevenSegmentDisplay = new SevenSegmentDisplay(this.game,this.game.width/2-110,30,90);
        var s2:SevenSegmentDisplay = new SevenSegmentDisplay(this.game,this.game.width/2+30,30,90);
    }

    create() : void {
    }

    destroy() : void {
    }

    update() : void {    
    }
}    
