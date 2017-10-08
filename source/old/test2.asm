
	clra
loop:
	jsrp 	Repaint
	jp 		loop


	page 	2
Repaint:
	jmp    	__Repaint

	page 	28
	byte 	$00 							; x bit patterns, from not displayed (0) 1-7
	byte 	$40
	byte 	$20
	byte 	$10
	byte 	$08
	byte 	$04
	byte 	$02
	byte 	$01

	byte 	$01 							; y bit patterns rows 0-5 of LEDs (8-13) Left (14) Right (15)
	byte 	$02
	byte 	$04
	byte 	$08
	byte 	$10
	byte 	$20
	byte 	$40
	byte 	$80

TempX = 2,0

__Repaint:
	lbi 	1,12
;
;		Have just done Y. Delay for brightness, advance pointer and output next X.
;
DoneY:
	it 										; short delay.
	nop	
	skt

	ld 		0 								; decrement B and skip on underflow.
	xds 	1
	jp 		DoX  							; not underflowed B, exit.
	ret 									; underflowed B exit.

DoX:
	clra 									; read value currently referenced into Q.
	lqid 
	skmbz	3								; if bit 3 is clear, then we have just done X.
	jp 		DoneY 							; bit 3 set, just done Y, so go back 

	ld 		1 								; set the mandatory bit 3 on the Y half.
	smb 	3								

	cba 									; save B
	xad		TempX
	lbi 	2,1
	cqma 									; get LQID value back
	omg 									; write to G:D
	cab 								
	obd 
	lbi 	TempX 
	ld 		3
	cab 
	jmp 	DoX
	halt


	page
	byte 	$3F 							; 0 		These are the values written to G/D when a 7 segment 
	byte 	$06 							; 1 		display LED is switched on.
	byte 	$5B
	byte 	$4F
	byte 	$66
