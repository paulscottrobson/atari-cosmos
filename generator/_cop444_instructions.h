case 0x000: /** [0] clra **/
    A = 0;;break;
case 0x001: /** [1] skmbz 0 **/
    if ((RAM[B] & 1) == 0) SKIP();break;
case 0x002: /** [2] xor **/
    A = A ^ RAM[B];break;
case 0x003: /** [3] skmbz 2 **/
    if ((RAM[B] & 4) == 0) SKIP();break;
case 0x004: /** [4] xis 0 **/
    temp8 = RAM[B];RAM[B] = (A);A = temp8;B = B ^ (0 << 4); B = (B & 0x70) + ((B+1) & 0x0F); if ((B & 0x0F) == 0x00) SKIP();;break;
case 0x005: /** [5] ld 0 **/
    A = RAM[B];B = B ^ (0 << 4);break;
case 0x006: /** [6] x 0 **/
    temp8 = RAM[B];RAM[B] = (A);A = temp8;B = B ^ (0 << 4);break;
case 0x007: /** [7] xds 0 **/
    temp8 = RAM[B];RAM[B] = (A);A = temp8;B = B ^ (0 << 4); B = (B & 0x70) + ((B-1) & 0x0F); if ((B & 0x0F) == 0x0F) SKIP();;break;
case 0x008: /** [8] lbi 0,9 **/
    B = 0x09;LBISKIP();break;
case 0x009: /** [9] lbi 0,a **/
    B = 0x0a;LBISKIP();break;
case 0x00a: /** [a] lbi 0,b **/
    B = 0x0b;LBISKIP();break;
case 0x00b: /** [b] lbi 0,c **/
    B = 0x0c;LBISKIP();break;
case 0x00c: /** [c] lbi 0,d **/
    B = 0x0d;LBISKIP();break;
case 0x00d: /** [d] lbi 0,e **/
    B = 0x0e;LBISKIP();break;
case 0x00e: /** [e] lbi 0,f **/
    B = 0x0f;LBISKIP();break;
case 0x00f: /** [f] lbi 0,0 **/
    B = 0x00;LBISKIP();break;
case 0x010: /** [10] casc **/
    A = (A ^ 15) + RAM[B] + C;C = (A >> 4) & 1; A = A & 15; if (C != 0) SKIP();;break;
case 0x011: /** [11] skmbz 1 **/
    if ((RAM[B] & 2) == 0) SKIP();break;
case 0x012: /** [12] xabr **/
    temp8 = A & 7;A = (B >> 4) & 7;B = (B & 0x0F) + (temp8 << 4);;break;
case 0x013: /** [13] skmbz 3 **/
    if ((RAM[B] & 8) == 0) SKIP();break;
case 0x014: /** [14] xis 1 **/
    temp8 = RAM[B];RAM[B] = (A);A = temp8;B = B ^ (1 << 4); B = (B & 0x70) + ((B+1) & 0x0F); if ((B & 0x0F) == 0x00) SKIP();;break;
case 0x015: /** [15] ld 1 **/
    A = RAM[B];B = B ^ (1 << 4);break;
case 0x016: /** [16] x 1 **/
    temp8 = RAM[B];RAM[B] = (A);A = temp8;B = B ^ (1 << 4);break;
case 0x017: /** [17] xds 1 **/
    temp8 = RAM[B];RAM[B] = (A);A = temp8;B = B ^ (1 << 4); B = (B & 0x70) + ((B-1) & 0x0F); if ((B & 0x0F) == 0x0F) SKIP();;break;
case 0x018: /** [18] lbi 1,9 **/
    B = 0x19;LBISKIP();break;
case 0x019: /** [19] lbi 1,a **/
    B = 0x1a;LBISKIP();break;
case 0x01a: /** [1a] lbi 1,b **/
    B = 0x1b;LBISKIP();break;
case 0x01b: /** [1b] lbi 1,c **/
    B = 0x1c;LBISKIP();break;
case 0x01c: /** [1c] lbi 1,d **/
    B = 0x1d;LBISKIP();break;
case 0x01d: /** [1d] lbi 1,e **/
    B = 0x1e;LBISKIP();break;
case 0x01e: /** [1e] lbi 1,f **/
    B = 0x1f;LBISKIP();break;
case 0x01f: /** [1f] lbi 1,0 **/
    B = 0x10;LBISKIP();break;
case 0x020: /** [20] skc **/
    if (C != 0) SKIP();break;
case 0x021: /** [21] ske **/
    if (A == RAM[B]) SKIP();break;
case 0x022: /** [22] sc **/
    C = 1;break;
case 0x023: /** [23] (unknown) **/
    break;
case 0x024: /** [24] xis 2 **/
    temp8 = RAM[B];RAM[B] = (A);A = temp8;B = B ^ (2 << 4); B = (B & 0x70) + ((B+1) & 0x0F); if ((B & 0x0F) == 0x00) SKIP();;break;
case 0x025: /** [25] ld 2 **/
    A = RAM[B];B = B ^ (2 << 4);break;
case 0x026: /** [26] x 2 **/
    temp8 = RAM[B];RAM[B] = (A);A = temp8;B = B ^ (2 << 4);break;
case 0x027: /** [27] xds 2 **/
    temp8 = RAM[B];RAM[B] = (A);A = temp8;B = B ^ (2 << 4); B = (B & 0x70) + ((B-1) & 0x0F); if ((B & 0x0F) == 0x0F) SKIP();;break;
case 0x028: /** [28] lbi 2,9 **/
    B = 0x29;LBISKIP();break;
case 0x029: /** [29] lbi 2,a **/
    B = 0x2a;LBISKIP();break;
case 0x02a: /** [2a] lbi 2,b **/
    B = 0x2b;LBISKIP();break;
case 0x02b: /** [2b] lbi 2,c **/
    B = 0x2c;LBISKIP();break;
case 0x02c: /** [2c] lbi 2,d **/
    B = 0x2d;LBISKIP();break;
case 0x02d: /** [2d] lbi 2,e **/
    B = 0x2e;LBISKIP();break;
case 0x02e: /** [2e] lbi 2,f **/
    B = 0x2f;LBISKIP();break;
case 0x02f: /** [2f] lbi 2,0 **/
    B = 0x20;LBISKIP();break;
case 0x030: /** [30] asc **/
    A = A + RAM[B] + C;C = (A >> 4) & 1; A = A & 15; if (C != 0) SKIP();;break;
case 0x031: /** [31] add **/
    A = (A + RAM[B]) & 15;break;
case 0x032: /** [32] rc **/
    C = 0;break;
case 0x033: /** [33] (unknown) **/
    break;
case 0x034: /** [34] xis 3 **/
    temp8 = RAM[B];RAM[B] = (A);A = temp8;B = B ^ (3 << 4); B = (B & 0x70) + ((B+1) & 0x0F); if ((B & 0x0F) == 0x00) SKIP();;break;
case 0x035: /** [35] ld 3 **/
    A = RAM[B];B = B ^ (3 << 4);break;
case 0x036: /** [36] x 3 **/
    temp8 = RAM[B];RAM[B] = (A);A = temp8;B = B ^ (3 << 4);break;
case 0x037: /** [37] xds 3 **/
    temp8 = RAM[B];RAM[B] = (A);A = temp8;B = B ^ (3 << 4); B = (B & 0x70) + ((B-1) & 0x0F); if ((B & 0x0F) == 0x0F) SKIP();;break;
case 0x038: /** [38] lbi 3,9 **/
    B = 0x39;LBISKIP();break;
case 0x039: /** [39] lbi 3,a **/
    B = 0x3a;LBISKIP();break;
case 0x03a: /** [3a] lbi 3,b **/
    B = 0x3b;LBISKIP();break;
case 0x03b: /** [3b] lbi 3,c **/
    B = 0x3c;LBISKIP();break;
case 0x03c: /** [3c] lbi 3,d **/
    B = 0x3d;LBISKIP();break;
case 0x03d: /** [3d] lbi 3,e **/
    B = 0x3e;LBISKIP();break;
case 0x03e: /** [3e] lbi 3,f **/
    B = 0x3f;LBISKIP();break;
case 0x03f: /** [3f] lbi 3,0 **/
    B = 0x30;LBISKIP();break;
case 0x040: /** [40] comp **/
    A = A ^ 15;;break;
case 0x041: /** [41] skt **/
    if (TOV != 0) { TOV = 0; SKIP(); };break;
case 0x042: /** [42] rmb 2 **/
    temp8 = RAM[B];RAM[B] = (temp8 & 0x0b);break;
case 0x043: /** [43] rmb 3 **/
    temp8 = RAM[B];RAM[B] = (temp8 & 0x07);break;
case 0x044: /** [44] nop **/
    ;;break;
case 0x045: /** [45] rmb 1 **/
    temp8 = RAM[B];RAM[B] = (temp8 & 0x0d);break;
case 0x046: /** [46] smb 2 **/
    temp8 = RAM[B];RAM[B] = (temp8 | 0x04);break;
case 0x047: /** [47] smb 1 **/
    temp8 = RAM[B];RAM[B] = (temp8 | 0x02);break;
case 0x048: /** [48] ret **/
    PC = SA;SA = SB;SB = SC;SC = 0;break;
case 0x049: /** [49] retsk **/
    PC = SA;SA = SB;SB = SC;SC = 0;SKIP();break;
case 0x04a: /** [4a] adt **/
    A = (A + 10) & 15;break;
case 0x04b: /** [4b] smb 3 **/
    temp8 = RAM[B];RAM[B] = (temp8 | 0x08);break;
case 0x04c: /** [4c] rmb 0 **/
    temp8 = RAM[B];RAM[B] = (temp8 & 0x0e);break;
case 0x04d: /** [4d] smb 0 **/
    temp8 = RAM[B];RAM[B] = (temp8 | 0x01);break;
case 0x04e: /** [4e] cba **/
    A = B & 0x0F;break;
case 0x04f: /** [4f] xas **/
    SIOWRITE(A);A = 0;break;
case 0x050: /** [50] cab **/
    B = (B & 0x70) | A;break;
case 0x051: /** [51] aisc 1 **/
    A = A + 0x1;C = (A >> 4) & 1;A = A & 15;if (C != 0) SKIP();;break;
case 0x052: /** [52] aisc 2 **/
    A = A + 0x2;C = (A >> 4) & 1;A = A & 15;if (C != 0) SKIP();;break;
case 0x053: /** [53] aisc 3 **/
    A = A + 0x3;C = (A >> 4) & 1;A = A & 15;if (C != 0) SKIP();;break;
case 0x054: /** [54] aisc 4 **/
    A = A + 0x4;C = (A >> 4) & 1;A = A & 15;if (C != 0) SKIP();;break;
case 0x055: /** [55] aisc 5 **/
    A = A + 0x5;C = (A >> 4) & 1;A = A & 15;if (C != 0) SKIP();;break;
