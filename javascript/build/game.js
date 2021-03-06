var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var GameState = (function (_super) {
    __extends(GameState, _super);
    function GameState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    GameState.prototype.init = function (gameInfo) {
        this.hardware = new Hardware(this.game);
        this.cpu = new COP444(this.hardware);
        for (var n = 0; n < 1142; n++)
            this.cpu.execute();
    };
    GameState.prototype.create = function () {
    };
    GameState.prototype.destroy = function () {
        this.hardware.destroy();
        this.hardware = null;
    };
    GameState.prototype.update = function () {
        var elapsed = this.game.time.elapsedMS * 250;
        while (this.cpu.execute() < elapsed) { }
        this.cpu.endOfFrame();
        this.hardware.endOfFrame();
    };
    return GameState;
}(Phaser.State));
window.onload = function () {
    var game = new CosmosApplication();
};
var CosmosApplication = (function (_super) {
    __extends(CosmosApplication, _super);
    function CosmosApplication() {
        var _this = _super.call(this, {
            enableDebug: false,
            width: 640,
            height: 960,
            renderer: Phaser.AUTO,
            parent: null,
            transparent: false,
            antialias: true
        }) || this;
        _this.state.add("Boot", new BootState());
        _this.state.add("Preload", new PreloadState());
        _this.state.add("Game", new GameState());
        _this.state.start("Boot");
        return _this;
    }
    CosmosApplication.getGameID = function () {
        var s = this.getURLName("game", "0");
        return parseInt(s, 10);
    };
    CosmosApplication.getURLName = function (key, defaultValue) {
        if (defaultValue === void 0) { defaultValue = ""; }
        var name = decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key.toLowerCase()).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
        return (name == "") ? defaultValue : name;
    };
    CosmosApplication.gameID = 1;
    return CosmosApplication;
}(Phaser.Game));
var BootState = (function (_super) {
    __extends(BootState, _super);
    function BootState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BootState.prototype.preload = function () {
        var _this = this;
        this.game.load.image("loader", "assets/sprites/loader.png");
        this.game.load.onLoadComplete.add(function () { _this.game.state.start("Preload", true, false, 1); }, this);
    };
    BootState.prototype.create = function () {
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    };
    return BootState;
}(Phaser.State));
var PreloadState = (function (_super) {
    __extends(PreloadState, _super);
    function PreloadState() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    PreloadState.prototype.preload = function () {
        var _this = this;
        this.game.stage.backgroundColor = "#000000";
        var loader = this.add.sprite(this.game.width / 2, this.game.height / 2, "loader");
        loader.width = this.game.width * 9 / 10;
        loader.height = this.game.height / 8;
        loader.anchor.setTo(0.5);
        this.game.load.setPreloadSprite(loader);
        this.game.load.atlas("sprites", "assets/sprites/sprites.png", "assets/sprites/sprites.json");
        var name = "comb0" + (CosmosApplication.getGameID().toString()) + ".png";
        this.game.load.spritesheet("hologram", "assets/holograms/" + name, 32, 32);
        for (var _i = 0, _a = ["font"]; _i < _a.length; _i++) {
            var fontName = _a[_i];
            this.game.load.bitmapFont(fontName, "assets/fonts/" + fontName + ".png", "assets/fonts/" + fontName + ".fnt");
        }
        for (var _b = 0, _c = Hardware.SOUNDNAMES; _b < _c.length; _b++) {
            var audioName = _c[_b];
            this.game.load.audio(audioName, ["assets/sounds/" + audioName + ".mp3",
                "assets/sounds/" + audioName + ".ogg"]);
        }
        var info = {};
        this.game.load.onLoadComplete.add(function () {
            _this.game.state.start("Game", true, false, info);
        }, this);
    };
    return PreloadState;
}(Phaser.State));
var COP444Base = (function () {
    function COP444Base(hardware) {
        this.hardware = hardware;
    }
    return COP444Base;
}());
var COP444Opcodes = (function (_super) {
    __extends(COP444Opcodes, _super);
    function COP444Opcodes() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    COP444Opcodes.prototype.getOpcodeFunctionTable = function () {
        return [
            this.opcode_000, this.opcode_001, this.opcode_002, this.opcode_003, this.opcode_004, this.opcode_005, this.opcode_006, this.opcode_007, this.opcode_008, this.opcode_009, this.opcode_00a, this.opcode_00b, this.opcode_00c, this.opcode_00d, this.opcode_00e, this.opcode_00f, this.opcode_010, this.opcode_011, this.opcode_012, this.opcode_013, this.opcode_014, this.opcode_015, this.opcode_016, this.opcode_017, this.opcode_018, this.opcode_019, this.opcode_01a, this.opcode_01b, this.opcode_01c, this.opcode_01d, this.opcode_01e, this.opcode_01f, this.opcode_020, this.opcode_021, this.opcode_022, this.opcode_023, this.opcode_024, this.opcode_025, this.opcode_026, this.opcode_027, this.opcode_028, this.opcode_029, this.opcode_02a, this.opcode_02b, this.opcode_02c, this.opcode_02d, this.opcode_02e, this.opcode_02f, this.opcode_030, this.opcode_031, this.opcode_032, this.opcode_033, this.opcode_034, this.opcode_035, this.opcode_036, this.opcode_037, this.opcode_038, this.opcode_039, this.opcode_03a, this.opcode_03b, this.opcode_03c, this.opcode_03d, this.opcode_03e, this.opcode_03f, this.opcode_040, this.opcode_041, this.opcode_042, this.opcode_043, this.opcode_044, this.opcode_045, this.opcode_046, this.opcode_047, this.opcode_048, this.opcode_049, this.opcode_04a, this.opcode_04b, this.opcode_04c, this.opcode_04d, this.opcode_04e, this.opcode_04f, this.opcode_050, this.opcode_051, this.opcode_052, this.opcode_053, this.opcode_054, this.opcode_055, this.opcode_056, this.opcode_057, this.opcode_058, this.opcode_059, this.opcode_05a, this.opcode_05b, this.opcode_05c, this.opcode_05d, this.opcode_05e, this.opcode_05f, this.opcode_060, this.opcode_061, this.opcode_062, this.opcode_063, this.opcode_064, this.opcode_065, this.opcode_066, this.opcode_067, this.opcode_068, this.opcode_069, this.opcode_06a, this.opcode_06b, this.opcode_06c, this.opcode_06d, this.opcode_06e, this.opcode_06f, this.opcode_070, this.opcode_071, this.opcode_072, this.opcode_073, this.opcode_074, this.opcode_075, this.opcode_076, this.opcode_077, this.opcode_078, this.opcode_079, this.opcode_07a, this.opcode_07b, this.opcode_07c, this.opcode_07d, this.opcode_07e, this.opcode_07f, this.opcode_080, this.opcode_081, this.opcode_082, this.opcode_083, this.opcode_084, this.opcode_085, this.opcode_086, this.opcode_087, this.opcode_088, this.opcode_089, this.opcode_08a, this.opcode_08b, this.opcode_08c, this.opcode_08d, this.opcode_08e, this.opcode_08f, this.opcode_090, this.opcode_091, this.opcode_092, this.opcode_093, this.opcode_094, this.opcode_095, this.opcode_096, this.opcode_097, this.opcode_098, this.opcode_099, this.opcode_09a, this.opcode_09b, this.opcode_09c, this.opcode_09d, this.opcode_09e, this.opcode_09f, this.opcode_0a0, this.opcode_0a1, this.opcode_0a2, this.opcode_0a3, this.opcode_0a4, this.opcode_0a5, this.opcode_0a6, this.opcode_0a7, this.opcode_0a8, this.opcode_0a9, this.opcode_0aa, this.opcode_0ab, this.opcode_0ac, this.opcode_0ad, this.opcode_0ae, this.opcode_0af, this.opcode_0b0, this.opcode_0b1, this.opcode_0b2, this.opcode_0b3, this.opcode_0b4, this.opcode_0b5, this.opcode_0b6, this.opcode_0b7, this.opcode_0b8, this.opcode_0b9, this.opcode_0ba, this.opcode_0bb, this.opcode_0bc, this.opcode_0bd, this.opcode_0be, this.opcode_0bf, this.opcode_0c0, this.opcode_0c1, this.opcode_0c2, this.opcode_0c3, this.opcode_0c4, this.opcode_0c5, this.opcode_0c6, this.opcode_0c7, this.opcode_0c8, this.opcode_0c9, this.opcode_0ca, this.opcode_0cb, this.opcode_0cc, this.opcode_0cd, this.opcode_0ce, this.opcode_0cf, this.opcode_0d0, this.opcode_0d1, this.opcode_0d2, this.opcode_0d3, this.opcode_0d4, this.opcode_0d5, this.opcode_0d6, this.opcode_0d7, this.opcode_0d8, this.opcode_0d9, this.opcode_0da, this.opcode_0db, this.opcode_0dc, this.opcode_0dd, this.opcode_0de, this.opcode_0df, this.opcode_0e0, this.opcode_0e1, this.opcode_0e2, this.opcode_0e3, this.opcode_0e4, this.opcode_0e5, this.opcode_0e6, this.opcode_0e7, this.opcode_0e8, this.opcode_0e9, this.opcode_0ea, this.opcode_0eb, this.opcode_0ec, this.opcode_0ed, this.opcode_0ee, this.opcode_0ef, this.opcode_0f0, this.opcode_0f1, this.opcode_0f2, this.opcode_0f3, this.opcode_0f4, this.opcode_0f5, this.opcode_0f6, this.opcode_0f7, this.opcode_0f8, this.opcode_0f9, this.opcode_0fa, this.opcode_0fb, this.opcode_0fc, this.opcode_0fd, this.opcode_0fe, this.opcode_0ff, this.opcode_100, this.opcode_101, this.opcode_102, this.opcode_103, this.opcode_104, this.opcode_105, this.opcode_106, this.opcode_107, this.opcode_108, this.opcode_109, this.opcode_10a, this.opcode_10b, this.opcode_10c, this.opcode_10d, this.opcode_10e, this.opcode_10f, this.opcode_110, this.opcode_111, this.opcode_112, this.opcode_113, this.opcode_114, this.opcode_115, this.opcode_116, this.opcode_117, this.opcode_118, this.opcode_119, this.opcode_11a, this.opcode_11b, this.opcode_11c, this.opcode_11d, this.opcode_11e, this.opcode_11f, this.opcode_120, this.opcode_121, this.opcode_122, this.opcode_123, this.opcode_124, this.opcode_125, this.opcode_126, this.opcode_127, this.opcode_128, this.opcode_129, this.opcode_12a, this.opcode_12b, this.opcode_12c, this.opcode_12d, this.opcode_12e, this.opcode_12f, this.opcode_130, this.opcode_131, this.opcode_132, this.opcode_133, this.opcode_134, this.opcode_135, this.opcode_136, this.opcode_137, this.opcode_138, this.opcode_139, this.opcode_13a, this.opcode_13b, this.opcode_13c, this.opcode_13d, this.opcode_13e, this.opcode_13f, this.opcode_140, this.opcode_141, this.opcode_142, this.opcode_143, this.opcode_144, this.opcode_145, this.opcode_146, this.opcode_147, this.opcode_148, this.opcode_149, this.opcode_14a, this.opcode_14b, this.opcode_14c, this.opcode_14d, this.opcode_14e, this.opcode_14f, this.opcode_150, this.opcode_151, this.opcode_152, this.opcode_153, this.opcode_154, this.opcode_155, this.opcode_156, this.opcode_157, this.opcode_158, this.opcode_159, this.opcode_15a, this.opcode_15b, this.opcode_15c, this.opcode_15d, this.opcode_15e, this.opcode_15f, this.opcode_160, this.opcode_161, this.opcode_162, this.opcode_163, this.opcode_164, this.opcode_165, this.opcode_166, this.opcode_167, this.opcode_168, this.opcode_169, this.opcode_16a, this.opcode_16b, this.opcode_16c, this.opcode_16d, this.opcode_16e, this.opcode_16f, this.opcode_170, this.opcode_171, this.opcode_172, this.opcode_173, this.opcode_174, this.opcode_175, this.opcode_176, this.opcode_177, this.opcode_178, this.opcode_179, this.opcode_17a, this.opcode_17b, this.opcode_17c, this.opcode_17d, this.opcode_17e, this.opcode_17f, this.opcode_180, this.opcode_181, this.opcode_182, this.opcode_183, this.opcode_184, this.opcode_185, this.opcode_186, this.opcode_187, this.opcode_188, this.opcode_189, this.opcode_18a, this.opcode_18b, this.opcode_18c, this.opcode_18d, this.opcode_18e, this.opcode_18f, this.opcode_190, this.opcode_191, this.opcode_192, this.opcode_193, this.opcode_194, this.opcode_195, this.opcode_196, this.opcode_197, this.opcode_198, this.opcode_199, this.opcode_19a, this.opcode_19b, this.opcode_19c, this.opcode_19d, this.opcode_19e, this.opcode_19f, this.opcode_1a0, this.opcode_1a1, this.opcode_1a2, this.opcode_1a3, this.opcode_1a4, this.opcode_1a5, this.opcode_1a6, this.opcode_1a7, this.opcode_1a8, this.opcode_1a9, this.opcode_1aa, this.opcode_1ab, this.opcode_1ac, this.opcode_1ad, this.opcode_1ae, this.opcode_1af, this.opcode_1b0, this.opcode_1b1, this.opcode_1b2, this.opcode_1b3, this.opcode_1b4, this.opcode_1b5, this.opcode_1b6, this.opcode_1b7, this.opcode_1b8, this.opcode_1b9, this.opcode_1ba, this.opcode_1bb, this.opcode_1bc, this.opcode_1bd, this.opcode_1be, this.opcode_1bf, this.opcode_1c0, this.opcode_1c1, this.opcode_1c2, this.opcode_1c3, this.opcode_1c4, this.opcode_1c5, this.opcode_1c6, this.opcode_1c7, this.opcode_1c8, this.opcode_1c9, this.opcode_1ca, this.opcode_1cb, this.opcode_1cc, this.opcode_1cd, this.opcode_1ce, this.opcode_1cf, this.opcode_1d0, this.opcode_1d1, this.opcode_1d2, this.opcode_1d3, this.opcode_1d4, this.opcode_1d5, this.opcode_1d6, this.opcode_1d7, this.opcode_1d8, this.opcode_1d9, this.opcode_1da, this.opcode_1db, this.opcode_1dc, this.opcode_1dd, this.opcode_1de, this.opcode_1df, this.opcode_1e0, this.opcode_1e1, this.opcode_1e2, this.opcode_1e3, this.opcode_1e4, this.opcode_1e5, this.opcode_1e6, this.opcode_1e7, this.opcode_1e8, this.opcode_1e9, this.opcode_1ea, this.opcode_1eb, this.opcode_1ec, this.opcode_1ed, this.opcode_1ee, this.opcode_1ef, this.opcode_1f0, this.opcode_1f1, this.opcode_1f2, this.opcode_1f3, this.opcode_1f4, this.opcode_1f5, this.opcode_1f6, this.opcode_1f7, this.opcode_1f8, this.opcode_1f9, this.opcode_1fa, this.opcode_1fb, this.opcode_1fc, this.opcode_1fd, this.opcode_1fe, this.opcode_1ff, this.opcode_200, this.opcode_201, this.opcode_202, this.opcode_203, this.opcode_204, this.opcode_205, this.opcode_206, this.opcode_207, this.opcode_208, this.opcode_209, this.opcode_20a, this.opcode_20b, this.opcode_20c, this.opcode_20d, this.opcode_20e, this.opcode_20f, this.opcode_210, this.opcode_211, this.opcode_212, this.opcode_213, this.opcode_214, this.opcode_215, this.opcode_216, this.opcode_217, this.opcode_218, this.opcode_219, this.opcode_21a, this.opcode_21b, this.opcode_21c, this.opcode_21d, this.opcode_21e, this.opcode_21f, this.opcode_220, this.opcode_221, this.opcode_222, this.opcode_223, this.opcode_224, this.opcode_225, this.opcode_226, this.opcode_227, this.opcode_228, this.opcode_229, this.opcode_22a, this.opcode_22b, this.opcode_22c, this.opcode_22d, this.opcode_22e, this.opcode_22f, this.opcode_230, this.opcode_231, this.opcode_232, this.opcode_233, this.opcode_234, this.opcode_235, this.opcode_236, this.opcode_237, this.opcode_238, this.opcode_239, this.opcode_23a, this.opcode_23b, this.opcode_23c, this.opcode_23d, this.opcode_23e, this.opcode_23f, this.opcode_240, this.opcode_241, this.opcode_242, this.opcode_243, this.opcode_244, this.opcode_245, this.opcode_246, this.opcode_247, this.opcode_248, this.opcode_249, this.opcode_24a, this.opcode_24b, this.opcode_24c, this.opcode_24d, this.opcode_24e, this.opcode_24f, this.opcode_250, this.opcode_251, this.opcode_252, this.opcode_253, this.opcode_254, this.opcode_255, this.opcode_256, this.opcode_257, this.opcode_258, this.opcode_259, this.opcode_25a, this.opcode_25b, this.opcode_25c, this.opcode_25d, this.opcode_25e, this.opcode_25f, this.opcode_260, this.opcode_261, this.opcode_262, this.opcode_263, this.opcode_264, this.opcode_265, this.opcode_266, this.opcode_267, this.opcode_268, this.opcode_269, this.opcode_26a, this.opcode_26b, this.opcode_26c, this.opcode_26d, this.opcode_26e, this.opcode_26f, this.opcode_270, this.opcode_271, this.opcode_272, this.opcode_273, this.opcode_274, this.opcode_275, this.opcode_276, this.opcode_277, this.opcode_278, this.opcode_279, this.opcode_27a, this.opcode_27b, this.opcode_27c, this.opcode_27d, this.opcode_27e, this.opcode_27f, this.opcode_280, this.opcode_281, this.opcode_282, this.opcode_283, this.opcode_284, this.opcode_285, this.opcode_286, this.opcode_287, this.opcode_288, this.opcode_289, this.opcode_28a, this.opcode_28b, this.opcode_28c, this.opcode_28d, this.opcode_28e, this.opcode_28f, this.opcode_290, this.opcode_291, this.opcode_292, this.opcode_293, this.opcode_294, this.opcode_295, this.opcode_296, this.opcode_297, this.opcode_298, this.opcode_299, this.opcode_29a, this.opcode_29b, this.opcode_29c, this.opcode_29d, this.opcode_29e, this.opcode_29f, this.opcode_2a0, this.opcode_2a1, this.opcode_2a2, this.opcode_2a3, this.opcode_2a4, this.opcode_2a5, this.opcode_2a6, this.opcode_2a7, this.opcode_2a8, this.opcode_2a9, this.opcode_2aa, this.opcode_2ab, this.opcode_2ac, this.opcode_2ad, this.opcode_2ae, this.opcode_2af, this.opcode_2b0, this.opcode_2b1, this.opcode_2b2, this.opcode_2b3, this.opcode_2b4, this.opcode_2b5, this.opcode_2b6, this.opcode_2b7, this.opcode_2b8, this.opcode_2b9, this.opcode_2ba, this.opcode_2bb, this.opcode_2bc, this.opcode_2bd, this.opcode_2be, this.opcode_2bf, this.opcode_2c0, this.opcode_2c1, this.opcode_2c2, this.opcode_2c3, this.opcode_2c4, this.opcode_2c5, this.opcode_2c6, this.opcode_2c7, this.opcode_2c8, this.opcode_2c9, this.opcode_2ca, this.opcode_2cb, this.opcode_2cc, this.opcode_2cd, this.opcode_2ce, this.opcode_2cf, this.opcode_2d0, this.opcode_2d1, this.opcode_2d2, this.opcode_2d3, this.opcode_2d4, this.opcode_2d5, this.opcode_2d6, this.opcode_2d7, this.opcode_2d8, this.opcode_2d9, this.opcode_2da, this.opcode_2db, this.opcode_2dc, this.opcode_2dd, this.opcode_2de, this.opcode_2df, this.opcode_2e0, this.opcode_2e1, this.opcode_2e2, this.opcode_2e3, this.opcode_2e4, this.opcode_2e5, this.opcode_2e6, this.opcode_2e7, this.opcode_2e8, this.opcode_2e9, this.opcode_2ea, this.opcode_2eb, this.opcode_2ec, this.opcode_2ed, this.opcode_2ee, this.opcode_2ef, this.opcode_2f0, this.opcode_2f1, this.opcode_2f2, this.opcode_2f3, this.opcode_2f4, this.opcode_2f5, this.opcode_2f6, this.opcode_2f7, this.opcode_2f8, this.opcode_2f9, this.opcode_2fa, this.opcode_2fb, this.opcode_2fc, this.opcode_2fd, this.opcode_2fe, this.opcode_2ff
        ];
    };
    COP444Opcodes.prototype.opcode_000 = function () { this.a = 0; ; };
    ;
    COP444Opcodes.prototype.opcode_001 = function () { if ((this.ramMemory[this.b] & 1) == 0)
        this.skip(); };
    ;
    COP444Opcodes.prototype.opcode_002 = function () { this.a = this.a ^ this.ramMemory[this.b]; };
    ;
    COP444Opcodes.prototype.opcode_003 = function () { if ((this.ramMemory[this.b] & 4) == 0)
        this.skip(); };
    ;
    COP444Opcodes.prototype.opcode_004 = function () { this.temp8 = this.ramMemory[this.b]; this.ramMemory[this.b] = (this.a); this.a = this.temp8; this.b = this.b ^ (0 << 4); this.b = (this.b & 0x70) + ((this.b + 1) & 0x0F); if ((this.b & 0x0F) == 0x00)
        this.skip(); ; };
    ;
    COP444Opcodes.prototype.opcode_005 = function () { this.a = this.ramMemory[this.b]; this.b = this.b ^ (0 << 4); };
    ;
    COP444Opcodes.prototype.opcode_006 = function () { this.temp8 = this.ramMemory[this.b]; this.ramMemory[this.b] = (this.a); this.a = this.temp8; this.b = this.b ^ (0 << 4); };
    ;
    COP444Opcodes.prototype.opcode_007 = function () { this.temp8 = this.ramMemory[this.b]; this.ramMemory[this.b] = (this.a); this.a = this.temp8; this.b = this.b ^ (0 << 4); this.b = (this.b & 0x70) + ((this.b - 1) & 0x0F); if ((this.b & 0x0F) == 0x0F)
        this.skip(); ; };
    ;
    COP444Opcodes.prototype.opcode_008 = function () { this.b = 0x09; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_009 = function () { this.b = 0x0a; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_00a = function () { this.b = 0x0b; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_00b = function () { this.b = 0x0c; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_00c = function () { this.b = 0x0d; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_00d = function () { this.b = 0x0e; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_00e = function () { this.b = 0x0f; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_00f = function () { this.b = 0x00; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_010 = function () { this.a = (this.a ^ 15) + this.ramMemory[this.b] + this.c; this.c = (this.a >> 4) & 1; this.a = this.a & 15; if (this.c != 0)
        this.skip(); ; };
    ;
    COP444Opcodes.prototype.opcode_011 = function () { if ((this.ramMemory[this.b] & 2) == 0)
        this.skip(); };
    ;
    COP444Opcodes.prototype.opcode_012 = function () { this.temp8 = this.a & 7; this.a = (this.b >> 4) & 7; this.b = (this.b & 0x0F) + (this.temp8 << 4); ; };
    ;
    COP444Opcodes.prototype.opcode_013 = function () { if ((this.ramMemory[this.b] & 8) == 0)
        this.skip(); };
    ;
    COP444Opcodes.prototype.opcode_014 = function () { this.temp8 = this.ramMemory[this.b]; this.ramMemory[this.b] = (this.a); this.a = this.temp8; this.b = this.b ^ (1 << 4); this.b = (this.b & 0x70) + ((this.b + 1) & 0x0F); if ((this.b & 0x0F) == 0x00)
        this.skip(); ; };
    ;
    COP444Opcodes.prototype.opcode_015 = function () { this.a = this.ramMemory[this.b]; this.b = this.b ^ (1 << 4); };
    ;
    COP444Opcodes.prototype.opcode_016 = function () { this.temp8 = this.ramMemory[this.b]; this.ramMemory[this.b] = (this.a); this.a = this.temp8; this.b = this.b ^ (1 << 4); };
    ;
    COP444Opcodes.prototype.opcode_017 = function () { this.temp8 = this.ramMemory[this.b]; this.ramMemory[this.b] = (this.a); this.a = this.temp8; this.b = this.b ^ (1 << 4); this.b = (this.b & 0x70) + ((this.b - 1) & 0x0F); if ((this.b & 0x0F) == 0x0F)
        this.skip(); ; };
    ;
    COP444Opcodes.prototype.opcode_018 = function () { this.b = 0x19; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_019 = function () { this.b = 0x1a; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_01a = function () { this.b = 0x1b; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_01b = function () { this.b = 0x1c; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_01c = function () { this.b = 0x1d; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_01d = function () { this.b = 0x1e; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_01e = function () { this.b = 0x1f; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_01f = function () { this.b = 0x10; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_020 = function () { if (this.c != 0)
        this.skip(); };
    ;
    COP444Opcodes.prototype.opcode_021 = function () { if (this.a == this.ramMemory[this.b])
        this.skip(); };
    ;
    COP444Opcodes.prototype.opcode_022 = function () { this.c = 1; };
    ;
    COP444Opcodes.prototype.opcode_023 = function () { };
    ;
    COP444Opcodes.prototype.opcode_024 = function () { this.temp8 = this.ramMemory[this.b]; this.ramMemory[this.b] = (this.a); this.a = this.temp8; this.b = this.b ^ (2 << 4); this.b = (this.b & 0x70) + ((this.b + 1) & 0x0F); if ((this.b & 0x0F) == 0x00)
        this.skip(); ; };
    ;
    COP444Opcodes.prototype.opcode_025 = function () { this.a = this.ramMemory[this.b]; this.b = this.b ^ (2 << 4); };
    ;
    COP444Opcodes.prototype.opcode_026 = function () { this.temp8 = this.ramMemory[this.b]; this.ramMemory[this.b] = (this.a); this.a = this.temp8; this.b = this.b ^ (2 << 4); };
    ;
    COP444Opcodes.prototype.opcode_027 = function () { this.temp8 = this.ramMemory[this.b]; this.ramMemory[this.b] = (this.a); this.a = this.temp8; this.b = this.b ^ (2 << 4); this.b = (this.b & 0x70) + ((this.b - 1) & 0x0F); if ((this.b & 0x0F) == 0x0F)
        this.skip(); ; };
    ;
    COP444Opcodes.prototype.opcode_028 = function () { this.b = 0x29; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_029 = function () { this.b = 0x2a; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_02a = function () { this.b = 0x2b; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_02b = function () { this.b = 0x2c; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_02c = function () { this.b = 0x2d; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_02d = function () { this.b = 0x2e; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_02e = function () { this.b = 0x2f; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_02f = function () { this.b = 0x20; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_030 = function () { this.a = this.a + this.ramMemory[this.b] + this.c; this.c = (this.a >> 4) & 1; this.a = this.a & 15; if (this.c != 0)
        this.skip(); ; };
    ;
    COP444Opcodes.prototype.opcode_031 = function () { this.a = (this.a + this.ramMemory[this.b]) & 15; };
    ;
    COP444Opcodes.prototype.opcode_032 = function () { this.c = 0; };
    ;
    COP444Opcodes.prototype.opcode_033 = function () { };
    ;
    COP444Opcodes.prototype.opcode_034 = function () { this.temp8 = this.ramMemory[this.b]; this.ramMemory[this.b] = (this.a); this.a = this.temp8; this.b = this.b ^ (3 << 4); this.b = (this.b & 0x70) + ((this.b + 1) & 0x0F); if ((this.b & 0x0F) == 0x00)
        this.skip(); ; };
    ;
    COP444Opcodes.prototype.opcode_035 = function () { this.a = this.ramMemory[this.b]; this.b = this.b ^ (3 << 4); };
    ;
    COP444Opcodes.prototype.opcode_036 = function () { this.temp8 = this.ramMemory[this.b]; this.ramMemory[this.b] = (this.a); this.a = this.temp8; this.b = this.b ^ (3 << 4); };
    ;
    COP444Opcodes.prototype.opcode_037 = function () { this.temp8 = this.ramMemory[this.b]; this.ramMemory[this.b] = (this.a); this.a = this.temp8; this.b = this.b ^ (3 << 4); this.b = (this.b & 0x70) + ((this.b - 1) & 0x0F); if ((this.b & 0x0F) == 0x0F)
        this.skip(); ; };
    ;
    COP444Opcodes.prototype.opcode_038 = function () { this.b = 0x39; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_039 = function () { this.b = 0x3a; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_03a = function () { this.b = 0x3b; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_03b = function () { this.b = 0x3c; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_03c = function () { this.b = 0x3d; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_03d = function () { this.b = 0x3e; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_03e = function () { this.b = 0x3f; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_03f = function () { this.b = 0x30; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_040 = function () { this.a = this.a ^ 15; ; };
    ;
    COP444Opcodes.prototype.opcode_041 = function () { if (this.tov != 0) {
        this.tov = 0;
        this.skip();
    } ; };
    ;
    COP444Opcodes.prototype.opcode_042 = function () { this.temp8 = this.ramMemory[this.b]; this.ramMemory[this.b] = (this.temp8 & 0x0b); };
    ;
    COP444Opcodes.prototype.opcode_043 = function () { this.temp8 = this.ramMemory[this.b]; this.ramMemory[this.b] = (this.temp8 & 0x07); };
    ;
    COP444Opcodes.prototype.opcode_044 = function () { ; ; };
    ;
    COP444Opcodes.prototype.opcode_045 = function () { this.temp8 = this.ramMemory[this.b]; this.ramMemory[this.b] = (this.temp8 & 0x0d); };
    ;
    COP444Opcodes.prototype.opcode_046 = function () { this.temp8 = this.ramMemory[this.b]; this.ramMemory[this.b] = (this.temp8 | 0x04); };
    ;
    COP444Opcodes.prototype.opcode_047 = function () { this.temp8 = this.ramMemory[this.b]; this.ramMemory[this.b] = (this.temp8 | 0x02); };
    ;
    COP444Opcodes.prototype.opcode_048 = function () { this.pc = this.sa; this.sa = this.sb; this.sb = this.sc; this.sc = 0; };
    ;
    COP444Opcodes.prototype.opcode_049 = function () { this.pc = this.sa; this.sa = this.sb; this.sb = this.sc; this.sc = 0; this.skip(); };
    ;
    COP444Opcodes.prototype.opcode_04a = function () { this.a = (this.a + 10) & 15; };
    ;
    COP444Opcodes.prototype.opcode_04b = function () { this.temp8 = this.ramMemory[this.b]; this.ramMemory[this.b] = (this.temp8 | 0x08); };
    ;
    COP444Opcodes.prototype.opcode_04c = function () { this.temp8 = this.ramMemory[this.b]; this.ramMemory[this.b] = (this.temp8 & 0x0e); };
    ;
    COP444Opcodes.prototype.opcode_04d = function () { this.temp8 = this.ramMemory[this.b]; this.ramMemory[this.b] = (this.temp8 | 0x01); };
    ;
    COP444Opcodes.prototype.opcode_04e = function () { this.a = this.b & 0x0F; };
    ;
    COP444Opcodes.prototype.opcode_04f = function () { this.hardware.siowrite(this.a); this.a = 0; };
    ;
    COP444Opcodes.prototype.opcode_050 = function () { this.b = (this.b & 0x70) | this.a; };
    ;
    COP444Opcodes.prototype.opcode_051 = function () { this.a = this.a + 0x1; this.c = (this.a >> 4) & 1; this.a = this.a & 15; if (this.c != 0)
        this.skip(); ; };
    ;
    COP444Opcodes.prototype.opcode_052 = function () { this.a = this.a + 0x2; this.c = (this.a >> 4) & 1; this.a = this.a & 15; if (this.c != 0)
        this.skip(); ; };
    ;
    COP444Opcodes.prototype.opcode_053 = function () { this.a = this.a + 0x3; this.c = (this.a >> 4) & 1; this.a = this.a & 15; if (this.c != 0)
        this.skip(); ; };
    ;
    COP444Opcodes.prototype.opcode_054 = function () { this.a = this.a + 0x4; this.c = (this.a >> 4) & 1; this.a = this.a & 15; if (this.c != 0)
        this.skip(); ; };
    ;
    COP444Opcodes.prototype.opcode_055 = function () { this.a = this.a + 0x5; this.c = (this.a >> 4) & 1; this.a = this.a & 15; if (this.c != 0)
        this.skip(); ; };
    ;
    COP444Opcodes.prototype.opcode_056 = function () { this.a = this.a + 0x6; this.c = (this.a >> 4) & 1; this.a = this.a & 15; if (this.c != 0)
        this.skip(); ; };
    ;
    COP444Opcodes.prototype.opcode_057 = function () { this.a = this.a + 0x7; this.c = (this.a >> 4) & 1; this.a = this.a & 15; if (this.c != 0)
        this.skip(); ; };
    ;
    COP444Opcodes.prototype.opcode_058 = function () { this.a = this.a + 0x8; this.c = (this.a >> 4) & 1; this.a = this.a & 15; if (this.c != 0)
        this.skip(); ; };
    ;
    COP444Opcodes.prototype.opcode_059 = function () { this.a = this.a + 0x9; this.c = (this.a >> 4) & 1; this.a = this.a & 15; if (this.c != 0)
        this.skip(); ; };
    ;
    COP444Opcodes.prototype.opcode_05a = function () { this.a = this.a + 0xa; this.c = (this.a >> 4) & 1; this.a = this.a & 15; if (this.c != 0)
        this.skip(); ; };
    ;
    COP444Opcodes.prototype.opcode_05b = function () { this.a = this.a + 0xb; this.c = (this.a >> 4) & 1; this.a = this.a & 15; if (this.c != 0)
        this.skip(); ; };
    ;
    COP444Opcodes.prototype.opcode_05c = function () { this.a = this.a + 0xc; this.c = (this.a >> 4) & 1; this.a = this.a & 15; if (this.c != 0)
        this.skip(); ; };
    ;
    COP444Opcodes.prototype.opcode_05d = function () { this.a = this.a + 0xd; this.c = (this.a >> 4) & 1; this.a = this.a & 15; if (this.c != 0)
        this.skip(); ; };
    ;
    COP444Opcodes.prototype.opcode_05e = function () { this.a = this.a + 0xe; this.c = (this.a >> 4) & 1; this.a = this.a & 15; if (this.c != 0)
        this.skip(); ; };
    ;
    COP444Opcodes.prototype.opcode_05f = function () { this.a = this.a + 0xf; this.c = (this.a >> 4) & 1; this.a = this.a & 15; if (this.c != 0)
        this.skip(); ; };
    ;
    COP444Opcodes.prototype.opcode_060 = function () { this.temp8 = this.fetch(); this.pc = (0x000) | this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_061 = function () { this.temp8 = this.fetch(); this.pc = (0x100) | this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_062 = function () { this.temp8 = this.fetch(); this.pc = (0x200) | this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_063 = function () { this.temp8 = this.fetch(); this.pc = (0x300) | this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_064 = function () { this.temp8 = this.fetch(); this.pc = (0x400) | this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_065 = function () { this.temp8 = this.fetch(); this.pc = (0x500) | this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_066 = function () { this.temp8 = this.fetch(); this.pc = (0x600) | this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_067 = function () { this.temp8 = this.fetch(); this.pc = (0x700) | this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_068 = function () { this.temp8 = this.fetch(); this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = (0x000) | this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_069 = function () { this.temp8 = this.fetch(); this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = (0x100) | this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_06a = function () { this.temp8 = this.fetch(); this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = (0x200) | this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_06b = function () { this.temp8 = this.fetch(); this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = (0x300) | this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_06c = function () { this.temp8 = this.fetch(); this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = (0x400) | this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_06d = function () { this.temp8 = this.fetch(); this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = (0x500) | this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_06e = function () { this.temp8 = this.fetch(); this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = (0x600) | this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_06f = function () { this.temp8 = this.fetch(); this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = (0x700) | this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_070 = function () { this.ramMemory[this.b] = (0x0); this.b = (this.b & 0x70) + ((this.b + 1) & 0x0F); };
    ;
    COP444Opcodes.prototype.opcode_071 = function () { this.ramMemory[this.b] = (0x1); this.b = (this.b & 0x70) + ((this.b + 1) & 0x0F); };
    ;
    COP444Opcodes.prototype.opcode_072 = function () { this.ramMemory[this.b] = (0x2); this.b = (this.b & 0x70) + ((this.b + 1) & 0x0F); };
    ;
    COP444Opcodes.prototype.opcode_073 = function () { this.ramMemory[this.b] = (0x3); this.b = (this.b & 0x70) + ((this.b + 1) & 0x0F); };
    ;
    COP444Opcodes.prototype.opcode_074 = function () { this.ramMemory[this.b] = (0x4); this.b = (this.b & 0x70) + ((this.b + 1) & 0x0F); };
    ;
    COP444Opcodes.prototype.opcode_075 = function () { this.ramMemory[this.b] = (0x5); this.b = (this.b & 0x70) + ((this.b + 1) & 0x0F); };
    ;
    COP444Opcodes.prototype.opcode_076 = function () { this.ramMemory[this.b] = (0x6); this.b = (this.b & 0x70) + ((this.b + 1) & 0x0F); };
    ;
    COP444Opcodes.prototype.opcode_077 = function () { this.ramMemory[this.b] = (0x7); this.b = (this.b & 0x70) + ((this.b + 1) & 0x0F); };
    ;
    COP444Opcodes.prototype.opcode_078 = function () { this.ramMemory[this.b] = (0x8); this.b = (this.b & 0x70) + ((this.b + 1) & 0x0F); };
    ;
    COP444Opcodes.prototype.opcode_079 = function () { this.ramMemory[this.b] = (0x9); this.b = (this.b & 0x70) + ((this.b + 1) & 0x0F); };
    ;
    COP444Opcodes.prototype.opcode_07a = function () { this.ramMemory[this.b] = (0xa); this.b = (this.b & 0x70) + ((this.b + 1) & 0x0F); };
    ;
    COP444Opcodes.prototype.opcode_07b = function () { this.ramMemory[this.b] = (0xb); this.b = (this.b & 0x70) + ((this.b + 1) & 0x0F); };
    ;
    COP444Opcodes.prototype.opcode_07c = function () { this.ramMemory[this.b] = (0xc); this.b = (this.b & 0x70) + ((this.b + 1) & 0x0F); };
    ;
    COP444Opcodes.prototype.opcode_07d = function () { this.ramMemory[this.b] = (0xd); this.b = (this.b & 0x70) + ((this.b + 1) & 0x0F); };
    ;
    COP444Opcodes.prototype.opcode_07e = function () { this.ramMemory[this.b] = (0xe); this.b = (this.b & 0x70) + ((this.b + 1) & 0x0F); };
    ;
    COP444Opcodes.prototype.opcode_07f = function () { this.ramMemory[this.b] = (0xf); this.b = (this.b & 0x70) + ((this.b + 1) & 0x0F); };
    ;
    COP444Opcodes.prototype.opcode_080 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x080; };
    ;
    COP444Opcodes.prototype.opcode_081 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x081; };
    ;
    COP444Opcodes.prototype.opcode_082 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x082; };
    ;
    COP444Opcodes.prototype.opcode_083 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x083; };
    ;
    COP444Opcodes.prototype.opcode_084 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x084; };
    ;
    COP444Opcodes.prototype.opcode_085 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x085; };
    ;
    COP444Opcodes.prototype.opcode_086 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x086; };
    ;
    COP444Opcodes.prototype.opcode_087 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x087; };
    ;
    COP444Opcodes.prototype.opcode_088 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x088; };
    ;
    COP444Opcodes.prototype.opcode_089 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x089; };
    ;
    COP444Opcodes.prototype.opcode_08a = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x08a; };
    ;
    COP444Opcodes.prototype.opcode_08b = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x08b; };
    ;
    COP444Opcodes.prototype.opcode_08c = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x08c; };
    ;
    COP444Opcodes.prototype.opcode_08d = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x08d; };
    ;
    COP444Opcodes.prototype.opcode_08e = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x08e; };
    ;
    COP444Opcodes.prototype.opcode_08f = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x08f; };
    ;
    COP444Opcodes.prototype.opcode_090 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x090; };
    ;
    COP444Opcodes.prototype.opcode_091 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x091; };
    ;
    COP444Opcodes.prototype.opcode_092 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x092; };
    ;
    COP444Opcodes.prototype.opcode_093 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x093; };
    ;
    COP444Opcodes.prototype.opcode_094 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x094; };
    ;
    COP444Opcodes.prototype.opcode_095 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x095; };
    ;
    COP444Opcodes.prototype.opcode_096 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x096; };
    ;
    COP444Opcodes.prototype.opcode_097 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x097; };
    ;
    COP444Opcodes.prototype.opcode_098 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x098; };
    ;
    COP444Opcodes.prototype.opcode_099 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x099; };
    ;
    COP444Opcodes.prototype.opcode_09a = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x09a; };
    ;
    COP444Opcodes.prototype.opcode_09b = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x09b; };
    ;
    COP444Opcodes.prototype.opcode_09c = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x09c; };
    ;
    COP444Opcodes.prototype.opcode_09d = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x09d; };
    ;
    COP444Opcodes.prototype.opcode_09e = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x09e; };
    ;
    COP444Opcodes.prototype.opcode_09f = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x09f; };
    ;
    COP444Opcodes.prototype.opcode_0a0 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x0a0; };
    ;
    COP444Opcodes.prototype.opcode_0a1 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x0a1; };
    ;
    COP444Opcodes.prototype.opcode_0a2 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x0a2; };
    ;
    COP444Opcodes.prototype.opcode_0a3 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x0a3; };
    ;
    COP444Opcodes.prototype.opcode_0a4 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x0a4; };
    ;
    COP444Opcodes.prototype.opcode_0a5 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x0a5; };
    ;
    COP444Opcodes.prototype.opcode_0a6 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x0a6; };
    ;
    COP444Opcodes.prototype.opcode_0a7 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x0a7; };
    ;
    COP444Opcodes.prototype.opcode_0a8 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x0a8; };
    ;
    COP444Opcodes.prototype.opcode_0a9 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x0a9; };
    ;
    COP444Opcodes.prototype.opcode_0aa = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x0aa; };
    ;
    COP444Opcodes.prototype.opcode_0ab = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x0ab; };
    ;
    COP444Opcodes.prototype.opcode_0ac = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x0ac; };
    ;
    COP444Opcodes.prototype.opcode_0ad = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x0ad; };
    ;
    COP444Opcodes.prototype.opcode_0ae = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x0ae; };
    ;
    COP444Opcodes.prototype.opcode_0af = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x0af; };
    ;
    COP444Opcodes.prototype.opcode_0b0 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x0b0; };
    ;
    COP444Opcodes.prototype.opcode_0b1 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x0b1; };
    ;
    COP444Opcodes.prototype.opcode_0b2 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x0b2; };
    ;
    COP444Opcodes.prototype.opcode_0b3 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x0b3; };
    ;
    COP444Opcodes.prototype.opcode_0b4 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x0b4; };
    ;
    COP444Opcodes.prototype.opcode_0b5 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x0b5; };
    ;
    COP444Opcodes.prototype.opcode_0b6 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x0b6; };
    ;
    COP444Opcodes.prototype.opcode_0b7 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x0b7; };
    ;
    COP444Opcodes.prototype.opcode_0b8 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x0b8; };
    ;
    COP444Opcodes.prototype.opcode_0b9 = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x0b9; };
    ;
    COP444Opcodes.prototype.opcode_0ba = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x0ba; };
    ;
    COP444Opcodes.prototype.opcode_0bb = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x0bb; };
    ;
    COP444Opcodes.prototype.opcode_0bc = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x0bc; };
    ;
    COP444Opcodes.prototype.opcode_0bd = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x0bd; };
    ;
    COP444Opcodes.prototype.opcode_0be = function () { this.sc = this.sb; this.sb = this.sa; this.sa = this.pc; this.pc = 0x0be; };
    ;
    COP444Opcodes.prototype.opcode_0bf = function () { this.q = this.romMemory[(this.pc & 0x700) | ((this.a << 4) | this.ramMemory[this.b])]; this.sc = this.sb; this.hardware.updateq(this.q); };
    ;
    COP444Opcodes.prototype.opcode_0c0 = function () { this.pc = (this.pc & 0x7c0) | 0x000; };
    ;
    COP444Opcodes.prototype.opcode_0c1 = function () { this.pc = (this.pc & 0x7c0) | 0x001; };
    ;
    COP444Opcodes.prototype.opcode_0c2 = function () { this.pc = (this.pc & 0x7c0) | 0x002; };
    ;
    COP444Opcodes.prototype.opcode_0c3 = function () { this.pc = (this.pc & 0x7c0) | 0x003; };
    ;
    COP444Opcodes.prototype.opcode_0c4 = function () { this.pc = (this.pc & 0x7c0) | 0x004; };
    ;
    COP444Opcodes.prototype.opcode_0c5 = function () { this.pc = (this.pc & 0x7c0) | 0x005; };
    ;
    COP444Opcodes.prototype.opcode_0c6 = function () { this.pc = (this.pc & 0x7c0) | 0x006; };
    ;
    COP444Opcodes.prototype.opcode_0c7 = function () { this.pc = (this.pc & 0x7c0) | 0x007; };
    ;
    COP444Opcodes.prototype.opcode_0c8 = function () { this.pc = (this.pc & 0x7c0) | 0x008; };
    ;
    COP444Opcodes.prototype.opcode_0c9 = function () { this.pc = (this.pc & 0x7c0) | 0x009; };
    ;
    COP444Opcodes.prototype.opcode_0ca = function () { this.pc = (this.pc & 0x7c0) | 0x00a; };
    ;
    COP444Opcodes.prototype.opcode_0cb = function () { this.pc = (this.pc & 0x7c0) | 0x00b; };
    ;
    COP444Opcodes.prototype.opcode_0cc = function () { this.pc = (this.pc & 0x7c0) | 0x00c; };
    ;
    COP444Opcodes.prototype.opcode_0cd = function () { this.pc = (this.pc & 0x7c0) | 0x00d; };
    ;
    COP444Opcodes.prototype.opcode_0ce = function () { this.pc = (this.pc & 0x7c0) | 0x00e; };
    ;
    COP444Opcodes.prototype.opcode_0cf = function () { this.pc = (this.pc & 0x7c0) | 0x00f; };
    ;
    COP444Opcodes.prototype.opcode_0d0 = function () { this.pc = (this.pc & 0x7c0) | 0x010; };
    ;
    COP444Opcodes.prototype.opcode_0d1 = function () { this.pc = (this.pc & 0x7c0) | 0x011; };
    ;
    COP444Opcodes.prototype.opcode_0d2 = function () { this.pc = (this.pc & 0x7c0) | 0x012; };
    ;
    COP444Opcodes.prototype.opcode_0d3 = function () { this.pc = (this.pc & 0x7c0) | 0x013; };
    ;
    COP444Opcodes.prototype.opcode_0d4 = function () { this.pc = (this.pc & 0x7c0) | 0x014; };
    ;
    COP444Opcodes.prototype.opcode_0d5 = function () { this.pc = (this.pc & 0x7c0) | 0x015; };
    ;
    COP444Opcodes.prototype.opcode_0d6 = function () { this.pc = (this.pc & 0x7c0) | 0x016; };
    ;
    COP444Opcodes.prototype.opcode_0d7 = function () { this.pc = (this.pc & 0x7c0) | 0x017; };
    ;
    COP444Opcodes.prototype.opcode_0d8 = function () { this.pc = (this.pc & 0x7c0) | 0x018; };
    ;
    COP444Opcodes.prototype.opcode_0d9 = function () { this.pc = (this.pc & 0x7c0) | 0x019; };
    ;
    COP444Opcodes.prototype.opcode_0da = function () { this.pc = (this.pc & 0x7c0) | 0x01a; };
    ;
    COP444Opcodes.prototype.opcode_0db = function () { this.pc = (this.pc & 0x7c0) | 0x01b; };
    ;
    COP444Opcodes.prototype.opcode_0dc = function () { this.pc = (this.pc & 0x7c0) | 0x01c; };
    ;
    COP444Opcodes.prototype.opcode_0dd = function () { this.pc = (this.pc & 0x7c0) | 0x01d; };
    ;
    COP444Opcodes.prototype.opcode_0de = function () { this.pc = (this.pc & 0x7c0) | 0x01e; };
    ;
    COP444Opcodes.prototype.opcode_0df = function () { this.pc = (this.pc & 0x7c0) | 0x01f; };
    ;
    COP444Opcodes.prototype.opcode_0e0 = function () { this.pc = (this.pc & 0x7c0) | 0x020; };
    ;
    COP444Opcodes.prototype.opcode_0e1 = function () { this.pc = (this.pc & 0x7c0) | 0x021; };
    ;
    COP444Opcodes.prototype.opcode_0e2 = function () { this.pc = (this.pc & 0x7c0) | 0x022; };
    ;
    COP444Opcodes.prototype.opcode_0e3 = function () { this.pc = (this.pc & 0x7c0) | 0x023; };
    ;
    COP444Opcodes.prototype.opcode_0e4 = function () { this.pc = (this.pc & 0x7c0) | 0x024; };
    ;
    COP444Opcodes.prototype.opcode_0e5 = function () { this.pc = (this.pc & 0x7c0) | 0x025; };
    ;
    COP444Opcodes.prototype.opcode_0e6 = function () { this.pc = (this.pc & 0x7c0) | 0x026; };
    ;
    COP444Opcodes.prototype.opcode_0e7 = function () { this.pc = (this.pc & 0x7c0) | 0x027; };
    ;
    COP444Opcodes.prototype.opcode_0e8 = function () { this.pc = (this.pc & 0x7c0) | 0x028; };
    ;
    COP444Opcodes.prototype.opcode_0e9 = function () { this.pc = (this.pc & 0x7c0) | 0x029; };
    ;
    COP444Opcodes.prototype.opcode_0ea = function () { this.pc = (this.pc & 0x7c0) | 0x02a; };
    ;
    COP444Opcodes.prototype.opcode_0eb = function () { this.pc = (this.pc & 0x7c0) | 0x02b; };
    ;
    COP444Opcodes.prototype.opcode_0ec = function () { this.pc = (this.pc & 0x7c0) | 0x02c; };
    ;
    COP444Opcodes.prototype.opcode_0ed = function () { this.pc = (this.pc & 0x7c0) | 0x02d; };
    ;
    COP444Opcodes.prototype.opcode_0ee = function () { this.pc = (this.pc & 0x7c0) | 0x02e; };
    ;
    COP444Opcodes.prototype.opcode_0ef = function () { this.pc = (this.pc & 0x7c0) | 0x02f; };
    ;
    COP444Opcodes.prototype.opcode_0f0 = function () { this.pc = (this.pc & 0x7c0) | 0x030; };
    ;
    COP444Opcodes.prototype.opcode_0f1 = function () { this.pc = (this.pc & 0x7c0) | 0x031; };
    ;
    COP444Opcodes.prototype.opcode_0f2 = function () { this.pc = (this.pc & 0x7c0) | 0x032; };
    ;
    COP444Opcodes.prototype.opcode_0f3 = function () { this.pc = (this.pc & 0x7c0) | 0x033; };
    ;
    COP444Opcodes.prototype.opcode_0f4 = function () { this.pc = (this.pc & 0x7c0) | 0x034; };
    ;
    COP444Opcodes.prototype.opcode_0f5 = function () { this.pc = (this.pc & 0x7c0) | 0x035; };
    ;
    COP444Opcodes.prototype.opcode_0f6 = function () { this.pc = (this.pc & 0x7c0) | 0x036; };
    ;
    COP444Opcodes.prototype.opcode_0f7 = function () { this.pc = (this.pc & 0x7c0) | 0x037; };
    ;
    COP444Opcodes.prototype.opcode_0f8 = function () { this.pc = (this.pc & 0x7c0) | 0x038; };
    ;
    COP444Opcodes.prototype.opcode_0f9 = function () { this.pc = (this.pc & 0x7c0) | 0x039; };
    ;
    COP444Opcodes.prototype.opcode_0fa = function () { this.pc = (this.pc & 0x7c0) | 0x03a; };
    ;
    COP444Opcodes.prototype.opcode_0fb = function () { this.pc = (this.pc & 0x7c0) | 0x03b; };
    ;
    COP444Opcodes.prototype.opcode_0fc = function () { this.pc = (this.pc & 0x7c0) | 0x03c; };
    ;
    COP444Opcodes.prototype.opcode_0fd = function () { this.pc = (this.pc & 0x7c0) | 0x03d; };
    ;
    COP444Opcodes.prototype.opcode_0fe = function () { this.pc = (this.pc & 0x7c0) | 0x03e; };
    ;
    COP444Opcodes.prototype.opcode_0ff = function () { this.temp8 = this.romMemory[(this.pc & 0x700) | ((this.a << 4) | this.ramMemory[this.b])]; this.pc = (this.pc & 0x700) | this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_100 = function () { this.a = this.ramMemory[0x00]; };
    ;
    COP444Opcodes.prototype.opcode_101 = function () { this.a = this.ramMemory[0x01]; };
    ;
    COP444Opcodes.prototype.opcode_102 = function () { this.a = this.ramMemory[0x02]; };
    ;
    COP444Opcodes.prototype.opcode_103 = function () { this.a = this.ramMemory[0x03]; };
    ;
    COP444Opcodes.prototype.opcode_104 = function () { this.a = this.ramMemory[0x04]; };
    ;
    COP444Opcodes.prototype.opcode_105 = function () { this.a = this.ramMemory[0x05]; };
    ;
    COP444Opcodes.prototype.opcode_106 = function () { this.a = this.ramMemory[0x06]; };
    ;
    COP444Opcodes.prototype.opcode_107 = function () { this.a = this.ramMemory[0x07]; };
    ;
    COP444Opcodes.prototype.opcode_108 = function () { this.a = this.ramMemory[0x08]; };
    ;
    COP444Opcodes.prototype.opcode_109 = function () { this.a = this.ramMemory[0x09]; };
    ;
    COP444Opcodes.prototype.opcode_10a = function () { this.a = this.ramMemory[0x0a]; };
    ;
    COP444Opcodes.prototype.opcode_10b = function () { this.a = this.ramMemory[0x0b]; };
    ;
    COP444Opcodes.prototype.opcode_10c = function () { this.a = this.ramMemory[0x0c]; };
    ;
    COP444Opcodes.prototype.opcode_10d = function () { this.a = this.ramMemory[0x0d]; };
    ;
    COP444Opcodes.prototype.opcode_10e = function () { this.a = this.ramMemory[0x0e]; };
    ;
    COP444Opcodes.prototype.opcode_10f = function () { this.a = this.ramMemory[0x0f]; };
    ;
    COP444Opcodes.prototype.opcode_110 = function () { this.a = this.ramMemory[0x10]; };
    ;
    COP444Opcodes.prototype.opcode_111 = function () { this.a = this.ramMemory[0x11]; };
    ;
    COP444Opcodes.prototype.opcode_112 = function () { this.a = this.ramMemory[0x12]; };
    ;
    COP444Opcodes.prototype.opcode_113 = function () { this.a = this.ramMemory[0x13]; };
    ;
    COP444Opcodes.prototype.opcode_114 = function () { this.a = this.ramMemory[0x14]; };
    ;
    COP444Opcodes.prototype.opcode_115 = function () { this.a = this.ramMemory[0x15]; };
    ;
    COP444Opcodes.prototype.opcode_116 = function () { this.a = this.ramMemory[0x16]; };
    ;
    COP444Opcodes.prototype.opcode_117 = function () { this.a = this.ramMemory[0x17]; };
    ;
    COP444Opcodes.prototype.opcode_118 = function () { this.a = this.ramMemory[0x18]; };
    ;
    COP444Opcodes.prototype.opcode_119 = function () { this.a = this.ramMemory[0x19]; };
    ;
    COP444Opcodes.prototype.opcode_11a = function () { this.a = this.ramMemory[0x1a]; };
    ;
    COP444Opcodes.prototype.opcode_11b = function () { this.a = this.ramMemory[0x1b]; };
    ;
    COP444Opcodes.prototype.opcode_11c = function () { this.a = this.ramMemory[0x1c]; };
    ;
    COP444Opcodes.prototype.opcode_11d = function () { this.a = this.ramMemory[0x1d]; };
    ;
    COP444Opcodes.prototype.opcode_11e = function () { this.a = this.ramMemory[0x1e]; };
    ;
    COP444Opcodes.prototype.opcode_11f = function () { this.a = this.ramMemory[0x1f]; };
    ;
    COP444Opcodes.prototype.opcode_120 = function () { this.a = this.ramMemory[0x20]; };
    ;
    COP444Opcodes.prototype.opcode_121 = function () { this.a = this.ramMemory[0x21]; };
    ;
    COP444Opcodes.prototype.opcode_122 = function () { this.a = this.ramMemory[0x22]; };
    ;
    COP444Opcodes.prototype.opcode_123 = function () { this.a = this.ramMemory[0x23]; };
    ;
    COP444Opcodes.prototype.opcode_124 = function () { this.a = this.ramMemory[0x24]; };
    ;
    COP444Opcodes.prototype.opcode_125 = function () { this.a = this.ramMemory[0x25]; };
    ;
    COP444Opcodes.prototype.opcode_126 = function () { this.a = this.ramMemory[0x26]; };
    ;
    COP444Opcodes.prototype.opcode_127 = function () { this.a = this.ramMemory[0x27]; };
    ;
    COP444Opcodes.prototype.opcode_128 = function () { this.a = this.ramMemory[0x28]; };
    ;
    COP444Opcodes.prototype.opcode_129 = function () { this.a = this.ramMemory[0x29]; };
    ;
    COP444Opcodes.prototype.opcode_12a = function () { this.a = this.ramMemory[0x2a]; };
    ;
    COP444Opcodes.prototype.opcode_12b = function () { this.a = this.ramMemory[0x2b]; };
    ;
    COP444Opcodes.prototype.opcode_12c = function () { this.a = this.ramMemory[0x2c]; };
    ;
    COP444Opcodes.prototype.opcode_12d = function () { this.a = this.ramMemory[0x2d]; };
    ;
    COP444Opcodes.prototype.opcode_12e = function () { this.a = this.ramMemory[0x2e]; };
    ;
    COP444Opcodes.prototype.opcode_12f = function () { this.a = this.ramMemory[0x2f]; };
    ;
    COP444Opcodes.prototype.opcode_130 = function () { this.a = this.ramMemory[0x30]; };
    ;
    COP444Opcodes.prototype.opcode_131 = function () { this.a = this.ramMemory[0x31]; };
    ;
    COP444Opcodes.prototype.opcode_132 = function () { this.a = this.ramMemory[0x32]; };
    ;
    COP444Opcodes.prototype.opcode_133 = function () { this.a = this.ramMemory[0x33]; };
    ;
    COP444Opcodes.prototype.opcode_134 = function () { this.a = this.ramMemory[0x34]; };
    ;
    COP444Opcodes.prototype.opcode_135 = function () { this.a = this.ramMemory[0x35]; };
    ;
    COP444Opcodes.prototype.opcode_136 = function () { this.a = this.ramMemory[0x36]; };
    ;
    COP444Opcodes.prototype.opcode_137 = function () { this.a = this.ramMemory[0x37]; };
    ;
    COP444Opcodes.prototype.opcode_138 = function () { this.a = this.ramMemory[0x38]; };
    ;
    COP444Opcodes.prototype.opcode_139 = function () { this.a = this.ramMemory[0x39]; };
    ;
    COP444Opcodes.prototype.opcode_13a = function () { this.a = this.ramMemory[0x3a]; };
    ;
    COP444Opcodes.prototype.opcode_13b = function () { this.a = this.ramMemory[0x3b]; };
    ;
    COP444Opcodes.prototype.opcode_13c = function () { this.a = this.ramMemory[0x3c]; };
    ;
    COP444Opcodes.prototype.opcode_13d = function () { this.a = this.ramMemory[0x3d]; };
    ;
    COP444Opcodes.prototype.opcode_13e = function () { this.a = this.ramMemory[0x3e]; };
    ;
    COP444Opcodes.prototype.opcode_13f = function () { this.a = this.ramMemory[0x3f]; };
    ;
    COP444Opcodes.prototype.opcode_140 = function () { this.a = this.ramMemory[0x40]; };
    ;
    COP444Opcodes.prototype.opcode_141 = function () { this.a = this.ramMemory[0x41]; };
    ;
    COP444Opcodes.prototype.opcode_142 = function () { this.a = this.ramMemory[0x42]; };
    ;
    COP444Opcodes.prototype.opcode_143 = function () { this.a = this.ramMemory[0x43]; };
    ;
    COP444Opcodes.prototype.opcode_144 = function () { this.a = this.ramMemory[0x44]; };
    ;
    COP444Opcodes.prototype.opcode_145 = function () { this.a = this.ramMemory[0x45]; };
    ;
    COP444Opcodes.prototype.opcode_146 = function () { this.a = this.ramMemory[0x46]; };
    ;
    COP444Opcodes.prototype.opcode_147 = function () { this.a = this.ramMemory[0x47]; };
    ;
    COP444Opcodes.prototype.opcode_148 = function () { this.a = this.ramMemory[0x48]; };
    ;
    COP444Opcodes.prototype.opcode_149 = function () { this.a = this.ramMemory[0x49]; };
    ;
    COP444Opcodes.prototype.opcode_14a = function () { this.a = this.ramMemory[0x4a]; };
    ;
    COP444Opcodes.prototype.opcode_14b = function () { this.a = this.ramMemory[0x4b]; };
    ;
    COP444Opcodes.prototype.opcode_14c = function () { this.a = this.ramMemory[0x4c]; };
    ;
    COP444Opcodes.prototype.opcode_14d = function () { this.a = this.ramMemory[0x4d]; };
    ;
    COP444Opcodes.prototype.opcode_14e = function () { this.a = this.ramMemory[0x4e]; };
    ;
    COP444Opcodes.prototype.opcode_14f = function () { this.a = this.ramMemory[0x4f]; };
    ;
    COP444Opcodes.prototype.opcode_150 = function () { this.a = this.ramMemory[0x50]; };
    ;
    COP444Opcodes.prototype.opcode_151 = function () { this.a = this.ramMemory[0x51]; };
    ;
    COP444Opcodes.prototype.opcode_152 = function () { this.a = this.ramMemory[0x52]; };
    ;
    COP444Opcodes.prototype.opcode_153 = function () { this.a = this.ramMemory[0x53]; };
    ;
    COP444Opcodes.prototype.opcode_154 = function () { this.a = this.ramMemory[0x54]; };
    ;
    COP444Opcodes.prototype.opcode_155 = function () { this.a = this.ramMemory[0x55]; };
    ;
    COP444Opcodes.prototype.opcode_156 = function () { this.a = this.ramMemory[0x56]; };
    ;
    COP444Opcodes.prototype.opcode_157 = function () { this.a = this.ramMemory[0x57]; };
    ;
    COP444Opcodes.prototype.opcode_158 = function () { this.a = this.ramMemory[0x58]; };
    ;
    COP444Opcodes.prototype.opcode_159 = function () { this.a = this.ramMemory[0x59]; };
    ;
    COP444Opcodes.prototype.opcode_15a = function () { this.a = this.ramMemory[0x5a]; };
    ;
    COP444Opcodes.prototype.opcode_15b = function () { this.a = this.ramMemory[0x5b]; };
    ;
    COP444Opcodes.prototype.opcode_15c = function () { this.a = this.ramMemory[0x5c]; };
    ;
    COP444Opcodes.prototype.opcode_15d = function () { this.a = this.ramMemory[0x5d]; };
    ;
    COP444Opcodes.prototype.opcode_15e = function () { this.a = this.ramMemory[0x5e]; };
    ;
    COP444Opcodes.prototype.opcode_15f = function () { this.a = this.ramMemory[0x5f]; };
    ;
    COP444Opcodes.prototype.opcode_160 = function () { this.a = this.ramMemory[0x60]; };
    ;
    COP444Opcodes.prototype.opcode_161 = function () { this.a = this.ramMemory[0x61]; };
    ;
    COP444Opcodes.prototype.opcode_162 = function () { this.a = this.ramMemory[0x62]; };
    ;
    COP444Opcodes.prototype.opcode_163 = function () { this.a = this.ramMemory[0x63]; };
    ;
    COP444Opcodes.prototype.opcode_164 = function () { this.a = this.ramMemory[0x64]; };
    ;
    COP444Opcodes.prototype.opcode_165 = function () { this.a = this.ramMemory[0x65]; };
    ;
    COP444Opcodes.prototype.opcode_166 = function () { this.a = this.ramMemory[0x66]; };
    ;
    COP444Opcodes.prototype.opcode_167 = function () { this.a = this.ramMemory[0x67]; };
    ;
    COP444Opcodes.prototype.opcode_168 = function () { this.a = this.ramMemory[0x68]; };
    ;
    COP444Opcodes.prototype.opcode_169 = function () { this.a = this.ramMemory[0x69]; };
    ;
    COP444Opcodes.prototype.opcode_16a = function () { this.a = this.ramMemory[0x6a]; };
    ;
    COP444Opcodes.prototype.opcode_16b = function () { this.a = this.ramMemory[0x6b]; };
    ;
    COP444Opcodes.prototype.opcode_16c = function () { this.a = this.ramMemory[0x6c]; };
    ;
    COP444Opcodes.prototype.opcode_16d = function () { this.a = this.ramMemory[0x6d]; };
    ;
    COP444Opcodes.prototype.opcode_16e = function () { this.a = this.ramMemory[0x6e]; };
    ;
    COP444Opcodes.prototype.opcode_16f = function () { this.a = this.ramMemory[0x6f]; };
    ;
    COP444Opcodes.prototype.opcode_170 = function () { this.a = this.ramMemory[0x70]; };
    ;
    COP444Opcodes.prototype.opcode_171 = function () { this.a = this.ramMemory[0x71]; };
    ;
    COP444Opcodes.prototype.opcode_172 = function () { this.a = this.ramMemory[0x72]; };
    ;
    COP444Opcodes.prototype.opcode_173 = function () { this.a = this.ramMemory[0x73]; };
    ;
    COP444Opcodes.prototype.opcode_174 = function () { this.a = this.ramMemory[0x74]; };
    ;
    COP444Opcodes.prototype.opcode_175 = function () { this.a = this.ramMemory[0x75]; };
    ;
    COP444Opcodes.prototype.opcode_176 = function () { this.a = this.ramMemory[0x76]; };
    ;
    COP444Opcodes.prototype.opcode_177 = function () { this.a = this.ramMemory[0x77]; };
    ;
    COP444Opcodes.prototype.opcode_178 = function () { this.a = this.ramMemory[0x78]; };
    ;
    COP444Opcodes.prototype.opcode_179 = function () { this.a = this.ramMemory[0x79]; };
    ;
    COP444Opcodes.prototype.opcode_17a = function () { this.a = this.ramMemory[0x7a]; };
    ;
    COP444Opcodes.prototype.opcode_17b = function () { this.a = this.ramMemory[0x7b]; };
    ;
    COP444Opcodes.prototype.opcode_17c = function () { this.a = this.ramMemory[0x7c]; };
    ;
    COP444Opcodes.prototype.opcode_17d = function () { this.a = this.ramMemory[0x7d]; };
    ;
    COP444Opcodes.prototype.opcode_17e = function () { this.a = this.ramMemory[0x7e]; };
    ;
    COP444Opcodes.prototype.opcode_17f = function () { this.a = this.ramMemory[0x7f]; };
    ;
    COP444Opcodes.prototype.opcode_180 = function () { this.temp8 = this.ramMemory[0x00]; this.ramMemory[0x00] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_181 = function () { this.temp8 = this.ramMemory[0x01]; this.ramMemory[0x01] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_182 = function () { this.temp8 = this.ramMemory[0x02]; this.ramMemory[0x02] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_183 = function () { this.temp8 = this.ramMemory[0x03]; this.ramMemory[0x03] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_184 = function () { this.temp8 = this.ramMemory[0x04]; this.ramMemory[0x04] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_185 = function () { this.temp8 = this.ramMemory[0x05]; this.ramMemory[0x05] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_186 = function () { this.temp8 = this.ramMemory[0x06]; this.ramMemory[0x06] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_187 = function () { this.temp8 = this.ramMemory[0x07]; this.ramMemory[0x07] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_188 = function () { this.temp8 = this.ramMemory[0x08]; this.ramMemory[0x08] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_189 = function () { this.temp8 = this.ramMemory[0x09]; this.ramMemory[0x09] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_18a = function () { this.temp8 = this.ramMemory[0x0a]; this.ramMemory[0x0a] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_18b = function () { this.temp8 = this.ramMemory[0x0b]; this.ramMemory[0x0b] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_18c = function () { this.temp8 = this.ramMemory[0x0c]; this.ramMemory[0x0c] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_18d = function () { this.temp8 = this.ramMemory[0x0d]; this.ramMemory[0x0d] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_18e = function () { this.temp8 = this.ramMemory[0x0e]; this.ramMemory[0x0e] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_18f = function () { this.temp8 = this.ramMemory[0x0f]; this.ramMemory[0x0f] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_190 = function () { this.temp8 = this.ramMemory[0x10]; this.ramMemory[0x10] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_191 = function () { this.temp8 = this.ramMemory[0x11]; this.ramMemory[0x11] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_192 = function () { this.temp8 = this.ramMemory[0x12]; this.ramMemory[0x12] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_193 = function () { this.temp8 = this.ramMemory[0x13]; this.ramMemory[0x13] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_194 = function () { this.temp8 = this.ramMemory[0x14]; this.ramMemory[0x14] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_195 = function () { this.temp8 = this.ramMemory[0x15]; this.ramMemory[0x15] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_196 = function () { this.temp8 = this.ramMemory[0x16]; this.ramMemory[0x16] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_197 = function () { this.temp8 = this.ramMemory[0x17]; this.ramMemory[0x17] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_198 = function () { this.temp8 = this.ramMemory[0x18]; this.ramMemory[0x18] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_199 = function () { this.temp8 = this.ramMemory[0x19]; this.ramMemory[0x19] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_19a = function () { this.temp8 = this.ramMemory[0x1a]; this.ramMemory[0x1a] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_19b = function () { this.temp8 = this.ramMemory[0x1b]; this.ramMemory[0x1b] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_19c = function () { this.temp8 = this.ramMemory[0x1c]; this.ramMemory[0x1c] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_19d = function () { this.temp8 = this.ramMemory[0x1d]; this.ramMemory[0x1d] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_19e = function () { this.temp8 = this.ramMemory[0x1e]; this.ramMemory[0x1e] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_19f = function () { this.temp8 = this.ramMemory[0x1f]; this.ramMemory[0x1f] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1a0 = function () { this.temp8 = this.ramMemory[0x20]; this.ramMemory[0x20] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1a1 = function () { this.temp8 = this.ramMemory[0x21]; this.ramMemory[0x21] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1a2 = function () { this.temp8 = this.ramMemory[0x22]; this.ramMemory[0x22] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1a3 = function () { this.temp8 = this.ramMemory[0x23]; this.ramMemory[0x23] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1a4 = function () { this.temp8 = this.ramMemory[0x24]; this.ramMemory[0x24] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1a5 = function () { this.temp8 = this.ramMemory[0x25]; this.ramMemory[0x25] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1a6 = function () { this.temp8 = this.ramMemory[0x26]; this.ramMemory[0x26] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1a7 = function () { this.temp8 = this.ramMemory[0x27]; this.ramMemory[0x27] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1a8 = function () { this.temp8 = this.ramMemory[0x28]; this.ramMemory[0x28] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1a9 = function () { this.temp8 = this.ramMemory[0x29]; this.ramMemory[0x29] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1aa = function () { this.temp8 = this.ramMemory[0x2a]; this.ramMemory[0x2a] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1ab = function () { this.temp8 = this.ramMemory[0x2b]; this.ramMemory[0x2b] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1ac = function () { this.temp8 = this.ramMemory[0x2c]; this.ramMemory[0x2c] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1ad = function () { this.temp8 = this.ramMemory[0x2d]; this.ramMemory[0x2d] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1ae = function () { this.temp8 = this.ramMemory[0x2e]; this.ramMemory[0x2e] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1af = function () { this.temp8 = this.ramMemory[0x2f]; this.ramMemory[0x2f] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1b0 = function () { this.temp8 = this.ramMemory[0x30]; this.ramMemory[0x30] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1b1 = function () { this.temp8 = this.ramMemory[0x31]; this.ramMemory[0x31] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1b2 = function () { this.temp8 = this.ramMemory[0x32]; this.ramMemory[0x32] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1b3 = function () { this.temp8 = this.ramMemory[0x33]; this.ramMemory[0x33] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1b4 = function () { this.temp8 = this.ramMemory[0x34]; this.ramMemory[0x34] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1b5 = function () { this.temp8 = this.ramMemory[0x35]; this.ramMemory[0x35] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1b6 = function () { this.temp8 = this.ramMemory[0x36]; this.ramMemory[0x36] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1b7 = function () { this.temp8 = this.ramMemory[0x37]; this.ramMemory[0x37] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1b8 = function () { this.temp8 = this.ramMemory[0x38]; this.ramMemory[0x38] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1b9 = function () { this.temp8 = this.ramMemory[0x39]; this.ramMemory[0x39] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1ba = function () { this.temp8 = this.ramMemory[0x3a]; this.ramMemory[0x3a] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1bb = function () { this.temp8 = this.ramMemory[0x3b]; this.ramMemory[0x3b] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1bc = function () { this.temp8 = this.ramMemory[0x3c]; this.ramMemory[0x3c] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1bd = function () { this.temp8 = this.ramMemory[0x3d]; this.ramMemory[0x3d] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1be = function () { this.temp8 = this.ramMemory[0x3e]; this.ramMemory[0x3e] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1bf = function () { this.temp8 = this.ramMemory[0x3f]; this.ramMemory[0x3f] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1c0 = function () { this.temp8 = this.ramMemory[0x40]; this.ramMemory[0x40] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1c1 = function () { this.temp8 = this.ramMemory[0x41]; this.ramMemory[0x41] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1c2 = function () { this.temp8 = this.ramMemory[0x42]; this.ramMemory[0x42] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1c3 = function () { this.temp8 = this.ramMemory[0x43]; this.ramMemory[0x43] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1c4 = function () { this.temp8 = this.ramMemory[0x44]; this.ramMemory[0x44] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1c5 = function () { this.temp8 = this.ramMemory[0x45]; this.ramMemory[0x45] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1c6 = function () { this.temp8 = this.ramMemory[0x46]; this.ramMemory[0x46] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1c7 = function () { this.temp8 = this.ramMemory[0x47]; this.ramMemory[0x47] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1c8 = function () { this.temp8 = this.ramMemory[0x48]; this.ramMemory[0x48] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1c9 = function () { this.temp8 = this.ramMemory[0x49]; this.ramMemory[0x49] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1ca = function () { this.temp8 = this.ramMemory[0x4a]; this.ramMemory[0x4a] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1cb = function () { this.temp8 = this.ramMemory[0x4b]; this.ramMemory[0x4b] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1cc = function () { this.temp8 = this.ramMemory[0x4c]; this.ramMemory[0x4c] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1cd = function () { this.temp8 = this.ramMemory[0x4d]; this.ramMemory[0x4d] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1ce = function () { this.temp8 = this.ramMemory[0x4e]; this.ramMemory[0x4e] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1cf = function () { this.temp8 = this.ramMemory[0x4f]; this.ramMemory[0x4f] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1d0 = function () { this.temp8 = this.ramMemory[0x50]; this.ramMemory[0x50] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1d1 = function () { this.temp8 = this.ramMemory[0x51]; this.ramMemory[0x51] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1d2 = function () { this.temp8 = this.ramMemory[0x52]; this.ramMemory[0x52] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1d3 = function () { this.temp8 = this.ramMemory[0x53]; this.ramMemory[0x53] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1d4 = function () { this.temp8 = this.ramMemory[0x54]; this.ramMemory[0x54] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1d5 = function () { this.temp8 = this.ramMemory[0x55]; this.ramMemory[0x55] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1d6 = function () { this.temp8 = this.ramMemory[0x56]; this.ramMemory[0x56] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1d7 = function () { this.temp8 = this.ramMemory[0x57]; this.ramMemory[0x57] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1d8 = function () { this.temp8 = this.ramMemory[0x58]; this.ramMemory[0x58] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1d9 = function () { this.temp8 = this.ramMemory[0x59]; this.ramMemory[0x59] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1da = function () { this.temp8 = this.ramMemory[0x5a]; this.ramMemory[0x5a] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1db = function () { this.temp8 = this.ramMemory[0x5b]; this.ramMemory[0x5b] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1dc = function () { this.temp8 = this.ramMemory[0x5c]; this.ramMemory[0x5c] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1dd = function () { this.temp8 = this.ramMemory[0x5d]; this.ramMemory[0x5d] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1de = function () { this.temp8 = this.ramMemory[0x5e]; this.ramMemory[0x5e] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1df = function () { this.temp8 = this.ramMemory[0x5f]; this.ramMemory[0x5f] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1e0 = function () { this.temp8 = this.ramMemory[0x60]; this.ramMemory[0x60] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1e1 = function () { this.temp8 = this.ramMemory[0x61]; this.ramMemory[0x61] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1e2 = function () { this.temp8 = this.ramMemory[0x62]; this.ramMemory[0x62] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1e3 = function () { this.temp8 = this.ramMemory[0x63]; this.ramMemory[0x63] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1e4 = function () { this.temp8 = this.ramMemory[0x64]; this.ramMemory[0x64] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1e5 = function () { this.temp8 = this.ramMemory[0x65]; this.ramMemory[0x65] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1e6 = function () { this.temp8 = this.ramMemory[0x66]; this.ramMemory[0x66] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1e7 = function () { this.temp8 = this.ramMemory[0x67]; this.ramMemory[0x67] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1e8 = function () { this.temp8 = this.ramMemory[0x68]; this.ramMemory[0x68] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1e9 = function () { this.temp8 = this.ramMemory[0x69]; this.ramMemory[0x69] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1ea = function () { this.temp8 = this.ramMemory[0x6a]; this.ramMemory[0x6a] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1eb = function () { this.temp8 = this.ramMemory[0x6b]; this.ramMemory[0x6b] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1ec = function () { this.temp8 = this.ramMemory[0x6c]; this.ramMemory[0x6c] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1ed = function () { this.temp8 = this.ramMemory[0x6d]; this.ramMemory[0x6d] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1ee = function () { this.temp8 = this.ramMemory[0x6e]; this.ramMemory[0x6e] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1ef = function () { this.temp8 = this.ramMemory[0x6f]; this.ramMemory[0x6f] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1f0 = function () { this.temp8 = this.ramMemory[0x70]; this.ramMemory[0x70] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1f1 = function () { this.temp8 = this.ramMemory[0x71]; this.ramMemory[0x71] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1f2 = function () { this.temp8 = this.ramMemory[0x72]; this.ramMemory[0x72] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1f3 = function () { this.temp8 = this.ramMemory[0x73]; this.ramMemory[0x73] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1f4 = function () { this.temp8 = this.ramMemory[0x74]; this.ramMemory[0x74] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1f5 = function () { this.temp8 = this.ramMemory[0x75]; this.ramMemory[0x75] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1f6 = function () { this.temp8 = this.ramMemory[0x76]; this.ramMemory[0x76] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1f7 = function () { this.temp8 = this.ramMemory[0x77]; this.ramMemory[0x77] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1f8 = function () { this.temp8 = this.ramMemory[0x78]; this.ramMemory[0x78] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1f9 = function () { this.temp8 = this.ramMemory[0x79]; this.ramMemory[0x79] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1fa = function () { this.temp8 = this.ramMemory[0x7a]; this.ramMemory[0x7a] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1fb = function () { this.temp8 = this.ramMemory[0x7b]; this.ramMemory[0x7b] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1fc = function () { this.temp8 = this.ramMemory[0x7c]; this.ramMemory[0x7c] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1fd = function () { this.temp8 = this.ramMemory[0x7d]; this.ramMemory[0x7d] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1fe = function () { this.temp8 = this.ramMemory[0x7e]; this.ramMemory[0x7e] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_1ff = function () { this.temp8 = this.ramMemory[0x7f]; this.ramMemory[0x7f] = (this.a); this.a = this.temp8; };
    ;
    COP444Opcodes.prototype.opcode_200 = function () { };
    ;
    COP444Opcodes.prototype.opcode_201 = function () { if ((this.g & 1) == 0)
        this.skip(); };
    ;
    COP444Opcodes.prototype.opcode_202 = function () { };
    ;
    COP444Opcodes.prototype.opcode_203 = function () { if ((this.g & 4) == 0)
        this.skip(); };
    ;
    COP444Opcodes.prototype.opcode_204 = function () { };
    ;
    COP444Opcodes.prototype.opcode_205 = function () { };
    ;
    COP444Opcodes.prototype.opcode_206 = function () { };
    ;
    COP444Opcodes.prototype.opcode_207 = function () { };
    ;
    COP444Opcodes.prototype.opcode_208 = function () { };
    ;
    COP444Opcodes.prototype.opcode_209 = function () { };
    ;
    COP444Opcodes.prototype.opcode_20a = function () { };
    ;
    COP444Opcodes.prototype.opcode_20b = function () { };
    ;
    COP444Opcodes.prototype.opcode_20c = function () { };
    ;
    COP444Opcodes.prototype.opcode_20d = function () { };
    ;
    COP444Opcodes.prototype.opcode_20e = function () { };
    ;
    COP444Opcodes.prototype.opcode_20f = function () { };
    ;
    COP444Opcodes.prototype.opcode_210 = function () { };
    ;
    COP444Opcodes.prototype.opcode_211 = function () { if ((this.g & 2) == 0)
        this.skip(); };
    ;
    COP444Opcodes.prototype.opcode_212 = function () { };
    ;
    COP444Opcodes.prototype.opcode_213 = function () { if ((this.g & 8) == 0)
        this.skip(); };
    ;
    COP444Opcodes.prototype.opcode_214 = function () { };
    ;
    COP444Opcodes.prototype.opcode_215 = function () { };
    ;
    COP444Opcodes.prototype.opcode_216 = function () { };
    ;
    COP444Opcodes.prototype.opcode_217 = function () { };
    ;
    COP444Opcodes.prototype.opcode_218 = function () { };
    ;
    COP444Opcodes.prototype.opcode_219 = function () { };
    ;
    COP444Opcodes.prototype.opcode_21a = function () { };
    ;
    COP444Opcodes.prototype.opcode_21b = function () { };
    ;
    COP444Opcodes.prototype.opcode_21c = function () { };
    ;
    COP444Opcodes.prototype.opcode_21d = function () { };
    ;
    COP444Opcodes.prototype.opcode_21e = function () { };
    ;
    COP444Opcodes.prototype.opcode_21f = function () { };
    ;
    COP444Opcodes.prototype.opcode_220 = function () { };
    ;
    COP444Opcodes.prototype.opcode_221 = function () { if (this.g == 0)
        this.skip(); };
    ;
    COP444Opcodes.prototype.opcode_222 = function () { };
    ;
    COP444Opcodes.prototype.opcode_223 = function () { };
    ;
    COP444Opcodes.prototype.opcode_224 = function () { };
    ;
    COP444Opcodes.prototype.opcode_225 = function () { };
    ;
    COP444Opcodes.prototype.opcode_226 = function () { };
    ;
    COP444Opcodes.prototype.opcode_227 = function () { };
    ;
    COP444Opcodes.prototype.opcode_228 = function () { this.a = this.hardware.readin(); };
    ;
    COP444Opcodes.prototype.opcode_229 = function () { ; ; };
    ;
    COP444Opcodes.prototype.opcode_22a = function () { this.a = this.g; };
    ;
    COP444Opcodes.prototype.opcode_22b = function () { };
    ;
    COP444Opcodes.prototype.opcode_22c = function () { this.a = this.q & 15; this.ramMemory[this.b] = ((this.q >> 4) & 15); };
    ;
    COP444Opcodes.prototype.opcode_22d = function () { };
    ;
    COP444Opcodes.prototype.opcode_22e = function () { this.temp8 = this.hardware.readl(); this.a = this.temp8 & 0xF; this.ramMemory[this.b] = ((this.temp8 >> 4) & 15); };
    ;
    COP444Opcodes.prototype.opcode_22f = function () { this.temp8 = this.timer >> 2; this.a = this.temp8 & 0xF; this.ramMemory[this.b] = (this.temp8 >> 4) & 0x0F; };
    ;
    COP444Opcodes.prototype.opcode_230 = function () { };
    ;
    COP444Opcodes.prototype.opcode_231 = function () { };
    ;
    COP444Opcodes.prototype.opcode_232 = function () { };
    ;
    COP444Opcodes.prototype.opcode_233 = function () { };
    ;
    COP444Opcodes.prototype.opcode_234 = function () { };
    ;
    COP444Opcodes.prototype.opcode_235 = function () { };
    ;
    COP444Opcodes.prototype.opcode_236 = function () { };
    ;
    COP444Opcodes.prototype.opcode_237 = function () { };
    ;
    COP444Opcodes.prototype.opcode_238 = function () { this.pc = (this.pc - 2) & 0x7FF; this.cycles += 200; this.timer += 200; ; };
    ;
    COP444Opcodes.prototype.opcode_239 = function () { if (this.tov == 0) {
        this.pc = (this.pc - 2) & 0x7FF;
        this.cycles += 200;
        this.timer += 200;
    } ; };
    ;
    COP444Opcodes.prototype.opcode_23a = function () { this.g = this.ramMemory[this.b]; this.hardware.updateg(this.g); };
    ;
    COP444Opcodes.prototype.opcode_23b = function () { };
    ;
    COP444Opcodes.prototype.opcode_23c = function () { this.q = ((this.a << 4) | this.ramMemory[this.b]); this.hardware.updateq(this.q); };
    ;
    COP444Opcodes.prototype.opcode_23d = function () { };
    ;
    COP444Opcodes.prototype.opcode_23e = function () { this.d = this.b & 0x0F; this.hardware.updated(this.d); };
    ;
    COP444Opcodes.prototype.opcode_23f = function () { this.timer = ((this.a << 4) | this.ramMemory[this.b]) << 2; };
    ;
    COP444Opcodes.prototype.opcode_240 = function () { };
    ;
    COP444Opcodes.prototype.opcode_241 = function () { };
    ;
    COP444Opcodes.prototype.opcode_242 = function () { };
    ;
    COP444Opcodes.prototype.opcode_243 = function () { };
    ;
    COP444Opcodes.prototype.opcode_244 = function () { };
    ;
    COP444Opcodes.prototype.opcode_245 = function () { };
    ;
    COP444Opcodes.prototype.opcode_246 = function () { };
    ;
    COP444Opcodes.prototype.opcode_247 = function () { };
    ;
    COP444Opcodes.prototype.opcode_248 = function () { };
    ;
    COP444Opcodes.prototype.opcode_249 = function () { };
    ;
    COP444Opcodes.prototype.opcode_24a = function () { };
    ;
    COP444Opcodes.prototype.opcode_24b = function () { };
    ;
    COP444Opcodes.prototype.opcode_24c = function () { };
    ;
    COP444Opcodes.prototype.opcode_24d = function () { };
    ;
    COP444Opcodes.prototype.opcode_24e = function () { };
    ;
    COP444Opcodes.prototype.opcode_24f = function () { };
    ;
    COP444Opcodes.prototype.opcode_250 = function () { this.g = 0x0; this.hardware.updateg(this.g); };
    ;
    COP444Opcodes.prototype.opcode_251 = function () { this.g = 0x1; this.hardware.updateg(this.g); };
    ;
    COP444Opcodes.prototype.opcode_252 = function () { this.g = 0x2; this.hardware.updateg(this.g); };
    ;
    COP444Opcodes.prototype.opcode_253 = function () { this.g = 0x3; this.hardware.updateg(this.g); };
    ;
    COP444Opcodes.prototype.opcode_254 = function () { this.g = 0x4; this.hardware.updateg(this.g); };
    ;
    COP444Opcodes.prototype.opcode_255 = function () { this.g = 0x5; this.hardware.updateg(this.g); };
    ;
    COP444Opcodes.prototype.opcode_256 = function () { this.g = 0x6; this.hardware.updateg(this.g); };
    ;
    COP444Opcodes.prototype.opcode_257 = function () { this.g = 0x7; this.hardware.updateg(this.g); };
    ;
    COP444Opcodes.prototype.opcode_258 = function () { this.g = 0x8; this.hardware.updateg(this.g); };
    ;
    COP444Opcodes.prototype.opcode_259 = function () { this.g = 0x9; this.hardware.updateg(this.g); };
    ;
    COP444Opcodes.prototype.opcode_25a = function () { this.g = 0xa; this.hardware.updateg(this.g); };
    ;
    COP444Opcodes.prototype.opcode_25b = function () { this.g = 0xb; this.hardware.updateg(this.g); };
    ;
    COP444Opcodes.prototype.opcode_25c = function () { this.g = 0xc; this.hardware.updateg(this.g); };
    ;
    COP444Opcodes.prototype.opcode_25d = function () { this.g = 0xd; this.hardware.updateg(this.g); };
    ;
    COP444Opcodes.prototype.opcode_25e = function () { this.g = 0xe; this.hardware.updateg(this.g); };
    ;
    COP444Opcodes.prototype.opcode_25f = function () { this.g = 0xf; this.hardware.updateg(this.g); };
    ;
    COP444Opcodes.prototype.opcode_260 = function () { this.en = 0x0; this.hardware.updateen(this.en); };
    ;
    COP444Opcodes.prototype.opcode_261 = function () { this.en = 0x1; this.hardware.updateen(this.en); };
    ;
    COP444Opcodes.prototype.opcode_262 = function () { this.en = 0x2; this.hardware.updateen(this.en); };
    ;
    COP444Opcodes.prototype.opcode_263 = function () { this.en = 0x3; this.hardware.updateen(this.en); };
    ;
    COP444Opcodes.prototype.opcode_264 = function () { this.en = 0x4; this.hardware.updateen(this.en); };
    ;
    COP444Opcodes.prototype.opcode_265 = function () { this.en = 0x5; this.hardware.updateen(this.en); };
    ;
    COP444Opcodes.prototype.opcode_266 = function () { this.en = 0x6; this.hardware.updateen(this.en); };
    ;
    COP444Opcodes.prototype.opcode_267 = function () { this.en = 0x7; this.hardware.updateen(this.en); };
    ;
    COP444Opcodes.prototype.opcode_268 = function () { this.en = 0x8; this.hardware.updateen(this.en); };
    ;
    COP444Opcodes.prototype.opcode_269 = function () { this.en = 0x9; this.hardware.updateen(this.en); };
    ;
    COP444Opcodes.prototype.opcode_26a = function () { this.en = 0xa; this.hardware.updateen(this.en); };
    ;
    COP444Opcodes.prototype.opcode_26b = function () { this.en = 0xb; this.hardware.updateen(this.en); };
    ;
    COP444Opcodes.prototype.opcode_26c = function () { this.en = 0xc; this.hardware.updateen(this.en); };
    ;
    COP444Opcodes.prototype.opcode_26d = function () { this.en = 0xd; this.hardware.updateen(this.en); };
    ;
    COP444Opcodes.prototype.opcode_26e = function () { this.en = 0xe; this.hardware.updateen(this.en); };
    ;
    COP444Opcodes.prototype.opcode_26f = function () { this.en = 0xf; this.hardware.updateen(this.en); };
    ;
    COP444Opcodes.prototype.opcode_270 = function () { };
    ;
    COP444Opcodes.prototype.opcode_271 = function () { };
    ;
    COP444Opcodes.prototype.opcode_272 = function () { };
    ;
    COP444Opcodes.prototype.opcode_273 = function () { };
    ;
    COP444Opcodes.prototype.opcode_274 = function () { };
    ;
    COP444Opcodes.prototype.opcode_275 = function () { };
    ;
    COP444Opcodes.prototype.opcode_276 = function () { };
    ;
    COP444Opcodes.prototype.opcode_277 = function () { };
    ;
    COP444Opcodes.prototype.opcode_278 = function () { };
    ;
    COP444Opcodes.prototype.opcode_279 = function () { };
    ;
    COP444Opcodes.prototype.opcode_27a = function () { };
    ;
    COP444Opcodes.prototype.opcode_27b = function () { };
    ;
    COP444Opcodes.prototype.opcode_27c = function () { };
    ;
    COP444Opcodes.prototype.opcode_27d = function () { };
    ;
    COP444Opcodes.prototype.opcode_27e = function () { };
    ;
    COP444Opcodes.prototype.opcode_27f = function () { };
    ;
    COP444Opcodes.prototype.opcode_280 = function () { this.b = 0x00; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_281 = function () { this.b = 0x01; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_282 = function () { this.b = 0x02; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_283 = function () { this.b = 0x03; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_284 = function () { this.b = 0x04; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_285 = function () { this.b = 0x05; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_286 = function () { this.b = 0x06; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_287 = function () { this.b = 0x07; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_288 = function () { this.b = 0x08; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_289 = function () { this.b = 0x09; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_28a = function () { this.b = 0x0a; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_28b = function () { this.b = 0x0b; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_28c = function () { this.b = 0x0c; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_28d = function () { this.b = 0x0d; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_28e = function () { this.b = 0x0e; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_28f = function () { this.b = 0x0f; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_290 = function () { this.b = 0x10; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_291 = function () { this.b = 0x11; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_292 = function () { this.b = 0x12; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_293 = function () { this.b = 0x13; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_294 = function () { this.b = 0x14; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_295 = function () { this.b = 0x15; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_296 = function () { this.b = 0x16; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_297 = function () { this.b = 0x17; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_298 = function () { this.b = 0x18; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_299 = function () { this.b = 0x19; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_29a = function () { this.b = 0x1a; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_29b = function () { this.b = 0x1b; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_29c = function () { this.b = 0x1c; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_29d = function () { this.b = 0x1d; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_29e = function () { this.b = 0x1e; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_29f = function () { this.b = 0x1f; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2a0 = function () { this.b = 0x20; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2a1 = function () { this.b = 0x21; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2a2 = function () { this.b = 0x22; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2a3 = function () { this.b = 0x23; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2a4 = function () { this.b = 0x24; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2a5 = function () { this.b = 0x25; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2a6 = function () { this.b = 0x26; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2a7 = function () { this.b = 0x27; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2a8 = function () { this.b = 0x28; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2a9 = function () { this.b = 0x29; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2aa = function () { this.b = 0x2a; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2ab = function () { this.b = 0x2b; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2ac = function () { this.b = 0x2c; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2ad = function () { this.b = 0x2d; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2ae = function () { this.b = 0x2e; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2af = function () { this.b = 0x2f; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2b0 = function () { this.b = 0x30; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2b1 = function () { this.b = 0x31; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2b2 = function () { this.b = 0x32; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2b3 = function () { this.b = 0x33; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2b4 = function () { this.b = 0x34; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2b5 = function () { this.b = 0x35; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2b6 = function () { this.b = 0x36; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2b7 = function () { this.b = 0x37; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2b8 = function () { this.b = 0x38; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2b9 = function () { this.b = 0x39; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2ba = function () { this.b = 0x3a; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2bb = function () { this.b = 0x3b; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2bc = function () { this.b = 0x3c; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2bd = function () { this.b = 0x3d; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2be = function () { this.b = 0x3e; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2bf = function () { this.b = 0x3f; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2c0 = function () { this.b = 0x40; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2c1 = function () { this.b = 0x41; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2c2 = function () { this.b = 0x42; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2c3 = function () { this.b = 0x43; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2c4 = function () { this.b = 0x44; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2c5 = function () { this.b = 0x45; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2c6 = function () { this.b = 0x46; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2c7 = function () { this.b = 0x47; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2c8 = function () { this.b = 0x48; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2c9 = function () { this.b = 0x49; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2ca = function () { this.b = 0x4a; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2cb = function () { this.b = 0x4b; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2cc = function () { this.b = 0x4c; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2cd = function () { this.b = 0x4d; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2ce = function () { this.b = 0x4e; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2cf = function () { this.b = 0x4f; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2d0 = function () { this.b = 0x50; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2d1 = function () { this.b = 0x51; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2d2 = function () { this.b = 0x52; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2d3 = function () { this.b = 0x53; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2d4 = function () { this.b = 0x54; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2d5 = function () { this.b = 0x55; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2d6 = function () { this.b = 0x56; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2d7 = function () { this.b = 0x57; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2d8 = function () { this.b = 0x58; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2d9 = function () { this.b = 0x59; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2da = function () { this.b = 0x5a; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2db = function () { this.b = 0x5b; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2dc = function () { this.b = 0x5c; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2dd = function () { this.b = 0x5d; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2de = function () { this.b = 0x5e; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2df = function () { this.b = 0x5f; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2e0 = function () { this.b = 0x60; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2e1 = function () { this.b = 0x61; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2e2 = function () { this.b = 0x62; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2e3 = function () { this.b = 0x63; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2e4 = function () { this.b = 0x64; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2e5 = function () { this.b = 0x65; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2e6 = function () { this.b = 0x66; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2e7 = function () { this.b = 0x67; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2e8 = function () { this.b = 0x68; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2e9 = function () { this.b = 0x69; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2ea = function () { this.b = 0x6a; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2eb = function () { this.b = 0x6b; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2ec = function () { this.b = 0x6c; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2ed = function () { this.b = 0x6d; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2ee = function () { this.b = 0x6e; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2ef = function () { this.b = 0x6f; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2f0 = function () { this.b = 0x70; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2f1 = function () { this.b = 0x71; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2f2 = function () { this.b = 0x72; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2f3 = function () { this.b = 0x73; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2f4 = function () { this.b = 0x74; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2f5 = function () { this.b = 0x75; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2f6 = function () { this.b = 0x76; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2f7 = function () { this.b = 0x77; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2f8 = function () { this.b = 0x78; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2f9 = function () { this.b = 0x79; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2fa = function () { this.b = 0x7a; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2fb = function () { this.b = 0x7b; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2fc = function () { this.b = 0x7c; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2fd = function () { this.b = 0x7d; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2fe = function () { this.b = 0x7e; this.lbiSkip(); };
    ;
    COP444Opcodes.prototype.opcode_2ff = function () { this.b = 0x7f; this.lbiSkip(); };
    ;
    return COP444Opcodes;
}(COP444Base));
var COP444 = (function (_super) {
    __extends(COP444, _super);
    function COP444(hardware) {
        var _this = _super.call(this, hardware) || this;
        _this.romMemory = ROMImage.rom;
        _this.ramMemory = [];
        for (var n = 0; n < 128; n++)
            _this.ramMemory[n] = 0;
        _this.opcodeFunctions = _this.getOpcodeFunctionTable();
        _this.reset();
        return _this;
    }
    COP444.prototype.reset = function () {
        this.pc = this.a = this.b = this.c = this.d = this.en = this.g = 0;
        this.sa = this.sb = this.sc = 0;
        this.cycles = this.q = this.timer = this.tov = 0;
        this.hardware.reset();
    };
    COP444.prototype.fetch = function () {
        var opcode = this.romMemory[this.pc];
        this.pc = (this.pc + 1) & 0x7FF;
        this.timer++;
        if (this.timer >= 0x400) {
            this.timer = 0;
            this.tov = 1;
            this.hardware.timerOverflow();
        }
        return opcode;
    };
    COP444.prototype.execute = function () {
        var opcode = this.fetch();
        if (opcode == 0x23) {
            opcode = this.fetch() | 0x100;
        }
        if (opcode == 0x33) {
            opcode = this.fetch() | 0x200;
        }
        if (this.pc >= 0x80 && this.pc <= 0xFF) {
            if (opcode >= 0x80 && opcode < 0xFF) {
                this.pc = opcode;
                opcode = 0x44;
            }
        }
        this.opcodeFunctions[opcode].call(this);
        this.cycles++;
        return this.cycles;
    };
    COP444.prototype.endOfFrame = function () {
        this.cycles = 0;
        this.hardware.endOfFrame();
    };
    COP444.prototype.skip = function () {
        var n = this.fetch();
        if (this.is2Byte(n)) {
            n = this.fetch();
        }
    };
    COP444.prototype.lbiSkip = function () {
        while (this.isLBIOpcode()) {
            this.skip();
        }
    };
    COP444.prototype.isLBIOpcode = function () {
        var opc = this.romMemory[this.pc];
        if ((opc & 0xC8) == 0x08)
            return true;
        if (opc != 0x33)
            return false;
        opc = this.romMemory[(this.pc + 1) & 0x7FF];
        return (opc & 0x80) != 0;
    };
    COP444.prototype.is2Byte = function (opc) {
        return (opc >= 0x60 && opc <= 0x6F) || (opc == 0x23) || (opc == 0x33);
    };
    return COP444;
}(COP444Opcodes));
var BaseLED = (function () {
    function BaseLED() {
        this.isOn = false;
        this.setHologram(1);
    }
    BaseLED.prototype.lightOn = function () {
        if (!this.isOn) {
            this.setLightState(true);
        }
        this.isOn = true;
        this.onFrameCount = BaseLED.OFF_TIME;
    };
    BaseLED.prototype.endOfFrame = function () {
        if (this.onFrameCount > 0) {
            this.onFrameCount--;
            if (this.onFrameCount == 0 && this.isOn) {
                this.setLightState(false);
                this.isOn = false;
            }
        }
    };
    BaseLED.OFF_TIME = 10;
    return BaseLED;
}());
var HolographicDisplay = (function () {
    function HolographicDisplay(game, x, y, size) {
        if (x < 0) {
            x = game.width / 2 - size * 7 / 2;
        }
        this.cells = [];
        for (var xc = 0; xc < 7; xc++) {
            for (var yc = 0; yc < 6; yc++) {
                this.cells[yc * 7 + xc] = new LEDHoloCell(game, x + xc * size, y + yc * size, size, xc, yc);
            }
        }
        this.select(0, 0);
    }
    HolographicDisplay.prototype.select = function (x, y) {
        this.xSel = x;
        this.ySel = y;
    };
    HolographicDisplay.prototype.lightOn = function () {
        this.cells[this.xSel + 7 * this.ySel].lightOn();
    };
    HolographicDisplay.prototype.endOfFrame = function () {
        for (var _i = 0, _a = this.cells; _i < _a.length; _i++) {
            var c = _a[_i];
            c.endOfFrame();
        }
    };
    HolographicDisplay.prototype.setLightState = function (newState) {
    };
    HolographicDisplay.prototype.setHologram = function (hologram) {
        for (var _i = 0, _a = this.cells; _i < _a.length; _i++) {
            var c = _a[_i];
            c.setHologram(hologram);
        }
    };
    HolographicDisplay.prototype.destroy = function () {
        for (var _i = 0, _a = this.cells; _i < _a.length; _i++) {
            var c = _a[_i];
            c.destroy();
        }
        this.cells = null;
    };
    return HolographicDisplay;
}());
var SevenSegmentDisplay = (function () {
    function SevenSegmentDisplay(game, x, y, size) {
        var ssize = size / 4;
        this.segments = [];
        this.segments[0] = new LEDRectangle(game, x, y, size + ssize, ssize);
        this.segments[1] = new LEDRectangle(game, x + size, y, ssize, size + ssize);
        this.segments[2] = new LEDRectangle(game, x + size, y + size, ssize, size + ssize);
        this.segments[3] = new LEDRectangle(game, x, y + size * 2, size + ssize, ssize);
        this.segments[4] = new LEDRectangle(game, x, y + size, ssize, size + ssize);
        this.segments[5] = new LEDRectangle(game, x, y, ssize, size + ssize);
        this.segments[6] = new LEDRectangle(game, x, y + size, size + ssize, ssize);
        this.select(0);
    }
    SevenSegmentDisplay.prototype.select = function (n) {
        this.selected = n;
    };
    SevenSegmentDisplay.prototype.lightOn = function () {
        this.segments[this.selected].lightOn();
    };
    SevenSegmentDisplay.prototype.endOfFrame = function () {
        for (var _i = 0, _a = this.segments; _i < _a.length; _i++) {
            var c = _a[_i];
            c.endOfFrame();
        }
    };
    SevenSegmentDisplay.prototype.setLightState = function (newState) { };
    SevenSegmentDisplay.prototype.setHologram = function (hologram) { };
    SevenSegmentDisplay.prototype.destroy = function () {
        for (var _i = 0, _a = this.segments; _i < _a.length; _i++) {
            var c = _a[_i];
            c.destroy();
        }
        this.segments = null;
    };
    return SevenSegmentDisplay;
}());
var LEDHoloCell = (function (_super) {
    __extends(LEDHoloCell, _super);
    function LEDHoloCell(game, x, y, size, ledX, ledY) {
        var _this = _super.call(this) || this;
        _this.game = game;
        _this.size = size;
        _this.ledX = ledX;
        _this.ledY = ledY;
        _this.img = game.add.image(x, y, "hologram", 6);
        _this.setLightState(false);
        return _this;
    }
    LEDHoloCell.prototype.destroy = function () {
        this.img.destroy();
        this.img = this.game = null;
    };
    LEDHoloCell.prototype.setLightState = function (newState) {
        var frame = this.ledX + this.ledY * 14;
        if (!newState) {
            frame = frame + 6 * 14;
        }
        if (this.currentHologram == 2) {
            frame = frame + 7;
        }
        if (this.img != null) {
            if (this.img.frame != frame) {
                this.img.frame = frame;
            }
            this.img.width = this.img.height = this.size;
        }
    };
    LEDHoloCell.prototype.setHologram = function (hologram) {
        this.currentHologram = hologram;
        this.setLightState(this.isOn);
    };
    return LEDHoloCell;
}(BaseLED));
var LEDRectangle = (function (_super) {
    __extends(LEDRectangle, _super);
    function LEDRectangle(game, x, y, width, height) {
        var _this = _super.call(this) || this;
        _this.img = game.add.image(x, y, "sprites", "rectangle");
        _this.img.width = width;
        _this.img.height = height;
        _this.img.tint = 0xFF0000;
        _this.setLightState(false);
        return _this;
    }
    LEDRectangle.prototype.destroy = function () {
        this.img.destroy();
        this.img = null;
    };
    LEDRectangle.prototype.setLightState = function (newState) {
        this.img.alpha = (newState ? 1 : 0.3);
    };
    LEDRectangle.prototype.setHologram = function (hologram) {
    };
    return LEDRectangle;
}(BaseLED));
var ROMImage = (function () {
    function ROMImage() {
    }
    ROMImage.rom = [
        0, 51, 98, 104, 241, 105, 80, 95, 243, 51, 183, 0, 85, 1, 85, 35, 173, 35, 56, 81, 35, 174, 104, 44, 218, 214, 104, 166, 104, 44, 218, 1, 243, 3, 51, 184, 51, 183, 0, 81, 2, 6, 96, 9, 134, 148, 58, 0, 33, 73, 72, 170, 105, 137, 170, 51, 208, 75, 35, 56, 95, 77, 96, 75, 51, 208, 1, 199, 105, 137, 203, 47, 1, 96, 0, 145, 51, 185, 0, 87, 255, 102, 0, 98, 192, 99, 0, 99, 192, 100, 64, 100, 128, 101, 64, 102, 0, 102, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 81, 83, 85, 87, 89, 91, 93, 95, 97, 44, 112, 112, 46, 114, 72, 0, 0, 0, 0, 232, 230, 228, 226, 224, 222, 220, 218, 216, 214, 212, 210, 208, 206, 204, 202, 200, 198, 196, 194, 192, 98, 205, 97, 189, 98, 128, 98, 16, 98, 0, 97, 213, 102, 74, 97, 220, 97, 195, 96, 121, 98, 131, 98, 129, 98, 107, 98, 127, 97, 202, 97, 214, 98, 124, 98, 51, 98, 126, 97, 179, 98, 130, 97, 188, 98, 44, 97, 107, 98, 109, 98, 12, 98, 147, 98, 38, 98, 31, 97, 172, 96, 240, 98, 206, 102, 129, 97, 201, 98, 41, 98, 48, 97, 159, 97, 36, 98, 53, 97, 180, 98, 37, 0, 0, 0, 0, 0, 0, 30, 51, 255, 0, 7, 243, 18, 95, 251, 18, 243, 28, 126, 127, 72, 0, 0, 64, 32, 16, 8, 4, 2, 1, 1, 2, 4, 8, 16, 32, 64, 128, 63, 6, 91, 79, 102, 109, 125, 7, 127, 103, 113, 0, 0, 0, 0, 0, 128, 64, 32, 16, 30, 21, 51, 57, 65, 68, 78, 95, 72, 80, 35, 190, 0, 191, 19, 229, 21, 75, 53, 82, 252, 0, 81, 191, 35, 15, 95, 68, 30, 51, 44, 75, 32, 67, 51, 58, 80, 51, 62, 35, 62, 80, 97, 45, 0, 81, 80, 35, 159, 51, 62, 51, 40, 61, 6, 0, 1, 35, 31, 51, 185, 2, 6, 30, 5, 48, 210, 51, 185, 5, 72, 0, 80, 51, 62, 51, 88, 35, 15, 95, 51, 80, 0, 58, 6, 0, 82, 191, 5, 7, 51, 46, 68, 4, 4, 81, 6, 3, 72, 97, 121, 46, 5, 105, 151, 6, 105, 151, 7, 202, 18, 95, 72, 18, 202, 35, 159, 18, 64, 18, 35, 31, 72, 148, 134, 51, 183, 1, 230, 134, 63, 5, 84, 68, 6, 72, 57, 19, 97, 188, 17, 243, 72, 11, 5, 89, 97, 185, 73, 6, 67, 72, 11, 5, 94, 73, 81, 6, 72, 57, 3, 201, 1, 213, 72, 11, 21, 5, 83, 97, 209, 21, 73, 5, 81, 22, 72, 11, 21, 5, 87, 207, 88, 211, 78, 35, 159, 18, 35, 190, 51, 182, 50, 5, 48, 68, 7, 5, 48, 246, 6, 35, 62, 18, 35, 31, 80, 35, 54, 72, 6, 0, 81, 2, 4, 0, 93, 2, 97, 236, 45, 5, 81, 6, 5, 86, 72, 7, 78, 83, 72, 193, 0, 33, 72, 73, 59, 1, 212, 72, 10, 146, 72, 35, 12, 22, 35, 28, 22, 96, 174, 10, 146, 227, 72, 182, 73, 10, 0, 6, 72, 14, 112, 72, 47, 19, 240, 233, 14, 120, 72, 0, 94, 35, 190, 78, 35, 159, 35, 31, 61, 33, 98, 71, 61, 5, 95, 72, 6, 98, 58, 34, 15, 80, 5, 35, 190, 80, 35, 62, 33, 50, 78, 35, 190, 21, 5, 35, 159, 80, 35, 31, 33, 50, 78, 35, 159, 21, 32, 98, 64, 0, 18, 35, 62, 80, 73, 0, 82, 64, 63, 4, 0, 6, 134, 51, 177, 5, 81, 98, 113, 7, 245, 72, 51, 137, 9, 10, 11, 12, 13, 14, 78, 79, 72, 46, 5, 95, 98, 143, 6, 96, 64, 47, 77, 96, 64, 104, 141, 11, 116, 27, 125, 72, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 137, 135, 142, 68, 11, 186, 200, 205, 63, 0, 33, 193, 212, 136, 141, 172, 104, 176, 98, 135, 51, 135, 146, 217, 224, 180, 224, 144, 160, 0, 89, 79, 5, 7, 214, 166, 18, 0, 18, 80, 146, 193, 166, 22, 0, 22, 67, 193, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 141, 145, 51, 135, 78, 35, 169, 78, 6, 3, 206, 21, 77, 21, 66, 5, 82, 7, 199, 42, 112, 135, 107, 105, 107, 48, 107, 118, 142, 158, 143, 213, 0, 87, 10, 133, 213, 144, 131, 160, 51, 169, 5, 95, 192, 35, 169, 213, 178, 42, 0, 33, 99, 82, 51, 135, 146, 99, 64, 5, 7, 99, 56, 72, 35, 42, 95, 68, 49, 6, 5, 94, 204, 91, 99, 59, 0, 81, 35, 171, 99, 59, 6, 41, 0, 82, 2, 6, 51, 135, 146, 224, 5, 7, 218, 72, 21, 5, 81, 6, 21, 83, 220, 96, 152, 43, 5, 81, 244, 35, 41, 64, 94, 68, 6, 72, 6, 73, 51, 136, 146, 99, 148, 78, 35, 168, 166, 18, 18, 80, 5, 95, 99, 126, 21, 35, 167, 21, 35, 168, 80, 35, 39, 22, 35, 40, 22, 72, 35, 48, 64, 81, 211, 180, 221, 144, 211, 21, 21, 83, 211, 35, 12, 33, 211, 96, 152, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 141, 9, 119, 112, 113, 25, 121, 112, 124, 135, 168, 68, 158, 107, 230, 10, 108, 7, 146, 107, 216, 108, 21, 201, 132, 220, 144, 72, 21, 89, 72, 35, 26, 33, 72, 160, 188, 72, 63, 0, 33, 72, 166, 93, 108, 1, 107, 245, 19, 99, 252, 108, 1, 41, 53, 95, 68, 49, 6, 72, 5, 82, 72, 99, 243, 41, 0, 82, 2, 6, 72, 0, 84, 33, 72, 21, 21, 86, 72, 64, 82, 72, 144, 178, 72, 51, 137, 108, 7, 104, 146, 232, 104, 166, 85, 72, 119, 35, 26, 35, 153, 104, 178, 72, 154, 236, 144, 72, 0, 81, 33, 72, 21, 35, 28, 33, 72, 96, 152, 0, 0, 0, 0, 0, 0, 0, 0, 0, 141, 11, 119, 27, 122, 135, 168, 68, 51, 134, 37, 38, 7, 202, 63, 0, 33, 197, 212, 197, 9, 37, 49, 95, 242, 5, 95, 37, 5, 81, 6, 0, 19, 6, 0, 82, 18, 5, 39, 213, 11, 186, 100, 69, 89, 96, 152, 160, 174, 197, 104, 166, 86, 229, 38, 0, 81, 38, 0, 54, 54, 229, 0, 0, 141, 11, 113, 27, 115, 108, 250, 51, 181, 116, 119, 135, 168, 68, 10, 104, 146, 217, 0, 35, 171, 158, 10, 108, 241, 63, 0, 33, 203, 108, 216, 10, 108, 175, 108, 216, 9, 146, 236, 108, 230, 108, 241, 203, 108, 175, 203, 5, 95, 72, 78, 85, 246, 81, 49, 22, 53, 18, 18, 49, 95, 100, 193, 108, 203, 0, 18, 19, 101, 6, 0, 33, 72, 101, 6, 5, 81, 6, 37, 93, 96, 182, 94, 72, 94, 96, 180, 72, 10, 104, 186, 72, 86, 72, 64, 81, 72, 9, 112, 112, 184, 72, 166, 86, 72, 88, 25, 22, 119, 41, 112, 178, 9, 21, 0, 89, 33, 72, 21, 96, 144, 72, 31, 34, 120, 122, 123, 124, 125, 32, 72, 50, 100, 252, 0, 22, 0, 88, 33, 95, 68, 49, 6, 78, 85, 220, 21, 85, 80, 0, 33, 72, 119, 160, 47, 228, 21, 80, 0, 33, 72, 113, 51, 169, 5, 81, 6, 35, 41, 64, 84, 96, 152, 47, 5, 91, 72, 6, 51, 133, 112, 112, 112, 112, 112, 160, 160, 160, 96, 188, 0, 0, 42, 112, 112, 121, 121, 27, 121, 135, 142, 68, 168, 68, 51, 169, 5, 81, 68, 6, 32, 218, 45, 5, 95, 109, 113, 6, 15, 78, 35, 170, 146, 229, 166, 83, 109, 151, 235, 166, 84, 109, 191, 235, 144, 5, 7, 219, 109, 209, 199, 74, 7, 5, 95, 247, 72, 112, 112, 96, 152, 42, 5, 81, 6, 37, 83, 80, 94, 68, 22, 125, 35, 43, 91, 72, 96, 152, 42, 5, 95, 68, 6, 37, 84, 80, 0, 6, 72, 166, 92, 238, 0, 81, 22, 166, 84, 221, 88, 54, 0, 38, 104, 166, 88, 72, 37, 71, 37, 71, 70, 72, 35, 43, 95, 72, 82, 22, 0, 92, 54, 0, 81, 38, 109, 140, 174, 101, 235, 37, 1, 199, 17, 206, 37, 96, 132, 104, 166, 86, 72, 37, 96, 182, 37, 96, 154, 35, 44, 95, 226, 27, 0, 93, 33, 235, 184, 109, 123, 0, 35, 172, 101, 235, 0, 68, 11, 133, 235, 144, 178, 43, 77, 41, 37, 80, 72, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 51, 166, 5, 95, 78, 32, 35, 175, 75, 149, 11, 113, 27, 123, 51, 132, 0, 84, 22, 78, 89, 23, 208, 51, 133, 118, 118, 51, 149, 122, 124, 164, 235, 15, 117, 51, 132, 117, 27, 69, 166, 88, 70, 110, 79, 135, 110, 79, 168, 68, 27, 5, 87, 121, 110, 96, 110, 203, 59, 1, 110, 132, 51, 169, 5, 94, 110, 208, 35, 169, 110, 203, 102, 43, 35, 57, 88, 72, 73, 47, 19, 211, 72, 11, 0, 33, 219, 5, 7, 212, 72, 5, 64, 89, 68, 216, 0, 81, 57, 19, 233, 94, 17, 233, 72, 47, 19, 239, 64, 81, 68, 11, 49, 6, 67, 5, 95, 140, 164, 102, 122, 72, 5, 89, 72, 139, 139, 139, 140, 160, 96, 160, 164, 72, 35, 12, 64, 47, 6, 67, 5, 95, 72, 27, 0, 91, 33, 213, 223, 34, 16, 217, 220, 64, 81, 68, 47, 33, 140, 11, 21, 35, 139, 5, 35, 155, 10, 19, 102, 196, 5, 81, 22, 0, 91, 33, 243, 102, 189, 34, 16, 68, 0, 64, 32, 82, 68, 49, 6, 134, 134, 10, 186, 102, 166, 140, 139, 35, 32, 93, 140, 160, 140, 68, 11, 186, 72, 140, 174, 51, 134, 0, 18, 78, 35, 170, 21, 35, 171, 21, 35, 172, 103, 14, 0, 18, 21, 21, 87, 234, 0, 87, 133, 245, 0, 18, 35, 42, 80, 35, 43, 22, 35, 44, 22, 35, 42, 80, 5, 7, 211, 0, 64, 72, 33, 103, 2, 72, 34, 16, 103, 11, 0, 64, 49, 6, 72, 0, 81, 200, 78, 91, 227, 166, 91, 218, 21, 35, 28, 110, 254, 246, 166, 89, 224, 132, 68, 246, 154, 68, 246, 166, 88, 235, 35, 12, 110, 254, 246, 166, 84, 218, 166, 88, 244, 180, 68, 246, 182, 68, 102, 224, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
    ];
    return ROMImage;
}());
var CosmosDisplay = (function () {
    function CosmosDisplay(game) {
        this.holoDisplay = new HolographicDisplay(game, -1, 270, Math.floor(game.width / 7.5));
        this.digits = [];
        this.digits[0] = new SevenSegmentDisplay(game, game.width / 2 - 110, 30, 90);
        this.digits[1] = new SevenSegmentDisplay(game, game.width / 2 + 30, 30, 90);
        this.logo = game.add.image(game.width / 2, game.height - 100, "sprites", "logo");
        this.logo.anchor.x = 0.5;
        this.logo.anchor.y = 0.5;
        this.logo.width = game.width * 0.75;
        this.logo.height = this.logo.width / 6;
    }
    CosmosDisplay.prototype.destroy = function () {
        this.holoDisplay.destroy();
        this.digits[0].destroy();
        this.digits[1].destroy();
        this.logo.destroy();
        this.holoDisplay = this.logo = this.digits = null;
    };
    CosmosDisplay.prototype.turnOn = function (x, y) {
        switch (y) {
            case 6:
                this.digits[0].select(6 - x);
                this.digits[0].lightOn();
                break;
            case 7:
                this.digits[1].select(6 - x);
                this.digits[1].lightOn();
                break;
            default:
                this.holoDisplay.select(x, y);
                this.holoDisplay.lightOn();
                break;
        }
    };
    CosmosDisplay.prototype.setHologram = function (n) {
        this.holoDisplay.setHologram(n);
    };
    CosmosDisplay.prototype.endOfFrame = function () {
        this.holoDisplay.endOfFrame();
        this.digits[0].endOfFrame();
        this.digits[1].endOfFrame();
    };
    return CosmosDisplay;
}());
var Hardware = (function () {
    function Hardware(game) {
        this.display = new CosmosDisplay(game);
        this.keypad = new Keypad(game);
        this.soundHandles = [];
        for (var n = 0; n < 7; n++) {
            this.soundHandles[n + 9] = game.add.audio(Hardware.SOUNDNAMES[n]);
        }
        this.reset();
    }
    Hardware.prototype.destroy = function () {
        this.display.destroy();
        this.keypad.destroy();
        this.soundHandles = this.display = this.keypad = null;
    };
    Hardware.prototype.reset = function () {
        this.gColumns = this.dColumns = this.qRows = 0;
    };
    Hardware.prototype.updateen = function (n) { };
    Hardware.prototype.updated = function (n) {
        this.dColumns = n;
    };
    Hardware.prototype.updateg = function (n) {
        this.gColumns = n;
    };
    Hardware.prototype.updateq = function (n) {
        this.qRows = n;
    };
    Hardware.prototype.readl = function () {
        var n = 0;
        if ((this.qRows & 0x80) != 0) {
            n = (this.keypad.isKeyPressed(CosmosKeys.UP) ? 1 : 0) +
                (this.keypad.isKeyPressed(CosmosKeys.RIGHT) ? 2 : 0) +
                (this.keypad.isKeyPressed(CosmosKeys.DOWN) ? 4 : 0) +
                (this.keypad.isKeyPressed(CosmosKeys.LEFT) ? 8 : 0);
        }
        if ((this.qRows & 0x40) != 0) {
            n = (this.keypad.isKeyPressed(CosmosKeys.START) ? 1 : 0) +
                (this.keypad.isKeyPressed(CosmosKeys.SKILL) ? 2 : 0) +
                (this.keypad.isKeyPressed(CosmosKeys.PLAYERS) ? 4 : 0);
        }
        if ((this.qRows & 0x20) != 0) {
            n = this.keypad.isKeyPressed(CosmosKeys.FIRE) ? 1 : 0;
        }
        return n;
    };
    Hardware.prototype.readin = function () {
        var n = ((this.dColumns & CosmosApplication.getGameID()) != 0) ? 1 : 0;
        return n;
    };
    Hardware.prototype.siowrite = function (n) {
        console.log(n);
        this.soundHandles[n].play();
    };
    Hardware.prototype.timerOverflow = function () {
        var xCol = this.gColumns * 16 + this.dColumns;
        var yRow = this.qRows;
        for (var y = 0; y < 8; y++) {
            if ((yRow & (0x01 << y)) != 0) {
                for (var x = 0; x < 7; x++) {
                    if ((xCol & (0x40 >> x)) != 0) {
                        this.display.turnOn(x, y);
                    }
                }
            }
        }
        this.display.setHologram((xCol & 0x80) != 0 ? 2 : 1);
    };
    Hardware.prototype.endOfFrame = function () {
        this.display.endOfFrame();
    };
    Hardware.SOUNDNAMES = ["shortwhite", "longwhite", "shortlow", "longlow", "shorthigh", "longhigh", "gameover"];
    return Hardware;
}());
var DummyHardware = (function () {
    function DummyHardware() {
    }
    DummyHardware.prototype.destroy = function () {
    };
    DummyHardware.prototype.reset = function () {
        console.log("Dummy:Reset");
    };
    DummyHardware.prototype.updateen = function (n) {
        console.log("Dummy:EN:" + n.toString(16));
    };
    DummyHardware.prototype.updated = function (n) {
        this.d = n;
        console.log("Dummy:D:" + n.toString(16));
    };
    DummyHardware.prototype.updateg = function (n) {
        console.log("Dummy:G:" + n.toString(16));
    };
    DummyHardware.prototype.updateq = function (n) {
        console.log("Dummy:Q:" + n.toString(16));
    };
    DummyHardware.prototype.readl = function () {
        var n = 0;
        console.log("Dummy:InL:" + n.toString(16));
        return n;
    };
    DummyHardware.prototype.readin = function () {
        var n = ((this.d & CosmosApplication.getGameID()) != 0) ? 1 : 0;
        console.log("Dummy:InIn:" + n.toString(16));
        return n;
    };
    DummyHardware.prototype.siowrite = function (n) {
    };
    DummyHardware.prototype.timerOverflow = function () {
        console.log("Dummy:TOV");
    };
    DummyHardware.prototype.endOfFrame = function () {
        console.log("Dummy:EOF");
    };
    return DummyHardware;
}());
var CosmosKeys;
(function (CosmosKeys) {
    CosmosKeys[CosmosKeys["UP"] = 0] = "UP";
    CosmosKeys[CosmosKeys["RIGHT"] = 1] = "RIGHT";
    CosmosKeys[CosmosKeys["LEFT"] = 2] = "LEFT";
    CosmosKeys[CosmosKeys["DOWN"] = 3] = "DOWN";
    CosmosKeys[CosmosKeys["START"] = 4] = "START";
    CosmosKeys[CosmosKeys["PLAYERS"] = 5] = "PLAYERS";
    CosmosKeys[CosmosKeys["SKILL"] = 6] = "SKILL";
    CosmosKeys[CosmosKeys["FIRE"] = 7] = "FIRE";
})(CosmosKeys || (CosmosKeys = {}));
var DummyKeypad = (function () {
    function DummyKeypad() {
    }
    DummyKeypad.prototype.isKeyPressed = function (key) {
        return false;
    };
    DummyKeypad.prototype.destroy = function () { };
    return DummyKeypad;
}());
var Keypad = (function () {
    function Keypad(game) {
        this.cosmosToPhaser = {};
        this.addKey(game, Phaser.Keyboard.UP, CosmosKeys.UP);
        this.addKey(game, Phaser.Keyboard.DOWN, CosmosKeys.DOWN);
        this.addKey(game, Phaser.Keyboard.LEFT, CosmosKeys.LEFT);
        this.addKey(game, Phaser.Keyboard.RIGHT, CosmosKeys.RIGHT);
        this.addKey(game, Phaser.Keyboard.ENTER, CosmosKeys.START);
        this.addKey(game, Phaser.Keyboard.S, CosmosKeys.SKILL);
        this.addKey(game, Phaser.Keyboard.P, CosmosKeys.PLAYERS);
        this.addKey(game, Phaser.Keyboard.CONTROL, CosmosKeys.FIRE);
    }
    Keypad.prototype.addKey = function (game, phaserKey, cosmosKey) {
        var key = game.input.keyboard.addKey(phaserKey);
        this.cosmosToPhaser[cosmosKey] = key;
    };
    Keypad.prototype.isKeyPressed = function (key) {
        var down = this.cosmosToPhaser[key].isDown;
        return down;
    };
    Keypad.prototype.destroy = function () {
        this.cosmosToPhaser = null;
    };
    return Keypad;
}());
