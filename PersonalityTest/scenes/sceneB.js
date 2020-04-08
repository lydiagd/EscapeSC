import Character from '../exCode.js'

var CHARACTER_SCALE = 0.05
class SceneB extends Phaser.Scene { /******** GAME #2 ********/
    
    constructor ()
    {
        super({ key: 'sceneB' })
        this.player
        this.data
        this.box
        this.cursors
        this.timeText
        this.initialTime
        this.gotBox = false
    }

    init(data)
    {
        this.player = data.player
        this.data = data.gameData
    }

    preload ()
    {
        this.load.image('arrow', 'assets/arrow.png')
        this.load.image('boxObj', './assets/boxBlock.png')
        this.load.image('tiles', '../assets/tmw_desert_spacing.png')
        this.load.tilemapTiledJSON("map", "../tilesets/desert_map.json")
    }

    create ()
    {
        const map = this.make.tilemap({key:"map"})
        const tileset = map.addTilesetImage("tmw_desert_spacing", "tiles")
        // Parameters: layer name (or index) from Tiled, tileset, x, y
        const worldLayer = map.createStaticLayer("Tile Layer 1", tileset, 0, 0)
        worldLayer.setCollisionByProperty({ collides: true })
        
        // uncomment to see the collision boxes
        // const debugGraphics = this.add.graphics().setAlpha(0.75)
        // worldLayer.renderDebug(debugGraphics, {
        //     tileColor: null, // Color of non-colliding tiles
        //     collidingTileColor: new Phaser.Display.Color(243, 134, 48, 255), // Color of colliding tiles
        //     faceColor: new Phaser.Display.Color(40, 39, 37, 255) // Color of colliding face edges
        //   })

        // console.log("sceneB imported player", this.player)
        // create physics player from the imported player data
        this.player = this.physics.add.sprite(0, 700, this.player.texture.key, 1).setScale(CHARACTER_SCALE)
        this.physics.add.collider(this.player, worldLayer)
        this.player.setCollideWorldBounds(true).setBounce(.2)
        
        this.box = this.physics.add.image(330,125, 'boxObj').setScale(.06)
        this.box.alpha = 0.05;
        this.physics.add.overlap(this.player, this.box, this.foundBox, null, this)

        this.cursors = this.input.keyboard.createCursorKeys()
        
        // set text and timer arrow
        this.add.text(16, 16, 'Use arrows to move', { font: '26px Arial', fill: '#ffffff' })

        this.add.text(190, 330, 'RACE AGAINST THE CLOCK', { font: '24px Arial', fill: '#ffffff' })

        //this.add.text(280, 500, 'score lbrain:  ' + data.scoreLeft)


        this.initialTime = 30
        this.timeText = this.add.text(475, 550, 'Countdown: '+ this.initialTime, { font: '26px Arial', fill: '#ffffff' })

        // Each 1000 ms call onEvent
        this.time.addEvent({ delay: 1000, callback: this.onTimeEvent, callbackScope: this, loop: true })

        //ADDED FOR TESTING PURPOSES
        this.input.once('pointerdown', function () {
            this.scene.stop()
            this.scene.start('MemoryScene', {player: this.player}, {gameData: this.data});
        }, this);

    }

    foundBox() {
        if(this.gotBox) {
            // already found box
            return
        } else {
            // do something when box is found
            console.log("debug: found box: ", this.box)
            this.box.alpha = 1
            this.tweens.add({
                targets: this.box,
                alpha: 0,
                duration: 2000,
                repeat: 0
            });
            this.gotBox = true
        }
    }

    update ()
    {
        // this.arrow.rotation += 0.01
        // Stop any previous movement from the last frame
        this.player.setVelocity(0)
        let speed = 160
        // Horizontal movement
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-speed)
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(speed)
        }

        // Vertical movement
        if (this.cursors.up.isDown) {
            this.player.setVelocityY(-speed)
        } else if (this.cursors.down.isDown) {
            this.player.setVelocityY(speed)
        }

        if (this.player.y < 60) {
            this.scene.start('sceneC', {player: this.player}, {gameData: this.data})
        }

        this.player.update()
        this.box.update()
        this.physics.add.overlap(this.player, this.box, this.foundBox, null, this)
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