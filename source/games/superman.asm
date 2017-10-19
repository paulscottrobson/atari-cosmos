; **********************************************************************************************************
; **********************************************************************************************************
;
;												Superman
;
; **********************************************************************************************************
; **********************************************************************************************************

;	Active or inactive Dragons
;	==========================
;
;	0.n 	X position
; 	1.n 	Y position
; 	2.n 	bit 0,1,2 		vertical move +1 (0 ,1 or 2)
;			bit 3 			direction of movement (0 = left, 1 = right)
;
;	n = 4,5,6,7,8 			LEDs for the 5 cells. When the 5th would be lit, game over.
;
;	2.11 	Number of dragons in jail.
;	2.12 	Non-zero if player carrying a dragon.
;
	page

SUDragonCount = 0 							; the highest dragon address e.g. #dragons-1 (0-3)

Superman:
	lbi 	2,11
	stii 	0 								; no dragons in jail.
	stii 	0 								; not carrying a dragon.
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

	; each dragon
	;	if dead, and chance, launch *or* escape if possible.
	; 	if alive, flip vertically if needed, move horizontally, kill if off.
	jp 		SULoop
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
;	Add a dragon to the cells, go to win code if collected 5.
;
SUAddDragonToCell:
	lbi 	2,11 							; number of dragons
	ld 		0 								; bump it
	aisc 	1
	x 		0 

	ld 		2 								; re-read it, switch to X.
	aisc 	3 								; n dragons jailed, light n+3 LED.
	cab 									; B contains the LED
	aisc 	14 								; the X value to write there
	nop
	x 		1 								; write and switch to 1.
	stii 	8+5 							; bottom row

	ldd 	2,11 							; read the total
	aisc 	11 								; values 0,1,2,3,4 do not skip
	ret
	jmp 	ShowHolo2LifeLost 				; when got all 5 you have won.
;
;	Remove dragon from cells.
;
SURemoveDragonFromCell:
	lbi 	2,11 							; number of dragons.
	ld 		0 								; bump it
	aisc 	15
	nop
	x 		0
	ld 		2 								; get it go to page 0
	aisc 	4
	cab
	clra 									; and kill it
	x 		0
	ret

