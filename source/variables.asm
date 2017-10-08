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
InfoBits = 2,0 								; bit 0 is set if player dies. bit 3 is set for player 2 only.
LeftDigit = 2,13 							; by convention, left and right digit addresses.
RightDigit = 2,14
;
;		Page 3 is common used memory - timers, I/O etc that belong to both players.
;
Timer = 3,0 								; 7 timers which control speed. These are increment every update
											; and are timed out when bit 3 is set, but divide the update rate
											; by 5 (3,0) to 2 (3,4).

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