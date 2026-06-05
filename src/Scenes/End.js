class End extends Phaser.Scene {
    constructor() {
        super("endScene");
    }

    //I added this end scene. 
    // I added the option to either play the game again or quit and start from the title sceen - sharon
    //I will keep adding stuff to this!
        
    create(){


        this.add.text(
            512,
            150,
            "You Won!",
            { fontSize: "48px" }
        ).setOrigin(0.5);


        this.add.text(
            512,
            300,
            "Press SPACE to Play Again",
            { fontSize: "32px" }
        ).setOrigin(0.5);


        this.add.text(
            512,
            450,
            "Press Q to Quit",
            { fontSize: "32px" }
        ).setOrigin(0.5);


        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start("levelScene");
        });


        this.input.keyboard.once('keydown-Q', () => {
            this.scene.start("titleScene");
        });


    }


}