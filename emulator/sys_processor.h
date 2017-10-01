// *******************************************************************************************************************************
// *******************************************************************************************************************************
//
//		Name:		sys_processor.h
//		Purpose:	Processor Emulation (header)
//		Date:		1st October 2017
//		Author:		Paul Robson (paul@robsons.org.uk)
//
// *******************************************************************************************************************************
// *******************************************************************************************************************************

#ifndef _PROCESSOR_H
#define _PROCESSOR_H

typedef unsigned short WORD16;														// 8 and 16 bit types.
typedef unsigned char  BYTE8;

void CPUReset(void);
BYTE8 CPUExecuteInstruction(void);

#ifdef INCLUDE_DEBUGGING_SUPPORT													// Only required for debugging

typedef struct __CPUSTATUS {
	BYTE8 a,b,c,d,en,g,q,timerOverflow;
	WORD16 pc,sa,sb,sc,timer;
	BYTE8 *ram;
} CPUSTATUS;

CPUSTATUS *CPUGetStatus(void);
BYTE8 CPUExecute(WORD16 breakPoint1,WORD16 breakPoint2);
WORD16 CPUGetStepOverBreakpoint(void);
WORD16 CPUReadMemory(WORD16 address);
void CPUWriteMemory(WORD16 address,WORD16 data);
void CPULoadBinary(const char *fileName);
#endif
#endif
