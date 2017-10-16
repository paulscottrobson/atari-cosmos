; **********************************************************************************************************
; **********************************************************************************************************
;
;											Space Invaders
;
; **********************************************************************************************************
; **********************************************************************************************************

;
;	0-7 are the space invaders.
; 	3,9 is the space invader count-1
;	3,10 is direction (left = 0, right = 8)
;
INCount = 3,9

	page

SpaceInvaders:
	skc  									; skip on CS (initialise)
	jp 		INNewLevel
	ret										; no initialisation code.

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

INLoop:
	jsrp 	Update 							; update display
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