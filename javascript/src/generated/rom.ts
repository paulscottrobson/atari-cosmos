class ROMImage {
public static rom:number[] = [
0,51,98,104,79,168,95,242,51,183,0,85,1,85,35,173,35,56,81,35,174,104,43,217,213,104,143,104,43,217,1,242,3,51,184,51,183,0,81,2,6,96,8,170,166,58,0,33,73,72,188,105,137,188,35,56,51,208,75,95,77,51,208,1,196,105,137,200,47,1,96,0,172,51,185,0,87,255,30,51,255,0,7,209,18,95,217,18,209,28,126,127,72,100,0,98,128,98,192,99,128,100,0,51,56,51,56,51,56,51,56,0,93,95,97,99,101,103,105,107,109,44,112,112,46,114,72,0,0,220,218,216,214,212,210,208,206,204,202,200,198,196,194,192,97,219,97,218,97,207,97,206,97,200,97,194,97,193,97,186,97,185,97,178,97,159,97,107,97,80,97,36,96,247,96,231,96,230,96,229,96,228,96,227,96,226,96,224,96,121,96,78,97,225,98,5,98,17,98,21,98,36,98,42,98,43,98,46,98,49,98,52,98,55,98,57,98,108,98,110,98,141,0,0,51,137,9,10,11,12,13,14,78,79,72,46,5,95,96,243,6,96,61,47,77,96,61,190,11,116,27,125,72,0,0,0,0,64,32,16,8,4,2,1,1,2,4,8,16,32,64,128,63,6,91,79,102,109,125,7,127,103,113,0,0,0,0,0,128,64,32,16,30,21,51,57,65,68,78,95,72,80,35,190,0,191,19,229,21,75,53,82,252,0,81,191,35,15,95,68,30,51,44,75,32,67,51,58,80,51,62,35,62,80,97,45,0,81,80,35,159,51,62,51,40,61,6,0,1,35,31,51,185,2,6,30,5,48,210,51,185,5,72,0,80,51,62,51,88,35,15,95,51,80,0,58,6,0,82,191,5,7,51,46,68,4,4,81,6,3,72,97,121,46,5,105,151,6,105,151,7,202,18,95,72,18,202,35,159,18,64,18,35,31,72,166,170,51,183,1,230,170,51,180,5,19,236,238,78,82,81,7,232,72,57,19,97,193,17,249,72,11,5,89,254,73,6,67,72,11,5,94,73,81,6,72,57,3,206,1,218,72,11,21,5,83,97,214,21,73,5,81,22,72,11,21,5,87,212,88,216,78,35,159,18,35,190,51,182,50,5,48,68,7,5,48,251,6,35,62,18,35,31,80,35,54,72,6,0,81,2,4,0,93,2,97,241,45,5,81,6,5,86,72,7,78,83,72,198,0,33,72,73,59,1,217,72,10,141,72,35,12,22,35,28,22,96,178,10,141,232,72,144,73,10,0,6,72,14,112,72,47,19,238,14,120,72,0,94,35,190,78,35,159,35,31,61,33,202,61,5,95,72,6,98,62,34,15,80,5,35,190,80,35,62,33,50,78,35,190,21,5,35,159,80,35,31,33,50,78,35,159,21,32,98,67,35,62,80,73,0,82,64,63,4,0,6,170,51,177,5,81,98,114,7,246,72,0,0,0,136,164,162,68,51,177,19,212,11,133,193,96,129,190,134,174,104,131,96,235,51,135,141,217,224,148,224,137,142,0,89,79,5,7,214,143,18,0,18,80,141,193,143,22,0,22,67,193,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,190,172,51,135,78,35,169,78,6,3,206,21,77,21,66,5,82,7,199,42,112,164,107,41,106,240,107,54,162,140,139,213,0,87,10,132,213,137,138,142,51,169,5,95,192,35,169,213,182,42,0,33,99,18,51,135,141,99,0,5,7,98,248,72,35,42,95,68,49,6,5,94,204,91,98,251,0,81,35,171,98,251,6,41,0,82,2,6,51,135,141,224,5,7,218,72,21,5,81,6,21,83,220,96,129,43,5,81,244,35,41,64,94,68,6,72,6,73,51,136,141,99,84,78,35,168,143,18,18,80,5,95,99,62,21,35,167,21,35,168,80,35,39,22,35,40,22,72,35,50,88,211,148,220,137,211,21,21,83,211,35,12,33,211,96,129,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,190,9,113,112,119,25,121,112,124,164,152,68,140,107,167,10,107,201,141,107,152,107,215,201,154,220,137,72,21,64,82,72,35,26,33,72,142,184,72,51,177,19,236,72,143,93,107,195,107,183,19,99,190,107,195,41,53,95,68,49,6,72,5,82,72,99,181,41,0,82,2,6,72,0,84,33,72,21,21,86,72,64,82,72,137,182,72,51,137,107,201,104,141,234,104,143,85,72,113,35,26,35,153,104,182,72,158,238,137,72,0,87,33,72,21,35,28,33,72,96,129,0,0,0,0,0,0,0,190,11,119,27,122,164,152,68,51,134,37,38,7,202,51,177,19,211,197,9,37,49,95,241,5,95,37,5,81,6,0,19,6,0,82,18,5,39,212,11,133,100,5,89,96,129,142,178,197,104,143,86,228,38,0,81,38,0,54,54,228,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0
];
}
