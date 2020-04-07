import Character from '../exCode.js'

class MemoryScene extends Phaser.Scene {

    constructor()
    {
        super({ key: 'MemoryScene' })
        this.player;
        this.cursors;
    }
    init(data)
    {
        this.player = data.player;
    }
    preload() {

    }

    create() {

        this.player = this.physics.add.sprite(0, 700, this.player.texture.key, 1).setScale(0.5);

        this.cursors = this.input.keyboard.createCursorKeys()

        this.text = this.add.text(300, 50, 'SELECT ONE CHOICE', { font: '26px Arial', fill: '#ffffff' });

        //store choice 2-4 or something, then randomize, ask what item they picked - if clicked right choice, extra
        //points for lbrain; if clicked something weird and unique (like rainbow pirate ship or something), rbrain pts


        this.input.once('pointerdown', function () {
            this.scene.stop()
            this.scene.start('sceneC', {player: this.player})
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
}

export default MemoryScene