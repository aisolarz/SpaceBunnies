//Load.js

class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        this.load.setPath("./assets/"); // Makes it so you don't need to type in assets folder everytime you wanna load something in

        // Load images
        this.load.image('rectangle', 'boxes/dark_rectang.png');
        this.load.image('square', 'boxes/light_sqaure.png');
        this.load.image('box', 'boxes/box.png');

        // Load audios
        this.load.audio('clickingSound', 'sound/kenney_ui-audio/Audio/switch33.ogg');
        this.load.audio('selectingSound', 'sound/kenney_sci-fi-sounds/Audio/forceField_000.ogg');
        this.load.audio('defeatedSound', 'sound/kenney_sci-fi-sounds/Audio/laserRetro_002.ogg');
        this.load.audio('levelSound', 'sound/kenney_sci-fi-sounds/Audio/spaceEngine_003.ogg');
        this.load.audio('playerdefeatedSound', 'sound/kenney_interface-sounds/Audio/minimize_006.ogg');
        this.load.audio('level1background', 'sound/level1background.mp3');
        


        // Load animation frames
        this.load.image('player1_hurt', 'bunny2/bunny2_jetpack_hurt.png');
        this.load.image('player1_jetpack1', 'bunny2/bunny2_jetpack1.png');
        this.load.image('player1_jetpack2', 'bunny2/bunny2_jetpack2.png');

        this.load.image('player2_hurt', 'bunny1/bunny1_jetpack_hurt.png');
        this.load.image('player2_jetpack1', 'bunny1/bunny2_jetpack1.png');
        this.load.image('player2_jetpack2', 'bunny1/bunny2_jetpack2.png');


        this.load.atlasXML(
            "jumper",
            "spritesheet_jumper.png",
            "spritesheet_jumper.xml"
        )

        this.load.atlasXML(
            "aliens",
            "aliens/spritesheet_spaceships.png", 
            "aliens/spritesheet_spaceships.xml"
        )

        this.load.atlasXML(
            "lasers",
            "aliens/spritesheet_lasers.png",
            "aliens/spritesheet_lasers.xml",
        )





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
            repeat: -1,
            yoyo: true
        });

        this.anims.create({
            key: "flymanFly",
            frames: [
                { key: "jumper", frame: "flyMan_fly.png" },
                { key: "jumper", frame: "flyMan_still_fly.png" }
            ],
            frameRate: 8,
            repeat: -1
        });

        //player animations
        this.anims.create({
            key: 'player1Anims',
            frames: [
                {key: 'player1_jetpack1'},
                {key: 'player1_jetpack2'},
            ],
            frameRate: 10,
            repeat: -1,
        });


         //player animations
        this.anims.create({
            key: 'player2Anims',
            frames: [
                {key: 'player2_jetpack1'},
                {key: 'player2_jetpack2'},
            ],
            frameRate: 10,
            repeat: -1,
        });
        
        

         this.scene.start("titleScene"); // Start next scene

         console.log(this.textures.exists("jumper"));
         this.scene.start("titleScene");
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}