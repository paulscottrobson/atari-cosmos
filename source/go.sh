cd ../emulator
make
cd ../source
python ../assembler/copasm.py  && tail -n 20 rom.lst && 
cp rom.ts ../javascript/src/generated
cp holograms/* ../javascript/assets/holograms
../emulator/cosmos 1
