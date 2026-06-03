class Level extends Phaser.Scene {
    constructor() {
        super("levelScene");

    }


    create() {
        // Create keys
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        
        this.leftKey =
            this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.LEFT
            );

        this.rightKey =
            this.input.keyboard.addKey(
                Phaser.Input.Keyboard.KeyCodes.RIGHT
            );


        console.log("Players:", gameSettings.numPlayers);
        console.log("P1:", gameSettings.player1Character);
        console.log("P2:", gameSettings.player2Character);

        //Text that shows how many lives you have at the start
        this.livesText = this.add.text(10, 35, "Lives: 3", {
            fontSize: "20px",
            fill: "#ffffff"

        });



        // Player 1
        if(gameSettings.player1Character === "purple") {

            /*this.player1 = this.add.sprite(
                300,
                500,
                "jumper",
                "bunny2_stand.png"
            );*/
            this.player1 = new Player(this, 300, 500, 'bunny2_stand.png')
        }
        else {

            /*this.player1 = this.add.sprite(
                300,
                500,
                "jumper",
                "bunny1_stand.png"
            );*/
            this.player1 = new Player(this, 300, 500, 'bunny1_stand.png')

        }

        // Only spawn Player 2 if coop selected
        if(gameSettings.numPlayers === 2) {

            if(gameSettings.player2Character === "purple") {

                /*this.player2 = this.add.sprite(
                    700,
                    500,
                    "jumper",
                    "bunny2_stand.png"
                );*/
                this.player2 = new Player(this, 700, 500, 'bunny2_stand.png')

            }
            else {

                /*this.player2 = this.add.sprite(
                    700,
                    500,
                    "jumper",
                    "bunny1_stand.png"
                );*/
                this.player2 = new Player(this, 700, 500, 'bunny1_stand.png')

            }
        }






    }

    //how many lives it starts off with. Feel free to change it! - Sharon
    initGame(data = {}){
        //this.gameOver = false;    <-----Im going to leave this as a comment for now - Sharon
        this.lives = 3;

    }


    update(time, delta) {
        let dt = delta / 1000 // Convert delta from miliseconds to seconds

        if (this.player1) {this.player1.update(time, delta)}
        if (this.player2) {this.player2.update(time, delta)}






    }

    //when player takes damage it subtracts lives by one - Sharon
    damagePlayer(){
        this.lives--;
        this.livesText.setText("Lives: " + this.lives);

        if (this.lives <= 0){
            //need the one line of code to end the game here - Sharon
            //this.endGame();                      <-----Something like this
        }
    }

    


    //End Game Function - Sharon
    endGame(){


    }

    
}