case 0x056: /** [56] aisc 6 **/
    A = A + 0x6;C = (A >> 4) & 1;A = A & 15;if (C != 0) SKIP();;break;
case 0x057: /** [57] aisc 7 **/
    A = A + 0x7;C = (A >> 4) & 1;A = A & 15;if (C != 0) SKIP();;break;
case 0x058: /** [58] aisc 8 **/
    A = A + 0x8;C = (A >> 4) & 1;A = A & 15;if (C != 0) SKIP();;break;
case 0x059: /** [59] aisc 9 **/
    A = A + 0x9;C = (A >> 4) & 1;A = A & 15;if (C != 0) SKIP();;break;
case 0x05a: /** [5a] aisc a **/
    A = A + 0xa;C = (A >> 4) & 1;A = A & 15;if (C != 0) SKIP();;break;
case 0x05b: /** [5b] aisc b **/
    A = A + 0xb;C = (A >> 4) & 1;A = A & 15;if (C != 0) SKIP();;break;
case 0x05c: /** [5c] aisc c **/
    A = A + 0xc;C = (A >> 4) & 1;A = A & 15;if (C != 0) SKIP();;break;
case 0x05d: /** [5d] aisc d **/
    A = A + 0xd;C = (A >> 4) & 1;A = A & 15;if (C != 0) SKIP();;break;
case 0x05e: /** [5e] aisc e **/
    A = A + 0xe;C = (A >> 4) & 1;A = A & 15;if (C != 0) SKIP();;break;
case 0x05f: /** [5f] aisc f **/
    A = A + 0xf;C = (A >> 4) & 1;A = A & 15;if (C != 0) SKIP();;break;
case 0x060: /** [60] jmp 0 **/
    temp8 = FETCH();PC = (0x000)|temp8;break;
case 0x061: /** [61] jmp 1 **/
    temp8 = FETCH();PC = (0x100)|temp8;break;
case 0x062: /** [62] jmp 2 **/
    temp8 = FETCH();PC = (0x200)|temp8;break;
case 0x063: /** [63] jmp 3 **/
    temp8 = FETCH();PC = (0x300)|temp8;break;
case 0x064: /** [64] jmp 4 **/
    temp8 = FETCH();PC = (0x400)|temp8;break;
case 0x065: /** [65] jmp 5 **/
    temp8 = FETCH();PC = (0x500)|temp8;break;
case 0x066: /** [66] jmp 6 **/
    temp8 = FETCH();PC = (0x600)|temp8;break;
case 0x067: /** [67] jmp 7 **/
    temp8 = FETCH();PC = (0x700)|temp8;break;
case 0x068: /** [68] jsr 0 **/
    temp8 = FETCH();SC = SB;SB = SA;SA = PC;PC = (0x000)|temp8;break;
case 0x069: /** [69] jsr 1 **/
    temp8 = FETCH();SC = SB;SB = SA;SA = PC;PC = (0x100)|temp8;break;
case 0x06a: /** [6a] jsr 2 **/
    temp8 = FETCH();SC = SB;SB = SA;SA = PC;PC = (0x200)|temp8;break;
case 0x06b: /** [6b] jsr 3 **/
    temp8 = FETCH();SC = SB;SB = SA;SA = PC;PC = (0x300)|temp8;break;
case 0x06c: /** [6c] jsr 4 **/
    temp8 = FETCH();SC = SB;SB = SA;SA = PC;PC = (0x400)|temp8;break;
case 0x06d: /** [6d] jsr 5 **/
    temp8 = FETCH();SC = SB;SB = SA;SA = PC;PC = (0x500)|temp8;break;
case 0x06e: /** [6e] jsr 6 **/
    temp8 = FETCH();SC = SB;SB = SA;SA = PC;PC = (0x600)|temp8;break;
case 0x06f: /** [6f] jsr 7 **/
    temp8 = FETCH();SC = SB;SB = SA;SA = PC;PC = (0x700)|temp8;break;
case 0x070: /** [70] stii 0 **/
    RAM[B] = (0x0);B = (B & 0x70) + ((B + 1) & 0x0F);break;
case 0x071: /** [71] stii 1 **/
    RAM[B] = (0x1);B = (B & 0x70) + ((B + 1) & 0x0F);break;
case 0x072: /** [72] stii 2 **/
    RAM[B] = (0x2);B = (B & 0x70) + ((B + 1) & 0x0F);break;
case 0x073: /** [73] stii 3 **/
    RAM[B] = (0x3);B = (B & 0x70) + ((B + 1) & 0x0F);break;
case 0x074: /** [74] stii 4 **/
    RAM[B] = (0x4);B = (B & 0x70) + ((B + 1) & 0x0F);break;
case 0x075: /** [75] stii 5 **/
    RAM[B] = (0x5);B = (B & 0x70) + ((B + 1) & 0x0F);break;
case 0x076: /** [76] stii 6 **/
    RAM[B] = (0x6);B = (B & 0x70) + ((B + 1) & 0x0F);break;
case 0x077: /** [77] stii 7 **/
    RAM[B] = (0x7);B = (B & 0x70) + ((B + 1) & 0x0F);break;
case 0x078: /** [78] stii 8 **/
    RAM[B] = (0x8);B = (B & 0x70) + ((B + 1) & 0x0F);break;
case 0x079: /** [79] stii 9 **/
    RAM[B] = (0x9);B = (B & 0x70) + ((B + 1) & 0x0F);break;
case 0x07a: /** [7a] stii a **/
    RAM[B] = (0xa);B = (B & 0x70) + ((B + 1) & 0x0F);break;
case 0x07b: /** [7b] stii b **/
    RAM[B] = (0xb);B = (B & 0x70) + ((B + 1) & 0x0F);break;
case 0x07c: /** [7c] stii c **/
    RAM[B] = (0xc);B = (B & 0x70) + ((B + 1) & 0x0F);break;
case 0x07d: /** [7d] stii d **/
    RAM[B] = (0xd);B = (B & 0x70) + ((B + 1) & 0x0F);break;
case 0x07e: /** [7e] stii e **/
    RAM[B] = (0xe);B = (B & 0x70) + ((B + 1) & 0x0F);break;
case 0x07f: /** [7f] stii f **/
    RAM[B] = (0xf);B = (B & 0x70) + ((B + 1) & 0x0F);break;
case 0x080: /** [80] jsrp 080 **/
    SC = SB;SB = SA;SA = PC;PC = 0x080;break;
case 0x081: /** [81] jsrp 081 **/
    SC = SB;SB = SA;SA = PC;PC = 0x081;break;
case 0x082: /** [82] jsrp 082 **/
    SC = SB;SB = SA;SA = PC;PC = 0x082;break;
case 0x083: /** [83] jsrp 083 **/
    SC = SB;SB = SA;SA = PC;PC = 0x083;break;
case 0x084: /** [84] jsrp 084 **/
    SC = SB;SB = SA;SA = PC;PC = 0x084;break;
case 0x085: /** [85] jsrp 085 **/
    SC = SB;SB = SA;SA = PC;PC = 0x085;break;
case 0x086: /** [86] jsrp 086 **/
    SC = SB;SB = SA;SA = PC;PC = 0x086;break;
case 0x087: /** [87] jsrp 087 **/
    SC = SB;SB = SA;SA = PC;PC = 0x087;break;
case 0x088: /** [88] jsrp 088 **/
    SC = SB;SB = SA;SA = PC;PC = 0x088;break;
case 0x089: /** [89] jsrp 089 **/
    SC = SB;SB = SA;SA = PC;PC = 0x089;break;
case 0x08a: /** [8a] jsrp 08a **/
    SC = SB;SB = SA;SA = PC;PC = 0x08a;break;
case 0x08b: /** [8b] jsrp 08b **/
    SC = SB;SB = SA;SA = PC;PC = 0x08b;break;
case 0x08c: /** [8c] jsrp 08c **/
    SC = SB;SB = SA;SA = PC;PC = 0x08c;break;
case 0x08d: /** [8d] jsrp 08d **/
    SC = SB;SB = SA;SA = PC;PC = 0x08d;break;
case 0x08e: /** [8e] jsrp 08e **/
    SC = SB;SB = SA;SA = PC;PC = 0x08e;break;
case 0x08f: /** [8f] jsrp 08f **/
    SC = SB;SB = SA;SA = PC;PC = 0x08f;break;
case 0x090: /** [90] jsrp 090 **/
    SC = SB;SB = SA;SA = PC;PC = 0x090;break;
case 0x091: /** [91] jsrp 091 **/
    SC = SB;SB = SA;SA = PC;PC = 0x091;break;
case 0x092: /** [92] jsrp 092 **/
    SC = SB;SB = SA;SA = PC;PC = 0x092;break;
case 0x093: /** [93] jsrp 093 **/
    SC = SB;SB = SA;SA = PC;PC = 0x093;break;
case 0x094: /** [94] jsrp 094 **/
    SC = SB;SB = SA;SA = PC;PC = 0x094;break;
case 0x095: /** [95] jsrp 095 **/
    SC = SB;SB = SA;SA = PC;PC = 0x095;break;
case 0x096: /** [96] jsrp 096 **/
    SC = SB;SB = SA;SA = PC;PC = 0x096;break;
case 0x097: /** [97] jsrp 097 **/
    SC = SB;SB = SA;SA = PC;PC = 0x097;break;
case 0x098: /** [98] jsrp 098 **/
    SC = SB;SB = SA;SA = PC;PC = 0x098;break;
case 0x099: /** [99] jsrp 099 **/
    SC = SB;SB = SA;SA = PC;PC = 0x099;break;
case 0x09a: /** [9a] jsrp 09a **/
    SC = SB;SB = SA;SA = PC;PC = 0x09a;break;
case 0x09b: /** [9b] jsrp 09b **/
    SC = SB;SB = SA;SA = PC;PC = 0x09b;break;
case 0x09c: /** [9c] jsrp 09c **/
    SC = SB;SB = SA;SA = PC;PC = 0x09c;break;
case 0x09d: /** [9d] jsrp 09d **/
    SC = SB;SB = SA;SA = PC;PC = 0x09d;break;
case 0x09e: /** [9e] jsrp 09e **/
    SC = SB;SB = SA;SA = PC;PC = 0x09e;break;
case 0x09f: /** [9f] jsrp 09f **/
    SC = SB;SB = SA;SA = PC;PC = 0x09f;break;
case 0x0a0: /** [a0] jsrp 0a0 **/
    SC = SB;SB = SA;SA = PC;PC = 0x0a0;break;
case 0x0a1: /** [a1] jsrp 0a1 **/
    SC = SB;SB = SA;SA = PC;PC = 0x0a1;break;
case 0x0a2: /** [a2] jsrp 0a2 **/
    SC = SB;SB = SA;SA = PC;PC = 0x0a2;break;
case 0x0a3: /** [a3] jsrp 0a3 **/
    SC = SB;SB = SA;SA = PC;PC = 0x0a3;break;
