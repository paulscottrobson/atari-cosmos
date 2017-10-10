	page 	16

demogame:
	skc 
	jp 		game_code	
game_init:
	lbi 	0,8
	stii 	2
	ret

game_code:
	lbi 	0,8
	ld 		0
	aisc 	1
	x 		0
	rmb 	3
	jsrp 	BumpCounter
	
repaint:
	jsrp 	Update

	lbi 	KeysFire
	skmbz 	0
	jmp 	TurnOver
	jp 		game_code
