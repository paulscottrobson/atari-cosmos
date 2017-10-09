/// <reference path="../../lib/phaser.comments.d.ts"/>

class HolographicDisplay implements ILED {

    private cells:LEDHoloCell[];
    private xSel:number;
    private ySel:number;

    constructor(game:Phaser.Game,x:number,y:number,size:number) {
        if (x < 0) {
            x = game.width / 2 - size * 7 / 2;
        }
        this.cells = [];
        for (var xc:number = 0;xc < 7;xc++) {
            for (var yc:number = 0;yc < 6;yc++) {
                this.cells[yc*7+xc] = new LEDHoloCell(game,x+xc*size,y+yc*size,size,xc,yc);
            }
        }    
        this.select(0,0);
    }

    select(x:number,y:number): void {
        this.xSel = x;this.ySel = y;
    }

    lightOn(): void {
        this.cells[this.xSel+7*this.ySel].lightOn();
    }

    endOfFrame(): void {
        for (var c of this.cells) {
            c.endOfFrame();
        }
    }

    setLightState(newState: boolean): void {
    }

    setHologram(hologram: number): void {
        for (var c of this.cells) {
            c.setHologram(hologram);
        }
    }

    destroy(): void {
        for (var c of this.cells) {
            c.destroy();
        }
        this.cells = null;
    }
}
