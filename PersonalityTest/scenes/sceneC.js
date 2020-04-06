import Character from '../exCode.js'

class SceneC extends Phaser.Scene { /******** GAME #3 ********/

    constructor ()
    {
        super({ key: 'sceneC' });
        this.player;
        
    }

    init(data)
    {
        this.player = data.player;
    }

    preload ()
    {
        // this.load.spritesheet('character', 
        // './assets/pig.png',
        // { frameWidth: 32, frameHeight: 48 });
        // this.load.image('ground', './assets/ground.png');
        // this.load.image('sky', './assets/sky.png');

        this.load.image('dun_tiles', '../assets/dungeon_tiles.png');
        this.load.tilemapTiledJSON("dun_map", "../tilesets/castleMap.json");
    }


    create ()
    {
        const map = this.make.tilemap({key:"dun_map"})
        const tileset = map.addTilesetImage("castle", "dun_tiles")
        // Parameters: layer name (or index) from Tiled, tileset, x, y
        const worldLayer = map.createStaticLayer("Tile Layer 1", tileset, 0, 0)
        //worldLayer.setCollisionByProperty({ collides: true })

        // this.add.image(400, 300, 'sky');

        // this.platform = this.physics.add.staticGroup();

        // platform.create(400, 568, 'ground').setScale(0.2).refreshBody();

        // create physics player from the imported player data
        // this.player = this.physics.add.sprite(0, 700, this.player.texture.key, 1)
        // this.physics.add.collider(this.player, worldLayer)
        // this.player.setCollideWorldBounds(true).setBounce(.2)


        //cursors = this.input.keyboard.createCursorKeys();

        //this.player = this.physics.add.sprite(100, 450, 'character').setScale(4);
        //player.body.setVelocityX(0);

        // player.setBounce(0.2);
        // this.player.setCollideWorldBounds(true).setBounce(.2);
        // this.physics.add.collider(player, platform);
        
    }

    update ()
    {

        // if (cursors.left.isDown) {
        // player.body.setVelocityX(-350);
        // } else if (cursors.right.isDown) {
        // player.body.setVelocityX(350);
        // }
        // // if (cursors.left.isDown)
        // // {
        // //    player.setVelocityX(-160);

        // //     //player.anims.play('left', true);
        // // }
        // else if (cursors.right.isDown)
        // {
        //     player.setVelocityX(160);

        //     //player.anims.play('right', true);
        // }
        // else
        // {
        //     player.setVelocityX(0);

        //     //player.anims.play('tu rn');
        // }

        // if (cursors.up.isDown && player.body.touching.down)
        // {
        //     player.setVelocityY(-330);
        // }   
    }
}

export default SceneC