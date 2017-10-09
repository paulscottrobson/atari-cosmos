/// <reference path="../lib/phaser.comments.d.ts"/>

abstract class COP444 {

    protected n:number = 42;

    constructor() {
        console.log("Constructed");
        var x:Function[] = this.getOpcodeFunctionTable();
        console.log(x,x[0]);
        x[0].call(this);
    }

    abstract getOpcodeFunctionTable():Function[];
}

class COP444Test extends COP444 {

    getOpcodeFunctionTable(): Function[] {
        return [ this.testFunc];
    }
    

    testFunc(): void {
        console.log("Running ",this.n);
    }
}