; **********************************************************************************************************
; **********************************************************************************************************
;
;												Superman
;
; **********************************************************************************************************
; **********************************************************************************************************
;
;		dragon.0 dragon.1 are the positions on screen (dragon0.0 == offscreen)
;  		dragon.2 bit 0 is left/right
; 		dragon.2 bit 1 is up moving.
;		dragon.2 bit 2 set if in jail
;
; 		2,12 # of dragon being carried (or $F if none)
; 		2,11 counter timer

SUDragonCount = 9 							; # of dragons in game.

	page

Superman:
	lbi 	2,12
	stii 	15 								; not carrying a dragon.
	stii 	9								; this game we count down, it's as fast as possible.
	stii 	9
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
	lbi 	0,SUDragonCount 				; count the number of dragons in jail
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

	; TODO:check if alive, create if not, perhaps.
	; TODO:if alive, check escape if in dungeon, move up.
	; TODO:if not in dungeon, move it.


	; TODO:dragon caught by player ?
	; TODO:dragon dropped in empty cell by player ?

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
	