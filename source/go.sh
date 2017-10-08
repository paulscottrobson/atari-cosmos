cd ../emulator
make
cd ../source
python ../assembler/copasm.py variables.asm main.asm system.asm && tail -n 20 rom.lst && ../emulator/cosmos ./rom.bin 
