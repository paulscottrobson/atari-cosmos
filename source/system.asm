; **********************************************************************************************************
; **********************************************************************************************************
;
;										Utility and System Routines
;
; **********************************************************************************************************
; **********************************************************************************************************

; **********************************************************************************************************
;
;								Mapping from coordinates to screen bits
;
; **********************************************************************************************************

	page 	4

											; screen mapping
	byte 	$00 							; x bit patterns, from not displayed (0) 1-7
	byte 	$40
	byte 	$20
	byte 	$10
	byte 	$08
	byte 	$04
	byte 	$02
	byte 	$01

	byte 	$01 							; y bit patterns rows 0-5 of LEDs (8-13) Left (14) Right (15)
	byte 	$02
	byte 	$04
	byte 	$08
	byte 	$10
	byte 	$20
	byte 	$40
	byte 	$80

; **********************************************************************************************************
;
;											7 Segment Lookup Table
;
; **********************************************************************************************************

	byte 	$3F 							; 0 These are the values written to G/D when a seven segment 
	byte 	$06 							; 1 display	LED is switched on.
	byte 	$5B
	byte 	$4F
	byte 	$66
	byte 	$6D
	byte 	$7D
	byte 	$07
	byte 	$7F
	byte 	$67 							; 9
	byte 	$71 							; S [for slow]

; **********************************************************************************************************
;
;				  Keyboard mapping - values put on lines L4-L7, data read from L0-L3
;
; **********************************************************************************************************

	offset 	32
	byte 	$80 							; bit 0 Up/1 bit 1 Left/2 bit2 Down/3 bit3 Right/4
	byte 	$40 							; bit 0 Start bit1 Skill bit2 Players
	byte 	$20 							; bit 0 Fire
	byte 	$10   							; not used.

