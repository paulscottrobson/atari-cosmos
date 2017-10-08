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

