; **********************************************************************************************************
; **********************************************************************************************************
;
;												Variables (Global)
;
; **********************************************************************************************************
; **********************************************************************************************************
;
;		Page 0 and 1 is graphic data
;
HoloDisplay = 0,15 							; 0 display hologram 1, #0 display hologram 2
RPWork1 = 1,15 								; repaint temp, getgameID temp (must be in page 1 !)
;
;		Page 2 is application state, though the digit data is normally at 2,13 and 2,14
;
InfoBits = 0 								; bit 0 is set if player dies. bit 3 is set for player 1 only.
PlayerMissile = 11
Player = 12 								; by convention, player.
LeftDigit = 13 								; by convention, left and right digit addresses.
RightDigit = 14
Lives = 15 									; number of lives left.
;
;		Page 3 is common used memory - timer, I/O etc that belong to both players.
;
Timer4 = 3,0 								; divide by four timer. Counts by 4 each update
											; Timer4+1 used in delay

Random1 = 3,5 								; Random values
Random2 = Random1+1

GameSpeed = 3,7 							; Speed (0 = Slow, 1 = Fast)
PlayerCount = 3,8 							; No of Players (0 = 1 Player,1 = 2 Players) (3,8)
GameID = 3,9 								; Game number
KeyboardBase = 3,10 						; 3,10 dir 3,11 control 3,12 fire 3,13 not used 3,14 workspace
RowTemp = 3,14 								; repaint temp, getgameID temp
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
KFB_PLAYERS = 2
KFB_SKILL = 1
KFB_FIRE = 0
