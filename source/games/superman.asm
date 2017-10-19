; **********************************************************************************************************
; **********************************************************************************************************
;
;												Superman
;
; **********************************************************************************************************
; **********************************************************************************************************
;
;		dragon.0 dragon.1 are the positions on screen (dragon0.0 == offscreen)
;  		dragon.2 bit 0 is left (1)/right (0)
; 		dragon.2 bit 1 is up moving.
;		dragon.2 bit 2 set if in jail
;
; 		2,12 # of dragon being carried (or $F if none)
; 		2,11 counter timer

SUDragonCount = 6 							; # of dragons in game.

	page

Superman:
	lbi 	2,12
	stii 	15 								; not carrying a dragon.
	stii 	9								; this game we count down, it's as fast as possible.
	stii 	9
	lbi 	1,Player 						; reposition player
	stii 	8+1
;
;	Main game loop
;
SULoop:
	jsrp 	Update 							; update display
	jsrp 	MoveHPlayer 					; move player
	nop
	jsrp 	MoveVPlayer 
	nop
;
;	Check if we have won - are the cells all full.
;
	lbi 	2,SUDragonCount 				; count the number of dragons in jail
	clra 	
SUCountJailed:
	skmbz 	2 								; skip if dragon in jail bit clear
	aisc 	1
	x 		0
	xds 	0
	jp 		SUCountJailed 					; this count should be 0-5
	comp 									; count is now 15-10
	aisc 	5 								; all values up to 5 will skip
	jmp 	ShowHolo2LifeLost 				; this game termination here.

;
;	Down counter
;	
	lbi 	2,11 							; timer counter at 2,11 divides frame rate by 16.
	ld 		0 								; counter is too quick otherwise :)
	aisc 	1
	nop
	x 		0
	skc
	jp 		SUDragonCode
	lbi 	2,14 							; digit LSB
	ld 		0 								; read and decrement
	aisc 	15 								; skip if underflow
	jsr 	SUCounterMSB					; jsr to do the MSB here
	x 		0

SUDragonCode:

	lbi 	0,SUDragonCount 				; work through the dragons
SUDragonLoop:

	; TODO:if alive, check escape if in dungeon, move up.

	jsrp 	CheckPixelInUse 				; skip if not in use
	jsr 	SUMoveDragon
	jsrp 	CheckPixelInUse 				; skip if not in use
	jp 		SUNoCreate
	jsr 	SUCreateDragon 					; possibly create a dragon
SUNoCreate:

	; TODO:dragon caught by player ?
	; TODO:dragon dropped in empty cell by player ?

	ld 		0 								; do next dragon
	xds 	0
	jp 		SUDragonLoop
	jmp 	SULoop

;
;	Handle the counter MSB
;
SUCounterMSB:
	adt 									; fix up
	xds 	0 								; write back, go to MSB digit

	ld 		0 								; read it
	aisc 	15 								; decrement it, skip for all non zero values
	jp 		SUGameOver
	ret
;
;	Counter is zero, game over.
;
SUGameOver:
	stii 	0 								; zero the score
	stii 	0
	jmp 	ShowHolo2LifeLost 				; this game termination here.
;
;	Possibly create dragon at 0,B
;
SUCreateDragon:	
	jsrp 	Random 							; random#
	aisc  	4 								; creates 0,1,2,3 and skip
	ret
	aisc 	1+8 							; fix up the Y value	

	x 		0 								; save in X
	clra
	aisc 	1
	x 		1 								; set X to 1, restore and switch to Y
	x 		3 								; save in Y and switch to 2
	clra 									; set this to zero
	x  		0

	jsrp 	Random 							; chance of moving up
	aisc 	11 								; mostly skip
	smb 	1 								; set the up moving bit.
	ld 		2 								; switch back to zero page (X)

	jsrp 	Random 							; 50/50 chance we do the right side
	aisc 	8
	ret
	smb 	2 								; set X = 7
	smb 	1
	ld 		2 								; switch to page 2
	smb 	0 								; direction is left.
	ld 		2 								; back to page 0
	ret
;
;	Move dragon at 0,B
;
SUMoveDragon:
	ld 		2								; point to flag page 2
	skmbz 	0 								; if zero move right
	jp 		SUMDLeft

	ld 		2 								; move right code
	jsrp 	MoveRight
	jp 		__SUMDMoveUpQ

__SUMDKillExit:
	jmp 	Kill

SUMDLeft:
	ld 		2 								; move left code
	jsrp 	MoveLeft
	jp 		__SUMDMoveUpQ
	jp 		__SUMDKillExit

__SUMDMoveUpQ:
	ld 		2 								; to page 2
	skmbz 	1 								; if up bit is clear
	jp 		__SUMDMoveUp
	ld 		2
	ret

__SUMDMoveUp:
	ld 		2 								; back to page 0
	jsrp 	MoveUp
	ret
	jp 		__SUMDKillExit
