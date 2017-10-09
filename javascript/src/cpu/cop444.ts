/// <reference path="../../lib/phaser.comments.d.ts"/>
/// <reference path="../generated/cop444generated.ts"/>

class COP444 extends COP444Opcodes {

    private opcodeFunctions:Function[];
    /**
     * Constructor accesses the ROM Image and initialises RAM Memory.
     * 
     * @memberof COP444
     */
    constructor(hardware:IHardware) {
        super(hardware);
        this.romMemory = ROMImage.rom;
        this.ramMemory = [];
        for (var n:number = 0;n < 128;n++) this.ramMemory[n] = 0;
        this.opcodeFunctions = this.getOpcodeFunctionTable();
        this.reset();
    }

    /**
     * Reset the Processor
     * 
     * @memberof COP444Base
     */
    reset():void {
        this.pc = this.a = this.b = this.c = this.d = this.en = this.g = 0;
        this.sa = this.sb = this.sc = 0;
        this.cycles = this.q = this.timer = this.tov = 0;
        this.hardware.reset();
    }

    /**
     *  Fetch the next operation code.
     * 
     * @returns {number} 
     * @memberof COP444Base
     */
    fetch():number {
        var opcode:number = this.romMemory[this.pc];
        this.pc = (this.pc+1) & 0x7FF;
        this.timer++;
        if (this.timer >= 0x400) {
            this.timer = 0;
            this.tov = 1;
            this.hardware.timerOverflow();
        }
        return opcode;
    }
    
    /**
     * Execute a single instruction
     * 
     * @returns {number} number of cycles since last end of frame call.
     * @memberof COP444
     */
    execute(): number {
        var opcode:number = this.fetch();
        if (opcode == 0x23) {
            opcode = this.fetch()|0x100;
        }
        if (opcode == 0x33) {
            opcode = this.fetch()|0x200;
        }
        if (this.pc >= 0x80 && this.pc <= 0xFF) {
            if (opcode >= 0x80 && opcode != 0xFF) {
                this.pc = opcode;
                opcode = 0x44;
            }
        }
        this.opcodeFunctions[opcode].call(this);
        this.cycles++;
        return this.cycles;
    }

    /**
     * Call to end frame, e.g. when cycles have been completed.
     * 
     * @memberof COP444
     */
    endOfFrame(): void {
        this.cycles = 0;
        this.hardware.endOfFrame();
    }
    /**
     *  Skip an instruction (1 or 2 bytes)
     * 
     * @memberof COP444Base
     */
    skip():void {
        var n:number = this.fetch();
        if (this.is2Byte(n)) { n = this.fetch(); }
    }

    /**
     * Called after LBI - skips any subsequent LBI opcodes)
     * 
     * @memberof COP444Base
     */
    lbiSkip():void {
        while (this.isLBIOpcode()) { this.skip(); }        
    }
        
    /**
     * Check to see if next instruction is LBI - there are
     * 2 formats, 00xx1xxx or 33 1xxxxxxx
     * 
     * @private
     * @returns {boolean} 
     * @memberof COP444Base
     */
    private isLBIOpcode():boolean {
        var opc = this.romMemory[this.pc];
        if ((opc & 0xC8) == 0x08) return true;
        if (opc != 0x33) return false;
        opc = this.romMemory[(this.pc+1) & 0x7FF];
        return (opc & 0x80) != 0;
    }

    /**
     * Check to see if the next instruction is a 2 byte one.
     * 23/33 prefixes and 60-6F long jumps.
     * 
     * @private
     * @param {number} opc 
     * @returns {boolean} 
     * @memberof COP444Base
     */
    private is2Byte(opc:number):boolean {
        return (opc >= 0x60 && opc <= 0x6F) || (opc == 0x23) || (opc == 0x33);
    }
    
}