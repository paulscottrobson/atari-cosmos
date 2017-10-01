// *******************************************************************************************************************************
// *******************************************************************************************************************************
//
//		Name:		sys_debug_forthvm.c
//		Purpose:	Debugger Code (System Dependent)
//		Date:		1st October 2017
//		Author:		Paul Robson (paul@robsons->org.uk)
//
// *******************************************************************************************************************************
// *******************************************************************************************************************************

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#include "gfx.h"
#include "sys_processor.h"
#include "debugger.h"
#include "hardware.h"

#include "_cop444_mnemonics.h"

#define DBGC_ADDRESS 	(0x0F0)														// Colour scheme.
#define DBGC_DATA 		(0x0FF)														// (Background is in main.c)
#define DBGC_HIGHLIGHT 	(0xFF0)

#define COLOUR(test) 	((pattern & test) ? 0xF00 : 0x400)

// *******************************************************************************************************************************
// 													Draw the 7 Segment LED Displays
// *******************************************************************************************************************************

static void _DBGXRender7Segment(int x1,int y1,int x2,int y2,int pattern) {
	SDL_Rect rc;
	rc.x = x1;rc.y = y1;rc.w = x2-x1;rc.h = y2-y1;
	//GFXRectangle(&rc,0);
	rc.w = (x2-x1)/6;rc.h = (y2-y1)/2;
	x1 -= rc.w/2;y1 -= rc.w/2;
	x2 -= rc.w/2;y2 -= rc.w/2;
	rc.x = x1;rc.y = y1;GFXRectangle(&rc,COLOUR(32));	
	rc.x = x2;GFXRectangle(&rc,COLOUR(2));	
	rc.y += rc.h;GFXRectangle(&rc,COLOUR(4));	
	rc.x = x1;GFXRectangle(&rc,COLOUR(16));	
	rc.y = y1;rc.h = rc.w;rc.w = x2-x1+rc.h;
	GFXRectangle(&rc,COLOUR(1));	
	rc.y += (y2-y1)/2;
	GFXRectangle(&rc,COLOUR(64));	
	rc.y = y2;
	GFXRectangle(&rc,COLOUR(8));	
}

// *******************************************************************************************************************************
//													Load in the Holograms
// *******************************************************************************************************************************

static GFXTEXTURE *hologram1 = NULL;
static GFXTEXTURE *hologram2 = NULL;

static void _DBGXLoadHolograms() {
	if (hologram1 == NULL) {
		hologram1 = GFXLoadImage("hologram1.png");
		hologram2 = hologram1;
	}
}

// *******************************************************************************************************************************
//														Draw the LED Array
// *******************************************************************************************************************************

static void _DBGXRenderLEDArray(int x1,int y1,int x2,int y2) {
	int w = (x2 - x1) / 7;
	int h = (y2 - y1) / 6;
	for (int y = 0;y < 6;y++) {
		BYTE8 b = HWIReadRow(y);
		for (int x = 0;x < 7;x++) {
			SDL_Rect rc;
			rc.x = x1 + x * w;rc.y = y1 + y * h;
			rc.w = w;rc.h = h;
			GFXRectangle(&rc,0);
			int s = (w + h) / 20;
			rc.x += s;rc.y += s;rc.w -= s*2;rc.h -= s*2;
			GFXRectangle(&rc,(b & (0x40 >> x)) ? 0xF00 : 0x400);
		}
	}
}

// *******************************************************************************************************************************
//											This renders the debug screen
// *******************************************************************************************************************************

static const char *labels[] = { "A","B","C","D","EN","G","Q","T","OV","","PC","SA","SB","SC","BP" };

