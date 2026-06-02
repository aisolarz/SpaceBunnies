class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/"); // Makes it so you don't need to type in assets folder everytime you wanna load something in

        // Load images
        this.load.image('bigBox', 'box_big.png');
        this.load.image('smallBox', 'box_small.png');





        // Load audio
        



        











    }

    create() {

        // If we wanna create animations beforehand, they can be done here
        

         this.scene.start("Level"); // Start next scene
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}