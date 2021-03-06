import Character from '../exCode.js'

class CompileResults extends Phaser.Scene {

    constructor()
    {
        super({ key: 'CompileResults' });
        this.player
        this.scoreLeft
        this.scoreRight
    }
    init(data)
    {
        this.player = data.player
        this.scoreLeft = data.scoreLeft
        this.scoreRight = data.scoreRight
    }
    preload() { //https://www.patchesoft.com/phaser-3-loading-screen
        //var randomText = this.add.text(30, 32, "I am testing loading in", { fontSize: '16px', fill: '#0f0' });

        this.graphics = this.add.graphics();
		this.newGraphics = this.add.graphics();
		var progressBar = new Phaser.Geom.Rectangle(200, 200, 400, 50);
		var progressBarFill = new Phaser.Geom.Rectangle(205, 205, 290, 40);

		this.graphics.fillStyle(0xffffff, 1);
		this.graphics.fillRectShape(progressBar);

		this.newGraphics.fillStyle(0x3587e2, 1);
		this.newGraphics.fillRectShape(progressBarFill);

		var loadingText = this.add.text(80,260,"COMPILING RESULTS - ", { fontSize: '32px', fill: '#0f0' });


		this.load.image('background', '../assets/sky.png');
		for(var i =0;i<200;i++) {
			this.load.image('background_'+i, '../assets/sky.png');
		}

        //this.load.on('progress', this.updateBar);
		this.load.on('progress', this.updateBar, {newGraphics:this.newGraphics,loadingText:loadingText}); //progress listener
		this.load.on('complete', this.complete, this); //when done function call
    }

    updateBar(percentage) {
        this.newGraphics.clear();
        this.newGraphics.fillStyle(0x3587e2, 1);
        this.newGraphics.fillRectShape(new Phaser.Geom.Rectangle(205, 205, percentage*390, 40));
                
        percentage = percentage * 100;
        this.loadingText.setText("COMPILING RESULTS - " + percentage.toFixed(2) + "% COMPLETE");
        console.log("P:" + percentage);
        
    }

    complete() {
		console.log("COMPLETE!");
		this.scene.start("endScene", {player: this.player, scoreLeft: this.scoreLeft, scoreRight: this.scoreRight})//, {lScore: gameData.lScore}, {rScore: gameData.rScore});
	}
}

export default CompileResults