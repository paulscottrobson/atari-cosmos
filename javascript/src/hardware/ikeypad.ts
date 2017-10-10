/// <reference path="../../lib/phaser.comments.d.ts"/>

/**
 * Representing each key.
 * 
 * @enum {number}
 */
enum CosmosKeys {
    UP,RIGHT,LEFT,DOWN,START,PLAYERS,SKILL,FIRE
}

/**
 * Keypad interface
 * 
 * @interface IKeypad
 */
interface IKeypad {
    /**
     * Returns true if Cosmos key is down.
     * 
     * @param {CosmosKeys} key true if key pressed.
     * @returns {boolean} 
     * @memberof IKeypad
     */
    isKeyPressed(key:CosmosKeys):boolean;
    /**
     * Destroy keypad object
     * 
     * @memberof IKeypad
     */
    destroy():void;
}

/**
 * Dummy keypad for testing.
 * 
 * @class DummyKeypad
 * @implements {IKeypad}
 */
class DummyKeypad implements IKeypad {
    isKeyPressed(key: CosmosKeys): boolean {
        return false;
    }    
    destroy(): void {}
}