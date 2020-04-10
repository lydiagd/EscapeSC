import SceneB from './scenes/sceneB.js'
import SceneC from './scenes/sceneC.js'
import LoadScreen from './scenes/LoadScreen.js';
import CompileResults from './scenes/CompileResults.js';
import EndScene from './scenes/endScene.js';
import MemoryScene from './scenes/MemoryScene.js';

//var CHARACTER_SCALE = 0.05

class OpeningScreen extends Phaser.Scene { /******** OPENING SCREEN ********/
    constructor() {
        super({ key: 'OpeningScreen' })
        this.scoreLeft = 50.5
        this.scoreRight = 50.5
    }

    // init(data) {
    //     // this.data = data.gameData
    // }

    preload() {

    }

    create() {
        var check = this.add.text(50, 50, "CHECKPOINT: G1", { font: '18px Courier', fill: '#fff' })
        var text = this.add.text(200, 100, 'WELCOME TO THE PERSONALITY CHALLENGE', { font: '18px Courier', fill: 'rgb(68, 136, 170)' })

        var n1 = this.add.text(180, 250, 'Want to see if you are eligible for greater things beyond?', { font: '12px Courier', fill: '#0f0' })
        var n2 = this.add.text(180, 265, 'Take our professional diagnostics test to discover your personality traits', { font: '12px Courier', fill: '#0f0' })
        var n3 = this.add.text(180, 280, 'and see what strengths and weaknesses you possess.', { font: '12px Courier', fill: '#0f0' })

        var text = this.add.text(250, 345, 'click to begin game', { font: '16px Courier', fill: '#0f0' })
        text.setInteractive({ useHandCursor: true })
        text.on('pointerup', this.clickButton, this)
    }
    clickButton() {
        this.scene.start('LoadScreen', {scoreLeft: this.scoreLeft, scoreRight: this.scoreRight})
    }
}

class TitleScene extends Phaser.Scene { /******** TITLE SCREEN ********/

    constructor() {
        super({ key: 'TitleScene' })
        this.player
        //this.data
        this.scoreLeft
        this.scoreRight
    }


    init(data)
    {
        this.player = data.player
        this.scoreLeft = data.scoreLeft
        this.scoreRight = data.scoreRight
    }


    preload() {
        this.load.image('face', './assets/smileyFace.png')
        this.load.image('icon', './assets/boxBlock.png')
        this.load.image('right', './assets/right.png')
    }

    create() {
        var text = this.add.text(250, 300, 'click to begin game', { font: '16px Courier', fill: '#0f0' })
        var face = this.add.image(210, 300, 'right')
        text.setInteractive({ useHandCursor: true })
        face.setInteractive({ useHandCursor: true })
        face.setScale(0.03)
        if (this.player == null) {
            text.alpha = CHARACTER_OPAQUE
            face.alpha = CHARACTER_OPAQUE
            face.on('pointerup', this.enterButtonHoverState, this)
            text.on('pointerup', this.enterButtonHoverState, this)
        }
        else {
            face.on('pointerup', this.clickButton, this)
            text.on('pointerup', this.clickButton, this)
        }

        var createFig = this.add.text(250, 400, 'click to create your character', { font: '16px Courier', fill: '#0f0' })
        createFig.setInteractive({ useHandCursor: true })
        createFig.on('pointerdown', this.clickButton2, this)

        var icon = this.add.image(210, 400, 'icon')
        icon.setScale(0.07)
        icon.setInteractive({ useHandCursor: true })
        icon.on('pointerup', this.clickButton2, this)

    }

    clickButton() {
        this.scene.start('sceneB', {player: this.player, scoreLeft: this.scoreLeft, scoreRight: this.scoreRight})
    }

    clickButton2() {
        this.scene.start('character', {player: this.player, scoreLeft: this.scoreLeft, scoreRight: this.scoreRight})
    }

    enterButtonHoverState() {
        // this.clickButton.setStyle({ fill: '#ff0' })
        if (this.player == null) {
            var popup = this.add.text(140, 200, 'Sorry, please create a character before playing the game')
        }
    }

    enterButtonRestState() {
        this.clickButton.setStyle({ fill: '#0f0' })
    }
}

var CHARACTER_SCALE = 0.05;
var CHARACTER_OPAQUE = 0.6;
class Character extends Phaser.Scene /******** CHARACTER SCREEN ********/ {

