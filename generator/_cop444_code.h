static BYTE8 A,B,C,D,G,EN,Q,TOV,temp8;
static WORD16 PC,SA,SB,SC,TIMER;
static BYTE8 RAM[128];
static BYTE8 ROM[2048];
#define AM()   ((A << 4) | RAM[B])
#define SKIP()  { temp8 = FETCH(); if (IS2BYTE(temp8)) PC = (PC+1) & 0x7FF; }
#define LBISKIP()  { while (isLBIOpcode() != 0) { SKIP(); } }
#define IS2BYTE(n) ( ((n) >= 0x60 && (n) <= 0x6F)|| (n) == 0x23 || (n) == 0x33)
static void ResetCop444() {
 PC = 0;A = B = C = D = EN = G = 0;
 SA = SB = SC = 0;
}
static BYTE8 isLBIOpcode() {
 BYTE8 opcode = ROM[PC];
 if ((opcode & 0xC8) == 0x08) return -1;
 if (opcode != 0x33) return 0;
 opcode = ROM[(PC+1) & 0x7FF];
 return (opcode & 0x80) != 0;
}