class ROMImage {
public static rom:number[] = [
0,51,98,104,79,142,95,242,51,183,0,85,1,85,35,173,35,56,81,35,174,104,43,217,213,104,162,104,43,217,1,242,3,51,184,51,183,0,81,2,6,96,8,132,143,58,0,33,73,72,168,105,137,168,35,56,51,208,75,95,77,51,208,1,196,105,137,200,47,1,96,0,164,51,185,0,87,255,30,51,255,0,7,209,18,95,217,18,209,28,126,127,72,98,128,98,128,98,192,99,128,100,0,100,64,51,56,51,56,51,56,0,93,95,97,99,101,103,105,107,109,44,112,112,46,114,72,0,0,220,218,216,214,212,210,208,206,204,202,200,198,196,194,192,98,50,97,194,96,230,98,141,97,195,98,37,98,22,98,6,97,219,97,226,96,247,97,201,96,121,96,231,96,229,98,109,96,227,97,208,97,220,96,224,98,56,96,226,98,111,97,185,97,107,97,80,98,18,98,44,96,228,97,178,96,78,97,207,98,47,98,53,97,159,97,36,98,58,97,186,98,43,0,0,51,137,9,10,11,12,13,14,78,79,72,46,5,95,96,243,6,96,61,47,77,96,61,104,137,11,116,27,125,72,0,0,0,64,32,16,8,4,2,1,1,2,4,8,16,32,64,128,63,6,91,79,102,109,125,7,127,103,113,0,0,0,0,0,128,64,32,16,30,21,51,57,65,68,78,95,72,80,35,190,0,191,19,229,21,75,53,82,252,0,81,191,35,15,95,68,30,51,44,75,32,67,51,58,80,51,62,35,62,80,97,45,0,81,80,35,159,51,62,51,40,61,6,0,1,35,31,51,185,2,6,30,5,48,210,51,185,5,72,0,80,51,62,51,88,35,15,95,51,80,0,58,6,0,82,191,5,7,51,46,68,4,4,81,6,3,72,97,121,46,5,105,151,6,105,151,7,202,18,95,72,18,202,35,159,18,64,18,35,31,72,143,132,51,183,1,230,132,51,180,5,19,236,238,78,82,81,7,232,72,57,19,97,194,17,249,72,11,5,89,97,191,73,6,67,72,11,5,94,73,81,6,72,57,3,207,1,219,72,11,21,5,83,97,215,21,73,5,81,22,72,11,21,5,87,213,88,217,78,35,159,18,35,190,51,182,50,5,48,68,7,5,48,252,6,35,62,18,35,31,80,35,54,72,6,0,81,2,4,0,93,2,97,242,45,5,81,6,5,86,72,7,78,83,72,199,0,33,72,73,59,1,218,72,10,141,72,35,12,22,35,28,22,96,172,10,141,233,72,180,73,10,0,6,72,14,112,72,47,19,239,14,120,72,0,94,35,190,78,35,159,35,31,61,33,203,61,5,95,72,6,98,63,34,15,80,5,35,190,80,35,62,33,50,78,35,190,21,5,35,159,80,35,31,33,50,78,35,159,21,32,98,68,35,62,80,73,0,82,64,63,4,0,6,132,51,177,5,81,98,115,7,247,72,0,0,135,133,138,68,51,177,19,212,11,184,193,96,150,137,134,170,104,174,96,235,51,135,141,217,224,178,224,140,158,0,89,79,5,7,214,162,18,0,18,80,141,193,162,22,0,22,67,193,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,137,164,51,135,78,35,169,78,6,3,206,21,77,21,66,5,82,7,199,42,112,133,107,41,106,240,107,54,138,156,154,213,0,87,10,131,213,140,129,158,51,169,5,95,192,35,169,213,176,42,0,33,99,18,51,135,141,99,0,5,7,98,248,72,35,42,95,68,49,6,5,94,204,91,98,251,0,81,35,171,98,251,6,41,0,82,2,6,51,135,141,224,5,7,218,72,21,5,81,6,21,83,220,96,150,43,5,81,244,35,41,64,94,68,6,72,6,73,51,136,141,99,84,78,35,168,162,18,18,80,5,95,99,62,21,35,167,21,35,168,80,35,39,22,35,40,22,72,35,50,88,211,178,220,140,211,21,21,83,211,35,12,33,211,96,150,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,137,9,119,112,113,25,121,112,124,133,166,68,156,107,166,10,107,200,141,107,152,107,214,201,130,220,140,72,21,89,72,35,26,33,72,158,186,72,51,177,19,235,72,162,93,107,194,107,182,19,99,189,107,194,41,53,95,68,49,6,72,5,82,72,99,180,41,0,82,2,6,72,0,84,33,72,21,21,86,72,64,82,72,140,176,72,51,137,107,200,104,141,233,104,162,85,72,119,35,26,35,153,104,176,72,152,237,140,72,0,81,33,72,21,35,28,33,72,96,150,0,0,0,0,0,0,0,0,137,11,119,27,122,133,166,68,51,134,37,38,7,202,51,177,19,211,197,9,37,49,95,241,5,95,37,5,81,6,0,19,6,0,82,18,5,39,212,11,184,100,5,89,96,150,158,172,197,104,162,86,228,38,0,81,38,0,54,54,228,0,0,0,137,11,113,27,115,108,187,51,181,116,119,133,166,68,10,104,141,217,0,35,171,156,10,108,178,51,177,19,222,203,108,153,10,108,112,108,153,9,141,237,108,167,108,178,203,108,112,203,5,95,72,78,85,247,81,49,22,53,18,18,49,95,100,130,108,140,0,18,19,100,199,0,33,72,100,199,5,81,6,37,93,96,180,94,72,94,96,178,72,10,104,184,72,86,72,64,81,72,9,112,112,182,72,162,86,72,88,25,22,119,41,112,176,9,21,0,89,33,72,21,96,140,72,31,34,120,122,123,124,125,32,72,50,100,189,0,22,0,88,33,95,68,49,6,78,85,221,21,85,80,0,33,72,119,158,47,229,21,80,0,33,72,113,51,169,5,81,6,35,41,64,84,96,150,47,5,91,72,6,51,133,112,112,112,112,112,158,158,158,96,186,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
];
}
