/// <reference path="../../lib/phaser.comments.d.ts"/>

class Hardware implements IHardware {

    private display:CosmosDisplay;
    private keypad:IKeypad;
    private gColumns:number;
    private dColumns:number;
    private qRows:number;

    constructor(game:Phaser.Game) {
        this.display = new CosmosDisplay(game);
        this.keypad = new Keypad(game);
        this.reset();
    }

    destroy(): void {
        this.display.destroy();
        this.keypad.destroy();
        this.display = this.keypad = null;
    }

    reset(): void { 
        this.gColumns = this.dColumns = this.qRows = 0;        
    }

    updateen(n: number): void { }

    updated(n: number): void {
        this.dColumns = n;
    }

    updateg(n: number): void {
        this.gColumns = n;
    }

    updateq(n: number): void {
        this.qRows = n;
    }

    readl(): number {
        var n:number = 0;
        if ((this.qRows & 0x80) != 0) {
            n = (this.keypad.isKeyPressed(CosmosKeys.UP) ? 1 : 0) + 
                (this.keypad.isKeyPressed(CosmosKeys.RIGHT) ? 2 : 0) + 
                (this.keypad.isKeyPressed(CosmosKeys.DOWN) ? 4 : 0) + 
                (this.keypad.isKeyPressed(CosmosKeys.LEFT) ? 8 : 0);
        }
        if ((this.qRows & 0x40) != 0) {
            n = (this.keypad.isKeyPressed(CosmosKeys.START) ? 1 : 0) + 
                (this.keypad.isKeyPressed(CosmosKeys.SKILL) ? 2 : 0) + 
                (this.keypad.isKeyPressed(CosmosKeys.PLAYERS) ? 4 : 0);
        }
        if ((this.qRows & 0x20) != 0) {
            n = this.keypad.isKeyPressed(CosmosKeys.FIRE) ? 1 : 0;
        }
        return n;
    }

    readin(): number {
        var n:number = ((this.dColumns & CosmosApplication.getGameID()) != 0) ? 1 : 0 ;
        return n;
    }

    siowrite(n: number): void {
    }

    timerOverflow(): void {
        var xCol:number = this.gColumns * 16 + this.dColumns;
        var yRow:number = this.qRows;
        // console.log("LED",xCol.toString(16),yRow.toString(16));
        for (var y = 0; y < 8;y++) {
            if ((yRow & (0x01 << y)) != 0) {
                for (var x = 0;x < 7;x++) {
                    if ((xCol & (0x40 >> x)) != 0) {
                        //console.log(x,y);
                        this.display.turnOn(x,y);
                    }
                }
            }
        }
        this.display.setHologram((xCol & 0x80) != 0 ? 2 : 1);
    }

    endOfFrame(): void {
        this.display.endOfFrame();
    }
    
}