; **********************************************************************************************************
; **********************************************************************************************************
;
;												Destroyer
;
; **********************************************************************************************************
; **********************************************************************************************************

;	0-4 are the left player, 5-9 are the right player.
;	10 and 11 are the left and right missiles (right player missile is 11)
; 	2,10 and 2,11 count the number of moves each has made so far.
; 	12 is the player targeter.
;
; 	2,0 	opponent hit count
; 	2,9 	player hit count

DSOpponentMissile = 10

	page

Destroyer:
	jsrp 	ClearScreen 						; delete everything.

	lbi 	0,Player 							; reset player position
	stii 	1
	lbi 	1,Player
	stii 	3

	jsr 	DSSetupY	
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


	lbi		Timer+1
	skmbz 	3
	jp 		DSMoveMissiles
	jp 		DSDestroyerLoop
DSMoveMissiles:

	jsr 	DSCheckMissilesCollided
	lbi 	0,PlayerMissile
	jsr 	DSMoveMissile						; adjust missile position vertically, skip if alive
	jsr 	DSCheckMissilesCollided

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
	jmp 	__DSNoVMove
	jsr 	__DSVerticalMove 					; do the vertical move code.

__DSNoVMove:
	clra 										; back to page 0
	xabr
__DSMoveDone:
	skmbz 	3 									; if gone -ve then off the right
	jmp 	__DSHitShipRight 					
	clra  										; if zero, hit off the left.
	ske 										; so fall through.
	ret
	jmp 	__DSHitShipLeft
;
;	Vertical move code.
;
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
;
;	Check if missiles have collided.
;
DSCheckMissilesCollided:
	lbi 	0,PlayerMissile 					; has player missile hit anything
	jsr 	CheckCollision 						
	ret
	aisc 	16-DSOpponentMissile 				; will skip if >= DSOpponentMissile
	ret
	comp  										; check if zero, if so opponent missile.
	aisc 	1
	ret
	lbi 	0,DSOpponentMissile 				; kill them both
	stii 	0
	stii	0
	jsrp 	SFXShortFire
	ret
;
;	Fire another missile ?
;
DSFireMissileQuery:
	jsrp	Random 								; random number
	aisc 	6 									; skip 0-5, fails 1 in 3
	ret
	aisc 	8 									; set bit 3.
	lbi 	1,DSOpponentMissile 				; write to missile.y point to missile.x
	x 		1
	stii 	7
	lbi 	2,DSOpponentMissile 				; clear counter
	stii 	0
	jsrp 	SFXLowShortBeep 					; beep
	lbi 	0,DSOpponentMissile 				; kill if it's 1.
;
;	Kill missile if firing from Y = 1
;
DSKillYEquals1:
	ld 		1 									; point to Y
	clra
	aisc 	1+8
	ske 										; skip if Y:1
	ret
	ld 		1
	jmp 	Kill 								; kill the missile.
	ret
;
;	Set up the Y pixel positions for the lit lamps on the ships indicating hits.
;
DSSetupY:
	lbi 	1,0
	sc
__DSSYLoop:
	stii	8+0
	stii	8+2
	stii	8+3
	stii	8+4
	stii	8+5
	skc
	ret
	rc	
	jmp 	__DSSYLoop
;
;	We've hit one ship or another.
;
__DSHitShipLeft:
__DSHitShipRight:
	clra 										; kill by writing 0 in X.
	x 		1 									; point to Y
	clra 										; skip if Y = 8, e.g. row 0.
	aisc 	8 									
	ske 
	aisc 	15  								; if Y > 8 make A = 7
	nop 										; by here A is 8 for Y = 8, 7 for Y > 8
	add 										; add Y. For Y = 8, this is 0, for Y > 8 its Y-1
	x 		0 									; this is the offset going to be lit, save in obj.Y
	cba 										; get B this is 10 (opponent) 11 (player)
	aisc 	5 									; skip if player missile.
	jp 		__DSHitPlayer 						; opponent missile, hit player.

__DSHitOpponent:
	ld 		1 									; get B value from Y, switch to X.
	aisc 	5 									; hit the opponent half 5..9
	cab 										; put in B
	clra 										; skip if not already taken.
	ske
	ret 
	stii 	7 									; light the lamp for hit.
	jsrp 	BumpCounter 						; score + 1
	lbi 	2,0 	
	jp 		__DSIncCounterCheck

__DSHitPlayer:
	ld 		1 									; get B value from Y, switch to X.
	cab 										; put in B
	clra 										; skip if not already taken.
	ske
	ret 
	stii 	1 									; light the lamp for hit.
	lbi 	2,9

__DSIncCounterCheck:
	ld 		0 									; bump the counter selected
	aisc 	1
	x 		0
	ldd 	2,9 								; look at player counter - 4 hits = dead
	comp 										; 11 = dead
	aisc 	4 									; so will skip for fewer hits.
	jmp 	ShowHolo2LifeLost

	lbi 	2,0 								; get opponent hit counter - if hit all 5.
	ld 		0
	aisc 	11
	ret
	x 		0 									; zero the counter as opponent not hit, new ship
	lbi 	0,5 								; clear all its lights
	stii	0
	stii	0
	stii	0
	stii	0
	stii	0
	jsrp 	BumpCounter							; bonus points.
	jsrp 	BumpCounter
	jsrp 	BumpCounter
	jmp 	SFXLongFire