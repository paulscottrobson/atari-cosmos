cd ../emulator
make
cd ../source
python ../assembler/copasm.py variables.asm main.asm system.asm && tail -n 20 rom.lst && 
cp rom.ts ../javascript/src/generated
cp holograms/* ../javascript/assets/holograms
../emulator/cosmos 5
