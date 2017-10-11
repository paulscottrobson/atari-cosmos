	page 	16

demogame:
	skc 
	jp 		game_code	
game_init:
	lbi 	0,8
	stii 	6
	lbi 	1,8
	stii 	8+4
	ret

game_code:
	jsrp 	Update
	jsrp 	BumpCounter
	lbi 	0,8
	jsrp 	MoveUp
	jmp 	game_code
	halt