case 0x0a4: /** [a4] jsrp 0a4 **/
    SC = SB;SB = SA;SA = PC;PC = 0x0a4;break;
case 0x0a5: /** [a5] jsrp 0a5 **/
    SC = SB;SB = SA;SA = PC;PC = 0x0a5;break;
case 0x0a6: /** [a6] jsrp 0a6 **/
    SC = SB;SB = SA;SA = PC;PC = 0x0a6;break;
case 0x0a7: /** [a7] jsrp 0a7 **/
    SC = SB;SB = SA;SA = PC;PC = 0x0a7;break;
case 0x0a8: /** [a8] jsrp 0a8 **/
    SC = SB;SB = SA;SA = PC;PC = 0x0a8;break;
case 0x0a9: /** [a9] jsrp 0a9 **/
    SC = SB;SB = SA;SA = PC;PC = 0x0a9;break;
case 0x0aa: /** [aa] jsrp 0aa **/
    SC = SB;SB = SA;SA = PC;PC = 0x0aa;break;
case 0x0ab: /** [ab] jsrp 0ab **/
    SC = SB;SB = SA;SA = PC;PC = 0x0ab;break;
case 0x0ac: /** [ac] jsrp 0ac **/
    SC = SB;SB = SA;SA = PC;PC = 0x0ac;break;
case 0x0ad: /** [ad] jsrp 0ad **/
    SC = SB;SB = SA;SA = PC;PC = 0x0ad;break;
case 0x0ae: /** [ae] jsrp 0ae **/
    SC = SB;SB = SA;SA = PC;PC = 0x0ae;break;
case 0x0af: /** [af] jsrp 0af **/
    SC = SB;SB = SA;SA = PC;PC = 0x0af;break;
case 0x0b0: /** [b0] jsrp 0b0 **/
    SC = SB;SB = SA;SA = PC;PC = 0x0b0;break;
case 0x0b1: /** [b1] jsrp 0b1 **/
    SC = SB;SB = SA;SA = PC;PC = 0x0b1;break;
case 0x0b2: /** [b2] jsrp 0b2 **/
    SC = SB;SB = SA;SA = PC;PC = 0x0b2;break;
case 0x0b3: /** [b3] jsrp 0b3 **/
    SC = SB;SB = SA;SA = PC;PC = 0x0b3;break;
case 0x0b4: /** [b4] jsrp 0b4 **/
    SC = SB;SB = SA;SA = PC;PC = 0x0b4;break;
case 0x0b5: /** [b5] jsrp 0b5 **/
    SC = SB;SB = SA;SA = PC;PC = 0x0b5;break;
case 0x0b6: /** [b6] jsrp 0b6 **/
    SC = SB;SB = SA;SA = PC;PC = 0x0b6;break;
case 0x0b7: /** [b7] jsrp 0b7 **/
    SC = SB;SB = SA;SA = PC;PC = 0x0b7;break;
case 0x0b8: /** [b8] jsrp 0b8 **/
    SC = SB;SB = SA;SA = PC;PC = 0x0b8;break;
case 0x0b9: /** [b9] jsrp 0b9 **/
    SC = SB;SB = SA;SA = PC;PC = 0x0b9;break;
case 0x0ba: /** [ba] jsrp 0ba **/
    SC = SB;SB = SA;SA = PC;PC = 0x0ba;break;
case 0x0bb: /** [bb] jsrp 0bb **/
    SC = SB;SB = SA;SA = PC;PC = 0x0bb;break;
case 0x0bc: /** [bc] jsrp 0bc **/
    SC = SB;SB = SA;SA = PC;PC = 0x0bc;break;
case 0x0bd: /** [bd] jsrp 0bd **/
    SC = SB;SB = SA;SA = PC;PC = 0x0bd;break;
case 0x0be: /** [be] jsrp 0be **/
    SC = SB;SB = SA;SA = PC;PC = 0x0be;break;
case 0x0bf: /** [bf] lqid **/
    Q = ROM[(PC & 0x700) | AM()];SC = SB;UPDATEQ(Q);break;
case 0x0c0: /** [c0] jp 000 **/
    PC = (PC & 0x7c0) | 0x000;break;
case 0x0c1: /** [c1] jp 001 **/
    PC = (PC & 0x7c0) | 0x001;break;
case 0x0c2: /** [c2] jp 002 **/
    PC = (PC & 0x7c0) | 0x002;break;
case 0x0c3: /** [c3] jp 003 **/
    PC = (PC & 0x7c0) | 0x003;break;
case 0x0c4: /** [c4] jp 004 **/
    PC = (PC & 0x7c0) | 0x004;break;
case 0x0c5: /** [c5] jp 005 **/
    PC = (PC & 0x7c0) | 0x005;break;
case 0x0c6: /** [c6] jp 006 **/
    PC = (PC & 0x7c0) | 0x006;break;
case 0x0c7: /** [c7] jp 007 **/
    PC = (PC & 0x7c0) | 0x007;break;
case 0x0c8: /** [c8] jp 008 **/
    PC = (PC & 0x7c0) | 0x008;break;
case 0x0c9: /** [c9] jp 009 **/
    PC = (PC & 0x7c0) | 0x009;break;
case 0x0ca: /** [ca] jp 00a **/
    PC = (PC & 0x7c0) | 0x00a;break;
case 0x0cb: /** [cb] jp 00b **/
    PC = (PC & 0x7c0) | 0x00b;break;
case 0x0cc: /** [cc] jp 00c **/
    PC = (PC & 0x7c0) | 0x00c;break;
case 0x0cd: /** [cd] jp 00d **/
    PC = (PC & 0x7c0) | 0x00d;break;
case 0x0ce: /** [ce] jp 00e **/
    PC = (PC & 0x7c0) | 0x00e;break;
case 0x0cf: /** [cf] jp 00f **/
    PC = (PC & 0x7c0) | 0x00f;break;
case 0x0d0: /** [d0] jp 010 **/
    PC = (PC & 0x7c0) | 0x010;break;
case 0x0d1: /** [d1] jp 011 **/
    PC = (PC & 0x7c0) | 0x011;break;
case 0x0d2: /** [d2] jp 012 **/
    PC = (PC & 0x7c0) | 0x012;break;
case 0x0d3: /** [d3] jp 013 **/
    PC = (PC & 0x7c0) | 0x013;break;
case 0x0d4: /** [d4] jp 014 **/
    PC = (PC & 0x7c0) | 0x014;break;
case 0x0d5: /** [d5] jp 015 **/
    PC = (PC & 0x7c0) | 0x015;break;
case 0x0d6: /** [d6] jp 016 **/
    PC = (PC & 0x7c0) | 0x016;break;
case 0x0d7: /** [d7] jp 017 **/
    PC = (PC & 0x7c0) | 0x017;break;
case 0x0d8: /** [d8] jp 018 **/
    PC = (PC & 0x7c0) | 0x018;break;
case 0x0d9: /** [d9] jp 019 **/
    PC = (PC & 0x7c0) | 0x019;break;
case 0x0da: /** [da] jp 01a **/
    PC = (PC & 0x7c0) | 0x01a;break;
case 0x0db: /** [db] jp 01b **/
    PC = (PC & 0x7c0) | 0x01b;break;
case 0x0dc: /** [dc] jp 01c **/
    PC = (PC & 0x7c0) | 0x01c;break;
case 0x0dd: /** [dd] jp 01d **/
    PC = (PC & 0x7c0) | 0x01d;break;
case 0x0de: /** [de] jp 01e **/
    PC = (PC & 0x7c0) | 0x01e;break;
case 0x0df: /** [df] jp 01f **/
    PC = (PC & 0x7c0) | 0x01f;break;
case 0x0e0: /** [e0] jp 020 **/
    PC = (PC & 0x7c0) | 0x020;break;
case 0x0e1: /** [e1] jp 021 **/
    PC = (PC & 0x7c0) | 0x021;break;
case 0x0e2: /** [e2] jp 022 **/
    PC = (PC & 0x7c0) | 0x022;break;
case 0x0e3: /** [e3] jp 023 **/
    PC = (PC & 0x7c0) | 0x023;break;
case 0x0e4: /** [e4] jp 024 **/
    PC = (PC & 0x7c0) | 0x024;break;
case 0x0e5: /** [e5] jp 025 **/
    PC = (PC & 0x7c0) | 0x025;break;
case 0x0e6: /** [e6] jp 026 **/
    PC = (PC & 0x7c0) | 0x026;break;
case 0x0e7: /** [e7] jp 027 **/
    PC = (PC & 0x7c0) | 0x027;break;
case 0x0e8: /** [e8] jp 028 **/
    PC = (PC & 0x7c0) | 0x028;break;
case 0x0e9: /** [e9] jp 029 **/
    PC = (PC & 0x7c0) | 0x029;break;
case 0x0ea: /** [ea] jp 02a **/
    PC = (PC & 0x7c0) | 0x02a;break;
case 0x0eb: /** [eb] jp 02b **/
    PC = (PC & 0x7c0) | 0x02b;break;
case 0x0ec: /** [ec] jp 02c **/
    PC = (PC & 0x7c0) | 0x02c;break;
case 0x0ed: /** [ed] jp 02d **/
    PC = (PC & 0x7c0) | 0x02d;break;
case 0x0ee: /** [ee] jp 02e **/
    PC = (PC & 0x7c0) | 0x02e;break;
case 0x0ef: /** [ef] jp 02f **/
    PC = (PC & 0x7c0) | 0x02f;break;
case 0x0f0: /** [f0] jp 030 **/
    PC = (PC & 0x7c0) | 0x030;break;
case 0x0f1: /** [f1] jp 031 **/
    PC = (PC & 0x7c0) | 0x031;break;
case 0x0f2: /** [f2] jp 032 **/
    PC = (PC & 0x7c0) | 0x032;break;
case 0x0f3: /** [f3] jp 033 **/
    PC = (PC & 0x7c0) | 0x033;break;
case 0x0f4: /** [f4] jp 034 **/
    PC = (PC & 0x7c0) | 0x034;break;
case 0x0f5: /** [f5] jp 035 **/
    PC = (PC & 0x7c0) | 0x035;break;
case 0x0f6: /** [f6] jp 036 **/
    PC = (PC & 0x7c0) | 0x036;break;
case 0x0f7: /** [f7] jp 037 **/
    PC = (PC & 0x7c0) | 0x037;break;
case 0x0f8: /** [f8] jp 038 **/
    PC = (PC & 0x7c0) | 0x038;break;
case 0x0f9: /** [f9] jp 039 **/
    PC = (PC & 0x7c0) | 0x039;break;
case 0x0fa: /** [fa] jp 03a **/
    PC = (PC & 0x7c0) | 0x03a;break;
case 0x0fb: /** [fb] jp 03b **/
    PC = (PC & 0x7c0) | 0x03b;break;
