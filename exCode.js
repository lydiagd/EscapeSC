//import {TitleScene} from './TitleScene.js';
class TitleScene extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'TitleScene' });
    }

    preload ()
    {
        this.load.image('face', 'assets/pics/bw-face.png');
    }

    create ()
    {
         var text = this.add.text(250, 300, 'click to begin game', { font: '16px Courier', fill: '#0f0' });
         text.setInteractive({ useHandCursor: true }).on('pointerover', () => this.enterButtonHoverState() )
         .on('pointerout', () => this.enterButtonRestState() ).on('pointerdown', () => this.clickButton2());

        var createFig = this.add.text(250, 400, 'click to create your character', { font: '16px Courier', fill: '#0f0' });
        createFig.setInteractive({ useHandCursor: true });
        // this.face = this.add.image(400, 300, 'face');
        createFig.on('pointerdown', () => this.clickButton2());

        this.input.manager.enabled = true;

        this.input.once('pointerdown', function () {

            this.scene.start('sceneB');

        }, this);

        
    }

    clickButton() 
    {
        this.scene.start('sceneB');
    }

    clickButton2() 
    {
        this.scene.start('character');
    }
    
    enterButtonHoverState() {
        this.clickButton.setStyle({ fill: '#ff0'});
    }

    enterButtonRestState() {
        this.clickButton.setStyle({ fill: '#0f0' });
    }
}



class SceneB extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'sceneB' });
    }

    preload ()
    {
        this.load.image('arrow', 'assets/sprites/longarrow.png');
    }

    create ()
    {
        this.arrow = this.add.sprite(400, 300, 'arrow').setOrigin(0, 0.5);

        this.input.once('pointerdown', function (event) {

            this.scene.start('sceneC');

        }, this);
    }

    update ()
    {
        this.arrow.rotation += 0.01;
    }

}

class SceneC extends Phaser.Scene {

    constructor ()
    {
        super({ key: 'sceneC' });
        
    }

    preload ()
    {
        this.load.image('character', 'mario.png');
    }


    create ()
    {
        game.stage.backgroundColor = "#4488AA";
        var cursors = this.input.keyboard.createCursorKeys();

        var player = this.physics.add.image(400, 300, 'character');

        player.setCollideWorldBounds(true);

        this.input.once('pointerdown', function (event) {

            this.scene.start('sceneA');

        }, this);
    }

    update ()
    {
        player.setVelocity(0);

        if (cursors.left.isDown)
        {
            player.setVelocityX(-300);
        }
        else if (cursors.right.isDown)
        {
            player.setVelocityX(300);
        }

        if (cursors.up.isDown)
        {
            player.setVelocityY(-300);
        }
        else if (cursors.down.isDown)
        {
            player.setVelocityY(300);
        }
    }

}


class Character extends Phaser.Scene
{
    constructor ()
    {
        super({ key: 'character' });
        
    }

    preload ()
    {
        this.load.image('character', 'mario.png');
    }


    create ()
    {
        game.stage.backgroundColor = "#4488AA";
        var cursors = this.input.keyboard.createCursorKeys();

        var player = this.physics.add.image(400, 300, 'character');

        var text = this.add.text(250, 400, 'click to return back to menu screen', { font: '16px Courier', fill: '#0f0' });
        text.setInteractive({ useHandCursor: true });
        // this.face = this.add.image(400, 300, 'face');

        this.input.manager.enabled = true;

        this.input.once('pointerdown', function (event) {

            this.scene.start('TitleScene');

        }, this);
    }

}


var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    backgroundColor: '#000000',
    //parent: 'phaser-example',
    scene: [ TitleScene, SceneB, SceneC, Character ]
};

var game = new Phaser.Game(config);

