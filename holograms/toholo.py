# *************************************************************************************************************
# *************************************************************************************************************
#
#											Image -> LED Backed Hologram 
#
# *************************************************************************************************************
# *************************************************************************************************************

from PIL import Image,ImageDraw,ImageChops
import math,random

class Hologram:
	def __init__(self,imageFile,targetFile):
		self.baseImage = Image.open(imageFile)
		self.cellSize = 32
		self.scaleImage = self.baseImage.resize((self.cellSize*7,self.cellSize*6),Image.BICUBIC)
		self.litImage = self.scaleImage.copy()

		pDraw = self.litImage.load()
		pImage = self.scaleImage.load()
		for xc in range(0,7):
			for yc in range(0,6):
				x1 = xc * self.cellSize
				y1 = yc * self.cellSize
				for x in range(0,self.cellSize):
					for y in range(0,self.cellSize):
						xd = x - self.cellSize/2
						yd = y - self.cellSize/2
						dist = math.sqrt(xd*xd+yd*yd) / (self.cellSize/2)
						red = min(255,305-dist*200)
						pix = pDraw[x+x1,y+y1]
						if pix[3] > 80:
							if dist < 1:
								pDraw[x+x1,y+y1] = (max(red,pix[0]),int(pix[1]/1.5),int(pix[2]/1.5),255)
						else:
							pDraw[x1+x,y1+y] = (0,0,0,255)
							if dist < 1:
								pDraw[x1+x,y1+y] = (red,0,0,255)	
						pix2 = pImage[x+x1,y+y1]
						if pix2[3] < 80:
							pImage[x+x1,y+y1] = (0,0,0,255)

#				#self.LED.putpixel((x,y),0xFF000000+dist)
#
#		self.lit = Image.new("RGBA",(self.cellSize*7,self.cellSize*6),(0,0,0,0))
#		for x in range(0,7):
#			for y in range(0,6):
#				self.lit.paste(self.LED,(x*self.cellSize,y*self.cellSize))
#
#		self.comp = Image.alpha_composite(self.scaleImage,self.lit)
#
#		pComp = self.comp.load()
#		pScale = self.scaleImage.load()
#		for x in range(0,self.cellSize*7):
#			for y in range(0,self.cellSize*6):
#				image = pScale[x,y]
#				if image[3] < 13:
#					pScale[x,y] = (0,0,0,255)
#				image = pComp[x,y]

		self.result = Image.new("RGBA",(self.cellSize*7,self.cellSize*12),(0,0,0,0))
		self.result.paste(self.litImage,(0,0))
		self.result.paste(self.scaleImage,(0,self.cellSize*6))
		self.result.save(targetFile,optimize=True,quality=75,bits=8)
		#self.result.show()

class Combiner:
	def __init__(self,h1,h2,tgt):
		i1 = Image.open(h1)
		i2 = Image.open(h2)
		comb = Image.new("RGBA",(i1.size[0]*2,i1.size[1]),(0,0,0,0))
		comb.paste(i1,(0,0))		
		comb.paste(i2,(i1.size[0],0))		
		comb.save(tgt)





h = Hologram("other/test0.png","game00_1.png")
h = Hologram("other/test0.png","game00_2.png")
c = Combiner("game00_1.png","game00_2.png","comb00.png")
#h = Hologram("test1.png","game03_1.png")
#h = Hologram("test2.png","game03_2.png")
#c = Combiner("game03_1.png","game03_2.png","comb03.png")

h = Hologram("1/src01_1.png","game01_1.png")
h = Hologram("1/src01_2.png","game01_2.png")
c = Combiner("game01_1.png","game01_2.png","comb01.png")