case 0x0fc: /** [fc] jp 03c **/
    PC = (PC & 0x7c0) | 0x03c;break;
case 0x0fd: /** [fd] jp 03d **/
    PC = (PC & 0x7c0) | 0x03d;break;
case 0x0fe: /** [fe] jp 03e **/
    PC = (PC & 0x7c0) | 0x03e;break;
case 0x0ff: /** [ff] jid **/
    temp8 = ROM[(PC & 0x700)|AM()]; PC = (PC & 0x700) | temp8;break;
case 0x100: /** [2300] ld 0,0 **/
    A = RAM[0x00];break;
case 0x101: /** [2301] ld 0,1 **/
    A = RAM[0x01];break;
case 0x102: /** [2302] ld 0,2 **/
    A = RAM[0x02];break;
case 0x103: /** [2303] ld 0,3 **/
    A = RAM[0x03];break;
case 0x104: /** [2304] ld 0,4 **/
    A = RAM[0x04];break;
case 0x105: /** [2305] ld 0,5 **/
    A = RAM[0x05];break;
case 0x106: /** [2306] ld 0,6 **/
    A = RAM[0x06];break;
case 0x107: /** [2307] ld 0,7 **/
    A = RAM[0x07];break;
case 0x108: /** [2308] ld 0,8 **/
    A = RAM[0x08];break;
case 0x109: /** [2309] ld 0,9 **/
    A = RAM[0x09];break;
case 0x10a: /** [230a] ld 0,a **/
    A = RAM[0x0a];break;
case 0x10b: /** [230b] ld 0,b **/
    A = RAM[0x0b];break;
case 0x10c: /** [230c] ld 0,c **/
    A = RAM[0x0c];break;
case 0x10d: /** [230d] ld 0,d **/
    A = RAM[0x0d];break;
case 0x10e: /** [230e] ld 0,e **/
    A = RAM[0x0e];break;
case 0x10f: /** [230f] ld 0,f **/
    A = RAM[0x0f];break;
case 0x110: /** [2310] ld 1,0 **/
    A = RAM[0x10];break;
case 0x111: /** [2311] ld 1,1 **/
    A = RAM[0x11];break;
case 0x112: /** [2312] ld 1,2 **/
    A = RAM[0x12];break;
case 0x113: /** [2313] ld 1,3 **/
    A = RAM[0x13];break;
case 0x114: /** [2314] ld 1,4 **/
    A = RAM[0x14];break;
case 0x115: /** [2315] ld 1,5 **/
    A = RAM[0x15];break;
case 0x116: /** [2316] ld 1,6 **/
    A = RAM[0x16];break;
case 0x117: /** [2317] ld 1,7 **/
    A = RAM[0x17];break;
case 0x118: /** [2318] ld 1,8 **/
    A = RAM[0x18];break;
case 0x119: /** [2319] ld 1,9 **/
    A = RAM[0x19];break;
case 0x11a: /** [231a] ld 1,a **/
    A = RAM[0x1a];break;
case 0x11b: /** [231b] ld 1,b **/
    A = RAM[0x1b];break;
case 0x11c: /** [231c] ld 1,c **/
    A = RAM[0x1c];break;
case 0x11d: /** [231d] ld 1,d **/
    A = RAM[0x1d];break;
case 0x11e: /** [231e] ld 1,e **/
    A = RAM[0x1e];break;
case 0x11f: /** [231f] ld 1,f **/
    A = RAM[0x1f];break;
case 0x120: /** [2320] ld 2,0 **/
    A = RAM[0x20];break;
case 0x121: /** [2321] ld 2,1 **/
    A = RAM[0x21];break;
case 0x122: /** [2322] ld 2,2 **/
    A = RAM[0x22];break;
case 0x123: /** [2323] ld 2,3 **/
    A = RAM[0x23];break;
case 0x124: /** [2324] ld 2,4 **/
    A = RAM[0x24];break;
case 0x125: /** [2325] ld 2,5 **/
    A = RAM[0x25];break;
case 0x126: /** [2326] ld 2,6 **/
    A = RAM[0x26];break;
case 0x127: /** [2327] ld 2,7 **/
    A = RAM[0x27];break;
case 0x128: /** [2328] ld 2,8 **/
    A = RAM[0x28];break;
case 0x129: /** [2329] ld 2,9 **/
    A = RAM[0x29];break;
case 0x12a: /** [232a] ld 2,a **/
    A = RAM[0x2a];break;
case 0x12b: /** [232b] ld 2,b **/
    A = RAM[0x2b];break;
case 0x12c: /** [232c] ld 2,c **/
    A = RAM[0x2c];break;
case 0x12d: /** [232d] ld 2,d **/
    A = RAM[0x2d];break;
case 0x12e: /** [232e] ld 2,e **/
    A = RAM[0x2e];break;
case 0x12f: /** [232f] ld 2,f **/
    A = RAM[0x2f];break;
case 0x130: /** [2330] ld 3,0 **/
    A = RAM[0x30];break;
case 0x131: /** [2331] ld 3,1 **/
    A = RAM[0x31];break;
case 0x132: /** [2332] ld 3,2 **/
    A = RAM[0x32];break;
case 0x133: /** [2333] ld 3,3 **/
    A = RAM[0x33];break;
case 0x134: /** [2334] ld 3,4 **/
    A = RAM[0x34];break;
case 0x135: /** [2335] ld 3,5 **/
    A = RAM[0x35];break;
case 0x136: /** [2336] ld 3,6 **/
    A = RAM[0x36];break;
case 0x137: /** [2337] ld 3,7 **/
    A = RAM[0x37];break;
case 0x138: /** [2338] ld 3,8 **/
    A = RAM[0x38];break;
case 0x139: /** [2339] ld 3,9 **/
    A = RAM[0x39];break;
case 0x13a: /** [233a] ld 3,a **/
    A = RAM[0x3a];break;
case 0x13b: /** [233b] ld 3,b **/
    A = RAM[0x3b];break;
case 0x13c: /** [233c] ld 3,c **/
    A = RAM[0x3c];break;
case 0x13d: /** [233d] ld 3,d **/
    A = RAM[0x3d];break;
case 0x13e: /** [233e] ld 3,e **/
    A = RAM[0x3e];break;
case 0x13f: /** [233f] ld 3,f **/
    A = RAM[0x3f];break;
case 0x140: /** [2340] ld 4,0 **/
    A = RAM[0x40];break;
case 0x141: /** [2341] ld 4,1 **/
    A = RAM[0x41];break;
case 0x142: /** [2342] ld 4,2 **/
    A = RAM[0x42];break;
case 0x143: /** [2343] ld 4,3 **/
    A = RAM[0x43];break;
case 0x144: /** [2344] ld 4,4 **/
    A = RAM[0x44];break;
case 0x145: /** [2345] ld 4,5 **/
    A = RAM[0x45];break;
case 0x146: /** [2346] ld 4,6 **/
    A = RAM[0x46];break;
case 0x147: /** [2347] ld 4,7 **/
    A = RAM[0x47];break;
case 0x148: /** [2348] ld 4,8 **/
    A = RAM[0x48];break;
case 0x149: /** [2349] ld 4,9 **/
    A = RAM[0x49];break;
case 0x14a: /** [234a] ld 4,a **/
    A = RAM[0x4a];break;
case 0x14b: /** [234b] ld 4,b **/
    A = RAM[0x4b];break;
case 0x14c: /** [234c] ld 4,c **/
    A = RAM[0x4c];break;
case 0x14d: /** [234d] ld 4,d **/
    A = RAM[0x4d];break;
case 0x14e: /** [234e] ld 4,e **/
    A = RAM[0x4e];break;
case 0x14f: /** [234f] ld 4,f **/
    A = RAM[0x4f];break;
case 0x150: /** [2350] ld 5,0 **/
    A = RAM[0x50];break;
case 0x151: /** [2351] ld 5,1 **/
    A = RAM[0x51];break;
case 0x152: /** [2352] ld 5,2 **/
    A = RAM[0x52];break;
case 0x153: /** [2353] ld 5,3 **/
    A = RAM[0x53];break;
case 0x154: /** [2354] ld 5,4 **/
    A = RAM[0x54];break;
case 0x155: /** [2355] ld 5,5 **/
    A = RAM[0x55];break;
case 0x156: /** [2356] ld 5,6 **/
    A = RAM[0x56];break;
case 0x157: /** [2357] ld 5,7 **/
    A = RAM[0x57];break;
case 0x158: /** [2358] ld 5,8 **/
    A = RAM[0x58];break;
case 0x159: /** [2359] ld 5,9 **/
    A = RAM[0x59];break;
case 0x15a: /** [235a] ld 5,a **/
    A = RAM[0x5a];break;
case 0x15b: /** [235b] ld 5,b **/
    A = RAM[0x5b];break;
case 0x15c: /** [235c] ld 5,c **/
    A = RAM[0x5c];break;
case 0x15d: /** [235d] ld 5,d **/
    A = RAM[0x5d];break;
case 0x15e: /** [235e] ld 5,e **/
    A = RAM[0x5e];break;
case 0x15f: /** [235f] ld 5,f **/
    A = RAM[0x5f];break;
case 0x160: /** [2360] ld 6,0 **/
    A = RAM[0x60];break;
case 0x161: /** [2361] ld 6,1 **/
    A = RAM[0x61];break;
case 0x162: /** [2362] ld 6,2 **/
    A = RAM[0x62];break;
case 0x163: /** [2363] ld 6,3 **/
    A = RAM[0x63];break;
case 0x164: /** [2364] ld 6,4 **/
    A = RAM[0x64];break;
case 0x165: /** [2365] ld 6,5 **/
    A = RAM[0x65];break;
case 0x166: /** [2366] ld 6,6 **/
    A = RAM[0x66];break;
case 0x167: /** [2367] ld 6,7 **/
    A = RAM[0x67];break;
case 0x168: /** [2368] ld 6,8 **/
    A = RAM[0x68];break;
case 0x169: /** [2369] ld 6,9 **/
    A = RAM[0x69];break;
case 0x16a: /** [236a] ld 6,a **/
    A = RAM[0x6a];break;
case 0x16b: /** [236b] ld 6,b **/
    A = RAM[0x6b];break;
case 0x16c: /** [236c] ld 6,c **/
    A = RAM[0x6c];break;
case 0x16d: /** [236d] ld 6,d **/
    A = RAM[0x6d];break;
case 0x16e: /** [236e] ld 6,e **/
    A = RAM[0x6e];break;
case 0x16f: /** [236f] ld 6,f **/
    A = RAM[0x6f];break;
case 0x170: /** [2370] ld 7,0 **/
    A = RAM[0x70];break;
case 0x171: /** [2371] ld 7,1 **/
    A = RAM[0x71];break;
case 0x172: /** [2372] ld 7,2 **/
    A = RAM[0x72];break;
case 0x173: /** [2373] ld 7,3 **/
    A = RAM[0x73];break;
