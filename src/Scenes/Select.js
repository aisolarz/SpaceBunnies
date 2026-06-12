//Select.js

class Select extends Phaser.Scene {
    constructor() {
        super("selectScene");
    }

    create() {

        //background music!
        this.titlebackground = this.sound.add("titlebackground", {
            volume: 0.5
        });

        this.titlebackground.play();

        

        //create clicking sound
        this.clickSFX = this.sound.add("clickingSound", {
            volume: 1
        });

        //create selecting sound
        this.selectSFX = this.sound.add("selectingSound", {
            volume: 1
        });


        this.menuState = "modeSelect";
        this.modeChoice = 1;

        this.selectedCharacter = "purple";
        this.selectionStage = 1;

        // Background
        this.cameras.main.setBackgroundColor("#1a1a2e");

        // starfield
        this.stars = [];

        for(let i = 0; i < 70; i++){

            let star = this.add.circle(
                Phaser.Math.Between(0,1024),
                Phaser.Math.Between(0,768),
                Phaser.Math.Between(1,3),
                0xffffff
            );

            star.speed = Phaser.Math.Between(40,120);

            this.stars.push(star);
        }

        // Title
        this.titleText = this.add.text(
            512,
            50,
            "Choose Game Mode",
            {
                fontSize: "40px",
                color: "#ffffff"
            }
        ).setOrigin(0.5);

        //How many players
        this.modeText = this.add.text(
            512,
            250,
            [
                "> One Player",
                "",
                "  Two Players"
            ],
            {
                fontSize: "32px",
                color: "#ffffff",
                align: "center"
            }
        ).setOrigin(0.5);

        // purple bunny?
        this.purpleBunny = this.add.sprite(
            320,
            280,
            "jumper",
            "bunny2_stand.png"
        );

        // this should be the brown bunny
        this.brownBunny = this.add.sprite(
            704,
            280,
            "jumper",
            "bunny1_stand.png"
        );

        this.tweens.add({
            targets: this.purpleBunny,
            y: "-=15",
            duration: 1500,
            yoyo: true,
            repeat: -1
        });

        this.tweens.add({
            targets: this.brownBunny,
            y: "-=15",
            duration: 1800,
            yoyo: true,
            repeat: -1
        });

        // boxes around bunny. for the selection
        this.purpleBox = this.add.rectangle(
            320,
            280,
            220,
            260
        ).setStrokeStyle(5, 0xffff00);

        this.brownBox = this.add.rectangle(
            704,
            280,
            220,
            260
        ).setStrokeStyle(2, 0xffffff);

        // bunny description
        this.descriptionText = this.add.text(
            512,
            520,
            "",
            {
                fontSize: "22px",
                color: "#ffffff",
                align: "center"
            }
        ).setOrigin(0.5);

        this.updateDescription();

        // the controls
        this.leftKey =
            this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.LEFT
            );

        this.rightKey =
            this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.RIGHT
            );

        this.enterKey =
            this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.ENTER
            );

        this.wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);


        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);




        this.purpleBunny.setVisible(false);
        this.brownBunny.setVisible(false);

        this.purpleBox.setVisible(false);
        this.brownBox.setVisible(false);

        this.descriptionText.setVisible(false);

        this.upKey =
            this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.UP
            );

        this.downKey =
            this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.DOWN
            );
    }

        startCharacterSelect() {

        this.menuState = "characterSelect";

        this.titleText.setText("Player 1: Choose Your Bunny");

        this.modeText.setVisible(false);

        this.purpleBunny.setVisible(true);
        this.brownBunny.setVisible(true);

        this.purpleBox.setVisible(true);
        this.brownBox.setVisible(true);

        this.descriptionText.setVisible(true);

        this.updateDescription();
    }

    update() {

        let dt = this.game.loop.delta / 1000;

        // move stars

        for(let star of this.stars){

            star.y += star.speed * dt;

            if(star.y > 768){

                star.y = 0;
                star.x = Phaser.Math.Between(0,1024);
            }
        }

        if(this.menuState === "modeSelect") {

            if(Phaser.Input.Keyboard.JustDown(this.upKey) || Phaser.Input.Keyboard.JustDown(this.wKey)) {

                //added
                this.selectSFX.play();

                this.modeChoice = 1;

                this.modeText.setText([
                    "> One Player",
                    "",
                    "  Two Players"
                ]);
            }

            if(Phaser.Input.Keyboard.JustDown(this.downKey) || Phaser.Input.Keyboard.JustDown(this.sKey)) {

                //added
                this.selectSFX.play();

                this.modeChoice = 2;

                this.modeText.setText([
                    "  One Player",
                    "",
                    "> Two Players"
                ]);
            }

            if(Phaser.Input.Keyboard.JustDown(this.enterKey) || Phaser.Input.Keyboard.JustDown(this.spaceKey)) {

                gameSettings.numPlayers = this.modeChoice;
                //added
                this.clickSFX.play();

                this.startCharacterSelect();

            }

            return;
        }

        if (Phaser.Input.Keyboard.JustDown(this.leftKey) || Phaser.Input.Keyboard.JustDown(this.aKey)) {

            //added
            this.selectSFX.play();

            this.selectedCharacter = "purple";

            this.purpleBox.setStrokeStyle(5, 0xffff00);
            this.brownBox.setStrokeStyle(2, 0xffffff);

            this.updateDescription();
        }

        if (Phaser.Input.Keyboard.JustDown(this.rightKey) || Phaser.Input.Keyboard.JustDown(this.dKey)) {

            //added
            this.selectSFX.play();

            this.selectedCharacter = "brown";

            this.brownBox.setStrokeStyle(5, 0xffff00);
            this.purpleBox.setStrokeStyle(2, 0xffffff);

            this.updateDescription();
        }

        if (Phaser.Input.Keyboard.JustDown(this.enterKey) || Phaser.Input.Keyboard.JustDown(this.spaceKey)) {

            // if its one player you only make one selection
            if(gameSettings.numPlayers === 1) {

                gameSettings.player1Character =
                    this.selectedCharacter;

                    //added
                    this.clickSFX.play();
                    
                    this.titlebackground.stop();
                this.scene.start("levelScene", {
                    level: 1
                })
               
            }

            // if theres 2 players you make 2 selections with player one going first
            else {

                if(this.selectionStage === 1) {

                    gameSettings.player1Character =
                        this.selectedCharacter;

                    this.clickSFX.play();

                    this.selectionStage = 2;

                    this.selectedCharacter = "purple";

                    this.titleText.setText(
                        "Player 2: Choose Your Bunny"
                    );

                    this.updateDescription();
                }

                else {

                    gameSettings.player2Character =
                        this.selectedCharacter;

                    this.clickSFX.play();
                    
                    this.titlebackground.stop();
                    this.scene.start("levelScene", {
                        level: 1
                    });
                }
            }
        }
    }

    updateDescription() {

        if (this.selectedCharacter === "purple") {

            this.descriptionText.setText([
                "PURPLE BUNNY",
                "",
                "Rapid Fire",
                "Fast Movement",
                "Lower Damage",
                "",
                "Press ENTER to Select"
            ]);
        }
        else {

            this.descriptionText.setText([
                "BROWN BUNNY",
                "",
                "Heavy Damage",
                "Slower Fire Rate",
                "More Powerful Shots",
                "",
                "Press ENTER to Select"
            ]);
        }
    }
}