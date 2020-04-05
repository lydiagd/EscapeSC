import Character from '../exCode.js'

class SceneC extends Phaser.Scene { /******** GAME #3 ********/

    init(data)
    {
        this.player = data.player;
    }

    constructor ()
    {
        super({ key: 'sceneC' });
        this.player;
        
    }

    preload ()
    {
        this.load.spritesheet('character', 
        './assets/pig.png',
        { frameWidth: 32, frameHeight: 48 });
        this.load.image('ground', './assets/ground.png');
        this.load.image('sky', './assets/sky.png');
    }


    create ()
    {
        //game.stage.backgroundColor = "#4488AA";

        this.add.image(400, 300, 'sky');

        var platforms = this.physics.add.staticGroup();

        platforms.create(400, 568, 'ground').setScale(0.2).refreshBody();

        // create physics player from the imported player data
        this.player = this.physics.add.sprite(48, 48, this.player.texture.key, 1).setScale(0.1)


        cursors = this.input.keyboard.createCursorKeys();

        //this.player = this.physics.add.sprite(100, 450, 'character').setScale(4);
        //player.body.setVelocityX(0);

        // player.setBounce(0.2);
        this.player.setCollideWorldBounds(true).setBounce(.2);
        this.physics.add.collider(player, platforms);
        
    }

    update ()
    {

        if (cursors.left.isDown) {
        player.body.setVelocityX(-350);
        } else if (cursors.right.isDown) {
        player.body.setVelocityX(350);
        }
        // if (cursors.left.isDown)
        // {
        //    player.setVelocityX(-160);

        //     //player.anims.play('left', true);
        // }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(160);

            //player.anims.play('right', true);
        }
        else
        {
            player.setVelocityX(0);

            //player.anims.play('turn');
        }

        if (cursors.up.isDown && player.body.touching.down)
        {
            player.setVelocityY(-330);
        }   
    }
}

export default SceneC