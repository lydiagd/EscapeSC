import Character from '../exCode.js'

class SceneC extends Phaser.Scene { /******** GAME #3 ********/

    constructor ()
    {
        super({ key: 'sceneC' });
        this.player
        this.scoreLeft
        this.scoreRight
        this.cursors;
        this.curItem;
        this.inv = false;
        this.itemBool = false
        this.hasGrabbed = false
        
        this.gun
        this.fire
        this.plush
    }

    init(data)
    {
        this.player = data.player
        this.scoreLeft = data.scoreLeft
        this.scoreRight = data.scoreRight
    }

    preload ()
    {
        // this.load.spritesheet('character', 
        // './assets/pig.png',
        // { frameWidth: 32, frameHeight: 48 });

        this.load.image('dun_tiles', '../assets/dungeon_tiles.png');
        this.load.tilemapTiledJSON("dun_map", "../tilesets/castleMap.json");

        this.load.image('fire', '../assets/fire.png');
        this.load.image('gun', '../assets/lazergun.png');
        this.load.image('plush','../assets/plushToy.png')
        this.load.image('cloud', '../assets/cloud.png')
        this.load.image('spider', '../assets/spider.png')
    }


    create ()
    {
        const map = this.make.tilemap({key:"dun_map"})
        const tileset = map.addTilesetImage("castle", "dun_tiles")
        // Parameters: layer name (or index) from Tiled, tileset, x, y
        const worldLayer = map.createStaticLayer("Tile Layer 1", tileset, 0, 0).setScale(3.5)
        worldLayer.setCollisionByProperty({ collides: true })

        this.gun = this.physics.add.sprite(510, 325, 'gun').setScale(0.02).setInteractive();
        this.fire = this.physics.add.image(430, 120, 'fire').setScale(0.04);
        this.plush = this.physics.add.image(600, 510, 'plush').setScale(0.2);
        this.spider = this.physics.add.image(140, 100, 'spider').setScale(.5);

        // create physics player from the imported player data
        // this.player = this.physics.add.sprite(100, 450, this.player, 1).setScale(.05);
        this.player = this.physics.add.sprite(175, 450, this.player.texture.key, 1).setScale(.01);

        this.physics.add.collider(this.player, worldLayer)
        this.player.setCollideWorldBounds(true).setBounce(.2)

        this.text = this.add.text(700, 200, "ITEM", {fill: '#ffffff'});
        this.instruction = this.add.text(655, 50, "KILL THE SPIDER", {fill: '#ffffff'})
        this.cloud = this.add.image(735,275, 'cloud').setScale(0.4);
        this.curItem = this.add.text(665,250, 'grab an item', {fill: '#000000'});
        this.itemBool = false;


        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.overlap(this.player, this.gun, this.choose_lazer_pistol, null, this)
        this.physics.add.overlap(this.player, this.plush, this.choose_plush, null, this)
        this.physics.add.overlap(this.player, this.fire, this.choose_fire, null, this)
        this.physics.add.overlap(this.player, this.spider, this.kill, null, this)
 

        //var x = this.add.text(280, 500, 'score lbrain:  ' + gameData.scoreLeft)

        
    }

    choose_lazer_pistol() {
        this.choose('lazer pistol');
    }

    choose_fire(){
        this.choose('FIREEE')
    }

    choose_plush() {
        this.choose('plush toy?')
    }

    update ()
    {

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

        this.player.update()
        // this.plush.update()
        // this.fire.update()
        this.gun.update()

        //this.physics.add.overlap(this.player, this.gun, this.choose('lazer pistol', true), null, this)
        

        // this.physics.add.overlap(this.player, this.plush, this.choose('plush toy'), null, this)


    }

    choose(item)
    {
        
            this.curItem.setText(item); 
            this.hasGrabbed = true
    }

    kill()
    {
        //do scoring
        if (this.hasGrabbed == false)
        {
            var popup = this.add.text(100, 50, 'grab an item to kill the spider!')
        }
        else {
            if(this.curItem == 'lazer gun')
            {
                this.scoreLeft += 15
            }
            else
            {
                this.scoreRight += 20
            }
            this.scene.start('CompileResults', {player: this.player, scoreLeft: this.scoreLeft, scoreRight: this.scoreRight});
        }
    }
}

export default SceneC