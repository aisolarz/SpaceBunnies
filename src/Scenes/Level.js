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

        //create enemy destroyed sound - sharon
        this.enemydefeatedSFX = this.sound.add("defeatedSound", {
            volume: 0.1
        });

        //create player died sound - sharon
        this.playerdefeatedSFX = this.sound.add("playerdefeatedSound", {
            volume: 2
        });

        //background music
        this.level1background = this.sound.add("level1background", {
            loop: true,
            volume: 0.5
        });

        

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
        this.maxWaves = 5;


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
        if(this.level === 1){

            this.level1background.play();

            this.background = '#323a6e';
            this.cameras.main.setBackgroundColor(this.background);

            this.spawnWave(this.currentWave);
        }


        // Just a placeholder amount of enemies to make sure level transitions works. 
        /*
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
            */

        if (this.level === 2) {

            this.background = '#293164';
            this.cameras.main.setBackgroundColor(this.background);

            this.currentWave = 1;
            this.maxWaves = 5;

            this.spawnWave(this.currentWave);
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
            if(!bullet.active) continue;
            
            for (let enemy of this.enemies) {
                if(!enemy.active) continue;

                if(this.collides(enemy, bullet)) {
                    bullet.destroy();
                    enemy.takeDamage();
                    this.enemydefeatedSFX.play();
                    break;
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
        //checking if it spawns all of the enemies
        console.log(
            "Wave:",
            this.currentWave,
            "Enemies:",
            this.enemies.length
        );

        if(this.enemies.length <= 0){

            if(this.currentWave < this.maxWaves){

                this.currentWave++;

                this.spawnWave(this.currentWave);
            }
            else{

                this.level1background.stop();

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

            //add sound dying
            this.playerdefeatedSFX.play();
            this.level1background.stop();

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

        if(this.level === 2){

            this.spawnLevel2Wave(waveNumber);
            return;
        }

        let positions = [];

        // WAVE 1
        if(waveNumber === 1){

            positions = [
                {x:200, y:100},
                {x:320, y:100},
                {x:440, y:100},
                {x:560, y:100},
                {x:680, y:100}
            ];
        }

        // WAVE 2
        else if(waveNumber === 2){

            positions = [
                {x:150, y:100},
                {x:300, y:100},
                {x:450, y:100},
                {x:600, y:100},
                {x:750, y:100},

                {x:225, y:180},
                {x:375, y:180},
                {x:525, y:180},
                {x:675, y:180}
            ];
        }

        // WAVE 3 (V shape)
        else if(waveNumber === 3){

            positions = [
                {x:512, y:80},

                {x:420, y:140},
                {x:604, y:140},

                {x:330, y:220},
                {x:694, y:220},

                {x:240, y:300},
                {x:784, y:300},

                {x:512, y:300}
            ];
        }

        // WAVE 4 (wide wall)
        else if(waveNumber === 4){

            positions = [
                {x:120, y:100},
                {x:240, y:100},
                {x:360, y:100},
                {x:480, y:100},
                {x:600, y:100},
                {x:720, y:100},
                {x:840, y:100},

                {x:180, y:200},
                {x:300, y:200},
                {x:420, y:200},
                {x:540, y:200},
                {x:660, y:200},
                {x:780, y:200}
            ];
        }

        // WAVE 5 (final formation)
        else if(waveNumber === 5){

            positions = [
                {x:150, y:100},
                {x:300, y:100},
                {x:450, y:100},
                {x:600, y:100},
                {x:750, y:100},

                {x:225, y:180},
                {x:375, y:180},
                {x:525, y:180},
                {x:675, y:180},

                {x:150, y:260},
                {x:300, y:260},
                {x:450, y:260},
                {x:600, y:260},
                {x:750, y:260},

                {x:225, y:340},
                {x:375, y:340},
                {x:525, y:340},
                {x:675, y:340}
            ];
        }


        console.log(
            "Spawning Wave",
            waveNumber,
            "Enemy Count:",
            positions.length
        );

        for(let pos of positions){

            let movementType = "normal";

            if(waveNumber === 2){
                movementType = "sine";
            }

            else if(waveNumber === 3){
                movementType = "figure8";
            }

            else if(waveNumber === 4){

                if(Math.random() < 0.5){
                    movementType = "normal";
                }
                else{
                    movementType = "sine";
                }
            }

            else if(waveNumber === 5){

                let randomChoice = Math.floor(Math.random() * 4);

                if(randomChoice === 0){
                    movementType = "normal";
                }
                else if(randomChoice === 1){
                    movementType = "sine";
                }
                else{
                    movementType = "figure8";
                }
            }

            let enemy = new Enemy(
                this,
                pos.x,
                -100,
                "wingMan1.png",
                150 + (waveNumber * 20),
                1,
                movementType
            );

            this.enemies.push(enemy);

            this.tweens.add({
                targets: enemy,
                y: pos.y,
                duration: 1000 + Math.random() * 500,
                ease: 'Back.Out',

                onComplete: () => {
                    enemy.entering = false;

                    enemy.startX = enemy.x;
                    enemy.startY = enemy.y;
                }
            });
        }
    }

    spawnLevel2Wave(waveNumber){

        let enemies = [];

        if(waveNumber === 1){

            enemies = [
                {x:200,y:100,frame:"wingMan1.png",move:"normal"},
                {x:320,y:100,frame:"wingMan1.png",move:"normal"},
                {x:440,y:100,frame:"wingMan1.png",move:"normal"},
                {x:560,y:100,frame:"wingMan1.png",move:"normal"},
                {x:680,y:100,frame:"wingMan1.png",move:"normal"},
                {x:800,y:100,frame:"wingMan1.png",move:"normal"}
            ];
        }

        else if(waveNumber === 2){

            enemies = [
                {x:200,y:100,frame:"wingMan1.png",move:"sine"},
                {x:350,y:100,frame:"wingMan1.png",move:"sine"},
                {x:500,y:100,frame:"wingMan1.png",move:"sine"},
                {x:650,y:100,frame:"wingMan1.png",move:"sine"},

                {x:250,y:250,frame:"flyMan_fly.png",move:"dive"},
                {x:750,y:250,frame:"flyMan_fly.png",move:"dive"}
            ];
        }

        else if(waveNumber === 3){

            enemies = [
                {x:200,y:100,frame:"flyMan_fly.png",move:"dive"},
                {x:350,y:100,frame:"flyMan_fly.png",move:"dive"},
                {x:500,y:100,frame:"flyMan_fly.png",move:"dive"},
                {x:650,y:100,frame:"flyMan_fly.png",move:"dive"},
                {x:800,y:100,frame:"flyMan_fly.png",move:"dive"},

                {x:300,y:250,frame:"wingMan1.png",move:"figure8"},
                {x:700,y:250,frame:"wingMan1.png",move:"figure8"}
            ];
        }

        else if(waveNumber === 4){

            enemies = [

                {x:150,y:100,frame:"wingMan1.png",move:"figure8"},
                {x:350,y:100,frame:"wingMan1.png",move:"figure8"},
                {x:550,y:100,frame:"wingMan1.png",move:"figure8"},
                {x:750,y:100,frame:"wingMan1.png",move:"figure8"},

                {x:250,y:250,frame:"flyMan_fly.png",move:"dive"},
                {x:500,y:250,frame:"flyMan_fly.png",move:"dive"},
                {x:750,y:250,frame:"flyMan_fly.png",move:"dive"}
            ];
        }

        else if(waveNumber === 5){

            enemies = [

                {x:150,y:100,frame:"flyMan_fly.png",move:"dive"},
                {x:300,y:100,frame:"flyMan_fly.png",move:"dive"},
                {x:450,y:100,frame:"flyMan_fly.png",move:"dive"},
                {x:600,y:100,frame:"flyMan_fly.png",move:"dive"},
                {x:750,y:100,frame:"flyMan_fly.png",move:"dive"},

                {x:200,y:250,frame:"wingMan1.png",move:"sine"},
                {x:400,y:250,frame:"wingMan1.png",move:"figure8"},
                {x:600,y:250,frame:"wingMan1.png",move:"sine"},
                {x:800,y:250,frame:"wingMan1.png",move:"figure8"}
            ];
        }

        for(let e of enemies){

            let enemy = new Enemy(
                this,
                e.x,
                -100,
                e.frame,
                e.move === "dive" ? 250 : 200,
                1,
                e.move
            );

            this.enemies.push(enemy);

            this.tweens.add({
                targets: enemy,
                y: e.y,
                duration: 1200,
                ease: 'Back.Out',

                onComplete: () => {
                    enemy.entering = false;
                    enemy.startX = enemy.x;
                    enemy.startY = enemy.y;
                }
            });
        }
    }

    //End Game Function - Sharon
    endGame(){


    }

    
    
}