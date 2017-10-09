/// <reference path="../../lib/phaser.comments.d.ts"/>

/**
 * This is the base class. It is extended by COP444Opcodes to have the opcode methods
 * and the opcode function table accessor method, which is automatically generated.
 * 
 * The final concrete version, COP444 has all the implementation code
 * 
 * @abstract
 * @class COP444Base
 */
abstract class COP444Base {

    protected a:number;
    protected b:number;
    protected c:number;
    protected cycles:number;
    protected d:number;
    protected en:number;
    protected g:number;
    protected pc:number;
    protected q:number;
    protected sa:number;
    protected sb:number;
    protected sc:number;
    protected temp8:number;
    protected timer:number;
    protected tov:number;
    protected ramMemory:number[];
    protected romMemory:number[];
    protected hardware:IHardware;

    abstract skip():void;
    abstract lbiSkip():void;
    abstract fetch():number;
    abstract getOpcodeFunctionTable():Function[];
}