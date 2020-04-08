import Character from '../exCode.js'

var CHARACTER_SCALE = 0.05
class MemoryScene extends Phaser.Scene {

    constructor()
    {
        super({ key: 'MemoryScene' })
        this.player;
        this.gameData
        this.cursors;
        this.arr1 = []
        this.arr2 = []
        this.arr3 = []
        this.gameObj1
        this.gameObj2
        this.gameObj3

    }
    init(data)
    {
        this.player = data.player;
        this.gameData = data.gameData
    }
    preload() {
        this.add.image('bat', './assets/bat.png')
        this.add.image('bunny', './assets/bunny.png')
        this.add.image('right', './assets/right.png')
        this.add.image('bluecrab', './assets/bluecrab.png')
        this.add.image('globe', './assets/globe.png')
        this.add.image('sapphire', './assets/sapphire.png')
        this.add.image('bokchoy', './assets/bokchoy.png')
        this.add.image('pig', './assets/pig.png')
        this.add.image('down', './assets/down.png')
        this.add.image('emerald', './assets/emerald.png')
        this.add.image('brocoli', './assets/chameleon.png')
        this.add.image('fire', './assets/fire.png')
        this.add.image('ruby', './assets/ruby.png')
        this.add.image('crab', './assets/crab.png')
        this.add.image('skull', './assets/skull.png')
        this.add.image('lightbulb', './assets/lightbulb.png')
        this.add.image('left', './assets/left.png')
    }

    create() {

        //STORING DATA IN 3 ARRS
       // gameObj1 = this.add.image()
        let obj = this.add.image(300, 200, 'bat').setScale(0.05)
        this.arr1.push(obj)
        // this.arr1.push('bluecrab')
        // this.arr1.push('bokchoy')
        // this.arr1.push('emerald')
        // this.arr1.push('fire')
        // this.arr1.push('skull')

        // this.arr2.push('bunny')
        // this.arr2.push('globe')
        // this.arr2.push('pig')
        // this.arr2.push('brocoli')
        // this.arr2.push('ruby')
        // this.arr2.push('lightbulb')

        // this.arr3.push('right')
        // this.arr3.push('sapphire')
        // this.arr3.push('down')
        // this.arr3.push('chameleon')
        // this.arr3.push('crab')
        // this.arr3.push('left')

        // this.gameObj1 = arr1[0];
        // this.gameObj1.setInteractive({ useHandCursor: true })
        // this.gameObj1.on('pointerup', this.choose, this)



        //GAME LOGIC

        this.player = this.physics.add.sprite(100, 525, this.player.texture.key, 1).setScale(CHARACTER_SCALE);
        this.player.setCollideWorldBounds(true).setBounce(.2)

        this.cursors = this.input.keyboard.createCursorKeys()

        this.text = this.add.text(300, 50, 'SELECT ONE CHOICE', { font: '26px Arial', fill: '#ffffff' });

        //store choice 2-4 or something, then randomize, ask what item they picked - if clicked right choice, extra
        //points for lbrain; if clicked something weird and unique (like rainbow pirate ship or something), rbrain pts


        this.input.once('pointerdown', function () {
            this.scene.stop()
            this.scene.start('sceneC', {player: this.player}, {gameData: this.gameData})
        }, this);


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
    choose()
    {
        this.gameObj1.destroy()
    }
}

export default MemoryScene