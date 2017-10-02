# *************************************************************************************************************
# *************************************************************************************************************
#
#											Image -> LED Backed Hologram 
#
# *************************************************************************************************************
# *************************************************************************************************************

from PIL import Image,ImageDraw,ImageChops
import math

class Hologram:
	def __init__(self,imageFile,targetFile):
		self.baseImage = Image.open(imageFile)
		self.cellSize = 32
		self.scaleImage = self.baseImage.resize((self.cellSize*7,self.cellSize*6),Image.BICUBIC)

		self.LED = Image.new("RGBA",(self.cellSize,self.cellSize),(0,0,0,0))
		draw = ImageDraw.Draw(self.LED)
		for x in range(0,self.cellSize):
			for y in range(0,self.cellSize):
				xd = x - self.cellSize/2
				yd = y - self.cellSize/2
				dist = int(355-255*math.sqrt(xd*xd+yd*yd) / (self.cellSize/2))
				dist = max(dist,0)
				dist = min(dist,255)
				self.LED.putpixel((x,y),0xFF000000+dist)

		self.lit = Image.new("RGBA",(self.cellSize*7,self.cellSize*6),(0,0,0,0))
		for x in range(0,7):
			for y in range(0,6):
				self.lit.paste(self.LED,(x*self.cellSize,y*self.cellSize))

		pLit = self.lit.load()
		pScale = self.scaleImage.load()
		for x in range(0,self.cellSize*7):
			for y in range(0,self.cellSize*6):
				image = pScale[x,y]

				if image[3] > 16	:
					solid = (min(255,int(image[0]*1.5)),image[1],image[2],255)
					sc = 0.4
					dark = (int(image[0]*sc),int(image[1]*sc),int(image[2]*sc),255)
					pLit[x,y] = solid
					pScale[x,y] = dark
				else:
					pScale[x,y] = (0,0,0,255)

		#self.scaleImage.putalpha(int(self.alphaPercent() * 255 / 100))
		self.result = Image.new("RGBA",(self.cellSize*7,self.cellSize*12),(0,0,0,0))
		self.result.paste(self.lit,(0,0))
		self.result.paste(self.scaleImage,(0,self.cellSize*6))
		self.result.save(targetFile,optimize=True,quality=75,bits=8)
		#self.result.show()






h = Hologram("test1.png","hologram1.png")
h = Hologram("test2.png","hologram2.png")

