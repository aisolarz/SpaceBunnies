//Load.js

class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/"); // Makes it so you don't need to type in assets folder everytime you wanna load something in

        // Load images
        this.load.image('bigBox', 'box_big.png');
        this.load.image('smallBox', 'box_small.png');

        this.load.atlasXML(
            "jumper",
            "spritesheet_jumper.png",
            "spritesheet_jumper.xml"
        )





        // Load audio
        



        











    }

    create() {
        //animation stuff for the enemy
        this.anims.create({
            key: "wingmanFly",
            frames: [
                { key: "jumper", frame: "wingMan1.png" },
                { key: "jumper", frame: "wingMan2.png" },
                { key: "jumper", frame: "wingMan3.png" },
                { key: "jumper", frame: "wingMan4.png" },
                { key: "jumper", frame: "wingMan5.png" }
            ],
            frameRate: 10,
            repeat: -1
        });

        // If we wanna create animations beforehand, they can be done here
        

         this.scene.start("titleScene"); // Start next scene

         console.log(this.textures.exists("jumper"));
         this.scene.start("titleScene");
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}