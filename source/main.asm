	clra
	lei 	2
	jsr 	FN__ClearMemory 				; clear memory
	jsr 	FN__GetGameID 					; figure out which game we are playing.
;
;	Selection phase. Allows changing of #Players and Skill Level, and game starting.
;
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
	jsr 	SELSkipCtrlKey
	jp 		SELWaitKey

	skmbz 	KFB_START 						; if start pressed return
	jp 		Start
	skmbz 	KFB_PLAYERS 					; if player not pressed must be skill level aka speed.
	lbi 	PlayerCount 					; if pressed player#
	lbi 	GameSpeed						; lbi fall-through.

	clra  									; toggle bit zero of the selected control nibble.
	aisc 	1
	xor
	x 		0
	jp 		SELLoop 						; loop back.
;
;	Update Screen / Check control keys ; RETSK if a key is pressed.
;
SELSkipCtrlKey:
	jsr 	FN__Repaint 					; wait for keyboard to be released.
	jsr 	FN__ScanKeyboard
	lbi 	KeysControl 					; B = control keys
	clra 									; A = 0
	ske 									; skip if equal e.g. no key pressed
	retsk 									; skip on press
	ret

Start:

game_init:
	lbi 	0,8
	stii 	2

game_code:
	lbi 	0,8
	ld 		0
	aisc 	1
	x 		0
	rmb 	3
	ld 		1
	aisc 	7
	x 		0
	lbi 	2,13
	ld 		0
	aisc 	3
	nop
	x 		0

repaint:
	jsr 	FN__Update
	jmp 	game_code

;	Fixup Assembler to handle FN__ and report bad JMP types as warnings.
; 	Fixup emulator to always load ROM.BIN and use the parameter as an ID.
; 	Hologram $00 is never loaded.

