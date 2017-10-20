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
;	2.n 	bit 0 			Set for straight up
;	2.n 	bit 1 			Set for left moving, clear for right moving
;
;
;	n = 4,5,6,7,8 			LEDs for the 5 cells. When the 5th would be lit, game over.
;
;	2.11 	Number of dragons in jail.
;	2.12 	Non-zero if player carrying a dragon.
; 	2.10 	Temp for B
; 	2.9 	Divide by 16 counter

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
	lbi 	2,9 							; timer counter at 2,9 divides frame rate by 16.
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
	lbi 	0,SUDragonCount
SUDragonLoop:
	cba
	xad 	2,10 							; save in 2,10 for recovery
	jsrp 	CheckPixelInUse					; skip if unused.
	jp 		SUDragonAlive

	jsrp 	Random 							; lowish chance of creation.
	aisc 	3
	jsr 	SUCreateDragon 					; create a new dragon.
	jp 		SUDragonNext

SUDragonAlive:
	jsrp 	Random 							; slow it down slightly.
	aisc 	4
	jsr 	SUMoveDragon 					; move dragon, will skip if off screen
	jp 		SUDragonNext
	jsrp 	Kill 							; off edge, kill it.

SUDragonNext:
	ld 		0  								; go round the loop.
	xds 	0
	jp 		SUDragonLoop
	jsr 	SUCheckPickupDropped			; check if picked up dragon/dropped dragon depending.
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
;
;	Create a new dragon
;
SUCreateDragon:
	jsrp 	Random 							; chance of escaping ?
	aisc 	12 								; normally its a fly past
	jp 		__SUEscaper 					; sometimes its an escaper, if escaper exists.

	clra									; set X = 1
	aisc 	1
	x 		1
__SUCDGetY: 								; get a Y value
	jsrp 	Random 	
	aisc 	4						
	jp 		__SUCDGetY	
	aisc 	8 								; set bit 3
	x   	3 								; save and go to 2
	clra 
	x 		2 								; clear bit 0 (=right)

	jsr 	Random							; 50/50 chance of other side.	
	aisc 	8
	ret

	ld 		2 								; back to 2
	smb 	1	 							; set bit 0 (= left)
	ld 		2 								; back to 0
	smb 	1 								; convert 1 to 7
	smb 	2
	ret
;
;	Escaping dragon.
;
__SUEscaper:
	ldd 	2,11 							; no of dragons
	aisc 	15 								; skip if non zero
	ret
	aisc 	2 								; gives escaping position
	x 		1 								; put in X, switch to Y
	clra
	aisc 	8+4 							; set Y
	x 		3 								; switch to 2
	clra
	aisc 	1 
	x 		2 								; set control to 1
	jsr 	SURemoveDragonFromCell			; remove dragon
	jsrp 	SFXHighShortBeep 				; make sound
	jmp 	__SUReloadBAndReturn
;
;	Move dragon, skips if off screen on return
;
SUMoveDragon:
	ld 		2 								; switch to 2
	skmbz 	0 								; check bit 0 (up)
	jp 		__SUMoveUp
	skmbz 	1 								; check bit 1 (left)
	jp 		__SUMoveLeft
	ld 		2 								; neither, do right.
	jmp 	MoveRight	
__SUMoveUp:
	jsr 	Random 							; move up is slower
	aisc 	6
	ret
	ld 		2	
	jmp 	MoveUp
__SUMoveLeft:
	ld 		2
	jmp 	MoveLeft
;
;	Check if picked up/dropped dragon
;
SUCheckPickupDropped:
	ldd 	2,12 							; non-zero if carrying
	aisc 	15 								; skips if carrying
	jp 		__SUCheckPickup 				; check if pickup

	lbi 	1,Player 
	clra 									; should go to ground to release
	aisc 	8+5
	ske
	jp 		__SUReloadBAndReturn

	jsrp 	SFXShortFire 					; grabbed one.
	jsr 	SUAddDragonToCell 				; add to cell
	clra 									; clear the carrying flag
	xad 	2,12
	jmp 	__SUReloadBAndReturn 			; and return loading B


__SUCheckPickup:	
	clra 									; start collision test from here.
	aisc 	SUDragonCount
	lbi 	0,Player 						; hit player
	jsrp 	CheckCollisionUpTo 				; check if collidede
	jp 		__SUReloadBAndReturn 			; fail, reload B and return

	jsrp 	Kill 							; kill that dragon pixel
	jsrp 	SFXLowShortBeep 				; caught it.
	lbi 	2,12 							; set carrying flag
	smb 	0
__SUReloadBAndReturn:
	lbi 	2,10
	ld 		2
	cab
	ret
