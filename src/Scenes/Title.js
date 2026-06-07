//Title.js

class Title extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }

    create() {

        this.level = 1

        // Using this to test the boxes -Char
        // new Box(this, 'box', 'kenny', 'aliens', 'shipGreen_manned.png', 'testafejaweoifjaoewijfoaewjifjowaeij', 'choice1', 'choice2', null, null)

        // Create text
        this.titleText = this.add.text(
            512,
            100,
            "Cottontails in the Cosmos",
            { fontSize: "48px" }
        ).setOrigin(0.5);

        this.add.text(
            512,
            700,
            "Press SPACE to Start",
            { fontSize: "32px" }
        ).setOrigin(0.5);

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start("selectScene");
        });



        // Create tweens
        this.titleTween = this.tweens.add({
            targets: this.titleText, 
            y: "-=10",
            duration: 2000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        })

    }
}