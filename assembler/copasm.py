# *************************************************************************************************************
# *************************************************************************************************************
#
#											COP 444 Assembler
#
# *************************************************************************************************************
# *************************************************************************************************************

import sys,os,re 

if sys.version_info < (3,):
    def b(x):
        return x
else:
    import codecs
    def b(x):
        return codecs.latin_1_encode(x)[0]

# *************************************************************************************************************
#
#													Error classes
#
# *************************************************************************************************************

class AssemblerException(Exception):
	def __init__(self,error):
		self.errorMessage = error
	def getMessage(self):
		return self.errorMessage

# *************************************************************************************************************
#
#											Expression Evaluation Class
#
#	Terms: Identifier, $<hex>, %<binary> and decimal
#	Operators : + - * / & | ^ , and unary minus.  Comma operator : a,b is a*16+b used for 2 parameter memory
#				address - you can write $7F or 7,15
# *************************************************************************************************************
		
class Evaluator:
	def evaluate(self,expression,identifiers = {}):
		expression = expression.strip().replace("\t","").replace(" ","").upper()
		pending = None
		term = None
		# Do the whole expression
		while expression != "":
			# Check for leading -
			sign = 1
			if expression[0] == '-':
				expression = expression[1:]
				sign = -1
			# Check decimal, hexadecimal, binary and identifier
			m = re.match("^([0-9]+)(.*)$",expression)
			if m is None:
				m = re.match("^(\$[0-9A-F]+)(.*)$",expression)
			if m is None:
				m = re.match("^(\%[0-1]+)(.*)$",expression)
			if m is None:
				m = re.match("^([A-Z\_][A-Z0-9\_]*)(.*)$",expression)
			# nothing matches
			if m is None:
				raise AssemblerException("Bad term '"+expression+"'")
			# evalute the new term, using the sign.
			newTerm = self.evaluateTerm(m.group(1),identifiers) * sign
			# do any pending arithmetic
			term = self.calculate(term,newTerm,pending)
			# rest of expression (l to r only)
			expression = m.group(2)
			pending = None
			# if something left it must be an operator.
			if expression != "":
				pending = expression[0]
				expression = expression[1:]
		# Finished, but math still pending.
		if pending is not None:
			raise AssemblerException("Incomplete expression")
		return term 

	def evaluateTerm(self,term,identifiers):
		if re.match("^[0-9]+$",term):
			return int(term,10)
		if term[0] == '$':
			return int(term[1:],16)
		if term[0] == '%':
			return int(term[1:],2)
		if term not in identifiers:
			raise AssemblerException("Unknown label '"+term+"'")
		return identifiers[term]

	def calculate(self,term1,term2,operator):

		if operator is None:
			return term2
		if operator == '+':
			return term1+term2
		if operator == '-':
			return term1-term2
		if operator == '*':
			return term1*term2
		if operator == '/':
			if term2 == 0:
				raise AssemblerException("Division by zero")
			return int(term1/term2)
		if operator == '&':
			return term1&term2
		if operator == '|':
			return term1|term2
		if operator == '^':
			return term1^term2
		if operator == ',':
			if term1 < 0 or term1 > 7 or term2 < 0 or term2 > 15:
				raise AssemblerException(", operator must be 0,0 to 7,15")
			return term1*16+term2
		raise AssemblerException("Unknown operator '"+operator+"'")

# *************************************************************************************************************
#
#												ROM Memory Class
#
# *************************************************************************************************************

