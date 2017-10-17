// *******************************************************************************************************************************
// *******************************************************************************************************************************
//
//		Name:		hardware.cpp
//		Purpose:	Hardware Interface
//		Date:		1st October 2017
//		Author:		Paul Robson (paul@robsons.org.uk)
//
// *******************************************************************************************************************************
// *******************************************************************************************************************************

#include <stdio.h>
#include <stdlib.h>
#include "sys_processor.h"
#include "hardware.h"
#include "gfx.h"																

//	Values currently in rows
static BYTE8 currentRows[8];
// 	Frame counters for rows/columns
static BYTE8 ledCount[8*7];
//	Column and row values
static BYTE8 columnSelect,rowSelect;
//  Hologram number
static BYTE8 holoID = 0;
// 	Game ID
static BYTE8 currentGameID = 0;
//  Beeper
static Beeper beeper;
//  Frames to sound off
static BYTE8 soundOff;

#define LEDCOUNTER(x,y) ledCount[(x)+7*(y)]

#define FRAMES_LIT 	(5)

// *******************************************************************************************************************************
//										Hardware Reset
// *******************************************************************************************************************************

void HWIReset(void) {
	for (BYTE8 i = 0;i < 8;i++) currentRows[i] = 0;
	for (BYTE8 i = 0;i < 8*7;i++) ledCount[i] = 0;
	columnSelect = rowSelect = holoID = 0;
	soundOff = 1;
}

// *******************************************************************************************************************************
//								Write to columns (e.g. Writing to G:D)
// *******************************************************************************************************************************

void HWIWriteColumns(BYTE8 colData) {
	columnSelect = colData;
	holoID = ((columnSelect & 0x80) == 0) ? 1 : 2;
	//printf("Row(L):%02x Col:(GD)%02x Hol:(G3)%d\n",rowSelect,columnSelect & 0x7F,columnSelect >> 7);
}

// *******************************************************************************************************************************
//							 Set the selected row(s) (e.g. writing to L)
// *******************************************************************************************************************************

void HWISetSelectedRows(BYTE8 rowSel) {
	rowSelect = rowSel;
	//printf("Row(L):%02x Col:(GD)%02x Hol:(G3)%d\n",rowSelect,columnSelect & 0x7F,columnSelect >> 7);
}

// *******************************************************************************************************************************
//											Read the Keypad
// *******************************************************************************************************************************

#define TK(k,v) (GFXIsKeyPressed(k) ? (v) : 0)
#define KEYS(a,b,c,d) (TK(a,1) | TK(b,2) | TK(c,4) | TK(d,8))

BYTE8 HWIReadKeypad(BYTE8 Q) {
	BYTE8 v = 0;
	Q = Q & 0xF0;
	if (Q == 0x80) {
		v =  KEYS(GFXKEY_UP,GFXKEY_RIGHT,GFXKEY_DOWN,GFXKEY_LEFT);			// Directional controls
	}
	if (Q == 0x40) {
		v =  KEYS(GFXKEY_RETURN,'S','P','X');								// Start, Skill Level, Players
	}
	if (Q == 0x20) {														// Fire button.
		if (GFXIsKeyPressed(GFXKEY_CONTROL)) v = 0x01;
	}
	return v;
}

// *******************************************************************************************************************************
//								Read what is to be displayed on current row.
// *******************************************************************************************************************************

BYTE8 HWIReadRow(BYTE8 row) {
	return currentRows[row & 7];
}

// *******************************************************************************************************************************
//										Get Hologram (1-Left,2-Right)
// *******************************************************************************************************************************

BYTE8 HWIGetHologramID(void) {
	return holoID;
}

// *******************************************************************************************************************************
//											Timer Overflow code
// *******************************************************************************************************************************

void HWITimerOverflow(void) {
	//printf("TOV:Row(L):%02x Col:(GD)%02x Hol:(G3)%d\n",rowSelect,columnSelect & 0x7F,columnSelect >> 7);
	if (rowSelect != 0 && columnSelect != 0) {
		for (BYTE8 row = 0;row < 8;row++) {
			if (rowSelect & (0x01 << row)) {
				for (BYTE8 col = 0;col < 7;col++) {
					BYTE8 colMask = 0x40 >> col;
					if (columnSelect & colMask) {
						LEDCOUNTER(col,row) = FRAMES_LIT;
						currentRows[row] |= colMask;						
					}
				}
			}
		}
	}
}

// *******************************************************************************************************************************
//											End of frame code.
// *******************************************************************************************************************************

void HWIEndFrame() {
	if (soundOff > 0) {
		soundOff--;
		if (soundOff == 0) GFXSetFrequency(0);
	}
	for (BYTE8 row = 0;row < 8;row++) {
		if (currentRows[row] != 0) {
			for (BYTE8 col = 0;col < 7;col++) {
				if (LEDCOUNTER(col,row) > 0) {
					LEDCOUNTER(col,row)--;
					if (LEDCOUNTER(col,row) == 0) {
						currentRows[row] &= (0xFF ^ (0x40 >> col));
					}
				}
			}
		}
	}
}

// *******************************************************************************************************************************
//											Set/Return game ID
// *******************************************************************************************************************************

void HWISetGameID(BYTE8 id) {
	currentGameID = id & 0xF;
}

BYTE8 HWIReadGameID(void) {
	return currentGameID;
}

// *******************************************************************************************************************************
//											Set sound effect (XAS)
// *******************************************************************************************************************************

void HWISetSFX(BYTE8 sfxID) {
	// printf("Sound %d player\n",sfxID);
	// 9 shortwht 10 longwht 11 shortlow 12 longlow 13 shorthigh 14 longhigh 15 gameover
	int f = (sfxID - 9)/2 * 200 + 110;
	soundOff = (sfxID & 1) ? 4:25;
	if (sfxID == 15) {
		f = 110;soundOff = 60;
	}
	if (f == 110) f = -1;
	GFXSetFrequency(f);
}