case 0x174: /** [2374] ld 7,4 **/
    A = RAM[0x74];break;
case 0x175: /** [2375] ld 7,5 **/
    A = RAM[0x75];break;
case 0x176: /** [2376] ld 7,6 **/
    A = RAM[0x76];break;
case 0x177: /** [2377] ld 7,7 **/
    A = RAM[0x77];break;
case 0x178: /** [2378] ld 7,8 **/
    A = RAM[0x78];break;
case 0x179: /** [2379] ld 7,9 **/
    A = RAM[0x79];break;
case 0x17a: /** [237a] ld 7,a **/
    A = RAM[0x7a];break;
case 0x17b: /** [237b] ld 7,b **/
    A = RAM[0x7b];break;
case 0x17c: /** [237c] ld 7,c **/
    A = RAM[0x7c];break;
case 0x17d: /** [237d] ld 7,d **/
    A = RAM[0x7d];break;
case 0x17e: /** [237e] ld 7,e **/
    A = RAM[0x7e];break;
case 0x17f: /** [237f] ld 7,f **/
    A = RAM[0x7f];break;
case 0x180: /** [2380] xad 0,0 **/
    temp8 = RAM[0x00];RAM[0x00] = (A);A = temp8;break;
case 0x181: /** [2381] xad 0,1 **/
    temp8 = RAM[0x01];RAM[0x01] = (A);A = temp8;break;
case 0x182: /** [2382] xad 0,2 **/
    temp8 = RAM[0x02];RAM[0x02] = (A);A = temp8;break;
case 0x183: /** [2383] xad 0,3 **/
    temp8 = RAM[0x03];RAM[0x03] = (A);A = temp8;break;
case 0x184: /** [2384] xad 0,4 **/
    temp8 = RAM[0x04];RAM[0x04] = (A);A = temp8;break;
case 0x185: /** [2385] xad 0,5 **/
    temp8 = RAM[0x05];RAM[0x05] = (A);A = temp8;break;
case 0x186: /** [2386] xad 0,6 **/
    temp8 = RAM[0x06];RAM[0x06] = (A);A = temp8;break;
case 0x187: /** [2387] xad 0,7 **/
    temp8 = RAM[0x07];RAM[0x07] = (A);A = temp8;break;
case 0x188: /** [2388] xad 0,8 **/
    temp8 = RAM[0x08];RAM[0x08] = (A);A = temp8;break;
case 0x189: /** [2389] xad 0,9 **/
    temp8 = RAM[0x09];RAM[0x09] = (A);A = temp8;break;
case 0x18a: /** [238a] xad 0,a **/
    temp8 = RAM[0x0a];RAM[0x0a] = (A);A = temp8;break;
case 0x18b: /** [238b] xad 0,b **/
    temp8 = RAM[0x0b];RAM[0x0b] = (A);A = temp8;break;
case 0x18c: /** [238c] xad 0,c **/
    temp8 = RAM[0x0c];RAM[0x0c] = (A);A = temp8;break;
case 0x18d: /** [238d] xad 0,d **/
    temp8 = RAM[0x0d];RAM[0x0d] = (A);A = temp8;break;
case 0x18e: /** [238e] xad 0,e **/
    temp8 = RAM[0x0e];RAM[0x0e] = (A);A = temp8;break;
case 0x18f: /** [238f] xad 0,f **/
    temp8 = RAM[0x0f];RAM[0x0f] = (A);A = temp8;break;
case 0x190: /** [2390] xad 1,0 **/
    temp8 = RAM[0x10];RAM[0x10] = (A);A = temp8;break;
case 0x191: /** [2391] xad 1,1 **/
    temp8 = RAM[0x11];RAM[0x11] = (A);A = temp8;break;
case 0x192: /** [2392] xad 1,2 **/
    temp8 = RAM[0x12];RAM[0x12] = (A);A = temp8;break;
case 0x193: /** [2393] xad 1,3 **/
    temp8 = RAM[0x13];RAM[0x13] = (A);A = temp8;break;
case 0x194: /** [2394] xad 1,4 **/
    temp8 = RAM[0x14];RAM[0x14] = (A);A = temp8;break;
case 0x195: /** [2395] xad 1,5 **/
    temp8 = RAM[0x15];RAM[0x15] = (A);A = temp8;break;
case 0x196: /** [2396] xad 1,6 **/
    temp8 = RAM[0x16];RAM[0x16] = (A);A = temp8;break;
case 0x197: /** [2397] xad 1,7 **/
    temp8 = RAM[0x17];RAM[0x17] = (A);A = temp8;break;
case 0x198: /** [2398] xad 1,8 **/
    temp8 = RAM[0x18];RAM[0x18] = (A);A = temp8;break;
case 0x199: /** [2399] xad 1,9 **/
    temp8 = RAM[0x19];RAM[0x19] = (A);A = temp8;break;
case 0x19a: /** [239a] xad 1,a **/
    temp8 = RAM[0x1a];RAM[0x1a] = (A);A = temp8;break;
case 0x19b: /** [239b] xad 1,b **/
    temp8 = RAM[0x1b];RAM[0x1b] = (A);A = temp8;break;
case 0x19c: /** [239c] xad 1,c **/
    temp8 = RAM[0x1c];RAM[0x1c] = (A);A = temp8;break;
case 0x19d: /** [239d] xad 1,d **/
    temp8 = RAM[0x1d];RAM[0x1d] = (A);A = temp8;break;
case 0x19e: /** [239e] xad 1,e **/
    temp8 = RAM[0x1e];RAM[0x1e] = (A);A = temp8;break;
case 0x19f: /** [239f] xad 1,f **/
    temp8 = RAM[0x1f];RAM[0x1f] = (A);A = temp8;break;
case 0x1a0: /** [23a0] xad 2,0 **/
    temp8 = RAM[0x20];RAM[0x20] = (A);A = temp8;break;
case 0x1a1: /** [23a1] xad 2,1 **/
    temp8 = RAM[0x21];RAM[0x21] = (A);A = temp8;break;
case 0x1a2: /** [23a2] xad 2,2 **/
    temp8 = RAM[0x22];RAM[0x22] = (A);A = temp8;break;
case 0x1a3: /** [23a3] xad 2,3 **/
    temp8 = RAM[0x23];RAM[0x23] = (A);A = temp8;break;
case 0x1a4: /** [23a4] xad 2,4 **/
    temp8 = RAM[0x24];RAM[0x24] = (A);A = temp8;break;
case 0x1a5: /** [23a5] xad 2,5 **/
    temp8 = RAM[0x25];RAM[0x25] = (A);A = temp8;break;
case 0x1a6: /** [23a6] xad 2,6 **/
    temp8 = RAM[0x26];RAM[0x26] = (A);A = temp8;break;
case 0x1a7: /** [23a7] xad 2,7 **/
    temp8 = RAM[0x27];RAM[0x27] = (A);A = temp8;break;
case 0x1a8: /** [23a8] xad 2,8 **/
    temp8 = RAM[0x28];RAM[0x28] = (A);A = temp8;break;
case 0x1a9: /** [23a9] xad 2,9 **/
    temp8 = RAM[0x29];RAM[0x29] = (A);A = temp8;break;
case 0x1aa: /** [23aa] xad 2,a **/
    temp8 = RAM[0x2a];RAM[0x2a] = (A);A = temp8;break;
case 0x1ab: /** [23ab] xad 2,b **/
    temp8 = RAM[0x2b];RAM[0x2b] = (A);A = temp8;break;
case 0x1ac: /** [23ac] xad 2,c **/
    temp8 = RAM[0x2c];RAM[0x2c] = (A);A = temp8;break;
case 0x1ad: /** [23ad] xad 2,d **/
    temp8 = RAM[0x2d];RAM[0x2d] = (A);A = temp8;break;
case 0x1ae: /** [23ae] xad 2,e **/
    temp8 = RAM[0x2e];RAM[0x2e] = (A);A = temp8;break;
case 0x1af: /** [23af] xad 2,f **/
    temp8 = RAM[0x2f];RAM[0x2f] = (A);A = temp8;break;
case 0x1b0: /** [23b0] xad 3,0 **/
    temp8 = RAM[0x30];RAM[0x30] = (A);A = temp8;break;
case 0x1b1: /** [23b1] xad 3,1 **/
    temp8 = RAM[0x31];RAM[0x31] = (A);A = temp8;break;
case 0x1b2: /** [23b2] xad 3,2 **/
    temp8 = RAM[0x32];RAM[0x32] = (A);A = temp8;break;
case 0x1b3: /** [23b3] xad 3,3 **/
    temp8 = RAM[0x33];RAM[0x33] = (A);A = temp8;break;
case 0x1b4: /** [23b4] xad 3,4 **/
    temp8 = RAM[0x34];RAM[0x34] = (A);A = temp8;break;
case 0x1b5: /** [23b5] xad 3,5 **/
    temp8 = RAM[0x35];RAM[0x35] = (A);A = temp8;break;
case 0x1b6: /** [23b6] xad 3,6 **/
    temp8 = RAM[0x36];RAM[0x36] = (A);A = temp8;break;
case 0x1b7: /** [23b7] xad 3,7 **/
    temp8 = RAM[0x37];RAM[0x37] = (A);A = temp8;break;
case 0x1b8: /** [23b8] xad 3,8 **/
    temp8 = RAM[0x38];RAM[0x38] = (A);A = temp8;break;
case 0x1b9: /** [23b9] xad 3,9 **/
    temp8 = RAM[0x39];RAM[0x39] = (A);A = temp8;break;
case 0x1ba: /** [23ba] xad 3,a **/
    temp8 = RAM[0x3a];RAM[0x3a] = (A);A = temp8;break;
case 0x1bb: /** [23bb] xad 3,b **/
    temp8 = RAM[0x3b];RAM[0x3b] = (A);A = temp8;break;
case 0x1bc: /** [23bc] xad 3,c **/
    temp8 = RAM[0x3c];RAM[0x3c] = (A);A = temp8;break;
case 0x1bd: /** [23bd] xad 3,d **/
    temp8 = RAM[0x3d];RAM[0x3d] = (A);A = temp8;break;
case 0x1be: /** [23be] xad 3,e **/
    temp8 = RAM[0x3e];RAM[0x3e] = (A);A = temp8;break;
case 0x1bf: /** [23bf] xad 3,f **/
    temp8 = RAM[0x3f];RAM[0x3f] = (A);A = temp8;break;
case 0x1c0: /** [23c0] xad 4,0 **/
    temp8 = RAM[0x40];RAM[0x40] = (A);A = temp8;break;
case 0x1c1: /** [23c1] xad 4,1 **/
    temp8 = RAM[0x41];RAM[0x41] = (A);A = temp8;break;
case 0x1c2: /** [23c2] xad 4,2 **/
    temp8 = RAM[0x42];RAM[0x42] = (A);A = temp8;break;