class ROMMemory:
	def __init__(self,listStream = None):
		self.memory = [ None ] * 2048
		self.listStream = listStream
		self.pointer = 0
		self.listing = {}

	def getPointer(self):
		return self.pointer

	def setPointer(self,address):
		if address < 0 or address > 2048:
			raise AssemblerException("Bad origin address")
		self.pointer = address

	def findPage2Address(self):
		addr = 0xBE
		while self.memory[addr] is not None or self.memory[addr+1] is not None:
			addr = addr - 1
			if addr < 0x80:
				return None
		return addr

	def write(self,instr,line = ""):
		if self.listStream is not None:
			line = "{0:03x} : {1:4x}       {2}".format(self.pointer,instr,line).strip()
			self.listing["{0:05x}".format(self.pointer)] = line
		if instr >= 0x100:
			self._writeByte(instr >> 8)
		self._writeByte(instr & 0xFF)

	def _writeByte(self,byte):
		if self.pointer == 0 and byte != 0:
			raise AssemblerException("Instruction at $000 must be CLRA ($00)")
		if self.pointer >= 2048:
			raise AssemblerException("Reached end of ROM Memory")
		if byte < 0 or byte >= 256:
			raise AssemblerException("Byte out of range")
		if self.memory[self.pointer] is not None:
			raise AssemblerException("Overwriting previous code {0:x}".format(self.pointer))
		self.memory[self.pointer] = byte;
		self.pointer += 1

	def writeBinary(self,name):
		print("Writing to binary "+name)
		used = [x for x in self.memory if x is not None]
		print("Used {0} bytes of ROM ({1}%)".format(len(used),len(used)*100/2048))
		romNum = [0 if x is None else x for x in self.memory]
		rom = "".join(chr(x) for x in romNum)
		open(name,"wb").write(b(rom))
		if self.listStream is not None:
			k = [x for x in self.listing.keys()]			
			k.sort()
			for item in k:
				self.listStream.write(self.listing[item]+"\n")
		h = open(name.replace(".bin",".ts"),"w")
		h.write("class ROMImage {\n")
		h.write("public static rom:number[] = [\n")
		h.write(",".join([str(x) for x in romNum])+"\n")
		h.write("];\n}\n")
		h.close()

# *************************************************************************************************************
#
#											Instruction Information Class
#
# *************************************************************************************************************

