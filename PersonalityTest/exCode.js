import SceneB from './scenes/sceneB.js'
import SceneC from './scenes/sceneC.js'

class OpeningScreen extends Phaser.Scene { /******** OPENING SCREEN ********/
    constructor() {
        super({ key: 'OpeningScreen' })
    }

    init(data) {
        this.gameData = data.gameData
    }

    preload() {

    }

    create() {
        var text = this.add.text(200, 100, 'WELCOME TO THE PERSONALITY CHALLENGE', { font: '18px Courier', fill: 'rgb(68, 136, 170)' })

        var n1 = this.add.text(180, 250, 'Want to see if you are eligible for greater things beyond?', { font: '12px Courier', fill: '#0f0' })
        var n2 = this.add.text(180, 265, 'Take our professional diagnostics test to discover your personality traits', { font: '12px Courier', fill: '#0f0' })
        var n3 = this.add.text(180, 280, 'and see what strengths and weaknesses you possess.', { font: '12px Courier', fill: '#0f0' })

        var text = this.add.text(250, 345, 'click to begin game', { font: '16px Courier', fill: '#0f0' })
        text.setInteractive({ useHandCursor: true })
        text.on('pointerup', this.clickButton, this)
    }
    clickButton() {
        this.scene.start('TitleScene')
    }
}

class TitleScene extends Phaser.Scene { /******** TITLE SCREEN ********/

    init(data)
    {
        this.player = data.player
    }

    constructor() {
        super({ key: 'TitleScene' })
        this.player
        // var createdCharacter
    }

    preload() {
        this.load.image('face', './assets/smileyFace.png')
        this.load.image('icon', './assets/mario.png')
        this.load.image('pig', './assets/pig.png')
    }

    create() {
        var text = this.add.text(250, 300, 'click to begin game', { font: '16px Courier', fill: '#0f0' })
        var face = this.add.image(210, 300, 'pig')
        face.setInteractive({ useHandCursor: true })
        face.setScale(0.04)
        if (this.player == null) {
            text.alpha = 0.4
            face.alpha = 0.4
        }
        
        var createFig = this.add.text(250, 400, 'click to create your character', { font: '16px Courier', fill: '#0f0' })
        //createFig.setInteractive({ useHandCursor: true })
        if (this.player != null) {
            face.on('pointerup', this.clickButton, this)
        }
        else {
            face.on('pointerup', this.enterButtonHoverState, this)
        }

        var icon = this.add.image(210, 400, 'icon')
        icon.setScale(0.1)
        icon.setInteractive({ useHandCursor: true })
        icon.on('pointerup', this.clickButton2, this)
    }

    clickButton() {
        this.scene.start('sceneB', {player: this.player})
    }

    clickButton2() {
        this.scene.start('character')
    }

    enterButtonHoverState() {
        this.clickButton.setStyle({ fill: '#ff0' })
        if (createdCharacter == false) {
            var popup = this.add.text(265, 275, 'Sorry, please create a character before playing the game')
        }
    }

    enterButtonRestState() {
        this.clickButton.setStyle({ fill: '#0f0' })
    }
}

class Character extends Phaser.Scene /******** CHARACTER SCREEN ********/ {
    
    init() {
        //var createdCharacter = true
    }

    constructor() {
        super({ key: 'character' })
        this.player
        this.arr = [] // push all characters into array and manually set player 
    }

    preload() {
        this.load.image('character', './assets/pig.png')
        this.load.image('c2', './assets/smileyFace.png')
        this.load.image('background', './assets/whiteRectangle.png')
    }

    create() {
        var bg1 = this.add.image(100, 90, 'background')
        bg1.setScale(0.8)
        var bg2 = this.add.image(300, 90, 'background')
        bg2.setScale(0.8)

        // CHARACTER OPTION 1
        var p1 = this.add.sprite(90, 90, 'character')
        this.addNewPlayer(p1, 0.06)

        // CHARACTER OPTION 2
        var p2 = this.add.sprite(300, 90, 'c2')
        this.addNewPlayer(p2, 0.1)

        // RETURN TO MAIN SCREEN
        var text = this.add.text(250, 400, 'click to return back to menu screen', { font: '16px Courier', fill: '#ffffff' })
        text.setInteractive({ useHandCursor: true })
        text.setInteractive()
        text.on('pointerup', this.clickButton, this)

        this.input.manager.enabled = true

        // this.input.once('pointerdown', function () {
        //     this.scene.start('TitleScene')
        // }, this)
    }

    clickButton() {
        this.scene.start('TitleScene', { player: this.player })
    }

    addNewPlayer(player, scale) {
        player.setInteractive({ useHandCursor: true })
        player.setScale(scale)
        player.inputEnabled = true
        player.alpha = 0.4
        player.on('pointerover', function () { 
            this.alpha = 1
            console.log("POINTER OVER!")
        })
        player.on('pointerout', function () { this.alpha = 0.4 })
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
        player
        this.update()
    }

    // update alpha depending on selected status
    update() {      
        for(var i = 0; i < this.arr.length; i++) {
            if (this.player != this.arr[i]) {
                this.arr[i].alpha = 0.4
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
}

// don't know if we need this class, depends on how complicated the
// data we want to pass around is
class gameData {
    constructor(){
        // this.playerTest
        this.scoreLeft = 50
        this.scoreRight = 50
    }
}

var data = new gameData()
var game = new Phaser.Game(config)

game.scene.start(OpeningScreen, {gameData: data})

