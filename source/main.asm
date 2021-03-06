; **********************************************************************************************************
; **********************************************************************************************************
;
;											Main Program
;
; **********************************************************************************************************
; **********************************************************************************************************

; **********************************************************************************************************
;
;									Start / Restart of Program
;
; **********************************************************************************************************

Reset:
	clra
	lei 	2
	jsr 	ClearMemory 					; clear memory
	jsr 	GetGameID 						; figure out which game we are playing.
	aisc 	15 								; running game # 0
	jp 		InitialiseGames 				; skip over selection code.

; **********************************************************************************************************
;
;			Selection phase. Allows changing of #Players and Skill Level, and game starting.
;
; **********************************************************************************************************

SELLoop:
	lbi 	GameSpeed 						; point to speed.
	clra
	aisc 	5 								; 5 (S) for slow
	skmbz 	0 
	aisc 	5 								; 10 is F.
	xad 	2,LeftDigit	
	ldd 	PlayerCount 					; get player count
	aisc 	1 								; make 0/1 1/2
	xad 	2,RightDigit

; **********************************************************************************************************
;												HACK
; **********************************************************************************************************

	;jp 		InitialiseGames 				; uncomment this to run automatically S/1.

SELReleaseKey:
	jsr 	SELSkipCtrlKey
	jp 		SELWaitKey
	jp 		SELReleaseKey
SELWaitKey:									; wait for keyboard key to be pressed.
	jsr 	Random
	jsr 	SELSkipCtrlKey
	jp 		SELWaitKey

	skmbz 	KFB_START 						; if start pressed return
	jp 		InitialiseGames
	skmbz 	KFB_PLAYERS 					; if player not pressed must be skill level aka speed.
	lbi 	PlayerCount 					; if pressed player#
	lbi 	GameSpeed						; lbi fall-through.

	clra  									; toggle bit zero of the selected control nibble.
	aisc 	1
	xor
	x 		0
	jmp 	SELLoop 						; loop back.
;
;			Utility Routine : Update Screen / Check control keys ; RETSK if a key is pressed.
;
SELSkipCtrlKey:
	jsrp 	Repaint 						; wait for keyboard to be released.
	jsrp 	ScanKeyboard
	lbi 	KeysControl 					; B = control keys
	clra 									; A = 0
	ske 									; skip if equal e.g. no key pressed
	retsk 									; skip on press
	ret

; **********************************************************************************************************
;
;			Initialise both players, then kill the second one if it's a one player game.
;
; **********************************************************************************************************

InitialiseGames:
	jsrp 	CommonInitialise 				
	jsr 	SwapPlayerData  				; on both halves of memory.
	jsrp 	CommonInitialise 				

	lbi 	5,0
	smb 	3 								; set bit 3, which identifies player #1.
	ldd 	PlayerCount 					; read the players
	aisc 	15 								; will skip if 2 player game.
	smb 	0 								; kill player 2 as 1 player game.
	jmp 	RunGameCode
	
; **********************************************************************************************************
; **********************************************************************************************************
;
;		Come here when the turn is over.  Swap Players over if the alternate players kill bit is clear.
;		If Alternate Playe is dead, check to see if Current Player is dead as well ; if so restart.
;
; **********************************************************************************************************
; **********************************************************************************************************

GameTurnOver:
	lbi 	5,InfoBits						; alternate players (2) kill bit set ?
	skmbz 	0 								; skipped if still alive.
	jp 		Player2IsDead 
	jsr 	SwapPlayerData 					; swap player data round.
	jp 		RunGameCode 					; and run the game code

; **********************************************************************************************************
;
;				Alternate Player is dead, check for game over, if not, run again with player
;
; **********************************************************************************************************

Player2IsDead:
	lbi 	2,0 							; see if Player 1 is dead.
	skmbz 	0 
	jmp 	Reset 							; if so, then reset the game.

; **********************************************************************************************************
;
;											Run the game/init code.
;
; **********************************************************************************************************

RunGameCode:
	jsrp 	CommonNewTurn 					; clear the screen etc.
	lbi 	GameID 							; point to GameID
	clra
	aisc 	7 								; set up JQID.
	jid 									; jump.

; **********************************************************************************************************
;
;												Game Vectors
;
; **********************************************************************************************************

VectorBase:
	jmp 	Football						; game 0 (game under development - no hologram on emulator)
	jmp 	Asteroids						; game 1 (Asteroids)
	jmp 	SpaceInvaders					; game 2 (Space Invaders)
	jmp 	Outlaw							; game 3 (Outlaw)
	jmp 	RoadRunner						; game 4 (Road Runner)
	jmp 	Destroyer						; game 5 (Destroyer)
	jmp 	Superman 						; game 6 (Superman)
	jmp 	Football						; game 7 (Football)
	jmp 	Basketball						; game 8 (Basketball)

; **********************************************************************************************************
;
;											PC LSB values for JQID
;
; **********************************************************************************************************

	page 	1
	offset 	48
	byte 	VectorBase+0 &255 				; JQID Jump Table
	byte 	VectorBase+2 &255
	byte 	VectorBase+4 &255
	byte 	VectorBase+6 &255
	byte 	VectorBase+8 &255
	byte 	VectorBase+10 &255
	byte 	VectorBase+12 &255
	byte 	VectorBase+14 &255
	byte 	VectorBase+16 &255

; **********************************************************************************************************
;
;									Initialisation done in every game
;
; **********************************************************************************************************

FN__CommonInitialise:
	lbi 	2,LeftDigit 					; reset score.
	stii 	0
	stii 	0
	lbi 	2,Lives 						; reset lives
	stii 	2								; 2 is 3 because it fails when lives was 0.
	ret
