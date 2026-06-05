//Select.js

class Select extends Phaser.Scene {
    constructor() {
        super("selectScene");
    }

    create() {
        this.menuState = "modeSelect";
        this.modeChoice = 1;

        this.selectedCharacter = "purple";
        this.selectionStage = 1;

        // Background
        this.cameras.main.setBackgroundColor("#1a1a2e");

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

        if(this.menuState === "modeSelect") {

            if(Phaser.Input.Keyboard.JustDown(this.upKey)) {

                this.modeChoice = 1;

                this.modeText.setText([
                    "> One Player",
                    "",
                    "  Two Players"
                ]);
            }

            if(Phaser.Input.Keyboard.JustDown(this.downKey)) {

                this.modeChoice = 2;

                this.modeText.setText([
                    "  One Player",
                    "",
                    "> Two Players"
                ]);
            }

            if(Phaser.Input.Keyboard.JustDown(this.enterKey)) {

                gameSettings.numPlayers = this.modeChoice;

                this.startCharacterSelect();
            }

            return;
        }

        if (Phaser.Input.Keyboard.JustDown(this.leftKey)) {

            this.selectedCharacter = "purple";

            this.purpleBox.setStrokeStyle(5, 0xffff00);
            this.brownBox.setStrokeStyle(2, 0xffffff);

            this.updateDescription();
        }

        if (Phaser.Input.Keyboard.JustDown(this.rightKey)) {

            this.selectedCharacter = "brown";

            this.brownBox.setStrokeStyle(5, 0xffff00);
            this.purpleBox.setStrokeStyle(2, 0xffffff);

            this.updateDescription();
        }

        if (Phaser.Input.Keyboard.JustDown(this.enterKey)) {

            // if its one player you only make one selection
            if(gameSettings.numPlayers === 1) {

                gameSettings.player1Character =
                    this.selectedCharacter;

                this.scene.start("levelScene");
            }

            // if theres 2 players you make 2 selections with player one going first
            else {

                if(this.selectionStage === 1) {

                    gameSettings.player1Character =
                        this.selectedCharacter;

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

                    this.scene.start("levelScene");
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