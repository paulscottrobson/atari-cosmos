cd ../emulator
make
cd ../source
python ../assembler/copasm.py test.asm system.asm && tail -n 20 rom.lst && ../emulator/cosmos ./rom.bin 
