/// <reference path="../../lib/phaser.comments.d.ts"/>

/**
 * Simple Rectangular LED.
 * 
 * @class LEDRectangle
 * @extends {BaseLED}
 */
class LEDRectangle extends BaseLED {

    private img:Phaser.Image;

    constructor(game:Phaser.Game,x:number,y:number,width:number,height:number) {
        super();
        this.img = game.add.image(x,y,"sprites","rectangle");
        this.img.width = width;this.img.height = height;
        this.lightOn();
    }
    
    destroy() : void {
        this.img.destroy();
        this.img = null;
    }
    
    setLightState(newState: boolean): void {
        this.img.tint = (newState ? 0xFF0000 : 0x400000);
    }
    
    setHologram(hologram: number): void {         
    }

}
