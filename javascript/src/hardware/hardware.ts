/// <reference path="../../lib/phaser.comments.d.ts"/>

class Hardware implements IHardware {

    private display:CosmosDisplay;
    private gColumns:number;
    private dColumns:number;
    private qRows:number;

    constructor(game:Phaser.Game) {
        this.display = new CosmosDisplay(game);
        this.reset();
    }

    destroy(): void {
        this.display.destroy();
        this.display = null;
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
        return 0;
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
    }

    endOfFrame(): void {
        this.display.endOfFrame();
    }
    
}