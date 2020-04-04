class OpeningScreen extends Phaser.Scene { /******** OPENING SCREEN ********/
    constructor() {
        super({ key: 'OpeningScreen' });
    }

    preload() {

    }

    create() {
        var text = this.add.text(200, 100, 'WELCOME TO THE PERSONALITY CHALLENGE', { font: '18px Courier', fill: 'rgb(68, 136, 170)' })

        var n1 = this.add.text(180, 250, 'Want to see if you are eligible for greater things beyond?', { font: '12px Courier', fill: '#0f0' })
        var n2 = this.add.text(180, 265, 'Take our professional diagnostics test to discover your personality traits', { font: '12px Courier', fill: '#0f0' })
        var n3 = this.add.text(180, 280, 'and see what strengths and weaknesses you possess.', { font: '12px Courier', fill: '#0f0' })

        var text = this.add.text(250, 345, 'click to begin game', { font: '16px Courier', fill: '#0f0' });
        text.setInteractive({ useHandCursor: true })
        text.on('pointerup', this.clickButton, this);
    }
    clickButton() {
        this.scene.start('TitleScene');
    }
}


class TitleScene extends Phaser.Scene { /******** TITLE SCREEN ********/

    // init(data)
    // {
    //     createdCharacter = data.createdChar;
    //     player = data.playerNew;

    // }

    constructor() {
        super({ key: 'TitleScene' });
        // var player;
        // var createdCharacter;
    }

    preload() {
        this.load.image('face', './assets/smileyFace.png');
        this.load.image('icon', './assets/mario.png');
        this.load.image('pig', './assets/pig.png');
    }

    create() {
        var createdCharacter = true;

        var text = this.add.text(250, 300, 'click to begin game', { font: '16px Courier', fill: '#0f0' });
        // text.setInteractive({ useHandCursor: true }).on('pointerover', () => this.enterButtonHoverState() )
        // .on('pointerout', () => this.enterButtonRestState() ).on('pointerdown', () => this.clickButton2());

        var createFig = this.add.text(250, 400, 'click to create your character', { font: '16px Courier', fill: '#0f0' });
        //createFig.setInteractive({ useHandCursor: true });
        var face = this.add.image(210, 300, 'pig');
        face.setScale(0.04);
        face.setInteractive({ useHandCursor: true });
        if (createdCharacter == true) {
            face.on('pointerup', this.clickButton, this);
        }
        else {
            face.on('pointerup', this.enterButtonHoverState, this);
        }

        var icon = this.add.image(210, 400, 'icon');
        icon.setScale(0.1);
        icon.setInteractive({ useHandCursor: true });
        icon.on('pointerup', this.clickButton2, this);


    }

    clickButton() {
        this.scene.start('sceneB');
    }

    clickButton2() {
        this.scene.start('character');
    }

    enterButtonHoverState() {

        this.clickButton.setStyle({ fill: '#ff0' });

        if (createdCharacter == false) {
            var popup = this.add.text(265, 275, 'Sorry, please create a character before playing the game');
        }
    }

    enterButtonRestState() {
        this.clickButton.setStyle({ fill: '#0f0' });
    }
}

class Character extends Phaser.Scene /******** CHARACTER SCREEN ********/ {
    init() {
        //var createdCharacter = true;
    }
    constructor() {
        super({ key: 'character' });

    }

    preload() {
        this.load.image('character', './assets/pig.png');
        this.load.image('c2', './assets/smileyFace.png');
        this.load.image('background', './assets/whiteRectangle.png')
    }


    create() {
        var player;
        let arr = [];
        var p1C = true;
        var p2C = true;
        var p3C = true;  //push all characters into array and manually set player 
        var p4C = true;

        var bg1 = this.add.image(100, 90, 'background');
        bg1.setScale(0.8);

        var bg2 = this.add.image(375, 90, 'background');
        bg2.setScale(0.8);


        var p1 = this.add.sprite(90, 90, 'character');
        p1.setInteractive({ useHandCursor: true });
        p1.alpha = 0.4;
        arr.push(p1);
        p1.setScale(0.06);
        p1.inputEnabled = true;

        if (p1C == true) {
            p1.on('pointerover', function () { p1.alpha = 1; }, this);
            p1.on('pointerout', function () { p1.alpha = 0.4; }, this);
        }

        p1.on('pointerup', this.setPlayer1, this);
        // p1.on('pointerdown', this.hover, this);


        var p2 = this.add.sprite(375, 90, 'c2');
        p2.setInteractive({ useHandCursor: true });
        p2.alpha = 0.2;
        arr.push(p2);
        p2.setScale(0.1);
        p2.inputEnabled = true;

        if (p2C == true) {
            p2.on('pointerover', function () { p2.alpha = 1; }, this);
            p2.on('pointerout', function () { p2.alpha = 0.5; }, this);
        }

        p2.on('pointerup', this.setPlayer2, this);

        var text = this.add.text(250, 400, 'click to return back to menu screen', { font: '16px Courier', fill: '#ffffff' });
        text.setInteractive({ useHandCursor: true });
        text.setInteractive();
        text.on('pointerup', this.clickButton, this);

        this.input.manager.enabled = true;

        // this.input.once('pointerdown', function () {

        //     this.scene.start('TitleScene');

        // }, this);
    }

    clickButton() {
        this.scene.start('TitleScene');
        //, {createdChar: true, player: player});
    }
    setPlayer1() {
        //player = this.add.sprite('character');
        // player = arr[0];
        p1C = false, p2C = true, p3C = true, p4C = true;
    }

    setPlayer2() {
        ///player = this.add.sprite('character');
        //player = arr[1];
        p1C = true, p2C = false, p3C = true, p4C = true;
    }

    setPlayer3() {
        //player = this.add.sprite('character');
        //var playerSet = 
    }

    setPlayer4() {
        //player = this.add.sprite('character');
        //var playerSet = 
    }

    update() {

        // 
        // if (p1.input.pointerOver())
        // {
        //     p1.alpha = 1;
        // }
        // else
        // {
        //     p1.alpha = 0.5;
        // }
    }

    // hover()
    // {
    //     p1.alpha = 1;

    // }


}

import SceneB from './scenes/sceneB.js'
import SceneC from './scenes/sceneC.js'

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    //parent: 'phaser-example',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 }, // will affect our player sprite
            debug: false // change if you need
        }
    },
    scene: [OpeningScreen, TitleScene, SceneB, SceneC, Character]
};

var cursors;
var playerTest;

var scoreLeft = 50;
var scoreRight = 50;

var game = new Phaser.Game(config);
//var cursors;

game.scene.start(OpeningScreen);

