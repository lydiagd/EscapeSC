class EndScene extends Phaser.Scene {

    constructor()
    {
        super({ key: 'endScene' });
        this.player;
        this.lScore
        this.rScore
    }

    preload()
    {

    }

    create()
    {
        var text = this.add.text(200, 100, 'RESULTS', { font: '24px Courier', fill: '#0f0' })
        var lbrain = this.add.text(180, 400, 'left brain score:', { font: '16px Courier', fill: '#0f0' })

    }

}

export default EndScene