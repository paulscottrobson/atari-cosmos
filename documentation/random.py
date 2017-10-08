#
#	Random Numbers
#

#
#	LFSR 8 bit borrowed from http://doitwireless.com/2014/06/26/8-bit-pseudo-random-number-generator/
#
class IQRFRandom:
	def __init__(self):
		self.seed = 0;

	def next(self):
		carry = self.seed & 1;
		self.seed = self.seed >> 1;
		if carry == 0:
			self.seed = self.seed ^ 0xB8
		return self.seed

# 1011 1000

# 0001 1101

#
#	Bit reversed version because COP has no shift right facility.
#
class COPRandom(IQRFRandom):

	def next(self):
		self.seed = self.seed << 1
		if self.seed <= 0xFF:
			self.seed = self.seed ^ 0x1D
		self.seed = self.seed & 0xFF
		return self.seed

class Test:
	def run(self,rSource):
		self.numbers = {}
		self.sequence = []
		count = 0
		n = rSource.next()
		while n not in self.numbers:
			count += 1
			self.numbers[n] = n 
			self.sequence.append(n)
			n = rSource.next()
		print(count)
		print([x & 15 for x in self.sequence])

s1 = IQRFRandom()
s2 = COPRandom()

tester = Test()

tester.run(s1)
tester.run(s2)
