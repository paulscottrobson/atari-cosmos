HoloDisplay = 0,15 							; 0 display hologram 1, #0 display hologram 2
RPWork1 = 1,15 								; repaint temp, getgameID temp
KeyboardBase = 2,0 							; 2,0 direction 2,1 control 2,2 fire 2,3 not used 2,4 workspace

GameTimer = 2,6 							; Game timer (counts number of displays + keyboard scans)
GameSpeed = 2,7 							; Speed (0 = Slow, 1 = Fast)
PlayerCount = 2,8 							; No of Players (0 = 1 Player,1 = 2 Players)

FastSpeed = 13 						 		; the number of iterations of the repaint / scan keyboard loop
SlowSpeed = 10 								; per move in the game.

GameID = 2,12 								; Game number
LeftDigit = 2,13
RightDigit = 2,14
RowTemp = 2,15 								; repaint temp, getgameID temp

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
	jp 		game_code

