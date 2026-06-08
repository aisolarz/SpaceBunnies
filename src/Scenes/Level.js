//Level.js

class Level extends Phaser.Scene {
    constructor() {
        super("levelScene");
    }

    /*
    Known bugs to be fixed

    * If you finish a level in two player mode, then quit and switch to 1 player mode, the ghost of the second player will remain and take damage
    * Issue with box 1.2 in level 2 not finishing the dialogue tree
    * Fix spacing on dialogue box text



    */


    init(data) {
            this.level = data.level
        }
    

    create() {


        // Create keys
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        console.log("Players:", gameSettings.numPlayers);
        console.log("P1:", gameSettings.player1Character);
        console.log("P2:", gameSettings.player2Character);

        //Text that shows how many lives you have at the start
        this.teamLives =
            gameSettings.numPlayers === 1
            ? 3
            : 6;

        this.livesText = this.add.text(
            10,
            10,
            "Lives: " + this.teamLives,
            {
                fontSize: "20px",
                fill: "#ffffff"
            }
        );

        // Start variables 
        this.bullets = [];
        this.enemyBullets = [];
        // Start level counter if it isn't already initialized
        if (this.level === undefined) {
            this.level = 1;
        }




        // Player 1
        if(gameSettings.player1Character === "purple") {

            
            this.player1 = new Player(
                this,
                300,
                650,
                'player1_jetpack1',
                Phaser.Input.Keyboard.KeyCodes.A,
                Phaser.Input.Keyboard.KeyCodes.D,
                Phaser.Input.Keyboard.KeyCodes.W
            );
            

        }
        else {

            
            this.player1 = new Player(
                this,
                300,
                650,
                'player2_jetpack1',
                Phaser.Input.Keyboard.KeyCodes.A,
                Phaser.Input.Keyboard.KeyCodes.D,
                Phaser.Input.Keyboard.KeyCodes.W
            );

        }

        // Only spawn Player 2 if coop selected
        if(gameSettings.numPlayers === 2) {

            if(gameSettings.player2Character === "purple") {

                
                this.player2 = new Player(
                    this,
                    700,
                    650,
                    'player1_jetpack1',
                    Phaser.Input.Keyboard.KeyCodes.LEFT,
                    Phaser.Input.Keyboard.KeyCodes.RIGHT,
                    Phaser.Input.Keyboard.KeyCodes.UP
                );

            }
            else {
                this.player2 = new Player(
                    this,
                    700,
                    650,
                    'player2_jetpack1',
                    Phaser.Input.Keyboard.KeyCodes.LEFT,
                    Phaser.Input.Keyboard.KeyCodes.RIGHT,
                    Phaser.Input.Keyboard.KeyCodes.UP
                );
            }
        }

        //spawns the enemy
        this.enemies = [];

        //adding waves
        this.currentWave = 1;
        this.maxWaves = 3;


        // ---------------------- LEVELS --------------------------
        
        // Level 1
        /*
        if (this.level === 1) {
            this.background = '#323a6e'
            this.cameras.main.setBackgroundColor(this.background);

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
        */

        //creating waves
        this.spawnWave(1);


        // Just a placeholder amount of enemies to make sure level transitions works. 
        if (this.level === 2) {
            this.background = '#293164'
            this.cameras.main.setBackgroundColor(this.background);
            for(let i = 0; i < 2; i++) {

                let enemy = new Enemy(
                    this,
                    200 + i * 120,
                    100,
                    "wingMan1.png"
                );

                this.enemies.push(enemy);
            }
        }

        // ----------------------------------------------------------
            
    


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

        // Class updates
        if (this.player1 && this.player1.active) {this.player1.update(time, delta)}
        if (this.player2 && this.player2.active) {this.player2.update(time, delta)}

        

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

        // Collision (for enemies hit by player bullets) - Char
        for (let bullet of this.bullets) {
            for (let enemy of this.enemies) {
                if (this.collides(enemy, bullet)) {
                    bullet.y = -100 // Move bullet offscreen to be destroyed
                    bullet.destroy();
                    enemy.takeDamage();
                }
            }
        }

    
        //this is the collision stuff :3 (For player hit by enemy bullets)
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

        // Check if all enemies are defeated to end level
        /*
        if (this.enemies.length <= 0) {
            this.scene.start("endScene", {
                win: true,
                level: this.level,
                background: this.background
            })
        }
            */

        //checks if the wave is cleared to move onto the next

        if(this.enemies.length <= 0){

            if(this.currentWave < this.maxWaves){

                this.currentWave++;

                this.spawnWave(this.currentWave);
            }
            else{

                this.scene.start("endScene", {
                    win: true,
                    level: this.level,
                    background: this.background
                });
            }
        }



    }

    //when player takes damage it subtracts lives by one - Sharon
    damagePlayer(player){

        if(player.hurtTimer > 0){
            return;
        }

        player.hurt();

        this.teamLives--;

        this.livesText.setText(
            "Lives: " + this.teamLives
        );

        if(this.teamLives <= 0){

            this.scene.start("endScene", {
                win: false,
                level: this.level,
                background: this.background
            });
        }
    }

    // Function to use for collisions, taken from Professor's example code
    // Checks if the gap between two sprites is wider than the space their bodies take up. If it is, returns false
    collides(a, b) {
        if (Math.abs(a.x - b.x) > (a.displayWidth/2 + b.displayWidth/2)) return false; // If the gap between the sprites' centers is larger than the sprites' combined half-widths, it means there is empty air between them. Returns false
        if (Math.abs(a.y - b.y) > (a.displayHeight/2 + b.displayHeight/2)) return false; // If the gap between the sprites' centers is larger than the sprites' combined half-heights, it means there is empty air between them. Returns false
        return true;
    }

    //creating spawnWave
    spawnWave(waveNumber){

    for(let i = 0; i < 5 + waveNumber; i++){

        let enemy = new Enemy(
            this,
            150 + (i % 6) * 120,
            100 + Math.floor(i / 6) * 80,
            "wingMan1.png",
            150 + (waveNumber * 20),
            1
        );

        this.enemies.push(enemy);
    }
}

    //End Game Function - Sharon
    endGame(){


    }

    
    
}