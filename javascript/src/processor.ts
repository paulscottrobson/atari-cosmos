/// <reference path="../lib/phaser.comments.d.ts"/>

abstract class COP444Base {

    protected n:number = 42;

    constructor() {
        console.log("Constructed");
        var x:Function[] = this.getOpcodeFunctionTable();
        var n:number = 0x108;
        console.log(x,x[n]);
        x[n].call(this);
    }

    abstract getOpcodeFunctionTable():Function[];
}