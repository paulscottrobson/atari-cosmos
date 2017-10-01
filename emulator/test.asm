
	clra

	aisc	5 							; set current display value to %0101
	lbi 	0,14
save0:
	x 		0

loop:
	lbi 	0,15 						; B points vertical position.
	clra 								; A(M) now points to table
	aisc 	4 
	lqid 								; load into Q

	lbi 	0,14 						; point to value.	
	ld 		0							; read value.
	rmb 	3 							; clear bit 3 e.g. don't update G3.
	omg 								; output to G0-2
	x 		0 							; write value back.
	ld 		0 							; load it back.	
	cab 								; and to D
	obd 			

	cba 								; put in A
	comp 								; complement it
	xad 	0,14 						; write out to give checkerboard pattern.

	ldd 	0,15 						; point to vertical position.
	aisc 	1 							; bump
	nop
	xad 	0,15

	it 
	skt
	nop

	ldd 	0,15
	aisc 	8
	jp 		loop

	lbi 	0,15
	rmb 	3 							; force into range 0-7
	lbi 	1,15 						; B is counters.
nextcounter:
	ld 		0 							; read into A
	aisc 	1 							; bump, skip on overflow.
	jp 		save0
	xis 	0 							; write, inc, skip on overflow
	jp 		nextcounter

	ldd 	0,14
	aisc 	1
	nop
	xad 	0,14
	jp 		loop
	halt








	page
	byte 		$01
	byte 		$02
	byte 		$04
	byte 		$08
	byte 		$10
	byte 		$20
	byte 		$40
	byte 		$80

