/// <reference path="../../lib/phaser.comments.d.ts"/>

window.onload = function() {
    var game = new CosmosApplication()
}

class CosmosApplication extends Phaser.Game {

    private static gameID = 1;

    constructor() {
        // Call the super constructor.
        super({
            enableDebug: false,
            width:640,
            height:960,
            renderer:Phaser.AUTO,
            parent:null,
            transparent: false,            
            antialias: true
        });
        // Create a new state and switch to it.
        this.state.add("Boot", new BootState());
        this.state.add("Preload", new PreloadState());
        this.state.add("Game",new GameState());
        this.state.start("Boot");
    }

    /**
     * Retrieve the Game ID
     * 
     * @static
     * @returns {number} 
     * @memberof CosmosApplication
     */
    public static getGameID(): number {
        return CosmosApplication.gameID;
    }

    /**
     * Extract a key from the query string, return default value if ""
     * 
     * @static
     * @param {string} key 
     * @param {string} [defaultValue=""] 
     * @returns {string} 
     * 
     * @memberOf CosmosApplication
     */
    static getURLName(key:string,defaultValue:string = "") : string {
        var name:string = decodeURIComponent(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + encodeURIComponent(key.toLowerCase()).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
        return (name == "") ? defaultValue:name;
    }    

}

/**
 * Boot state. Preloads loader image, sets up display.
 */
class BootState extends Phaser.State {
    preload() : void {
        this.game.load.image("loader","assets/sprites/loader.png");
        this.game.load.onLoadComplete.add(() => { this.game.state.start("Preload",true,false,1); },this);
    }

    create() : void {        
        // Make the game window fit the display area. Doesn't work in the Game constructor.
        this.game.scale.pageAlignHorizontally = true;
        this.game.scale.pageAlignVertically = true;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL; 
    }

}
