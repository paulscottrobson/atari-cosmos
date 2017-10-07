;
;		Page 0 and 1 is graphic data
;
HoloDisplay = 0,15 							; 0 display hologram 1, #0 display hologram 2
RPWork1 = 1,15 								; repaint temp, getgameID temp
;
;		Page 2 is application state, though the digit data is normally at 2,13 and 2,14
;
LeftDigit = 2,13 							; by convention, left and right digit addresses.
RightDigit = 2,14
;
;		Page 3 is commonly used memory - timers, I/O etc.
;
RowTemp = 3,5 								; repaint temp, getgameID temp
GameTimer = 3,6 							; Game timer (counts number of displays + keyboard scans)
GameSpeed = 3,7 							; Speed (0 = Slow, 1 = Fast)
PlayerCount = 3,8 							; No of Players (0 = 1 Player,1 = 2 Players)
GameID = 3,9 								; Game number
KeyboardBase = 3,10 						; 2,0 direction 2,1 control 2,2 fire 2,3 not used 2,4 workspace
;
;		Keyboard information.
;
KeysDirection = KeyboardBase 				; ram addresses holding keys.
KeysControl = KeyboardBase+1
KeysFire = KeyboardBase+2

KFB_UP = 0									; bits for individual keys
KFB_RIGHT = 1
KFB_DOWN = 2
KFB_LEFT = 3
KFB_START = 0
KFB_SKILL = 1
KFB_PLAYERS = 2
KFB_FIRE = 0
;
;		Game running speed.
;
FastSpeed = 13 						 		; the number of iterations of the repaint / scan keyboard loop
SlowSpeed = 10 								; per move in the game.

	clra

	jsr 	FN__ClearMemory
	jsr 	FN__GetGameID

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
t1:	jsr 	FN__SwapPlayerData
	jp 		t1
	jp 		game_code

