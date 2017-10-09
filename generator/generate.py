import re

def sub(s,opcode):
	s = s.replace("@A","{0:02x}".format(opcode & 0x7F))
	s = s.replace("@N","{0:01x}".format(opcode & 0x0F))
	s = s.replace("@R","{0:01x}".format((opcode >> 4) & 3))
	s = s.replace("@D","{0:01x}".format((opcode >> 4) & 7))
	s = s.replace("@T","{0:01x}".format((opcode + 1) & 0x0F))
	s = s.replace("@S","{0:03x}".format((opcode & 0x3F)+0x80))
	s = s.replace("@J","{0:03x}".format((opcode & 0x3F)+0))
	s = s.replace("@L","{0:01x}".format((opcode & 0x7)+0))
	return s 

def jsProcess(s):
	l = [ "TIMER","TOV","PC", "EN","SA","SB","SC", "G","Q","D","C","B","A","temp8"]
	s = s.replace("break;","")
	s = s.replace("cycles","this.cycles")
	s = s.replace("AM()","((A<<4)|RAM[B])")
	s = s.replace("RAM[","this.ramMemory[")
	s = s.replace("ROM[","this.romMemory[")
	s = s.replace("FETCH()","this.fetch()")
	s = s.replace("LBISKIP()","this.lbiSkip()")
	s = s.replace("SKIP()","this.skip()")
	s = s.replace("INREAD(","this.hardware.readin(")
	s = s.replace("LREAD(","this.hardware.readl(")
	s = s.replace("UPDATED(","this.hardware.updated(")
	s = s.replace("UPDATEG(","this.hardware.updateg(")
	s = s.replace("UPDATEEN(","this.hardware.updateen(")
	s = s.replace("UPDATEQ(","this.hardware.updateq(")
	s = s.replace("SIOWRITE(","this.hardware.siowrite(")
	for r in l:
		s = s.replace(r,"this."+r.lower())
	return s

src = open("cop444.def").readlines()
src = [x if x.find("//") < 0 else x[:x.find("//")] for x in src]
src = [x.replace("\t"," ").strip() for x in src if x.strip() != ""]

open("_cop444_code.h","w").write("\n".join([x[1:] for x in src if x[0] == ':']))
src = [x for x in src if x[0] != ':']

mnemonics = [ "??" ] * 768
code = [ None] * 768

src = "\n".join(src).replace("\\\n","").split("\n")

for l in src:
	m = re.match("^([0-9A-F\,\-]+)\s*([A-Z0-3\.\@\,]+)\s*(.+)$",l)
	assert m is not None,l+" failed."
	r = m.group(1)
	step = 1
	if r[-3:] == ',16':
		step = 16
		r = r[:-3]
	if r.find("-") < 0:
		r = r + "-" + r
	r = [int(x,16) for x in r.split("-")]
	first = r[0]
	last = r[1]
	#print(m.group(1),first,last,step)

	opcode = first
	while opcode <= last:
		assert code[opcode] is None,"Opcode {0:x} duplicated {1} ".format(opcode,mnemonics[opcode])
		mnemonics[opcode] = sub(m.group(2),opcode).replace("."," ").lower()
		code[opcode] = sub(m.group(3),opcode)+";break;".replace(";;",";")
		opcode += step 

open("_cop444_mnemonics.h","w").write("static const char * __mnemonics[] = { "+",".join(['"'+x+'"' for x in mnemonics])+"};\n")

h = open("_cop444_instructions.h","w")
for opcode in range(0,768):
	if code[opcode] is None:
		mnemonics[opcode] = "(unknown)";
		code[opcode] = "break;"
	op2 = (opcode & 0xFF)
	if opcode >= 0x100:
		op2 = op2 + int(opcode/256)*0x1000+0x1300
	name = "[{1:x}] {0}".format(mnemonics[opcode],op2)
	h.write("case 0x{0:03x}: /** {1} **/\n".format(opcode,name))
	h.write("    "+code[opcode]+"\n")
h.close()		

funcList = ",".join([ "this.opcode_{0:03x}".format(x) for x in range(0,768) ])
h = open("cop444generated.ts","w")
h.write('/// <reference path="../../lib/phaser.comments.d.ts"/>\n')
h.write('/// <reference path="../cpu/cop444base.ts"/>\n\n')

h.write("abstract class COP444Opcodes extends COP444Base {\n\n")
h.write("	getOpcodeFunctionTable(): Function[] {\n")
h.write("		return [\n")
h.write("			"+funcList+"\n")
h.write("		];\n 	}\n")

for opcode in range(0,768):
	body = jsProcess(code[opcode])
	h.write("	opcode_{0:03x}():void {{ {1} }};\n".format(opcode,body))	
h.write("}\n");
h.close()