class EndScene extends Phaser.Scene {

    constructor()
    {
        super({ key: 'endScene' });
        this.player;
        this.scoreLeft
        this.scoreRight
        this.nextPath;
    }
    init(data)
    {
        this.player = data.player;
        this.scoreLeft = data.scoreLeft
        this.scoreRight = data.scoreRight
    }

    preload()
    {

    }

    create()
    {
        if(this.scoreLeft == this.scoreRight)
        {
            this.scoreLeft += 1.43
            this.scoreRight -= 1.2
        }
        //lbrain = skillful adaptability , rbrain = creative logistician
        var text = this.add.text(350, 75, 'RESULTS', { font: '24px Courier', fill: '#0f0' })
        var lbrain = this.add.text(50, 130, 'Skillful Adaptability Score: ' + this.scoreLeft, { font: '16px Courier', fill: '#0f0' })
        var rbrain = this.add.text(50, 185, 'Creative Logistician Score: '+ this.scoreRight, { font: '16px Courier', fill: '#0f0' })

        

        //litanyofboredom.github.io/ShyGuy - creativity and intelligence
        // and litanyofboredom.github.io/Splash - dexterity, speed
        //if lbrain bigger go to shyguy, if rbrain is bigger display splash

        if(this.scoreLeft > this.scoreRight)
        {
            this.lbrainPath()
        }
        else{
            this.rbrainPath()
        }

    }

    lbrainPath()
    {
        //print paragraph about personality results
        //print shyguy
    }

    rbrainPath()
    {
        //print paragraph about personality results
        //print splash
    }

}

export default EndScene