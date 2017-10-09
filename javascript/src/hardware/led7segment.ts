/// <reference path="../../lib/phaser.comments.d.ts"/>

class SevenSegmentDisplay implements ILED {

    private segments:LEDRectangle[];
    private selected:number;

    constructor(game:Phaser.Game,x:number,y:number,size:number) {
        var ssize:number = size / 4;
        this.segments = [];
        // a
        this.segments[0] = new LEDRectangle(game,x,y,size+ssize,ssize);
        // b
        this.segments[1] = new LEDRectangle(game,x+size,y,ssize,size+ssize);
        // c
        this.segments[2] = new LEDRectangle(game,x+size,y+size,ssize,size+ssize);
        // d
        this.segments[3] = new LEDRectangle(game,x,y+size*2,size+ssize,ssize);
        // e
        this.segments[4] = new LEDRectangle(game,x,y+size,ssize,size+ssize);
        // f
        this.segments[5] = new LEDRectangle(game,x,y,ssize,size+ssize);
        // g
        this.segments[6] = new LEDRectangle(game,x,y+size,size+ssize,ssize);
        this.select(0);
    }

    select(n:number): void {
        this.selected = n;
    }

    lightOn(): void { 
        this.segments[this.selected].lightOn();
    }

    endOfFrame(): void {
        for (var c of this.segments) {
            c.endOfFrame();
        }
    }

    setLightState(newState: boolean): void { }

    setHologram(hologram: number): void { }

    destroy(): void {
        for (var c of this.segments) {
            c.destroy();
        }
        this.segments = null;
    }

}