	page 	16

demogame:
	skc 
	jp 		game_code	

	lbi 	0,2
	stii 	2
	stii	3
	stii 	4
	stii 	5
	stii 	6
	lbi 	1,3
	stii 	9
	lbi 	1,5
	stii 	10
	ret

game_code:
	jsrp 	Update
	jsrp 	MoveHPlayer
	nop
	jsrp 	MoveVPlayer
	nop

	jsrp 	CheckFire
	jsrp 	MovePlayerMissile
	jp 		game_code

	lbi 	0,PlayerMissile
	jsrp 	CheckCollision
	jp 		game_code

	jsrp 	Kill
	jsrp	KillPlayerMissile	
	jsrp 	BumpCounter
	jp 		game_code

	halt



