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
	jsrp 	PlayerHologram 						; select hologram by player.
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

	jsr 	SUHorizontalMove 					; horizontal moves.
	jsr 	SUCheckCollisions 					; check any collisions.

	lbi 	KeysFire 							; check fire key
	skmbz 	KFB_Fire
	jsr 	SUBasketThrow 						; if pressed do basketball throw.

	lbi 	0,7 								; move all defenders
SPDefenderLoop:
	jsr 	SUMoveDefender
	ld 		0
	xds 	0
	jp 		SPDefenderLoop

	jsr 	SUCheckCollisions 					; check any collisions.
	jmp 	SPLoop
;
;	Causes a skip on return if the game is Basketball.
;
FN__SPSkipIfBasketball:
	ldd 	GameID
	aisc 	8 									; causes a carry if basketball
	retsk
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
;
;	Horizontal move, special code because of the flipping.
;
SUHorizontalMove:
	clra 										; set A = 1
	aisc 	1
	lbi 	KeysDirection 						; point to keys
	skmbz 	KFB_LEFT 							; skip if left not pressed
	jp 		__SUHMGotXI
	aisc 	14 									; set A = 15
	skmbz 	KFB_RIGHT
	jp 		__SUHMGotXI
	ret
__SUHMGotXI: 									; X offset in A
	lbi 	2,0 								; look at player informatin bit
	skmbz 	3 									; by default it's backwards, for P1
	jp 		__SUHMReverse 						; make it the right way round.
	comp 										; negate A (~A + 1)
	aisc 	1
	nop
__SUHMReverse:
	lbi 	0,Player 							; point to player.X
	add 										; add to player.X
	x 		0 									; write back
	rmb 	3 									; 1 -> 0 and 7 -> 0 via 8 

	ld 		0 									; read X
	aisc 	15 									; skip if non-zero
	jsrp 	ShowHolo1LifeLost  					; if was zero, gone off the boundary.

	jsrp 	SPSkipIfBasketBall 					; skip if basketball
	jp 		__SUHMCheckTD 						; if true, check touchdown.
	ret
__SUHMCheckTD:
	ld 		0 									; fetch X
	aisc 	9 									; only 7 skips, e.g. reached TD zone.
	ret

	jsrp 	SPAddTwo 							; add 6 points
	jsrp 	SPAddTwo
	jsrp 	SPAddTwo
	jsrp 	ShowHolo1LifeLost
;
;	Add two to score
;
FN__SPAddTwo
	jsrp 	BumpCounter
	jmp 	BumpCounter

;
;	Check if player has hit any defender.
;
SUCheckCollisions:
	ret 										; this becomes NOP when not testing.
	lbi 	0,Player 							; check player vs defender collision
	jsrp 	CheckCollision
	ret
	jsrp 	ShowHolo1LifeLost 					; collision occurred

;
;	Throw at basket
;
SUBasketThrow:
	jsrp 	SPSkipIfBasketBall 					; must be basket ball game.....
	ret
	halt

;
;	Move Defender B.
;
SUMoveDefender:
	ret
