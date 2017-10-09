/// <reference path="../../lib/phaser.comments.d.ts"/>

/**
 * Hardware interface.
 * 
 * @interface IHardware
 */
interface IHardware {

    reset():void;
    updateen(n:number):void;
    updated(n:number):void;
    updateg(n:number):void;
    updateq(n:number):void;
    readl():number;
    readin():number;
    siowrite(n:number):void;
    timerOverflow():void;
    endOfFrame():void;

}

/**
 * Test class
 * 
 * @class DummyHardware
 * @implements {IHardware}
 */
class DummyHardware implements IHardware {

    private d:number;

    reset(): void { 
        console.log("Dummy:Reset");
    }
    updateen(n: number): void {         
        console.log("Dummy:EN:"+n.toString(16))
    }
    updated(n: number): void {
        this.d = n;
        console.log("Dummy:D:"+n.toString(16));        
    }
    updateg(n: number): void {
        console.log("Dummy:G:"+n.toString(16));        
    }
    updateq(n: number): void {
        console.log("Dummy:Q:"+n.toString(16));        
    }
    readl(): number {
        var n:number = 0;
        console.log("Dummy:InL:"+n.toString(16));
        return n;
    }
    readin(): number {
        var n:number = ((this.d & CosmosApplication.getGameID()) != 0) ? 1 : 0 ;
        console.log("Dummy:InIn:"+n.toString(16));
        return n;
    }
    siowrite(n: number): void {        
    }
    timerOverflow(): void {
        console.log("Dummy:TOV");
    }
    endOfFrame(): void {
        console.log("Dummy:EOF");
    }

}