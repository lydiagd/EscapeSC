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

        if(this.scoreRight > this.scoreLeft)
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
        this.add.text(25, 300, 'Creative logistician types are slow to analyze, takes the scenery in ',{font: '12px Courier', fill: '#fff'})
        this.add.text(25, 315, 'and doesn\'t mind choosing "out of the box" paths. This type of person', {font: '12px Courier', fill: '#fff'})
        this.add.text(25, 330, 'might be interested in buffing their dexterity and quick reaction skills',{font: '12px Courier', fill: '#fff'}) 
        this.add.text(25, 345, 'to progress further in their journey of greater things', {font: '12px Courier', fill: '#fff'})
        this.add.text(25,360, 'Consider visiting litanyofboredom.github.io/ShyGuy and completing these', {font: '12px Courier', fill: '#fff'})
        this.add.text(25, 375, 'challenges to enhace the weaker trait', {font: '12px Courier', fill: '#fff'})
    }

    rbrainPath()
    {
        this.add.text(25, 300, 'Those who possess strong skillful adaptability tackle challenges', {font: '12px Courier', fill: '#fff'})
        this.add.text(25, 315, 'head on, compete against the timer, and have a competitive nature', {font: '12px Courier', fill: '#fff'})
        this.add.text(25, 330, 'This type of person might be interested in buffing their creativity and' , {font: '12px Courier', fill: '#fff'})
        this.add.text(25, 345, 'logical analysis skills to progress further in their journey of greater things', {font: '12px Courier', fill: '#fff'})
        this.add.text(25,360, 'Consider visiting litanyofboredom.github.io/Splash and completing these ', {font: '12px Courier', fill: '#fff'})
        this.add.text(25, 375, 'challenges to enhace the weaker trait', {font: '12px Courier', fill: '#fff'})
    }

}

export default EndScene