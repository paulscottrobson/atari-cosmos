cd ../emulator
make
cd ../source
python ../assembler/copasm.py 
# tail -n 35 rom.lst 
cp rom.ts ../javascript/src/generated
../emulator/cosmos 1