case 0x1c3: /** [23c3] xad 4,3 **/
    temp8 = RAM[0x43];RAM[0x43] = (A);A = temp8;break;
case 0x1c4: /** [23c4] xad 4,4 **/
    temp8 = RAM[0x44];RAM[0x44] = (A);A = temp8;break;
case 0x1c5: /** [23c5] xad 4,5 **/
    temp8 = RAM[0x45];RAM[0x45] = (A);A = temp8;break;
case 0x1c6: /** [23c6] xad 4,6 **/
    temp8 = RAM[0x46];RAM[0x46] = (A);A = temp8;break;
case 0x1c7: /** [23c7] xad 4,7 **/
    temp8 = RAM[0x47];RAM[0x47] = (A);A = temp8;break;
case 0x1c8: /** [23c8] xad 4,8 **/
    temp8 = RAM[0x48];RAM[0x48] = (A);A = temp8;break;
case 0x1c9: /** [23c9] xad 4,9 **/
    temp8 = RAM[0x49];RAM[0x49] = (A);A = temp8;break;
case 0x1ca: /** [23ca] xad 4,a **/
    temp8 = RAM[0x4a];RAM[0x4a] = (A);A = temp8;break;
case 0x1cb: /** [23cb] xad 4,b **/
    temp8 = RAM[0x4b];RAM[0x4b] = (A);A = temp8;break;
case 0x1cc: /** [23cc] xad 4,c **/
    temp8 = RAM[0x4c];RAM[0x4c] = (A);A = temp8;break;
case 0x1cd: /** [23cd] xad 4,d **/
    temp8 = RAM[0x4d];RAM[0x4d] = (A);A = temp8;break;
case 0x1ce: /** [23ce] xad 4,e **/
    temp8 = RAM[0x4e];RAM[0x4e] = (A);A = temp8;break;
case 0x1cf: /** [23cf] xad 4,f **/
    temp8 = RAM[0x4f];RAM[0x4f] = (A);A = temp8;break;
case 0x1d0: /** [23d0] xad 5,0 **/
    temp8 = RAM[0x50];RAM[0x50] = (A);A = temp8;break;
case 0x1d1: /** [23d1] xad 5,1 **/
    temp8 = RAM[0x51];RAM[0x51] = (A);A = temp8;break;
case 0x1d2: /** [23d2] xad 5,2 **/
    temp8 = RAM[0x52];RAM[0x52] = (A);A = temp8;break;
case 0x1d3: /** [23d3] xad 5,3 **/
    temp8 = RAM[0x53];RAM[0x53] = (A);A = temp8;break;
case 0x1d4: /** [23d4] xad 5,4 **/
    temp8 = RAM[0x54];RAM[0x54] = (A);A = temp8;break;
case 0x1d5: /** [23d5] xad 5,5 **/
    temp8 = RAM[0x55];RAM[0x55] = (A);A = temp8;break;
case 0x1d6: /** [23d6] xad 5,6 **/
    temp8 = RAM[0x56];RAM[0x56] = (A);A = temp8;break;
case 0x1d7: /** [23d7] xad 5,7 **/
    temp8 = RAM[0x57];RAM[0x57] = (A);A = temp8;break;
case 0x1d8: /** [23d8] xad 5,8 **/
    temp8 = RAM[0x58];RAM[0x58] = (A);A = temp8;break;
case 0x1d9: /** [23d9] xad 5,9 **/
    temp8 = RAM[0x59];RAM[0x59] = (A);A = temp8;break;
case 0x1da: /** [23da] xad 5,a **/
    temp8 = RAM[0x5a];RAM[0x5a] = (A);A = temp8;break;
case 0x1db: /** [23db] xad 5,b **/
    temp8 = RAM[0x5b];RAM[0x5b] = (A);A = temp8;break;
case 0x1dc: /** [23dc] xad 5,c **/
    temp8 = RAM[0x5c];RAM[0x5c] = (A);A = temp8;break;
case 0x1dd: /** [23dd] xad 5,d **/
    temp8 = RAM[0x5d];RAM[0x5d] = (A);A = temp8;break;
case 0x1de: /** [23de] xad 5,e **/
    temp8 = RAM[0x5e];RAM[0x5e] = (A);A = temp8;break;
case 0x1df: /** [23df] xad 5,f **/
    temp8 = RAM[0x5f];RAM[0x5f] = (A);A = temp8;break;
case 0x1e0: /** [23e0] xad 6,0 **/
    temp8 = RAM[0x60];RAM[0x60] = (A);A = temp8;break;
case 0x1e1: /** [23e1] xad 6,1 **/
    temp8 = RAM[0x61];RAM[0x61] = (A);A = temp8;break;
case 0x1e2: /** [23e2] xad 6,2 **/
    temp8 = RAM[0x62];RAM[0x62] = (A);A = temp8;break;
case 0x1e3: /** [23e3] xad 6,3 **/
    temp8 = RAM[0x63];RAM[0x63] = (A);A = temp8;break;
case 0x1e4: /** [23e4] xad 6,4 **/
    temp8 = RAM[0x64];RAM[0x64] = (A);A = temp8;break;
case 0x1e5: /** [23e5] xad 6,5 **/
    temp8 = RAM[0x65];RAM[0x65] = (A);A = temp8;break;
case 0x1e6: /** [23e6] xad 6,6 **/
    temp8 = RAM[0x66];RAM[0x66] = (A);A = temp8;break;
case 0x1e7: /** [23e7] xad 6,7 **/
    temp8 = RAM[0x67];RAM[0x67] = (A);A = temp8;break;
case 0x1e8: /** [23e8] xad 6,8 **/
    temp8 = RAM[0x68];RAM[0x68] = (A);A = temp8;break;
case 0x1e9: /** [23e9] xad 6,9 **/
    temp8 = RAM[0x69];RAM[0x69] = (A);A = temp8;break;
case 0x1ea: /** [23ea] xad 6,a **/
    temp8 = RAM[0x6a];RAM[0x6a] = (A);A = temp8;break;
case 0x1eb: /** [23eb] xad 6,b **/
    temp8 = RAM[0x6b];RAM[0x6b] = (A);A = temp8;break;
case 0x1ec: /** [23ec] xad 6,c **/
    temp8 = RAM[0x6c];RAM[0x6c] = (A);A = temp8;break;
case 0x1ed: /** [23ed] xad 6,d **/
    temp8 = RAM[0x6d];RAM[0x6d] = (A);A = temp8;break;
case 0x1ee: /** [23ee] xad 6,e **/
    temp8 = RAM[0x6e];RAM[0x6e] = (A);A = temp8;break;
case 0x1ef: /** [23ef] xad 6,f **/
    temp8 = RAM[0x6f];RAM[0x6f] = (A);A = temp8;break;
case 0x1f0: /** [23f0] xad 7,0 **/
    temp8 = RAM[0x70];RAM[0x70] = (A);A = temp8;break;
case 0x1f1: /** [23f1] xad 7,1 **/
    temp8 = RAM[0x71];RAM[0x71] = (A);A = temp8;break;
case 0x1f2: /** [23f2] xad 7,2 **/
    temp8 = RAM[0x72];RAM[0x72] = (A);A = temp8;break;
case 0x1f3: /** [23f3] xad 7,3 **/
    temp8 = RAM[0x73];RAM[0x73] = (A);A = temp8;break;
case 0x1f4: /** [23f4] xad 7,4 **/
    temp8 = RAM[0x74];RAM[0x74] = (A);A = temp8;break;
case 0x1f5: /** [23f5] xad 7,5 **/
    temp8 = RAM[0x75];RAM[0x75] = (A);A = temp8;break;
case 0x1f6: /** [23f6] xad 7,6 **/
    temp8 = RAM[0x76];RAM[0x76] = (A);A = temp8;break;
case 0x1f7: /** [23f7] xad 7,7 **/
    temp8 = RAM[0x77];RAM[0x77] = (A);A = temp8;break;
case 0x1f8: /** [23f8] xad 7,8 **/
    temp8 = RAM[0x78];RAM[0x78] = (A);A = temp8;break;
case 0x1f9: /** [23f9] xad 7,9 **/
    temp8 = RAM[0x79];RAM[0x79] = (A);A = temp8;break;
case 0x1fa: /** [23fa] xad 7,a **/
    temp8 = RAM[0x7a];RAM[0x7a] = (A);A = temp8;break;
case 0x1fb: /** [23fb] xad 7,b **/
    temp8 = RAM[0x7b];RAM[0x7b] = (A);A = temp8;break;
case 0x1fc: /** [23fc] xad 7,c **/
    temp8 = RAM[0x7c];RAM[0x7c] = (A);A = temp8;break;
case 0x1fd: /** [23fd] xad 7,d **/
    temp8 = RAM[0x7d];RAM[0x7d] = (A);A = temp8;break;
case 0x1fe: /** [23fe] xad 7,e **/
    temp8 = RAM[0x7e];RAM[0x7e] = (A);A = temp8;break;
case 0x1ff: /** [23ff] xad 7,f **/
    temp8 = RAM[0x7f];RAM[0x7f] = (A);A = temp8;break;
case 0x200: /** [3300] (unknown) **/
    break;
case 0x201: /** [3301] skgbz 0 **/
    if ((G & 1) == 0) SKIP();break;
case 0x202: /** [3302] (unknown) **/
    break;
case 0x203: /** [3303] skgbz 2 **/
    if ((G & 4) == 0) SKIP();break;
case 0x204: /** [3304] (unknown) **/
    break;
case 0x205: /** [3305] (unknown) **/
    break;
case 0x206: /** [3306] (unknown) **/
    break;
case 0x207: /** [3307] (unknown) **/
    break;
case 0x208: /** [3308] (unknown) **/
    break;
case 0x209: /** [3309] (unknown) **/
    break;
case 0x20a: /** [330a] (unknown) **/
    break;
case 0x20b: /** [330b] (unknown) **/
    break;
case 0x20c: /** [330c] (unknown) **/
    break;
case 0x20d: /** [330d] (unknown) **/
    break;
case 0x20e: /** [330e] (unknown) **/
    break;
case 0x20f: /** [330f] (unknown) **/
    break;
case 0x210: /** [3310] (unknown) **/
    break;
case 0x211: /** [3311] skgbz 1 **/
    if ((G & 2) == 0) SKIP();break;
case 0x212: /** [3312] (unknown) **/
    break;
case 0x213: /** [3313] skgbz 3 **/
    if ((G & 8) == 0) SKIP();break;
case 0x214: /** [3314] (unknown) **/
    break;
case 0x215: /** [3315] (unknown) **/
    break;
case 0x216: /** [3316] (unknown) **/
    break;
case 0x217: /** [3317] (unknown) **/
    break;
case 0x218: /** [3318] (unknown) **/
    break;
case 0x219: /** [3319] (unknown) **/
    break;
case 0x21a: /** [331a] (unknown) **/
    break;
