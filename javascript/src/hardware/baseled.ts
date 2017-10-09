/// <reference path="../../lib/phaser.comments.d.ts"/>

/**
 * Base class for a single LED. Implements the 'glow' effect whereby
 * a LED can appear to be permanently on when pulsed intermittently.
 * 
 * @abstract
 * @class BaseLED
 * @implements {ILED}
 */

abstract class BaseLED implements ILED {

    // Number of frames before it goes off.
    private static OFF_TIME = 5;
    // Current state
    protected isOn:boolean;
    // Frame count till off.
    private onFrameCount:number;

    constructor() {
        this.isOn = false;
        this.setHologram(1);
    }
    
    lightOn(): void {
        if (!this.isOn) {
            this.setLightState(true);
        }
        this.isOn = true;
        this.onFrameCount = BaseLED.OFF_TIME;
    }

    endOfFrame(): void {
        if (this.onFrameCount > 0) {
            console.log(this.onFrameCount,this.isOn);
            this.onFrameCount--;
            if (this.onFrameCount == 0 && this.isOn) {
                this.setLightState(false);
                this.isOn = false;
            }
        }
    }

    abstract setLightState(newState: boolean): void;
    abstract setHologram(hologram: number):void ;    
    abstract destroy():void;
}