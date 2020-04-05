import Character from '../exCode.js'

class SceneB extends Phaser.Scene { /******** GAME #2 ********/
    
    constructor ()
    {
        super({ key: 'sceneB' })
        this.player
        this.cursors
        this.timeText
        this.initialTime
    }

    init(data)
    {
        this.player = data.player
    }

    preload ()
    {
        this.load.image('arrow', 'assets/arrow.png')
        this.load.image('character', './assets/pig.png')
        this.load.image('boxObj', './assets/boxBlock.png')
        this.load.tilemapCSV("map", "../assets/gameMap.csv");

        this.load.image('tiles', './assets/tiles.png')
        var timedEvent
    }

    create ()
    {
        const map = this.make.tilemap({ key: "map", tileWidth: 16, tileHeight: 16 });
        const tileset = map.addTilesetImage("tiles");
        const layer = map.createStaticLayer(0, tileset, 0, 0); // layer index, tileset, x, y

        // console.log("sceneB imported player", this.player)
        // create physics player from the imported player data
        this.player = this.physics.add.sprite(48, 48, this.player.texture.key, 1).setScale(0.1)
        var box = this.add.image(600,550, 'boxObj').setScale(.2)

        // this.physics.enable(player, Phaser.Physics.ARCADE)
        // player.body.setSize(10, 14, 2, 1)

        this.cursors = this.input.keyboard.createCursorKeys()
        this.player.setCollideWorldBounds(true).setBounce(.2)

        var help = this.add.text(16, 16, 'Use arrows to move', { font: '14px Arial', fill: '#ffffff' })

        //playerTest = this.add.sprite(100,100, 'pig').setScale(0.5)
        this.arrow = this.add.sprite(400, 300, 'arrow').setOrigin(0, 0.5)
        this.arrow.setScale(.5)

        this.initialTime = 30
        this.timeText = this.add.text(300, 16, 'Countdown: '+ this.initialTime, { font: '22px Arial', fill: '#ffffff' })
        // + formatTime(this.initialTime)

        // Each 1000 ms call onEvent
        this.time.addEvent({ delay: 1000, callback: this.onTimeEvent, callbackScope: this, loop: true })
        this.input.once('pointerdown', function () {
            this.scene.start('sceneC', {player: this.player})
        }, this)
    }

    update ()
    {
        this.arrow.rotation += 0.01
       // game.physics.arcade.collide(player, layer)
        if (this.cursors.left.isDown)
        {
           this.player.setVelocityX(-160)
            //player.anims.play('left', true)
        }
        else if (this.cursors.right.isDown)
        {
            this.player.setVelocityX(160)
            //player.anims.play('right', true)
        }
        else
        {
            this.player.setVelocityX(0)
            //player.anims.play('turn')
        }

        if (this.cursors.up.isDown)
        {
            this.player.setVelocityY(-130)
        }
    }

    // formatTime(seconds){ //ref - https://phaser.discourse.group/t/countdown-timer/2471/6
    //     // Minutes
    //     var minutes = Math.floor(seconds/60)
    //     // Seconds
    //     var partInSeconds = seconds%60
    //     // Adds left zeros to seconds
    //     partInSeconds = partInSeconds.toString().padStart(2,'0')
    //     // Returns formated time
    //     return `${minutes}:${partInSeconds}`
    // }
    
    onTimeEvent ()
    {
        this.initialTime -= 1 // One second
        if (this.initialTime < 0){
            return
        }
        this.timeText.setText('Countdown: ' + this.initialTime)
    }
}
export default SceneB