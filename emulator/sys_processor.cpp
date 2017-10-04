// *******************************************************************************************************************************
// *******************************************************************************************************************************
//
//		Name:		sys_processor.c
//		Purpose:	Processor Emulation.
//		Date:		1st October 2017
//		Author:		Paul Robson (paul@robsons.org.uk)
//
// *******************************************************************************************************************************
// *******************************************************************************************************************************

#include <stdlib.h>
#include <stdio.h>
#include "sys_processor.h"
#include "sys_debug_system.h"
#include "hardware.h"

// *******************************************************************************************************************************
//														   Timing
// *******************************************************************************************************************************

#define FRAME_RATE		(50)														// Frames per second (50)
#define CYCLES_PER_FRAME (250000/FRAME_RATE)										// Cycles per frame (100k)

static WORD16 cycles;
static BYTE8 firstReset = 1;

// *******************************************************************************************************************************
//														CPU / Memory
// *******************************************************************************************************************************

#include "_cop444_code.h"

#define GAMEID()	HWIReadGameID()
#define INREAD() 	(D & GAMEID()) ? 1 : 0;

#define	LREAD() 	HWIReadKeypad(Q)
#define	SIOWRITE(n)	{}
#define	UPDATED(b)	HWIWriteColumns((G << 4)|D)
#define	UPDATEG(b)	HWIWriteColumns((G << 4)|D)
#define	UPDATEQ(b) 	HWISetSelectedRows(b)
#define	UPDATEEN(b)	{}

// *******************************************************************************************************************************
//														Reset the CPU
// *******************************************************************************************************************************

void CPUReset(void) {
	if (firstReset) {
		firstReset = 0;
		srand(422);
		for (BYTE8 i = 0;i < 128;i++) RAM[i] = rand() & 0x0F;
	}
	ResetCop444();
	cycles = 0;
}

// *******************************************************************************************************************************
//									Fetch a byte, updating the timer 
// *******************************************************************************************************************************

static BYTE8 CPUFetch(void) {
	BYTE8 b = ROM[PC];
	PC = (PC + 1) & 0x7FF;
	TIMER++; 						// 8 bit counter + 2 bits.
	if (TIMER >= 0x400) { 			// Timer overflow.
		TOV = 1;
		TIMER = 0; 
		HWITimerOverflow();
	}
	return b;
}

#define FETCH() CPUFetch()

// *******************************************************************************************************************************
//												Execute a single instruction
// *******************************************************************************************************************************

BYTE8 CPUExecuteInstruction(void) {
	
	WORD16 opcode = CPUFetch();														// Fetch instruction.
	if (opcode == 0x23) { 															// Map 23xx onto 1xx
		opcode = CPUFetch() | 0x100;
	}
	if (opcode == 0x33) { 															// Map 33xx onto 2xx
		opcode = CPUFetch() | 0x200;
	}

	if (PC >= 0x80 && PC <= 0xFF) { 												// JP in pages 2 and 3.
		if (opcode >= 0x80 && opcode != 0xFF) {										// is a special case (Not JID)
			PC = opcode;
			opcode = 0x44;															// This is NOP.
		}
	}

	switch(opcode) {
		#include "_cop444_instructions.h"
	}
	cycles++;
	if (cycles < CYCLES_PER_FRAME) return 0;										// Not completed a frame.
	cycles = cycles - CYCLES_PER_FRAME;												// Adjust this frame rate.
	HWIEndFrame();																	// Frame end stuff
	return FRAME_RATE;																// Return frame rate.
}


#ifdef INCLUDE_DEBUGGING_SUPPORT

// *******************************************************************************************************************************
//		Execute chunk of code, to either of two break points or frame-out, return non-zero frame rate on frame, breakpoint 0
// *******************************************************************************************************************************

BYTE8 CPUExecute(WORD16 breakPoint1,WORD16 breakPoint2) { 
	do {
		BYTE8 r = CPUExecuteInstruction();											// Execute an instruction
		if (r != 0) return r; 														// Frame out.
	} while (PC != breakPoint1 && PC != breakPoint2);								// Stop on breakpoint.
	return 0; 
}

// *******************************************************************************************************************************
//									Return address of breakpoint for step-over, or 0 if N/A
// *******************************************************************************************************************************

WORD16 CPUGetStepOverBreakpoint(void) {
	BYTE8 opcode = ROM[PC];
	if (opcode >= 0x68 && opcode <= 0x6F) {											// JSR long.
		return PC + 2;
	}
	if (PC >= 0x80 && PC <= 0xFF && opcode >= 0x80 && opcode <= 0xBF) {				// JSRP outside pages 2 + 3
		return PC+1;
	}
	return 0;	
}

// *******************************************************************************************************************************
//												Read/Write Memory
// *******************************************************************************************************************************

WORD16 CPUReadMemory(WORD16 address) {
	return ROM[address & 0x7FF];
}

void CPUWriteMemory(WORD16 address,WORD16 data) {
	ROM[address & 0x7FF] = (BYTE8)data;
}

// *******************************************************************************************************************************
//												Load a binary file into RAM
// *******************************************************************************************************************************

#include <stdio.h>

void CPULoadBinary(const char *fileName) {
	FILE *f = fopen(fileName,"rb");
	fread(ROM,1,2048,f);
	fclose(f);
}

// *******************************************************************************************************************************
//											Retrieve a snapshot of the processor
// *******************************************************************************************************************************

static CPUSTATUS s;																	// Status area

CPUSTATUS *CPUGetStatus(void) {
	s.a = A;s.b = B;s.c = C;s.d = D;s.en = EN;s.g = G;s.timerOverflow = TOV;
	s.timer = TIMER >> 2;s.pc = PC;s.sa = SA;s.sb = SB;s.sc = SC;s.q = Q;s.ram = RAM;
	return &s;
}

#endif
