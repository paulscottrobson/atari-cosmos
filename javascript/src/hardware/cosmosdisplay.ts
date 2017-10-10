/// <reference path="../../lib/phaser.comments.d.ts"/>

/**
 * Composite display.
 * 
 * @class Display
 */
class CosmosDisplay {

    private holoDisplay:HolographicDisplay;
    private digits:SevenSegmentDisplay[];
    private logo:Phaser.Image;

    constructor(game:Phaser.Game) {
        this.holoDisplay = new HolographicDisplay(game,-1,270,Math.floor(game.width/7.5));
        this.digits = [];
        this.digits[0] = new SevenSegmentDisplay(game,game.width/2-110,30,90);
        this.digits[1] = new SevenSegmentDisplay(game,game.width/2+30,30,90);
        this.logo = game.add.image(game.width/2,game.height-100,"sprites","logo");
        this.logo.anchor.x = 0.5;this.logo.anchor.y = 0.5;
        this.logo.width = game.width * 0.75;this.logo.height = this.logo.width / 6;
    }

    destroy() : void {
        this.holoDisplay.destroy();
        this.digits[0].destroy();
        this.digits[1].destroy();
        this.logo.destroy();
        this.holoDisplay = this.logo = this.digits = null;
    }

    /**
     * Turn on LED at position on display.
     * 
     * @param {number} x 
     * @param {number} y 
     * @memberof CosmosDisplay
     */
    turnOn(x:number,y:number): void {        
        switch(y) {            
            case 6:
                this.digits[0].select(6-x);
                this.digits[0].lightOn();
                break;
            case 7:
                this.digits[1].select(6-x);
                this.digits[1].lightOn();
                break;
            default:
                this.holoDisplay.select(x,y);
                this.holoDisplay.lightOn();
                break;
        }
    }

    /**
     * Do end of frame on display
     * 
     * @memberof CosmosDisplay
     */
    endOfFrame(): void {
        this.holoDisplay.endOfFrame();
        this.digits[0].endOfFrame();
        this.digits[1].endOfFrame();
    }
}