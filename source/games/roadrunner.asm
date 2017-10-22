; **********************************************************************************************************
; **********************************************************************************************************
;
;												Road Runner
;
;											  All in one page !
;	
; **********************************************************************************************************
; **********************************************************************************************************

	page

RRLastObject = 10												; Road Objects are 0-10.
RRLastKillObject = 6											; Fatal Objects are 0-6 these flash.

RoadRunner:
	jsrp 	ClearScreen 										; Get rid of everything
	lbi 	0,Player 											; Player on far right central
	stii 	7
	lbi 	1,Player
	stii 	8+2
;
;	Main loop
;	
RRMainLoop:
	jsrp 	Update												; Update display
	jsrp 	MoveVPlayer 										; Player moves vertically
	nop
;
;	Make all the objects flash. Swap with page 2.
;
RRSwapOver:
	lbi 	0,RRLastKillObject
RRSwapLoop:
	ld 		2
	x 		2
	xds 	0
	jp 		RRSwapLoop	

	lbi		Timer4												; Check timer
	clra
	ske
	jp 		RRMainLoop
	jp 		RRMoveAll
	jp 		RRMainLoop
;
;	Work through all the objects
;
RRMoveAll:
	lbi 	0,RRLastObject
RRMoveObjects:
	ld 		2 													; Get X and switch to 2
	add 														; Add it. At least one of these is zero.
	aisc 	15 													; Skips if non-zero, e.g. in use.
	jp 		RRCreateObject

	ld 		0 													; Read 2.obj. ID which as X.
	aisc 	15 													; Skip if this is non-zero.
	ld 		2 													; Switch to 0.x which must be non-zero.

	ld 		0 													; Read and bump X, it cannot overflow
	aisc 	1 								
	x 		0 
	clra 														; A = 0
	skmbz 	3 													; skip if bit 3 is clear, not reached edge.
	x 		0 													; Kills it.

	clra 														; Back to page 2.
	aisc 	2
	xabr

RRNext:
	ld 		0 													; Fetch obj.2
	xds 	2 													; Loop back, switching back to page 0
	jp 		RRMoveObjects

	lbi 	0,Player 											; Check for collision
	jsrp 	CheckCollision
	jmp 	RRMainLoop
	aisc 	15-RRLastKillObject  								; If 0,1,2 are fatals, this is 13, 0,1,2 don't skip.
	jmp 	ShowHolo2LifeLost 									; show holo 2, life lost (can save a byte here if needed)	
	jsrp 	BumpCounter
	jsrp 	SFXHighShortBeep
	jp 		RRMainLoop 											; and loop round again

;
;	Object not in use.
;
RRCreateObject:
	jsr 	Random 												; Get random value
	aisc 	6 													; Will skip with value 0-5 if creating this time
	jp 		RRNext
;
;	Create new object B = 2,X, A = Y position.
;
	x 		2 													; Save Y in 2.obj, go to 0.obj
	clra  					
	aisc 	1
	x 		2 													; Set 0.obj to 1, switch back to 2.obj
	clra 			
	x 		3													; Clear that, switch to 1.obj and retrieve Y
	x 		3 													; Save in obj.1 and switch back to page 2
	jp 		RRNext