class OpcodeDictionary:
	def __init__(self):
		# if needed, convert the raw data to a lookup structure.
		if OpcodeDictionary.lookup is None:
			OpcodeDictionary.lookup = {}
			defn = OpcodeDictionary.definition.replace("\t","").replace(" ","").upper().split("\n")
			defn = [x for x in defn if x != "" and x[0] != '#']
			defn = [x for x in "".join(defn).split("[") if x != ""]
			for defPart in defn:
				iType = int(defPart[0])
				for instr in [x for x in defPart[2:].split("/") if x != ""]:
					iParts = instr.split(":")
					newInstr = { "name":iParts[0],"base":int(iParts[1],16),"type":iType }
					assert iParts[0] not in OpcodeDictionary.lookup
					OpcodeDictionary.lookup[iParts[0]] = newInstr

	# get information about a text opcode					
	def get(self,opcode):
		opcode = opcode.strip().upper()
		return OpcodeDictionary.lookup[opcode] if opcode in OpcodeDictionary.lookup else None
				
	# check if text opcode has operand
	def hasOperand(self,opcode):
		typeID = self.get(opcode)["type"]
		return typeID != 1

	# check if text opcode is jump or subroutine call, if so resolution is delayed.
	def isJumpInstruction(self,opcode):
		opcode = opcode.strip().upper()
		return opcode == "JMP" or opcode == "JSR" or opcode == "JSRP" or opcode == "JP"

	# parameter range check.
	def checkRange(self,operand,min,max):
		if operand < min or operand > max:
			raise AssemblerException("Operand must be in range {0:x} to {1:x}".format(min,max))

	# given an opcode base,type, target address and operand build opcode word or byte. Numbers relate
	# to square bracketed numbers in text definition below.
	def buildOpcode(self,addr,opcodeBase,opcodeType,operand = -1):
		if opcodeType == 1:							# no operand
			return opInfo.base 
		if opcodeType == 2: 						# lowest 4 bits
			self.checkRange(operand,0,15)
			if opcodeBase == 0x50 and operand == 0:	# AISC 0 generates NOP
				return 0x44
			else:
				return opcodeBase + operand
		if opcodeType == 3:							# 10 bit rom address 
			self.checkRange(operand,0,2047)
			return opcodeBase + operand
		if opcodeType == 4: 						# single 2 bit operand in bits 2,3
			self.checkRange(operand,0,3)
			return opcodeBase + operand * 16
		if opcodeType == 5:							# SMB/RMB
			self.checkRange(operand,0,3)
			if opcodeBase == OpcodeDictionary.SMB[0]:
				return OpcodeDictionary.SMB[operand]
			else:
				return OpcodeDictionary.RMB[operand]
		if opcodeType == 6:							# SKGBZ/SKMBZ
			self.checkRange(operand,0,3)
			return opcodeBase + OpcodeDictionary.SKXBZOffset[operand]
		if opcodeType == 7:							# LD/XAD access any byte in 4 bit RAM.
			self.checkRange(operand,0,127)
			return opcodeBase + operand

		# LBI has two forms. 0,9..15 can load in one byte for regfile 0-3, anything else in one word.
		if opcodeBase == 0x00:
			self.checkRange(operand,0,127)
			lowNibl = operand & 15
			if (lowNibl == 0 or lowNibl > 9) and (operand >> 4) < 4:
				return ((lowNibl-1) & 15) | 0x00 | (operand & 0x30)
			return 0x3380 | operand

		# JSRP outside pages 2 and 3,subroutine call into pages 2 & 3
		if opcodeBase == 0x80:
			if addr >= 0x80 and addr < 0xC0:
				raise AssemblerException("JSRP only available outside pages 2 and 3")
			self.checkRange(operand,0x080,0x0BF)
			return 0x80 + (operand & 0x3F)

		# JP must be same page except pages 2 + 3.
		if opcodeBase == 0xC0:
			if (operand & 0x3F) == 0x3F:
				raise AssemblerException("Cannot jump to last byte of page")
			if addr >= 0x80 and addr < 0x100:
				if operand < 0x80 or operand >= 0x100:
					raise AssemblerException("JP (Pages 2 or 3) to address not in pages 2 or 3")
				return 0x80 + (operand & 0x7F)
			else:
				if int(addr/64) != int(operand/64):
					raise AssemblerException("JP to different page")
				if operand%64 >= 62:
					raise AssemblerException("JP on page border")
				return 0xC0 + (operand & 0x3F)

		assert False,"Unknown type or general opcode"

OpcodeDictionary.SMB = [ 0x4C,0x45,0x42,0x43 ]				# offsets for SMB
OpcodeDictionary.RMB = [ 0x4D,0x47,0x46,0x4B ]				# offsets for RMB
OpcodeDictionary.SKXBZOffset = [ 0,16,2,18 ]				# offsets for SKGBZ/SKMBZ

OpcodeDictionary.lookup = None								# static object here

															# text definition of opcodes.
OpcodeDictionary.definition = """							
# Instructions with no operand.
[1] 	ASC:30/ADD:31/ADT:4A/CASC:10/CLRA:00/COMP:40/NOP:44/RC:32/SC:22/XOR:02/JID:FF/RET:48/RETSK:49/
		CAMQ:333C/CQMA:332C/LQID:BF/CAB:50/CBA:4E/XABR:12/SKC:20/SKE:21/SKGZ:3321/SKT:41/
		ING:332A/ININ:3328/INIL:3329/INL:332E/OBD:333E/OMG:333A/XAS:4F/HALT:3338/IT:3339/CAMT:333F/CTMA:332F
# Instructions with one operand stored in bits 4-7 from 0-15
[2]		AISC:50/STII:70/LEI:3360/OGI:3350
# Two byte instructions with a 10 bit operand
[3] 	JMP:6000/JSR:6800
# Single byte instruction with operand in bits 2 and 3 - all toggle Br after execution
[4] 	LD:05/X:06/XDS:07/XIS:04
# RMB/SMB Layout, one parameter specifiying the bit.
[5] 	RMB:4C/SMB:4D
# SKGBZ/SKMBZ Layout, one parameter specifiying the bit
[6] 	SKGBZ:3301/SKMBZ:01
# Direct access to memory nibble from 0-127.
[7] 	LDD:2300/XAD:2380
# Special Cases that fit no pattern at all. Note JP is 80-FF but C0 used here to identify it.
[0] 	JP:C0/JSRP:80/LBI:00
"""

