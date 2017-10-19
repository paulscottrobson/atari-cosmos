; **********************************************************************************************************
; **********************************************************************************************************
;
;												Destroyer
;
; **********************************************************************************************************
; **********************************************************************************************************

;
;	10 and 11 are the left and right missiles (right player missile is 11)
; 	2,10 and 2,11 count the number of moves each has made so far.
; 	12 is the player targeter.
;
DSOpponentMissile = 10

	page

Destroyer:
	jsrp 	ClearScreen 						; delete everything.

	lbi 	0,Player 							; reset player position
	stii 	1
	lbi 	1,Player
	stii 	3

	lbi 	Random1 							; reset the RNG so we always produce sequence
	stii 	4
	stii 	7
;
;	Main loop.
;
DSDestroyerLoop:	
	jsrp 	Update	 							; update and move vertical player
	jsrp 	MoveVPlayer
	nop

	lbi 	0,PlayerMissile 					; player missile.
	jsr 	CheckPixelInUse 					; skip if not in use.
	jp 		DSNoFireCheck 						; in use, we don't need to fire check.

	clra 										; write zero player move counter in case we fire
	xad 	2,PlayerMissile						
	jsrp 	CheckFire 							; and see if we are firing.
	lbi 	0,PlayerMissile 					; player missile.
	jsr 	DSKillYEquals1 						; if Y is 1 kill it
DSNoFireCheck:


	lbi		Timer+2
	skmbz 	3
	jp 		DSMoveMissiles
	jp 		DSDestroyerLoop
DSMoveMissiles:

	lbi 	0,PlayerMissile
	jsr 	DSMoveMissile						; adjust missile position vertically, skip if alive

	lbi 	0,DSOpponentMissile 				; player missile firing ?
	jsrp 	CheckPixelInUse
	jp 		DSMoveOpponent

	jsr 	DSFireMissileQuery					; maybe firing
	jsr 	DSKillYEquals1 						; but don't fire if Y = 1
	jp 		DSDestroyerLoop
DSMoveOpponent:
	jsr 	DSMoveMissile
	jp 		DSDestroyerLoop
;
;	Move missile B, if alive, adjusting vertically using the counter. If Y = 0 and counter = 0
;	the counter doesn't increment, pinning it to the top row.
;
DSMoveMissile:
	ld 		0		 							; read X goto Y
	aisc 	15 									; skip if X is not zero
	ret 										; if it is zero, return as it is dead.

	cba  										; A is now 10 (opponent) 11 (player)
	aisc 	5 									; A is now 15 (opponent) 0 (player, and skipped)
	jp 		__DSNotPlayer 
	aisc 	1 									; A now 15 (opponent) 1 (player)
__DSNotPlayer:
	add 										; add to X position.
	x 		1 									; write back and point to Y position.

	ld 		3									; get Y position (8-15) and point to counter
	xabr 										; and to make 0-7 using XABR trick.
	xabr
	add 										; add the counter if both are zero don't adjust vertically 
	aisc 	15 									; skip if non-zero
	jp 		__DSNoVMove
	jsr 	__DSVerticalMove 					; do the vertical move code.

__DSNoVMove:
	clra 										; back to page 0
	xabr
__DSMoveDone:
	skmbz 	3 									; if gone -ve then off the right
	jmp 	__DSHitShipRight 					
	clra  										; if zero, hit off the left.
	ske 										; so fall through.
	jmp 	__DSCheckMissilesCollide 			; go check they've hit each other
;
__DSHitShipLeft:
__DSHitShipRight:
	; TODO: Hit either side
	jmp 	Kill

__DSCheckMissilesCollide:
	; TODO: Hit each other
	ret

__DSVerticalMove:
	ld 		0									; bump counter
	aisc 	1
	x 		0 
	ld 		2 									; re-read and switch to 0
	aisc 	13 									; 1,2 up
	jmp 	MoveUp
	aisc 	14 									; 3,4 same
	ret
	aisc 	14 									; 5,6 down
	jmp 	MoveDown 	
	ret 										; after that nothing.

DSFireMissileQuery:
	; TODO: Proper code.
	lbi 	0,DSOpponentMissile
	stii 	7
	lbi 	1,DSOpponentMissile
	stii 	3+8
	lbi 	2,DSOpponentMissile
	stii 	0
	lbi 	0,DSOpponentMissile
	ret

DSKillYEquals1:
	ld 		1 									; point to Y
	clra
	aisc 	1+8
	ske 										; skip if Y:1
	ret
	ld 		1
	jmp 	Kill 								; kill the missile.
	ret
