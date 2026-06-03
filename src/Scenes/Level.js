class Level extends Phaser.Scene {
    constructor() {
        super("levelScene");

    }


    create() {
        // Create keys
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        console.log("Players:", gameSettings.numPlayers);
        console.log("P1:", gameSettings.player1Character);
        console.log("P2:", gameSettings.player2Character);

        // Player 1
        if(gameSettings.player1Character === "purple") {

            this.player1 = this.add.sprite(
                300,
                500,
                "jumper",
                "bunny2_stand.png"
            );
        }
        else {

            this.player1 = this.add.sprite(
                300,
                500,
                "jumper",
                "bunny1_stand.png"
            );
        }

        // Only spawn Player 2 if coop selected
        if(gameSettings.numPlayers === 2) {

            if(gameSettings.player2Character === "purple") {

                this.player2 = this.add.sprite(
                    700,
                    500,
                    "jumper",
                    "bunny2_stand.png"
                );
            }
            else {

                this.player2 = this.add.sprite(
                    700,
                    500,
                    "jumper",
                    "bunny1_stand.png"
                );
            }
        }





    }


    update(time, delta) {
        let dt = delta / 1000 // Convert delta from miliseconds to seconds





    }

    
}