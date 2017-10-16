; **********************************************************************************************************
; **********************************************************************************************************
;
;											Space Invaders
;
; **********************************************************************************************************
; **********************************************************************************************************

;	Pixels:
;	0-7 are the space invaders.
;
;	11-14 are playermissile/player/leds as normal
;
;	Instance Memory:
; 	2,9 is the space invader count-1
;	2,10 is direction (left = 0, right = 2)
;	2,11 is next-time-down if non-zero.

INCount = 2,9
INDirection = 2,10
INNextDown = 2,11

	page

SpaceInvaders:
	skc  									; skip on CS (initialise)
	jp 		INNewLevel
	ret										; no initialisation code.
;
;	Start a new level
;
INNewLevel:
	jsrp 	ClearScreen 					; clear everything
	jsrp 	CommonNewTurn 					; reset base player

	lbi 	0,7 							; start at 0,7 the last invader
	cba 									; reset the count, handily, to 7
	xad 	INCount
INResetInvadersLoop:
	cba 									; A = 0-7
	x 		0 								; write to X position
	skmbz 	2
	jp 		INNotRow2
	ld 		1 								; switch to page 1, set bit 0 and switch back.
	smb 	0 							
	ld 		1
INNotRow2:	
	rmb 	2 								; value 0-3
	ld 		0
	aisc 	2
	xds 	0
	jp 		INResetInvadersLoop
;
;	Main update loop.
;
INLoop:
	jsrp 	Update 							; update display
	jsr 	INCheckSpeed 					; check speed, skip if not moving this turn.
	jsr		INMoveInvaders 					; move invaders
	jsr 	INFireInvaders					; fire invaders
	jsrp 	MoveHPlayer 					; move player, horizontally only.


	jsrp 	CheckFire 						; check firing
	jsrp 	MovePlayerMissile 				; move missile, skip if collision check needed.
	jp 		INLoop

	clra 									; checking hit any of the invaders
	aisc 	7 
	lbi 	0,PlayerMissile  				; with the player missile
	jsrp 	CheckCollisionUpTo 				; skip on collision with number in A/B.
	jp 		INLoop

	jsrp	Kill 							; kill invader
	jsrp 	KillPlayerMissile 				; and the missile.
	jsrp 	BumpCounter 					; score + 1

	lbi 	INCount 						; point to invader count
	ld 		0 								; read it
	aisc 	15 								; decrement, skip if invaders are left
	jp 		INNewLevel 						; none left, create a new set.
	xad 	INCount 						; write it back.
	jp 		INLoop 							; go round and continue.
;
;	Invaders movement.
;
INMoveInvaders:
	lbi 	INNextDown 						; point to next down flag.
	clra 									; skip if equal
	ske 
	jmp 	INMoveDown
;
;	A left-right movement as the flag is cleared.
;
INNormalMove:
	lbi 	0,7 							; move all invaders
INMoveNormalLoop:
	jsrp 	CheckPixelInUse 				; skip if pixel not in use.
	jp 		INMoveInvader 					; go move it.
INMoveNormal2:	
	ld 		0 								; loop to next invader.
	xds 	0
	jp 		INMoveNormalLoop
	ret
;
;	Move invader left or right - set the flag if it hits an edge (optimise using functions ?)
;
INMoveInvader:
	ldd 	INDirection 					; get directions 0-2
	aisc 	15 								; make -1 .. 1
	nop
	add 									; add to X position
	x 		0 								; write back
	ld 		0 								; get value
	aisc 	14 								; everything > 1 causes a skip
	jp 		INReachedEdge 					; 1->15 2->0 7->5
	aisc 	11 								; only want a skip for 5.
	jmp 	INMoveNormal2
;
;	Hit the edge ?
;
INReachedEdge: 								
	clra 									; set next down flag
	aisc 	1
	xad 	INNextDown 
	jmp 	INMoveNormal2
;
;	When flag is set, it moves all the players down and the invaders switch direction.
;
INMoveDown:
	x 		0 								; reset next down flag.

	lbi 	INDirection 					; point to direction
	clra 									; toggle that
	aisc 	2
	xor
	x 		0
;
;	Moving players down
;
	lbi 	0,7 							; move all down.
INMoveDownLoop:
	jsrp 	CheckPixelInUse 				; skip if not in use.
	jp 		INMoveInvaderDown
INMoveDown2:
	ld 		0 								; loop to next invader.
	xds 	0
	jp 		INMoveDownLoop
	ret
;
;	Actual move down code
;
INMoveInvaderDown:
	ld 		1 								; switch to 1.
	ld 		0 								; read it.
	aisc 	1 								; down 1
	x 		0 								; write back
	ld 		1 								; reload, switch back to 0
	aisc 	3 								; reached the bottom (8+5+3)
	jp 		INMoveDown2						; no go back.

;
;	TODO: Life Lost here. Life lost displaying Holo#2 into System ?
;
	halt

;
;	TODO: Speed check, skips if not moving this go. It's a bit fast flat out !
;
INCheckSpeed:
	ret

;
;	TODO: Fire at player.
;
INFireInvaders:
	ret
			