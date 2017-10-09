/// <reference path="../../lib/phaser.comments.d.ts"/>

class LEDHoloCell extends BaseLED {

    private img:Phaser.Image;
    private currentHologram:number;
    private ledX:number;
    private ledY:number;
    private size:number;
    private game:Phaser.Game;

    constructor(game:Phaser.Game,x:number,y:number,size:number,ledX:number,ledY:number) {
        super();
        this.game = game;this.size = size;this.ledX = ledX;this.ledY = ledY;
        this.img = game.add.image(x,y,"hologram",6);
        this.lightOn();
    }
    
    setLightState(newState: boolean): void {
        var frame:number = this.ledX + this.ledY * 14;
        if (!newState) {
            frame = frame + 6 * 14;
        }
        if (this.currentHologram == 2) {
            frame = frame + 7
        }
        if (this.img != null) {
            if (this.img.frame != frame) { this.img.frame = frame; }
            this.img.width = this.img.height = this.size;
        }        
    }
    
    setHologram(hologram: number): void {
        this.currentHologram = hologram;
        this.setLightState(this.isOn);
    }
}