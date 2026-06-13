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
        this.load.audio('level1background', 'sound/level1smoothmusic.mp3');
         this.load.audio('level2background', 'sound/level2background.mp3');
        this.load.audio('level3backgroundfinal', 'sound/level3backgroundfinal.mp3');
        this.load.audio('playerHurt', 'sound/playerHurt.ogg')
        this.load.audio('titlebackground', 'sound/titlebackground.mp3');
        this.load.audio('powerUpSound', 'sound/powerUp.mp3')
        this.load.audio('winMusic', 'sound/winMusic.mp3')
        


        // Load animation frames
        this.load.image('player1_hurt', 'bunny2/bunny2_jetpack_hurt.png');
        this.load.image('player1_jetpack1', 'bunny2/bunny2_jetpack1.png');
        this.load.image('player1_jetpack2', 'bunny2/bunny2_jetpack2.png');

        this.load.image('player2_hurt', 'bunny1/bunny1_jetpack_hurt.png');
        this.load.image('player2_jetpack1', 'bunny1/bunny2_jetpack1.png');
        this.load.image('player2_jetpack2', 'bunny1/bunny2_jetpack2.png');

        this.load.image('powerup_carrot', 'powerup_carrot.png')




        this.load.multiatlas(
            "particles", "particles/kenny-particles.json", './assets/particles/'
        )

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

        //explosion
        this.load.image(
            "explosion0",
            "explosion/frame0000.png"
        );

        this.load.image(
            "explosion1",
            "explosion/frame0001.png"
        );

        this.load.image(
            "explosion2",
            "explosion/frame0002.png"
        );

        this.load.image(
            "explosion3",
            "explosion/frame0003.png"
        );

        this.load.image(
            "explosion4",
            "explosion/frame0004.png"
        );

        this.load.image(
            "explosion5",
            "explosion/frame0005.png"
        );

        this.load.image(
            "explosion6",
            "explosion/frame0006.png"
        );

        this.load.image(
            "explosion7",
            "explosion/frame0007.png"
        );

        this.load.image(
            "explosion8",
            "explosion/frame0008.png"
        );




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

        //boss animations
        this.anims.create({
            key: "boss",
            frames: [
                { key: "jumper", frame: "spikeBall1.png" },
                { key: "jumper", frame: "spikeBall_2.png" },
            ],
            frameRate: 8,
            repeat: -1,
        });

        this.anims.create({
            key: 'player1Idle',
            frames: [
                { key: 'jumper', frame: 'bunny2_ready.png' },
                { key: 'jumper', frame: 'bunny2_stand.png'}
            ],
            frameRate: 2,
            repeat: -1
        });

        this.anims.create({
            key: 'player2Idle',
            frames: [
                { key: 'jumper', frame: 'bunny1_ready.png' },
                { key: 'jumper', frame: 'bunny1_stand.png'}
            ],
            frameRate: 2,
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


        this.anims.create({
            key: "enemyExplosion",
            frames: [

                { key: "explosion0" },
                { key: "explosion1" },
                { key: "explosion2" },
                { key: "explosion3" },
                { key: "explosion4" },
                { key: "explosion5" },
                { key: "explosion6" },
                { key: "explosion7" },
                { key: "explosion8" }

            ],

            frameRate: 20,
            repeat: 0
        });

        console.log(
            this.textures.exists("explosion0")
        );
        
        
        
         this.scene.start("titleScene"); // Start next scene
         
         

         console.log(this.textures.exists("jumper"));
         this.scene.start("titleScene");
         
    }

    // Never get here since a new scene is started in create()
    update() {
    }
}