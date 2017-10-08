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
	jsrp 	ClearMemory 					; clear memory
	jsrp 	GetGameID 						; figure out which game we are playing.
	aisc 	15 								; if zero, this is a a hack to miss out the 
	jp 		InitialiseGames 				; selector code automatically (for development)

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
	xad 	LeftDigit	
	ldd 	PlayerCount 					; get player count
	aisc 	1 								; make 0/1 1/2
	xad 	RightDigit

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
	jsr 	RunInitCode 					; run initialisation code
	jsrp 	SwapPlayerData  				; on both halves of memory.
	jsr 	RunInitCode 					; run initialisation code

	ldd 	PlayerCount 					; read the players
	lbi 	5,0 							; point to P2 information bits
	smb 	3 								; set bit 3, which identifies player 2.
	aisc 	15 								; will skip if 2 player game.
	smb 	0 								; kill player 2 as 1 player game.

; **********************************************************************************************************
;
;		Come here when the turn is over.  Swap Players over if the alternate players kill bit is clear.
;		If Alternate Playe is dead, check to see if Current Player is dead as well ; if so restart.
;
; **********************************************************************************************************

TurnOver:
	lbi 	5,0 							; current players kill bit.
	skmbz 	0 								; skipped if still alive.
	jmp 	Player2IsDead 
	jsrp 	SwapPlayerData 					; swap player data round.
	jmp 	RunGameCode 					; and run the game code

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
	lbi 	GameID 							; point to GameID
	smb 	3 								; set bit 3 so we can use offset 40.
	clra
	aisc 	6 								; set up JQID.
	jid 									; jump.

RunInitCode:
	jsrp 	ClearScreen 					; clear the screen
	lbi 	GameID 							; this is the same as RunSetupCode except it is called 
	smb 	3 								; with carry set, and you are supposed to return from it !
	clra
	aisc 	6
	sc
	jid

; **********************************************************************************************************
;
;										Come here for undefined games
;
; **********************************************************************************************************

Fail:
	halt

; **********************************************************************************************************
;
;										Clear Memory / Clear Screen
;
; **********************************************************************************************************

FN__ClearScreen:
	lbi 	1,15 							; just clear 0-1
FN__ClearMemory:
	lbi 	7,15 							; clear 0-7.
CMLoop:	
	clra 									; inner loop, clear page.
	xds 	0
	jp 		CMLoop
	xabr									; do previous page
	aisc 	15
	jp 		CMExit
	xabr
	jp 		CMLoop
;
CMExit:
	lbi 	1,13 							; set the Left/Right LED
	stii 	14
	stii 	15
	ret

; **********************************************************************************************************
;
;											PC LSB values for JQID
;
; **********************************************************************************************************

	page 	1
	offset 	40
	byte 	$70 							; JID indices.
	byte 	$72
	byte 	$74
	byte 	$76
	byte 	$78
	byte 	$7A
	byte 	$7C
	byte 	$7E

; **********************************************************************************************************
;
;												Game Vectors
;
; **********************************************************************************************************

	offset 	48  			
	jmp 	demogame 						; game 0 (game under development - no hologram on emulator)
	jmp 	Fail 							; game 1
	jmp 	Fail 							; game 2
	jmp 	Fail 							; game 3
	jmp 	Fail 							; game 4
	jmp 	demoGame 						; game 5
	jmp 	Fail 							; game 6
	jmp 	Fail 							; game 7