case 0x21b: /** [331b] (unknown) **/
    break;
case 0x21c: /** [331c] (unknown) **/
    break;
case 0x21d: /** [331d] (unknown) **/
    break;
case 0x21e: /** [331e] (unknown) **/
    break;
case 0x21f: /** [331f] (unknown) **/
    break;
case 0x220: /** [3320] (unknown) **/
    break;
case 0x221: /** [3321] skgz **/
    if (G == 0) SKIP();break;
case 0x222: /** [3322] (unknown) **/
    break;
case 0x223: /** [3323] (unknown) **/
    break;
case 0x224: /** [3324] (unknown) **/
    break;
case 0x225: /** [3325] (unknown) **/
    break;
case 0x226: /** [3326] (unknown) **/
    break;
case 0x227: /** [3327] (unknown) **/
    break;
case 0x228: /** [3328] inin **/
    A = INREAD();break;
case 0x229: /** [3329] inil **/
    ;;break;
case 0x22a: /** [332a] ing **/
    A = G;break;
case 0x22b: /** [332b] (unknown) **/
    break;
case 0x22c: /** [332c] cqma **/
    A = Q & 15;RAM[B] = ((Q >> 4) & 15);break;
case 0x22d: /** [332d] (unknown) **/
    break;
case 0x22e: /** [332e] inl **/
    temp8 = LREAD();A = temp8 & 0xF;RAM[B] = ((temp8 >> 4) & 15);break;
case 0x22f: /** [332f] ctma **/
    temp8 = TIMER >> 2;A = temp8 & 0xF;RAM[B] = (temp8 >> 4) & 0x0F;break;
case 0x230: /** [3330] (unknown) **/
    break;
case 0x231: /** [3331] (unknown) **/
    break;
case 0x232: /** [3332] (unknown) **/
    break;
case 0x233: /** [3333] (unknown) **/
    break;
case 0x234: /** [3334] (unknown) **/
    break;
case 0x235: /** [3335] (unknown) **/
    break;
case 0x236: /** [3336] (unknown) **/
    break;
case 0x237: /** [3337] (unknown) **/
    break;
case 0x238: /** [3338] halt **/
    PC = (PC - 2) & 0x7FF;cycles += 200;TIMER += 200;;break;
case 0x239: /** [3339] it **/
    if (TOV == 0) { PC = (PC - 2) & 0x7FF;cycles += 200;TIMER += 200; };break;
case 0x23a: /** [333a] omg **/
    G = RAM[B];UPDATEG(G);break;
case 0x23b: /** [333b] (unknown) **/
    break;
case 0x23c: /** [333c] camq **/
    Q = AM();UPDATEQ(Q);break;
case 0x23d: /** [333d] (unknown) **/
    break;
case 0x23e: /** [333e] obd **/
    D = B & 0x0F;UPDATED(D);break;
case 0x23f: /** [333f] camt **/
    TIMER = AM() << 2;break;
case 0x240: /** [3340] (unknown) **/
    break;
case 0x241: /** [3341] (unknown) **/
    break;
case 0x242: /** [3342] (unknown) **/
    break;
case 0x243: /** [3343] (unknown) **/
    break;
case 0x244: /** [3344] (unknown) **/
    break;
case 0x245: /** [3345] (unknown) **/
    break;
case 0x246: /** [3346] (unknown) **/
    break;
case 0x247: /** [3347] (unknown) **/
    break;
case 0x248: /** [3348] (unknown) **/
    break;
case 0x249: /** [3349] (unknown) **/
    break;
case 0x24a: /** [334a] (unknown) **/
    break;
case 0x24b: /** [334b] (unknown) **/
    break;
case 0x24c: /** [334c] (unknown) **/
    break;
case 0x24d: /** [334d] (unknown) **/
    break;
case 0x24e: /** [334e] (unknown) **/
    break;
case 0x24f: /** [334f] (unknown) **/
    break;
case 0x250: /** [3350] ogi 0 **/
    G = 0x0;UPDATEG(G);break;
case 0x251: /** [3351] ogi 1 **/
    G = 0x1;UPDATEG(G);break;
case 0x252: /** [3352] ogi 2 **/
    G = 0x2;UPDATEG(G);break;
case 0x253: /** [3353] ogi 3 **/
    G = 0x3;UPDATEG(G);break;
case 0x254: /** [3354] ogi 4 **/
    G = 0x4;UPDATEG(G);break;
case 0x255: /** [3355] ogi 5 **/
    G = 0x5;UPDATEG(G);break;
case 0x256: /** [3356] ogi 6 **/
    G = 0x6;UPDATEG(G);break;
case 0x257: /** [3357] ogi 7 **/
    G = 0x7;UPDATEG(G);break;
case 0x258: /** [3358] ogi 8 **/
    G = 0x8;UPDATEG(G);break;
case 0x259: /** [3359] ogi 9 **/
    G = 0x9;UPDATEG(G);break;
case 0x25a: /** [335a] ogi a **/
    G = 0xa;UPDATEG(G);break;
case 0x25b: /** [335b] ogi b **/
    G = 0xb;UPDATEG(G);break;
case 0x25c: /** [335c] ogi c **/
    G = 0xc;UPDATEG(G);break;
case 0x25d: /** [335d] ogi d **/
    G = 0xd;UPDATEG(G);break;
case 0x25e: /** [335e] ogi e **/
    G = 0xe;UPDATEG(G);break;
case 0x25f: /** [335f] ogi f **/
    G = 0xf;UPDATEG(G);break;
case 0x260: /** [3360] lei 0 **/
    EN = 0x0;UPDATEEN(EN);break;
case 0x261: /** [3361] lei 1 **/
    EN = 0x1;UPDATEEN(EN);break;
case 0x262: /** [3362] lei 2 **/
    EN = 0x2;UPDATEEN(EN);break;
case 0x263: /** [3363] lei 3 **/
    EN = 0x3;UPDATEEN(EN);break;
case 0x264: /** [3364] lei 4 **/
    EN = 0x4;UPDATEEN(EN);break;
case 0x265: /** [3365] lei 5 **/
    EN = 0x5;UPDATEEN(EN);break;
case 0x266: /** [3366] lei 6 **/
    EN = 0x6;UPDATEEN(EN);break;
case 0x267: /** [3367] lei 7 **/
    EN = 0x7;UPDATEEN(EN);break;
case 0x268: /** [3368] lei 8 **/
    EN = 0x8;UPDATEEN(EN);break;
case 0x269: /** [3369] lei 9 **/
    EN = 0x9;UPDATEEN(EN);break;
case 0x26a: /** [336a] lei a **/
    EN = 0xa;UPDATEEN(EN);break;
case 0x26b: /** [336b] lei b **/
    EN = 0xb;UPDATEEN(EN);break;
case 0x26c: /** [336c] lei c **/
    EN = 0xc;UPDATEEN(EN);break;
case 0x26d: /** [336d] lei d **/
    EN = 0xd;UPDATEEN(EN);break;
case 0x26e: /** [336e] lei e **/
    EN = 0xe;UPDATEEN(EN);break;
case 0x26f: /** [336f] lei f **/
    EN = 0xf;UPDATEEN(EN);break;
case 0x270: /** [3370] (unknown) **/
    break;
case 0x271: /** [3371] (unknown) **/
    break;
case 0x272: /** [3372] (unknown) **/
    break;
case 0x273: /** [3373] (unknown) **/
    break;
case 0x274: /** [3374] (unknown) **/
    break;
case 0x275: /** [3375] (unknown) **/
    break;
case 0x276: /** [3376] (unknown) **/
    break;
case 0x277: /** [3377] (unknown) **/
    break;
case 0x278: /** [3378] (unknown) **/
    break;
case 0x279: /** [3379] (unknown) **/
    break;
case 0x27a: /** [337a] (unknown) **/
    break;
case 0x27b: /** [337b] (unknown) **/
    break;
case 0x27c: /** [337c] (unknown) **/
    break;
case 0x27d: /** [337d] (unknown) **/
    break;
case 0x27e: /** [337e] (unknown) **/
    break;
case 0x27f: /** [337f] (unknown) **/
    break;
case 0x280: /** [3380] lbi 0,0 **/
    B = 0x00;LBISKIP();break;
case 0x281: /** [3381] lbi 0,1 **/
    B = 0x01;LBISKIP();break;
case 0x282: /** [3382] lbi 0,2 **/
    B = 0x02;LBISKIP();break;
case 0x283: /** [3383] lbi 0,3 **/
    B = 0x03;LBISKIP();break;
case 0x284: /** [3384] lbi 0,4 **/
    B = 0x04;LBISKIP();break;
case 0x285: /** [3385] lbi 0,5 **/
    B = 0x05;LBISKIP();break;
case 0x286: /** [3386] lbi 0,6 **/
    B = 0x06;LBISKIP();break;
case 0x287: /** [3387] lbi 0,7 **/
    B = 0x07;LBISKIP();break;
case 0x288: /** [3388] lbi 0,8 **/
    B = 0x08;LBISKIP();break;
case 0x289: /** [3389] lbi 0,9 **/
    B = 0x09;LBISKIP();break;
case 0x28a: /** [338a] lbi 0,a **/
    B = 0x0a;LBISKIP();break;
case 0x28b: /** [338b] lbi 0,b **/
    B = 0x0b;LBISKIP();break;
case 0x28c: /** [338c] lbi 0,c **/
    B = 0x0c;LBISKIP();break;
case 0x28d: /** [338d] lbi 0,d **/
    B = 0x0d;LBISKIP();break;
case 0x28e: /** [338e] lbi 0,e **/
    B = 0x0e;LBISKIP();break;
case 0x28f: /** [338f] lbi 0,f **/
    B = 0x0f;LBISKIP();break;
case 0x290: /** [3390] lbi 1,0 **/
    B = 0x10;LBISKIP();break;
case 0x291: /** [3391] lbi 1,1 **/
    B = 0x11;LBISKIP();break;
case 0x292: /** [3392] lbi 1,2 **/
    B = 0x12;LBISKIP();break;
case 0x293: /** [3393] lbi 1,3 **/
    B = 0x13;LBISKIP();break;
case 0x294: /** [3394] lbi 1,4 **/
    B = 0x14;LBISKIP();break;
case 0x295: /** [3395] lbi 1,5 **/
    B = 0x15;LBISKIP();break;
case 0x296: /** [3396] lbi 1,6 **/
    B = 0x16;LBISKIP();break;
case 0x297: /** [3397] lbi 1,7 **/
    B = 0x17;LBISKIP();break;
case 0x298: /** [3398] lbi 1,8 **/
    B = 0x18;LBISKIP();break;
case 0x299: /** [3399] lbi 1,9 **/
    B = 0x19;LBISKIP();break;
case 0x29a: /** [339a] lbi 1,a **/
    B = 0x1a;LBISKIP();break;
