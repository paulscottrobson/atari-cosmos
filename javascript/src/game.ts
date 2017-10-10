/// <reference path="../lib/phaser.comments.d.ts"/>

class GameState extends Phaser.State {

    private hardware:IHardware;
    private cpu:COP444;

    init(gameInfo:any) : void {
        this.hardware = new Hardware(this.game);
        this.cpu = new COP444(this.hardware);
        for (var n = 0;n < 1142;n++) this.cpu.execute();
        
    }

    create() : void {
    }

    destroy() : void {
        this.hardware.destroy();
        this.hardware = null;
    }

    update() : void {    
        //this.hardware.endOfFrame();
    }
}    
