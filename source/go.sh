cd ../emulator
make
cd ../source
python ../assembler/copasm.py test.asm && tail -n 20 rom.lst && ../emulator/cosmos ./rom.bin 