# *************************************************************************************************************
#
#			This class is responsible for assembling a single instruction (not pseudo operations)
#
# *************************************************************************************************************

class AssemblerWorker:

	def __init__(self):
		self.evaluator = Evaluator();
		self.dictionary = OpcodeDictionary()

	def getEvaluator(self):
		return self.evaluator 
	def getDictionary(self):
		return self.dictionary 

	def assemble(self,instruction,identifiers,memory,line = ""):
		instruction = instruction.replace("\t"," ").strip().upper()
	
		if instruction[:4] == "BYTE":
			bValue = self.evaluator.evaluate(instruction[4:].strip(),identifiers)
			memory.write(bValue,line)
			return 

		if instruction[:6] == "OFFSET":
			offset = self.evaluator.evaluate(instruction[6:].strip(),identifiers)
			if offset < 0 or offset > 63:
				raise AssemblerException("Bad offset")
			memory.setPointer((memory.getPointer() & 0x7C0) + offset)
			return 

		if instruction[:4] == "PAGE":
			operand = instruction[4:].strip()
			if operand == "":
				pageNumber = int(memory.getPointer()/64)
				if memory.getPointer() % 64 > 0:
					pageNumber += 1
			else:
				pageNumber = self.evaluator.evaluate(operand,identifiers)
			memory.setPointer(pageNumber * 64)
			return

		if instruction.find(" ") < 0:
			self.assembleNoOperand(instruction,memory,line)
		else:
			self.assembleOperand(instruction,identifiers,memory,line)

	def assembleNoOperand(self,instruction,memory,line):
		info = self.dictionary.get(instruction)
		if info is None:
			raise AssemblerException("Unknown operation code '"+instruction+"'")
		if self.dictionary.hasOperand(instruction):
			raise AssemblerException("Operation code '"+instruction+"' does not have an operand")
		memory.write(info["base"],line)

	def assembleOperand(self,instruction,identifiers,memory,line):
		p = instruction.find(" ")
		opcode = instruction[:p].strip()
		operand = instruction[p:].strip()
		operand = self.evaluator.evaluate(operand,identifiers)
		info = self.dictionary.get(opcode)
		if info is None:
			raise AssemblerException("Unknown operation code '"+opcode+"'")
		command = self.dictionary.buildOpcode(memory.getPointer(),info["base"],info["type"],operand)
		memory.write(command,line)

# *************************************************************************************************************
#
#										Class does the actual assembly
#
# *************************************************************************************************************

