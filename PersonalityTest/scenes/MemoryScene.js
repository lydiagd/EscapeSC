import Character from '../exCode.js'

var CHARACTER_SCALE = 0.05
class MemoryScene extends Phaser.Scene {

    constructor()
    {
        super({ key: 'MemoryScene' })
        this.player;
        this.scoreLeft
        this.scoreRight
        this.cursors;

        this.arr1 = []
        this.gameObj1
        this.gameObj2
        this.gameObj3

        this.currentRound = 0
        this.randomRound
        this.answer
        this.newtxt
        this. clickBool = true
    }
    init(data)
    {
        this.player = data.player;
        this.scoreLeft = data.scoreLeft
        this.scoreRight = data.scoreRight
    }
    preload() {
        this.load.image('bat', './assets/bat.png')
        this.load.image('bunny', './assets/bunny.png')
        this.load.image('right', './assets/right.png')

        this.load.image('bluecrab', './assets/bluecrab.png')
        this.load.image('globe', './assets/globe.png')
        this.load.image('sapphire', './assets/sapphire.png')

        this.load.image('bokchoy', './assets/bokchoy.png')
        this.load.image('pig', './assets/pig.png')
        this.load.image('down', './assets/down.png')

        this.load.image('emerald', './assets/emerald.png')
        this.load.image('brocolli', './assets/brocolli.png')
        this.load.image('chameleon', './assets/chameleon.png')

        this.load.image('fire', './assets/fire.png')
        this.load.image('ruby', './assets/ruby.png')
        this.load.image('crab', './assets/crab.png')
        
        this.load.image('skull', './assets/skull.png')
        this.load.image('lightbulb', './assets/lightbulb.png')
        this.load.image('left', './assets/left.png')
    }

    create() {
        this.randomRound = Math.floor(Math.random() * 6)+1;

        this.arr1.push('bat');
        this.arr1.push('bunny')
        this.arr1.push('right')

        this.arr1.push('bluecrab')
        this.arr1.push('globe')
        this.arr1.push('sapphire')

        this.arr1.push('bokchoy')
        this.arr1.push('pig')
        this.arr1.push('down')

        this.arr1.push('emerald')
        this.arr1.push('brocolli')
        this.arr1.push('chameleon')
        
        this.arr1.push('fire')
        this.arr1.push('ruby')
        this.arr1.push('crab')
        
        this.arr1.push('skull')
        this.arr1.push('lightbulb')
        this.arr1.push('left')

        this.gameObj1 = this.add.sprite(600, 300, this.arr1[this.currentRound], 1).setScale(0.04)
        this.gameObj2 = this.add.sprite(400, 300, this.arr1[this.currentRound+1], 1).setScale(0.04)
        this.gameObj3 = this.add.sprite(200, 300, this.arr1[this.currentRound+2], 1).setScale(0.04)

        this.gameObj1.setInteractive({ useHandCursor: true })
        var self = this
        this.gameObj1.on('pointerup', function(){
            self.choose(this.texture.key)
        })
        this.gameObj2.setInteractive({ useHandCursor: true })
        var self = this
        this.gameObj2.on('pointerup', function(){
            self.choose(this.texture.key)
        })
        this.gameObj3.setInteractive({ useHandCursor: true })
        var self = this
        this.gameObj3.on('pointerup', function(){
            self.choose(this.texture.key)
        })
        
        //GAME LOGIC
        this.player = this.physics.add.sprite(100, 525, this.player.texture.key, 1).setScale(CHARACTER_SCALE);
        this.player.setCollideWorldBounds(true).setBounce(.2)

        this.cursors = this.input.keyboard.createCursorKeys()

        this.text = this.add.text(270, 50, 'SELECT ONE CHOICE', { font: '26px Arial', fill: '#ffffff' });

        //store choice 2-4 or something, then randomize, ask what item they picked - if clicked right choice, extra
        //points for lbrain; if clicked something weird and unique (like rainbow pirate ship or something), rbrain pts

        // this.input.once('pointerdown', function () {
        //     this.scene.stop()
        //     this.scene.start('sceneC', {player: this.player}, {gameData: this.gameData})
        // }, this);

        this.newtxt = this.add.text(220, 550, 'click to continue', { font: '26px Arial', fill: '#ffffff' });
        this.newtxt.alpha = 0;
        this.newtxt.setInteractive({useHandCursor: true});
        this.newtxt.on('pointerup', this.clickButton, this)
    }

    update() {
        this.player.setVelocity(0)
        let speed = 200
        // Horizontal movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-speed)
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(speed)
        }
    }

    clickButton(){
        this.scene.start('sceneC', {player: this.player, scoreLeft: this.scoreLeft, scoreRight: this.scoreRight})
    }

    choose(answer) {
        if (this.currentRound == 6) {
            if(this.clickBool == true)
            {
                // if(answer == arr1[2] || answer == arr1[8] || answer == arr1[17])
                // {
                //     this.scoreRight += 20
                // }
                if (answer == this.answer) {
                    this.scoreLeft += 30
                    this.add.text(220, 500, 'You\'re right!', { font: '26px Arial', fill: '#ffffff' });
                } else {
                    this.scoreRight += 10
                    this.add.text(220, 500, 'You\'re wrong!', { font: '26px Arial', fill: '#ffffff' });
                }
                this.clickBool = false
            }
            this.newtxt.alpha = 1;
            return
        }

        if (this.currentRound == this.randomRound) {
            this.answer = answer;
        }
        this.currentRound += 1
        if (this.currentRound<6) {
            this.updateGameObj(this.arr1[this.currentRound*3], this.arr1[this.currentRound*3+1], this.arr1[this.currentRound*3+2])
        } else {
            this.askQuestion()
        }
    }

    updateGameObj(tex1, tex2, tex3) {
        this.gameObj1.setTexture(tex1)
        this.gameObj2.setTexture(tex2)
        this.gameObj3.setTexture(tex3)
    }

    askQuestion() {
        let rand1 = Math.floor(Math.random() * 18)+1;
        let rand2 = Math.floor(Math.random() * 18)+1;

        this.updateGameObj(this.arr1[rand1], this.arr1[rand2], this.answer)
        this.text = this.add.text(220, 400, 'What did you choose in round ' + this.randomRound + '?', { font: '26px Arial', fill: '#ffffff' });
        console.log("For round: ", this.randomRound, " answer: " , this.answer)
    }
}

export default MemoryScene