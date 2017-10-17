cd ../emulator
make
cd ../source
python ../assembler/copasm.py 
tail -n 5 rom.lst 
cp rom.ts ../javascript/src/generated
../emulator/cosmos 3