void DBGXRender(int *address,int runMode) {
	char szBuffer[32];
	_DBGXLoadHolograms();
	CPUSTATUS *s = CPUGetStatus();
	GFXSetCharacterSize(34,25);
	DBGVerticalLabel(14,0,labels,DBGC_ADDRESS,-1);									// Draw the labels for the register
	int y = 0;
	GFXNumber(GRID(17,y++),s->a,16,1,GRIDSIZE,DBGC_DATA,-1);
	GFXNumber(GRID(17,y++),s->b,16,2,GRIDSIZE,DBGC_DATA,-1);
	GFXNumber(GRID(17,y++),s->c,16,1,GRIDSIZE,DBGC_DATA,-1);
	GFXNumber(GRID(17,y++),s->d,16,1,GRIDSIZE,DBGC_DATA,-1);
	GFXNumber(GRID(17,y++),s->en,16,1,GRIDSIZE,DBGC_DATA,-1);
	GFXNumber(GRID(17,y++),s->g,16,1,GRIDSIZE,DBGC_DATA,-1);
	GFXNumber(GRID(17,y++),s->q,16,2,GRIDSIZE,DBGC_DATA,-1);
	GFXNumber(GRID(17,y++),s->timer,16,2,GRIDSIZE,DBGC_DATA,-1);
	GFXNumber(GRID(17,y++),s->timerOverflow,16,1,GRIDSIZE,DBGC_DATA,-1);
	y++;
	GFXNumber(GRID(17,y++),s->pc,16,3,GRIDSIZE,DBGC_DATA,-1);
	GFXNumber(GRID(17,y++),s->sa,16,3,GRIDSIZE,DBGC_DATA,-1);
	GFXNumber(GRID(17,y++),s->sb,16,3,GRIDSIZE,DBGC_DATA,-1);
	GFXNumber(GRID(17,y++),s->sc,16,3,GRIDSIZE,DBGC_DATA,-1);
	GFXNumber(GRID(17,y++),address[3],16,3,GRIDSIZE,DBGC_DATA,-1);

	GFXNumber(GRID(0,0),address[0],16,3,GRIDSIZE,DBGC_ADDRESS,-1);

	for (int x = 0;x < 16;x++) {
		GFXNumber(GRID(3+x*2,16),x,16,1,GRIDSIZE,DBGC_ADDRESS,-1);
	}
	for (int y = 0;y < 8;y++) {
		GFXNumber(GRID(0,y+17),y*16,16,2,GRIDSIZE,DBGC_ADDRESS,-1);
		GFXString(GRID(2,y+17),":",GRIDSIZE,DBGC_ADDRESS,-1);
		for (int x = 0;x < 16;x++) {
			GFXNumber(GRID(3+x*2,y+17),s->ram[x+y*16],16,1,GRIDSIZE,DBGC_DATA,-1);
		}
	}
	y = 0;
	int pc = address[0];
	while (y <= 14) {
		int highlight = (pc == s->pc);
		GFXNumber(GRID(0,y),pc,16,3,GRIDSIZE,highlight ? DBGC_HIGHLIGHT:DBGC_ADDRESS,-1);
		int opcode = CPUReadMemory(pc);
		pc = (pc + 1) & 0x7FF;
		if (opcode == 0x23 || opcode == 0x33) {
			opcode = ((opcode == 0x23) ? 0x100:0x200);
			opcode = opcode + CPUReadMemory(pc);
			pc = (pc + 1) & 0x7FF;
		}
		strcpy(szBuffer,__mnemonics[opcode]);
		if (opcode >= 0x60 && opcode <= 0x6F) {
			int operand = CPUReadMemory(pc);
			pc = (pc + 1) & 0x7FF;
			sprintf(szBuffer+strlen(szBuffer),"%02x",operand);
		}
		if (pc >= 0x80 && pc <= 0xFF && opcode >= 0x80 && opcode <= 0xFE) {
			sprintf(szBuffer,"jp %03x",opcode);
		}
		// JP JSRP JMP
		GFXString(GRID(4,y),szBuffer,GRIDSIZE,highlight ? DBGC_HIGHLIGHT:DBGC_DATA,-1);

		y++;
	}
	_DBGXRenderLEDArray(GRID(21,6),GRID(33,15));
	_DBGXRender7Segment(GRID(22,1),GRID(26,5),HWIReadRow(LED_LEFT));
	_DBGXRender7Segment(GRID(28,1),GRID(32,5),HWIReadRow(LED_RIGHT));	

	if (runMode) {
		BYTE8 holoID = HWIGetHologramID();
		for (int y = 0;y < 6;y++) {
			BYTE8 b = HWIReadRow(y);
			for (int x = 0;x < 7;x++) {
				SDL_Rect rSrc,rDest;
				rSrc.w = rSrc.h = 32;
				rSrc.x = x * rSrc.w;rSrc.y = y * rSrc.h;
				rDest.w = rDest.h = 64;
				rDest.x = WIN_WIDTH/2-7*rDest.w/2+x * rDest.w;
				rDest.y = WIN_HEIGHT-64-6*rDest.h + y * rDest.h;
				if ((b & (0x40 >> x)) == 0) {
					rSrc.y += 6 * rSrc.h;
				}
				GFXBlitTexture(holoID == 1 ? hologram1:hologram2,&rSrc,&rDest);
			}
		}
	}
}	
