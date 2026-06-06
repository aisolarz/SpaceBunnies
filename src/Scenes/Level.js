//Level.js

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

        //Text that shows how many lives you have at the start
        this.livesText = this.add.text(10, 35, "Lives: 3", {
            fontSize: "20px",
            fill: "#ffffff"

        });

        this.bullets = [];

        this.enemyBullets = [];



        // Player 1
        if(gameSettings.player1Character === "purple") {

            /*this.player1 = this.add.sprite(
                300,
                500,
                "jumper",
                "bunny2_stand.png"
            );*/
            this.player1 = new Player(
                this,
                300,
                650,
                'bunny2_stand.png',
                Phaser.Input.Keyboard.KeyCodes.A,
                Phaser.Input.Keyboard.KeyCodes.D,
                Phaser.Input.Keyboard.KeyCodes.W
            );

        }
        else {

            /*this.player1 = this.add.sprite(
                300,
                500,
                "jumper",
                "bunny1_stand.png"
            );*/
            this.player1 = new Player(
                this,
                300,
                650,
                'bunny1_stand.png',
                Phaser.Input.Keyboard.KeyCodes.A,
                Phaser.Input.Keyboard.KeyCodes.D,
                Phaser.Input.Keyboard.KeyCodes.W
            );

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
                this.player2 = new Player(
                    this,
                    700,
                    650,
                    'bunny2_stand.png',
                    Phaser.Input.Keyboard.KeyCodes.LEFT,
                    Phaser.Input.Keyboard.KeyCodes.RIGHT,
                    Phaser.Input.Keyboard.KeyCodes.UP
                );

            }
            else {

                /*this.player2 = this.add.sprite(
                    700,
                    500,
                    "jumper",
                    "bunny1_stand.png"
                );*/
                this.player2 = new Player(
                    this,
                    700,
                    650,
                    'bunny1_stand.png',
                    Phaser.Input.Keyboard.KeyCodes.LEFT,
                    Phaser.Input.Keyboard.KeyCodes.RIGHT,
                    Phaser.Input.Keyboard.KeyCodes.UP

                );

            }
        }

        //spawns the enemy
        this.enemies = [];

        for(let i = 0; i < 5; i++) {

            let enemy = new Enemy(
                this,
                200 + i * 120,
                100,
                "wingMan1.png"
            );

            this.enemies.push(enemy);
        }




    }


    /*
    //how many lives it starts off with. Feel free to change it! - Sharon
    initGame(data = {}){
        //this.gameOver = false;    <-----Im going to leave this as a comment for now - Sharon
        this.lives = 3;

    }
        */


    update(time, delta) {
        let dt = delta / 1000 // Convert delta from miliseconds to seconds

        if (this.player1) {this.player1.update(time, delta)}
        if (this.player2) {this.player2.update(time, delta)}

        for(let bullet of this.bullets) {

            if(bullet.active) {
                bullet.update(time, delta);
            }
        }

        for(let bullet of this.enemyBullets) {

            if(bullet.active) {
                bullet.update(time, delta);
            }
        }

        for(let enemy of this.enemies) {

            if(enemy.active) {
                enemy.update(time, delta);
            }
        }

    
        //this is the collision stuff :3
        for(let bullet of this.enemyBullets) {

            if(!bullet.active) continue;

            // Player 1
            let p1Distance = Phaser.Math.Distance.Between(
                bullet.x,
                bullet.y,
                this.player1.x,
                this.player1.y
            );

            if(p1Distance < 35) {

                bullet.destroy();

                console.log("P1 before:", this.player1.lives);

                this.damagePlayer(this.player1);

                console.log("P1 after:", this.player1.lives);

                continue;
            }

            // Player 2
            if(this.player2) {

                let p2Distance = Phaser.Math.Distance.Between(
                    bullet.x,
                    bullet.y,
                    this.player2.x,
                    this.player2.y
                );

                if(p2Distance < 35) {

                    bullet.destroy();

                    console.log("P2 before:", this.player2.lives);

                    this.damagePlayer(this.player2);

                    console.log("P2 after:", this.player2.lives);
                }
            }
        }
    }

    //when player takes damage it subtracts lives by one - Sharon
        damagePlayer(player){

        player.hurt();

        this.livesText.setText(
            "Lives: " + player.lives
        );

        if(player.lives <= 0){

            this.scene.start("endScene", {
                win: false
            });
        }
    }



    //End Game Function - Sharon
    endGame(){


    }

    
    
}