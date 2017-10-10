/// <reference path="../../lib/phaser.comments.d.ts"/>

class Keypad implements IKeypad {

    private cosmosToPhaser:any;

    constructor(game:Phaser.Game) {
        this.cosmosToPhaser = {};

        this.addKey(game,Phaser.Keyboard.UP,CosmosKeys.UP);
        this.addKey(game,Phaser.Keyboard.DOWN,CosmosKeys.DOWN);
        this.addKey(game,Phaser.Keyboard.LEFT,CosmosKeys.LEFT);
        this.addKey(game,Phaser.Keyboard.RIGHT,CosmosKeys.RIGHT);

        this.addKey(game,Phaser.Keyboard.ENTER,CosmosKeys.START);
        this.addKey(game,Phaser.Keyboard.S,CosmosKeys.SKILL);
        this.addKey(game,Phaser.Keyboard.P,CosmosKeys.PLAYERS);

        this.addKey(game,Phaser.Keyboard.CONTROL,CosmosKeys.FIRE);        
    }

    private addKey(game:Phaser.Game,phaserKey:number,cosmosKey:CosmosKeys) {
        var key:Phaser.Key = game.input.keyboard.addKey(phaserKey);
        this.cosmosToPhaser[cosmosKey] = key;
    }

    isKeyPressed(key: CosmosKeys): boolean {
        var down:boolean = (<Phaser.Key>this.cosmosToPhaser[key]).isDown;
        //console.log(key,down);
        return down;
    }

    destroy(): void {        
        this.cosmosToPhaser = null;
    }
}