    constructor() {
        super({ key: 'character' })
        this.player
        this.dataL
        this.dataR
        this.arr = [] // push all characters into array and manually set player 
        this.timeText
        this.initialTime
    }
    init(data)
    {
        this.player = data.player
        this.dataL = data.scoreLeft
        this.dataR = data.scoreRight
    }

    preload() {
        this.load.image('character', './assets/pig.png')
        this.load.image('mario', './assets/mario.png')
        //this.load.image('background', './assets/whiteRectangle.png')
        this.load.image('red-angel', './assets/red-angel.png')
        this.load.image('indigo-fairy', './assets/indigo-fairy.png')
        this.load.image('skull', './assets/skull.png')
    }

    create() {
        // CHARACTER OPTION 1
        this.addNewPlayer(70, 90, 'character')

        // CHARACTER OPTION 2
        this.addNewPlayer(200, 90, 'skull')
        this.addNewPlayer(330, 90, 'red-angel')
        this.addNewPlayer(460, 90, 'indigo-fairy')

        // RETURN TO MAIN SCREEN
        var text = this.add.text(250, 500, 'click to return back to menu screen', { font: '16px Courier', fill: '#ffffff' })
        text.setInteractive({ useHandCursor: true })
        text.setInteractive()
        text.on('pointerup', this.clickButton, this)

        this.input.manager.enabled = true


        this.initialTime = 18
        this.timeText = this.add.text(525, 550, 'Countdown: '+ this.initialTime, { font: '26px Arial', fill: '#ffffff' })
        this.timeText.alpha = 0
        // Each 1000 ms call onEvent
        this.time.addEvent({ delay: 1000, callback: this.onTimeEvent, callbackScope: this, loop: true })
    }

    clickButton() {
        if(this.initialTime > 0 && this.player != null)
        {
            this.dataL += 1.4*this.initialTime
            this.dataR += 50/this.initialTime
        }
        this.scene.start('TitleScene', { player: this.player, scoreLeft: this.dataL, scoreRight: this.dataR})
    }

    onTimeEvent ()
    {
        this.initialTime -= 1 // One second
        if (this.initialTime < 0){
            return
        }
        this.timeText.setText('Countdown: ' + this.initialTime)
        this.timeText.alpha = 0;
    }

    addNewPlayer(x, y, key) {
        //  background
        // var bg = this.add.image(x, y, 'background')
        // bg.setInteractive({ useHandCursor: true })
        // bg.setScale(0.8)
        //  sprite
        var player = this.add.sprite(x, y, key)
        console.log("debug player: ", player, player.x, player.y)
        player.setInteractive({ useHandCursor: true })
        player.setScale(CHARACTER_SCALE)
        player.inputEnabled = true
        player.alpha = CHARACTER_OPAQUE
        player.on('pointerover', function () { 
            this.alpha = 1
        })
        player.on('pointerout', function () { this.alpha = CHARACTER_OPAQUE })
        // save 'this' to a variable for callbacks
        var self = this
        player.on('pointerup', function(){
            self.setPlayer(this) // 'this' represents the clicked element
            player.alpha = 1
        })
        // SAVE TO CHARACTER ARRAY
        this.arr.push(player)
    }

    setPlayer(player) {
        this.player = player
        console.log("Selected character! set player", player)
        this.update()
    }

    // update alpha depending on selected status
    update() {      
        for(var i = 0; i < this.arr.length; i++) {
            if (this.player != this.arr[i]) {
                this.arr[i].alpha = CHARACTER_OPAQUE
            } else {
                this.arr[i].alpha = 1
            }
        }
    }
}

export default Character

var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 }, // will affect our player sprite
            debug: false // change if you need
        }
    },
    scene: [OpeningScreen, LoadScreen, TitleScene, SceneB, MemoryScene, SceneC, Character, CompileResults, EndScene]//, CompileResults, endScene]
}

// don't know if we need this class, depends on how complicated the
// data we want to pass around is
// class gameData {
//     constructor(){
//         // this.playerTest
//         this.scoreLeft = 50
//         this.scoreRight = 50
//     }
// }

//var data = new gameData()
var game = new Phaser.Game(config)

game.scene.start(OpeningScreen)