case 0x29b: /** [339b] lbi 1,b **/
    B = 0x1b;LBISKIP();break;
case 0x29c: /** [339c] lbi 1,c **/
    B = 0x1c;LBISKIP();break;
case 0x29d: /** [339d] lbi 1,d **/
    B = 0x1d;LBISKIP();break;
case 0x29e: /** [339e] lbi 1,e **/
    B = 0x1e;LBISKIP();break;
case 0x29f: /** [339f] lbi 1,f **/
    B = 0x1f;LBISKIP();break;
case 0x2a0: /** [33a0] lbi 2,0 **/
    B = 0x20;LBISKIP();break;
case 0x2a1: /** [33a1] lbi 2,1 **/
    B = 0x21;LBISKIP();break;
case 0x2a2: /** [33a2] lbi 2,2 **/
    B = 0x22;LBISKIP();break;
case 0x2a3: /** [33a3] lbi 2,3 **/
    B = 0x23;LBISKIP();break;
case 0x2a4: /** [33a4] lbi 2,4 **/
    B = 0x24;LBISKIP();break;
case 0x2a5: /** [33a5] lbi 2,5 **/
    B = 0x25;LBISKIP();break;
case 0x2a6: /** [33a6] lbi 2,6 **/
    B = 0x26;LBISKIP();break;
case 0x2a7: /** [33a7] lbi 2,7 **/
    B = 0x27;LBISKIP();break;
case 0x2a8: /** [33a8] lbi 2,8 **/
    B = 0x28;LBISKIP();break;
case 0x2a9: /** [33a9] lbi 2,9 **/
    B = 0x29;LBISKIP();break;
case 0x2aa: /** [33aa] lbi 2,a **/
    B = 0x2a;LBISKIP();break;
case 0x2ab: /** [33ab] lbi 2,b **/
    B = 0x2b;LBISKIP();break;
case 0x2ac: /** [33ac] lbi 2,c **/
    B = 0x2c;LBISKIP();break;
case 0x2ad: /** [33ad] lbi 2,d **/
    B = 0x2d;LBISKIP();break;
case 0x2ae: /** [33ae] lbi 2,e **/
    B = 0x2e;LBISKIP();break;
case 0x2af: /** [33af] lbi 2,f **/
    B = 0x2f;LBISKIP();break;
case 0x2b0: /** [33b0] lbi 3,0 **/
    B = 0x30;LBISKIP();break;
case 0x2b1: /** [33b1] lbi 3,1 **/
    B = 0x31;LBISKIP();break;
case 0x2b2: /** [33b2] lbi 3,2 **/
    B = 0x32;LBISKIP();break;
case 0x2b3: /** [33b3] lbi 3,3 **/
    B = 0x33;LBISKIP();break;
case 0x2b4: /** [33b4] lbi 3,4 **/
    B = 0x34;LBISKIP();break;
case 0x2b5: /** [33b5] lbi 3,5 **/
    B = 0x35;LBISKIP();break;
case 0x2b6: /** [33b6] lbi 3,6 **/
    B = 0x36;LBISKIP();break;
case 0x2b7: /** [33b7] lbi 3,7 **/
    B = 0x37;LBISKIP();break;
case 0x2b8: /** [33b8] lbi 3,8 **/
    B = 0x38;LBISKIP();break;
case 0x2b9: /** [33b9] lbi 3,9 **/
    B = 0x39;LBISKIP();break;
case 0x2ba: /** [33ba] lbi 3,a **/
    B = 0x3a;LBISKIP();break;
case 0x2bb: /** [33bb] lbi 3,b **/
    B = 0x3b;LBISKIP();break;
case 0x2bc: /** [33bc] lbi 3,c **/
    B = 0x3c;LBISKIP();break;
case 0x2bd: /** [33bd] lbi 3,d **/
    B = 0x3d;LBISKIP();break;
case 0x2be: /** [33be] lbi 3,e **/
    B = 0x3e;LBISKIP();break;
case 0x2bf: /** [33bf] lbi 3,f **/
    B = 0x3f;LBISKIP();break;
case 0x2c0: /** [33c0] lbi 0,0 **/
    B = 0x40;LBISKIP();break;
case 0x2c1: /** [33c1] lbi 0,1 **/
    B = 0x41;LBISKIP();break;
case 0x2c2: /** [33c2] lbi 0,2 **/
    B = 0x42;LBISKIP();break;
case 0x2c3: /** [33c3] lbi 0,3 **/
    B = 0x43;LBISKIP();break;
case 0x2c4: /** [33c4] lbi 0,4 **/
    B = 0x44;LBISKIP();break;
case 0x2c5: /** [33c5] lbi 0,5 **/
    B = 0x45;LBISKIP();break;
case 0x2c6: /** [33c6] lbi 0,6 **/
    B = 0x46;LBISKIP();break;
case 0x2c7: /** [33c7] lbi 0,7 **/
    B = 0x47;LBISKIP();break;
case 0x2c8: /** [33c8] lbi 0,8 **/
    B = 0x48;LBISKIP();break;
case 0x2c9: /** [33c9] lbi 0,9 **/
    B = 0x49;LBISKIP();break;
case 0x2ca: /** [33ca] lbi 0,a **/
    B = 0x4a;LBISKIP();break;
case 0x2cb: /** [33cb] lbi 0,b **/
    B = 0x4b;LBISKIP();break;
case 0x2cc: /** [33cc] lbi 0,c **/
    B = 0x4c;LBISKIP();break;
case 0x2cd: /** [33cd] lbi 0,d **/
    B = 0x4d;LBISKIP();break;
case 0x2ce: /** [33ce] lbi 0,e **/
    B = 0x4e;LBISKIP();break;
case 0x2cf: /** [33cf] lbi 0,f **/
    B = 0x4f;LBISKIP();break;
case 0x2d0: /** [33d0] lbi 1,0 **/
    B = 0x50;LBISKIP();break;
case 0x2d1: /** [33d1] lbi 1,1 **/
    B = 0x51;LBISKIP();break;
case 0x2d2: /** [33d2] lbi 1,2 **/
    B = 0x52;LBISKIP();break;
case 0x2d3: /** [33d3] lbi 1,3 **/
    B = 0x53;LBISKIP();break;
case 0x2d4: /** [33d4] lbi 1,4 **/
    B = 0x54;LBISKIP();break;
case 0x2d5: /** [33d5] lbi 1,5 **/
    B = 0x55;LBISKIP();break;
case 0x2d6: /** [33d6] lbi 1,6 **/
    B = 0x56;LBISKIP();break;
case 0x2d7: /** [33d7] lbi 1,7 **/
    B = 0x57;LBISKIP();break;
case 0x2d8: /** [33d8] lbi 1,8 **/
    B = 0x58;LBISKIP();break;
case 0x2d9: /** [33d9] lbi 1,9 **/
    B = 0x59;LBISKIP();break;
case 0x2da: /** [33da] lbi 1,a **/
    B = 0x5a;LBISKIP();break;
case 0x2db: /** [33db] lbi 1,b **/
    B = 0x5b;LBISKIP();break;
case 0x2dc: /** [33dc] lbi 1,c **/
    B = 0x5c;LBISKIP();break;
case 0x2dd: /** [33dd] lbi 1,d **/
    B = 0x5d;LBISKIP();break;
case 0x2de: /** [33de] lbi 1,e **/
    B = 0x5e;LBISKIP();break;
case 0x2df: /** [33df] lbi 1,f **/
    B = 0x5f;LBISKIP();break;
case 0x2e0: /** [33e0] lbi 2,0 **/
    B = 0x60;LBISKIP();break;
case 0x2e1: /** [33e1] lbi 2,1 **/
    B = 0x61;LBISKIP();break;
case 0x2e2: /** [33e2] lbi 2,2 **/
    B = 0x62;LBISKIP();break;
case 0x2e3: /** [33e3] lbi 2,3 **/
    B = 0x63;LBISKIP();break;
case 0x2e4: /** [33e4] lbi 2,4 **/
    B = 0x64;LBISKIP();break;
case 0x2e5: /** [33e5] lbi 2,5 **/
    B = 0x65;LBISKIP();break;
case 0x2e6: /** [33e6] lbi 2,6 **/
    B = 0x66;LBISKIP();break;
case 0x2e7: /** [33e7] lbi 2,7 **/
    B = 0x67;LBISKIP();break;
case 0x2e8: /** [33e8] lbi 2,8 **/
    B = 0x68;LBISKIP();break;
case 0x2e9: /** [33e9] lbi 2,9 **/
    B = 0x69;LBISKIP();break;
case 0x2ea: /** [33ea] lbi 2,a **/
    B = 0x6a;LBISKIP();break;
case 0x2eb: /** [33eb] lbi 2,b **/
    B = 0x6b;LBISKIP();break;
case 0x2ec: /** [33ec] lbi 2,c **/
    B = 0x6c;LBISKIP();break;
case 0x2ed: /** [33ed] lbi 2,d **/
    B = 0x6d;LBISKIP();break;
case 0x2ee: /** [33ee] lbi 2,e **/
    B = 0x6e;LBISKIP();break;
case 0x2ef: /** [33ef] lbi 2,f **/
    B = 0x6f;LBISKIP();break;
case 0x2f0: /** [33f0] lbi 3,0 **/
    B = 0x70;LBISKIP();break;
case 0x2f1: /** [33f1] lbi 3,1 **/
    B = 0x71;LBISKIP();break;
case 0x2f2: /** [33f2] lbi 3,2 **/
    B = 0x72;LBISKIP();break;
case 0x2f3: /** [33f3] lbi 3,3 **/
    B = 0x73;LBISKIP();break;
case 0x2f4: /** [33f4] lbi 3,4 **/
    B = 0x74;LBISKIP();break;
case 0x2f5: /** [33f5] lbi 3,5 **/
    B = 0x75;LBISKIP();break;
case 0x2f6: /** [33f6] lbi 3,6 **/
    B = 0x76;LBISKIP();break;
case 0x2f7: /** [33f7] lbi 3,7 **/
    B = 0x77;LBISKIP();break;
case 0x2f8: /** [33f8] lbi 3,8 **/
    B = 0x78;LBISKIP();break;
case 0x2f9: /** [33f9] lbi 3,9 **/
    B = 0x79;LBISKIP();break;
case 0x2fa: /** [33fa] lbi 3,a **/
    B = 0x7a;LBISKIP();break;
case 0x2fb: /** [33fb] lbi 3,b **/
    B = 0x7b;LBISKIP();break;
case 0x2fc: /** [33fc] lbi 3,c **/
    B = 0x7c;LBISKIP();break;
case 0x2fd: /** [33fd] lbi 3,d **/
    B = 0x7d;LBISKIP();break;
case 0x2fe: /** [33fe] lbi 3,e **/
    B = 0x7e;LBISKIP();break;
case 0x2ff: /** [33ff] lbi 3,f **/
    B = 0x7f;LBISKIP();break;
