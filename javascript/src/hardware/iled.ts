/// <reference path="../../lib/phaser.comments.d.ts"/>

interface ILED {
    /**
     * Called if a LED is on over a delay time (on COP444 Timeout)
     * 
     * @memberof ILED
     */
    lightOn():void;
    /**
     * Called on the end of frame ; turns LED off after a delay.
     * 
     * @memberof ILED
     */
    endOfFrame():void;
    /**
     * Controls the physical implementation of the LED.
     * 
     * @param {boolean} newState 
     * @memberof ILED
     */
    setLightState(newState:boolean):void;
    /**
     * Set the background hologram, if appropriate, for this LED.
     * 
     * @param {number} hologram 1 or 2
     * @memberof ILED
     */
    setHologram(hologram:number):void;
}