class Assemble:
	def __init__(self,listStream = None):
		self.worker = AssemblerWorker()
		self.identifiers = { }				
		self.memory = ROMMemory(listStream)
		self.sourceFile = "testmode"

		self.patchList = []

	def assemble(self,lines):
		# preprocess
		lines = [x if x.find("//") < 0 else x[:x.find("//")] for x in lines]
		lines = [x if x.find(";") < 0 else x[:x.find(";")] for x in lines]
		lines = [x.replace("\t"," ").rstrip().upper() for x in lines]
		self.lineNumber = 1
		# for each line in the source
		for line in lines:
			self.lineText = "{0:04}: {1}".format(self.lineNumber,line)
			#print(">>>",self.lineNumber,line)
			try:
				# check for label
				if line != "" and line[0] != ' ':
						# split into label and rest of line
						p = (line+" ").find(" ")
						label = line[:p].strip()
						line = line[p:].strip()
						if label[-1] == ':':
							label = label[:-1]
						# no duplicates
						if label in self.identifiers:
							raise AssemblerException("Duplicate identifier "+label)
						# check for equate or pctr label
						if line != "" and line[0] == "=":
							self.identifiers[label] = self.worker.getEvaluator().evaluate(line[1:].strip(),self.identifiers)
							line = ""
						else:
							self.identifiers[label] = self.memory.getPointer()

				line = line.strip()

				# instruction to assemble
				if line != "":
					# get the opcode
					opcode = line[:(line+" ").find(" ")].strip()
					# if jump/call
					if self.worker.getDictionary().isJumpInstruction(opcode):
						# get information and byte size
						info = self.worker.getDictionary().get(opcode)
						size = 2 if info["base"] >= 0x100 else 1
						# add it to be assembled at the end when hopefully all labels are defined.
						self.patchList.append([self.memory.getPointer(),line,self.sourceFile,self.lineNumber,self.lineText])
						# allocate space for it
						self.memory.setPointer(self.memory.getPointer()+size)
					# normal instruction
					else:
						self.worker.assemble(line,self.identifiers,self.memory,self.lineText)

				self.lineNumber += 1
			except AssemblerException as aex:
				raise AssemblerException("'"+aex.getMessage()+"' line "+str(self.lineNumber))

	def patchTransfers(self):
		# for each patch
		for patch in self.patchList:
			# set so error messages will work correctly.
			self.sourceFile = patch[2]
			self.lineNumber = patch[3]
			# assemble deferred instruction
			self.memory.setPointer(patch[0])
			try:
				self.worker.assemble(patch[1],self.identifiers,self.memory,patch[4])
			except AssemblerException as aex:
				raise AssemblerException("'"+aex.getMessage()+"' line "+str(self.lineNumber)+" in "+self.sourceFile)				

		# erase patch list
		self.patchList = []

	def allocatePage2(self):
		idents = [x for x in self.identifiers.keys() if x[:4] == "FN__"]
		page3Pointer = 0xC0
		for id in idents:
			fnaddress = self.identifiers[id]
			address = self.memory.findPage2Address()
			if address is None:
				raise AssemblerException("Out of page 2 memory for FN__")

			if address < 0x92:
				self.memory.setPointer(address+1)
				self.memory._writeByte(page3Pointer) 	# e.g. jp to page 3
				self.memory.setPointer(page3Pointer) 	# put a jump in page 3
				self.memory._writeByte(0x60+int(fnaddress/256))
				self.memory._writeByte(fnaddress % 256)
				#print("{0} {1:x} {2:x}".format(id,fnaddress,address+1))
				self.identifiers[id[4:]] = address+1
				page3Pointer += 2


			else:
				self.memory.setPointer(address)
				self.memory._writeByte(0x60+int(fnaddress/256))
				self.memory._writeByte(fnaddress % 256)
				#print("{0} {1:x} {2:x}".format(id,fnaddress,address))
				self.identifiers[id[4:]] = address

	def assembleFile(self,name):
		try:
			print("Assembling "+name)
			src = open(name).readlines()
			self.assemble(src)
		except AssemblerException as aex:
			print("{0} in {1}".format(aex.getMessage(),name))

	def writeBinary(self,name):
		self.memory.writeBinary(name)

code = """
""".split("\n")[1:]

asm = Assemble(open("rom.lst","w"))
files = [x.strip() for x in open("asm.list").readlines() if x.strip() != "" and x[0] != ';']
try:
	for f in files:
		asm.assembleFile(f)
	asm.allocatePage2()
	asm.patchTransfers()
	asm.writeBinary("rom.bin")
except AssemblerException as aex:
	print(aex.getMessage())
	sys.exit(1)
sys.exit(0)
