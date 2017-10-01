//
//	Test code.
//
	clra
	lbi 0,2
	stii 36 & $F
	lbi 0,2
	cqma
	lbi 7,9
	obd
	ogi 5
	page
	byte $2A
	page 11
wait
	jp wait