; **********************************************************************************************************
;
;	Repaint code. The code is executed as follows for each valid B (0-14 only)
;
;	(i) 	the code from RPContinue to JP DoneY is executed, loading the X bit data into Q
;	(ii) 	bit 3 is clear (it's an X), so the jump is skipped
;	(iii)	point to Y in page 1 and set mandatory bit 3 for Y values.
;	(iv) 	Check to see if it is a seven segment display (Y = 14 or 15) if so read segment data using (2,B)
;	(v)		Set the carry if hologram 2 is selected, this propogates through to G3
;	(vi)	Using a temp variable, read the Q lines back and output to G and D, setting G3 on the carry
; 	(vii)	Reload B, Bu must be 1 and go back to RPContinue.
;
;	(viii)	Load the data from (1,B) and use it to look up in the table, output to Q.
;	(ix) 	Because bit 3 is set on Y coordinates, it will jump back to RPDoneY
; 	(x) 	Switch Bu to zero, pause for brightness, decrement Bl, return if underflow.
;
;	There is a spurious delay the first time round but this doesn't matter in practice.
;
;	Uses 	(0,0-14) 	X values (1-6 column 0-5,0 don't display)
;			(0,15)		If non zero displays hologram 2, if zero displays hologram 1.
;			(1,1-14) 	Y values (8-15 row 0-5 LED 6 left 7 seg 7 right 7 seg)
; 			(2,x) 		For any x which has Y values 14 or 15 (e.g. the 7 segment) the digit value.
;						by convention only, (x,13) is the left LED (x,14) the right LED
;
; **********************************************************************************************************

FN__Repaint:
	lbi 	1,15 							; point to first one plus 1, also set B upper to one.

RPDoneY:
	ld 		1 								; switch back to zero.

	it 										; delay for brightness
	skt
	nop

	cba 									; get the pointer.
	aisc 	15 								; effectively subtract 1 and skip on not borrow
	ret 									; borrowed, so return.

RPContinue:
	cab 									; save new address in B.
	xad 	RowTemp 						; save it in RowTemp

	clra 									; A:M now points to the table in the first 16 bytes.
;	aisc 	MappingTable/16&15
	lqid 									; read the 8 bit pattern into Q.
	skmbz 	3 								; if M(B) is in range 0-7 it is 'X', so skip.
	jp 		RPDoneY 						; otherwise we have done Y, so complete.

	ld 		1 								; point to Y
	smb 	3								; set the mandatory bit 3.

	ld 		3 								; read Y this value is 8-15. Execute if 14,15. Set Bu to 2
	aisc 	2 								; will skip if 14,15
	jp 		RPNotSevenSegment 

	clra 									; read from seven segment table.
	aisc 	1
	lqid

RPNotSevenSegment:
	ldd 	HoloDisplay 					; read the holo display location
	aisc 	15 								; set carry if non zero
	nop

	lbi 	RPWork1 						; point to useable location for CQMA and set to page 1.
	cqma 									; copy X 8 bit data to MA

	smb 	3 								; set bit 3 if carry set.
	skc
	rmb 	3 								; otherwise, clear it.

	omg 									; output high 3 bits and G3 bit set here.
	cab 									; output low 4 bits 
	obd

	ldd 	RowTemp 						; load rowtemp, Bu is still 1
	cab
	jmp 	RPContinue 						; and do the Y part.

; **********************************************************************************************************
;
;				Get the Game ID into the ID variable and A, B points to ID variable
;
; **********************************************************************************************************

FN__GetGameID:
	clra 									; start with 1
	aisc 	1
GGIdentifyLoop:
	cab 									; save in B
	xad 	RPWork1 						; save in RPWork1
	obd 									; write to D lines.
	inin 									; read into A.
	lbi 	RowTemp 						; save into RowTemp
	x 		0 					
	clra 	 								; clear A.
	skmbz 	0 								; if bit 0 is clear, skip
	ldd 	RPWork1 						; reload RPWork1 - this is now zero or bit value depending on IN0.
	lbi 	GameID 							; point to game ID
	xor 									; xor with A
	x 		0 								; write back
	lbi 	RPWork1 						; point to the bit value.
	ld 		0 								; double it.
	asc  									; add with carry out and skip (CC by AISC)
	jp 		GGIdentifyLoop
	lbi 	GameID 							; read it.
	ld 		0
	ret

; **********************************************************************************************************
;
;										Scan the keyboard
;
; **********************************************************************************************************

FN__ScanKeyboard:	
	clra 									; clear lines D and G
	cab
	obd 	
	ogi 	8 								; choose holo 2 									
	ldd 	HoloDisplay 					; read the holo display location
	aisc 	15 								; skip if non-zero.
	ogi 	0 								; choose holo 1

	clra 									; start with keyboard line 0.
	lbi 	KeyboardBase+1 					; point to keyboard base, one after first slot.
	x 		0 								; save current index in this "next" slot
SKLoop:
	clra
	aisc 	2
	lqid 									; copy bit pattern into Q

	ld 		0 								; go to previous slot preserving the value in this one.
	xds 	0

	inl 									; copy keyboard data to M:A
	nop 									; replace with COMP if pulled low by key depressions.
	xis 	0 								; we only want A ; copy the read data to current slot and advance

	xis 	0 								; read A and go to the next slot after that.
	aisc 	1 								; bump it.
	x 		0 								; store there.
	skmbz 	2 								; return if has reached 4 0100
	ret
	jmp 	SKLoop


; **********************************************************************************************************
;
;								Swap the player data - swaps pages 0-2 and 5-7.
;
;							  It's a sort of "task switch" between the two players
;
; **********************************************************************************************************

SwapPlayerData:
	lbi 	2,15 							; last byte of #2
SWLoop:
	ld 		0 								; fetch byte there
	jsr 	SWToggleBU
	x 		0
	jsr 	SWToggleBU
	xds 	0
	jp 		SWLoop
	xabr  									; back one.
	aisc 	15								; decrement, ret on underflow.	
	ret
	xabr
	jp 		SWLoop
;
;	Sub-routine - toggles BU between 0-2 and 5-7 - note in 5-7 its backward e.g. 0<->7 1<->6 2<->5
;
SWToggleBU:
	xad 	RPWork1 						; save A
	xabr 									; get BU into A 0011 / 0100
	comp 									; it is now 1100 / 1011
	xabr 									; this will AND 7 when it writes back, Bu is only 3 bits
	ldd 	RPWork1 						; restore A
	ret

; **********************************************************************************************************
;
;					Timing System - calls repaint once for fast, twice for slow
;
;							Note: Must be called at level 0 (LQID)
;
; **********************************************************************************************************

FN__Update:
	jsrp	ScanKeyboard 					; scan keyboard
	jsrp	Repaint 						; repaint
	lbi 	GameSpeed 						; point to the game speed 
	skmbz 	0 								; if bit 0 clear (slow) do this adjustment
	jp 		UPFast
UPSlow:
	jsrp	Repaint 						; repaint
UPFast:
	lbi 	Timer+4 						; point to the timers.
UPTimerLoop:
	ld 		0 								; get timer value
	skmbz 	3 								; if is currently overflowing
	jp 		UPResetTimer
	jp 		UPBumpTimer
UPResetTimer:
	cba 									; start the timer at B+2
	aisc 	2
UPBumpTimer:	
	aisc 	1 								; bump timer (won't skip)
	xds 	0 								; write back
	jp 		UPTimerLoop
	ret

; **********************************************************************************************************
;
;								Move Player Left/Right, skip if off edge.
;
; **********************************************************************************************************

FN__MoveHPlayer:
	lbi 	KeysDirection 					; check direction keys
	skmbz 	KFB_LEFT
	jmp 	FN__PlayerLeft
	skmbz 	KFB_RIGHT
	jp 		FN__PlayerRight
	ret


; **********************************************************************************************************
;
;						Move pixel right, return skip on reached right hand edge
;
; **********************************************************************************************************

FN__PlayerRight:
	lbi 	0,Player
FN__MoveRight:
	ld 		0 								; get X 1..7
	aisc 	9								; will cause a skip if X = 7, e.g. can't move further right.	
	jp 		MRSkip 							; skip over if moving right.
	retsk 									; we skipped, so return and skip.
MRSkip:
	x 		0 								; write it back.
	rmb 	3 								; force in range 1..7 - undoes the skip.
	ret

; **********************************************************************************************************
;
;						Move pixel left, return skip on reached left hand edge
;
; **********************************************************************************************************

FN__PlayerLeft:
	lbi 	0,Player
FN__MoveLeft:
	ld 		0 								; read it.
	aisc 	14 								; will skip for every value except 1.
	retsk 									; so if didn't skip, return and skip as it was 1.
	aisc 	1 								; make it subtract 1.
	x 		0 								; and exit
	ret

; **********************************************************************************************************
;
;								Move Player Left/Right, skip if off edge.
;
; **********************************************************************************************************

FN__MoveVPlayer:
	lbi 	KeysDirection 					; check direction keys
	skmbz 	KFB_DOWN
	jp 		FN__PlayerDown
	skmbz 	KFB_UP
	jp 		FN__PlayerUp
	ret

; **********************************************************************************************************
;
;							Move pixel down, return skip on reached bottom.
;
; **********************************************************************************************************

FN__PlayerDown:
	lbi 	0,Player
FN__MoveDown:
	ld 		1 								; switch to Y
	ld 		0 								; read Y
	aisc 	3 								; will cause a skip if Y = 8+5, the bottom pixel row.
	jmp 	MDSkip
MVFail:
	ld 		1 								; switch back to page 0.
	retsk 									; if skip execute the return skip.
MDSkip:
	ld 		0 								; re-read
	aisc 	1 								; bump 
MDExit:	
	x 		1 								; write back, switch back
	ret

; **********************************************************************************************************
;
;							Move pixel up, return skip on reached top.
;
; **********************************************************************************************************

FN__PlayerUp:
	lbi 	0,Player
FN__MoveUp:
	ld  	1 								; switch to Y
	ld 		0 								; read Y
	aisc 	7 								; will skip for all values except 8.
	jp 		MVFail 							; can't skip, reset to page 0 and exit-skip
	aisc 	8 								; effectively subtract 1.
	jp 		MDExit 							; write back, going to page 0.

; **********************************************************************************************************
;
;										Random Number Generator.
;
;									 Preserves B, all 7 bits of it
; **********************************************************************************************************

FN__Random:
	cba 									; save B
	xad 	RPWork1 						; in RPWork1 and RowTemp
	xabr
	xad 	RowTemp

	lbi 	Random2 						; start by shifting it left.
	rc 										; clear carry
	ld 		0 								; add Random2 to itself
	asc
	nop
	xds 	0 								; write it back, point at Random1.
	ld 		0 								; add it to itself with carry in
	asc 									; skip if carry out.
	jp 		RANDXor 						; if carry clear do the XOR code.
RANDContinue:	
	x 		0  								; write back.

	ldd 	RowTemp 						; reload Bu
	xabr
	ldd 	RPWork1 						; reload Bl
	cab
	ldd 	Random2 						; load the second digit
	ret

RANDXor:
	x 		0 								; write back the Random1 value
	clra  									; fetch 1
	aisc 	1
	xor 									; XOR with random1
	xis 	0 								; point to random2
	clra
	aisc 	13 								; fetch 13
	xor 									; XOR with random 2
	jmp 	RANDContinue					; write back and exit.

; **********************************************************************************************************
;
;								  Increment the seven segment LED pair
;
; **********************************************************************************************************

FN__BumpCounter:
	lbi 	2,RightDigit 					; point to right digit.
BumpLoop:
	ld 		0 								; bump it.
	aisc 	1
	x 		0
	ld 		0 								; reget it
	aisc 	6								; skip if bumping left
	ret
	xds 	0 								; write it back, will be zero and decrement.
	cba 		
	aisc 	16-LeftDigit 					; will skip for left/right digit
	ret
	jp 		BumpLoop

; **********************************************************************************************************
;
;										Skip Return if Pixel not in use.
;
; **********************************************************************************************************

FN__CheckPixelInUse:
	clra
	ske 									; skip if zero , e.g. not in use.
	ret
	retsk

; **********************************************************************************************************
;
;												Check firing
;
; **********************************************************************************************************

FN__CheckFire:
	lbi 	KeysFire 						; check if fire button pressed
	skmbz 	KFB_FIRE
	jp 		CFFire
	ret 									; not pressed, return.
CFFire:
	lbi 	0,PlayerMissile 				; check if PM is free.
	jsrp 	CheckPixelInUse 				; check not in use, skip if so.
	ret
	ldd 	0,Player 						; copy player position to P/M.
	x 		1
	ldd 	1,Player
	x 		1
	ret

; **********************************************************************************************************
;
;		Move player missile if it exists, kill it on going off. RetSK if collision check needed.
;
; **********************************************************************************************************

FN__MovePlayerMissile:
	lbi 	0,PlayerMissile 				; point to P/M
	jsrp 	CheckPixelInUse 				; skip if not in use
	jp 		MPMMove 					
	ret 
MPMMove:
	jsrp 	MoveUp 							; move up, skip if hits edge.
	retsk 									; so collision check needed here, still in flight.

; **********************************************************************************************************
;
;										Kill Player Missile
;
; **********************************************************************************************************

FN__KillPlayerMissile:
	lbi 	0,PlayerMissile 				; if skipped hit edge, fall through to kill.
	
; **********************************************************************************************************
;
;										Kill Pixel at B
;
; **********************************************************************************************************

FN__Kill:
	clra 	 								; kill pixel at B
	x 		0
	ret

; **********************************************************************************************************
;
;									Set hologram 1 or 2 or Player (Pn = n)
;
; **********************************************************************************************************

FN__Hologram1:
	lbi 	HoloDisplay 					; hologram#1
	stii 	0
	ret

FN__PlayerHologram:
	lbi 	2,InfoBits 						; if bit 3 of infobits set it is player 1
	skmbz 	3 								; skip of player 2.
	jp 		FN__Hologram1

FN__Hologram2:
	lbi 	HoloDisplay 					; hologram#2
	stii 	8
	ret


; **********************************************************************************************************
;
;	 Check collision with object at B with all other objects, on collide skip with A/B = collision object
;
; **********************************************************************************************************

FN__CheckCollision:
	clra
	aisc 	14
FN__CheckCollisionUpto:
	xad 	RowTemp
	cba 									; save address of colliding object.
	xad 	RPWork1 
CCLoop:
	ldd 	RPWork1 						; get the object being tested into A.
	lbi 	RowTemp 						; point B to the currently compared object.
	ske  									; if equal then skip, this one can't be a collision.
	jp 		CCCoordinates
CCNext:
	lbi 	RowTemp 						; point to row temp
	ld 		0								; read it
	aisc 	15 								; bump, skip for all values > 0
	ret 									; if value was zero, return without skip.	
	x 		0 								; write it back
	jmp 	CCLoop 							; and go round again.

CCCoordinates:				
	sc 										; set carry - this will be reset if no collision.
	lbi 	0,0								; page 0 where the X coordinates are.

	cab 									; on entry A = collide.ID, put in B
	ld 		0 								; Read collide.X into A
	xad 	RowTemp 						; Rowtemp contains collide.X, A contains RowTemp (current.ID)
	cab 									; B contains current.ID
	ldd 	RowTemp 						; read collide.X B is current.ID
	ske 									; reset carry if not equal.
	rc

	cba 									; save current.ID back in RowTemp
	xad 	RowTemp

	ld 		1 								; switch to bank 1.
	ld 		0 								; read current.Y into A.
	xad 	RPWork1 						; now RPWork1 contains current.Y and A contains collide.ID
	cab 									; B now points to Collide.Y
	ldd		RPWork1 						; A is current.Y, B points to collide.y
	ske 									; reset carry if not equal.
	rc

	cba 									; A is collide.Y
	xad 	RPWork1 						; write back Collide.Y
	ld 		1 								; switch back to bank 0
	skc 									; if carry set, collision has occurred.
	jmp 	CCNext

	ldd 	RowTemp 						; get collision ID, in A + B
	cab
	retsk

; **********************************************************************************************************
;
;								Timed Delay of approximately A+1 seconds
;
; **********************************************************************************************************

FN__ShortDelay:
	clra
	aisc 	2
FN__Delay:
	comp 									; negate as counting up	
	lbi  	Timer 							; write here
	xis 	0 								; write it bump to timer + 1
	clra 									; starts at zero.
DLYLoop:
	x 		0 								; write value back
	jsrp 	Repaint 						; update screen
	lbi 	Timer+1 						; count from here
DLYPrevious:
	ld 		0 								; load and bump
	aisc 	1
	jmp 	DLYLoop 						; no skip, write back via x 0
	xds 	0 								; previous counter
	jp 		DLYPrevious
	ret

; **********************************************************************************************************
;
;									Jump here when a life is lost.
;
; **********************************************************************************************************

LifeLost:
	lbi 	2,Lives 						; read lives
	ld 		0 
	aisc 	15 								; subtract 1
	jmp 	KillPlayer 
	x 		0
	jmp 	GameTurnOver

; **********************************************************************************************************
;
;							Jump here to immediately kill the current player
;
; **********************************************************************************************************

KillPlayer:
	lbi 	2,InfoBits 						; set infobits 1.
	smb 	0
	jmp 	GameTurnOver


; **********************************************************************************************************
;
;									Initialisation done in every turn
;
; **********************************************************************************************************

FN__CommonNewTurn:
	jsrp 	ClearScreen
	lbi 	0,Player 						; put player in bottom centre.
	stii 	4
	lbi 	1,Player
	stii 	8+5
	ret

; **********************************************************************************************************
;
;									Initialisation done in every game
;
; **********************************************************************************************************

FN__CommonInitialise:
	lbi 	2,LeftDigit 					; reset score.
	stii 	0
	stii 	0
	lbi 	2,Lives 						; reset lives
	stii 	2								; 2 is 3 because it fails when lives was 0.
	ret

