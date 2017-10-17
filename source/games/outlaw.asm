; **********************************************************************************************************
; **********************************************************************************************************
;
;												Outlaw
;
; **********************************************************************************************************
; **********************************************************************************************************

; 	9 opponent missile 
; 	10 opponent (1,2)
;	11 player missile
; 	12 player (7,3)
; 	2,10 	Opponent direction (0 up 2 down)

OUOpponent = 10
OUOppMissile = 9

	page

Outlaw:
	skc  									; skip on CS (initialise)
	jp 		OUNewFight
	ret										; no initialisation code.


OUNewFight:
	jsrp	ClearScreen	
	lbi 	0,10  							; reset player
	stii 	1
	stii 	0
	stii 	7
	lbi 	1,10
	stii 	8+1
	stii 	0
	stii 	8+4


OUMainLoop:
	jsrp 	Update 							; update display
	jsrp 	MoveVPlayer 					; move player vertically.
	nop
	jsrp 	CheckFire 						; check for firing
	jsr 	OUMoveOpponent

	lbi 	0,11 							; move player missile.
	jsr 	OUCheckHitCactus 				; has it hit the cactus in the middle.
	jsrp 	CheckPixelInUse 				; check player missile in use, skip if not
	jsr 	OUMovePlayerMissile
	jsr 	OUOpponentMissile
	jp 		OUMainLoop
;
;	Player/Missile movement code.
;
OUMovePlayerMissile:
	jsrp 	MoveLeft 						; move PM left, skip if hits edge
	jp 		OUPMCheckCollide
	jsrp 	Kill
	ret

OUPMCheckCollide:
	ld 		1 								; load PM.X and switch to Y
	comp 									; A will be 14 if Y was 1
	aisc 	2 								; so we will skip then.
	ret
	ldd 	1,OUOpponent 					; c/f opponent Y position.
	ske 						
	ret 									; exit if not, don't need to reset Bu.
	jsrp 	BumpCounter						; bump the score
	jsrp 	SFXLongFire 					; score 1.
	ret
;
;	Move opponent
;
OUMoveOpponent:
	lbi 	Timer+1							; look at timer.
	skmbz  	3 								; skip if not timed out
	jp 		OUIsMoveTime
	ret
OUIsMoveTime:
	jsrp 	Random 							; random number 0-15
	aisc 	13 								; sometimes
	jsr 	OUFlipDirection 				; flip direction.
	jsr 	OUBasicMove 					; basic move up and down.
	skmbz 	3 								; if bit 3 is 0 it is off the top.
	jmp 	OUMoveOppCheck2 				; if not, we need to check the end value

OUOutOfBounds:
	jsr 	OUFlipDirection 				; flip direction, then move again and return.
OUBasicMove:
	lbi 	2,OUOpponent 					; get opponent direction (0 or 2)
	ld 		3 								; fetch and switch back to page 1 (Y)
	aisc 	15 								; convert to -1 .. 1
	nop
	add		
	x 		0 								; write it back, want to check if this value is 8+6 or 7 (7 or 14)
	ret
;
;	check move below
;
OUMoveOppCheck2:
	ld 		0 								; read Y position
	aisc 	2 								; will skip if 6 or 7
	ret
	jmp		OUOutOfBounds
;
;	flip the direction of the opponent
;
OUFlipDirection:
	lbi 	2,OUOpponent 					
	clra
	aisc 	2
	xor 	
	x 		0
	ret
;
;	Check to see if object B has hit cactus. 
;
OUCheckHitCactus:
	clra 									; firstly, X has to be 4.
	aisc 	4
	ske 	
	ret
	ld 		1 								; read Y. Must be 10 or 11 (8+2,8+3)
	ld 		1
	aisc 	6 								; only values 10 and over will skip here.
	ret  									; if it doesn't we only pass 0 and 1
	comp 									; only pass 14 and 15
	aisc 	2
	ret
	jsrp 	Kill 							; kill it
	jsrp 	SFXLowShortBeep 				; make noise
	ret
;
;	Opponent missile.
;
OUOpponentMissile:
	lbi 	0,OUOppMissile 					; check if hit cactus first
	jsr 	OUCheckHitCactus

	jsr 	CheckPixelInUse 				; skip if not in use
	jp 		OUMoveOppMissile

	jsr 	Random 							; only randomly fire.
	aisc 	5
	ret

	stii 	1 								; write X = 1
	ldd 	1,OUOpponent 					; copy Y from opponent.Y
	xad 	1,OUOppMissile
	jsr 	SFXLowShortBeep
	ret
;
;	Exists, move right
;
OUMoveOppMissile:
	jsrp 	MoveRight 						; move right, skip if off edge
	jp 		OUOppCollision 			
	jsrp 	Kill
	ret
;
;	Hit player.
;
OUOppCollision:
	clra 									; check not reached right side.
	aisc 	7
	ske 
	ret
	ld 		1 								; switch to 1/Y
	ldd 	1,Player 						; get player Y
	ske
	ret 
	jmp 	ShowHolo2LifeLost 				; show holo 2, life lost (can save a byte here if needed)