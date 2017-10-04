// *******************************************************************************************************************************
// *******************************************************************************************************************************
//
//		Name:		hardware.h
//		Purpose:	Hardware Interface (header)
//		Date:		1st October 2017
//		Author:		Paul Robson (paul@robsons.org.uk)
//
// *******************************************************************************************************************************
// *******************************************************************************************************************************

#ifndef _HARDWARE_H
#define _HARDWARE_H

#define LED_LEFT 	(6)
#define LED_RIGHT	(7)

#define DIM_FRAME_COUNT 	(5)

void HWIWriteColumns(BYTE8 rowSel);
void HWISetSelectedRows(BYTE8 rowSel);
BYTE8 HWIReadRow(BYTE8 row);
BYTE8 HWIReadKeypad(BYTE8 Q);
void HWITimerOverflow(void);
void  HWIEndFrame(void);
BYTE8 HWIGetHologramID(void);
BYTE8 HWIReadGameID(void);

#endif
