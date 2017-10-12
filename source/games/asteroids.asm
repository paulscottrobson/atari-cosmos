; **********************************************************************************************************
; **********************************************************************************************************
;
;											Asteroids - style game
;
; **********************************************************************************************************
; **********************************************************************************************************

	page

Asteroids:
	skc  									; skip on CS (initialise)
	jp 		ASPlay
	ret										; no initialisation code.

ASPlay:
	jsrp	Hologram1
ASLoop:
	jsrp 	Update 							; update display
	jsrp 	MoveHPlayer 					; move player, horizontally only.
	nop

	lbi 	Timer+1 						; time to move everything ?
	skmbz 	3
	jp 		ASMoveAll 						; if so, move everything

	lbi 	0,Player 						; check if player has collide with anything (only asteroids to collide with)
	jsrp 	CheckCollision
	jp 		ASLoop 							; if not, loop back.

	jsrp	ClearScreen 					; clear screen.
	jsrp 	Hologram2 						; hologram 2
	jsr 	ShortDelay						; short delay
	jmp 	LifeLost						; life lost, switch players.

;
;	Move all asteroids down.
;
ASMoveAll:
	lbi 	0,7 							; move all asteroids down.
ASMove:
	jsrp 	CheckPixelInUse 				; skip if not in use
	jp 		ASMoveOne 						; in use, move it.
	jp 		ASNext
ASMoveOne:
	jsrp 	MoveDown 						; move down, skip on off bottom.
	jp 		ASNext

	jsrp 	Kill 							; kill and score one 
	jsrp 	BumpCounter

ASNext:
	ld 		0 								; loop round.
	xds 	0
	jp 		ASMove
;
;	Create a new random asteroid
;
	jsrp 	Random 							; pick a random number
	xabr 									; this makes it in the range 0-7
	clra 									; and also sets Bu to 0.
	xabr
	cab 									; put in B
	jsrp 	CheckPixelInUse 				; skip if not in use.
	jp 		ASLoop 							; go round again
;
;	Create specific asteroid slot.
;
Launch:										; launch a new asteroid
	jsrp 	Random 							; position 0-7
	x 		1 								; save in asteroid slot, switch to 1.
	clra 									; write 0 there, will be made into 8.
	x 		1
	rmb 	3 								; make 0.n 0-7
	jp 		ASLoop 							; go round again.



