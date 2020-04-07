class EndScene extends Phaser.Scene {

    constructor()
    {
        super({ key: 'endScene' });
        this.player;
        this.lScore;
        this.rScore;
        this.nextPath;
    }
    init(data)
    {
        this.player = data.player;
        this.lScore = data.lScore;
        this.rScore = data.rScore;
    }

    preload()
    {

    }

    create()
    {
        //lbrain = skillful adaptability , rbrain = creative logistician
        var text = this.add.text(200, 100, 'RESULTS', { font: '24px Courier', fill: '#0f0' })
        var lbrain = this.add.text(150, 400, 'skillful adaptability: ' + this.lScore, { font: '16px Courier', fill: '#0f0' })
        var rbrain = this.add.text(250, 400, 'creative logistician score: '+ this.rScore, { font: '16px Courier', fill: '#0f0' })

        

        //litanyofboredom.github.io/ShyGuy - creativity and intelligence
        // and litanyofboredom.github.io/Splash - dexterity, speed
        //if lbrain bigger go to shyguy, if rbrain is bigger display splash

    }

    lbrainPath()
    {
        //print shyguy
    }

    rbrainPath()
    {
        //print splash
    }

}

export default EndScene