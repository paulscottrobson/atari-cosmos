; **********************************************************************************************************
; **********************************************************************************************************
;
;									Football and Basketball
;
; **********************************************************************************************************
; **********************************************************************************************************

	page

Football:
Basketball:
	jsrp 	PlayerHologram
;
;	Set up players
;
	lbi 	0,Player 							; reposition player centre left.
	stii 	1
	lbi 	1,Player
	stii 	8+3
	lbi 	0,4 								; put in the main 'bar' at column 3
SPSetMainDefense:
	clra 	 									; set A = 3
	aisc 	4 	
	x 		1 									; save as X, switch to Y
	cba  										; n + 8 + 1 is Y position.
	aisc 	9
	xds 	1 									; save and switch back
	jp 		SPSetMainDefense

	lbi 	0,5 								; add the two 'back men'
	stii 	6
	stii 	6
	lbi 	1,5
	stii 	8+2
	stii 	8+4
	jsrp 	SPSkipIfBasketBall 					; this next bit is basketball only.
	jp 		SPLoop

	lbi 	0,0 								; move the two outside defenders back one
	stii 	5
	lbi 	0,4
	stii 	5
	lbi 	1,Player 							; Player.Y from 8+3 to 8+1
	rmb 	1
	jsrp 	Random 								; 50/50 chance
	aisc 	8
	smb 	2 									; 8+1 to 8+5
;
;	Main loop
;
SPLoop: 
	jsr 	SUFlipDisplay
	jsrp 	Update 								; update display
	jsr 	SUFlipDisplay

	jsrp 	MoveVPlayer 						; move vertically
	jp 		SPNotOffEdge 						; is okay.
	jsrp 	ShowHolo1LifeLost 	 				; skipped, gone off the field.
SPNotOffEdge:
	ldd 	1,Player 							; read player.Y
	aisc 	7 									; Y+1 up skips
	jsrp 	ShowHolo1LifeLost 	 				; gone off the field.


	jp 		SPLoop

	page
;
;	Causes a skip on return if the game is Baseball.
;
FN__SPSkipIfBasketball:
	ldd 	GameID
	aisc 	8 									; causes a carry if basketball
	ret
	retsk
;
;	Swap x coordinates around if Player 2.
;
SUFlipDisplay:
	lbi 	2,0 								; look at status bit.
	skmbz 	3 									
	jp 		__SUFlipX
	ret
__SUFlipX:
	lbi		0,Player 							; flip all pixels 
__SUFlipLoop:
	clra 										; check if zero
	ske 
	jp 		__SUFlipOne 						; if not horizontally flip it.
	ld 		0
__SUFDUpdate:
	xds 	0
	jp 		__SUFlipLoop
	ret
;
__SUFlipOne:
	ld 		0 									; get 1-7 value
	comp 										; now 14-8 value
	aisc 	9 									; now 7-1 value
	nop
	jp 		__SUFDUpdate
