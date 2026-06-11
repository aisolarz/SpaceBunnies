//Player.js

class Player extends Phaser.GameObjects.Sprite {

    /* Inputs:
    x, y: starting location
    frame: will be either bunny2_jetpack1 or bunny1_jetpack1
    leftKey: key that's used to go left 
    rightKey: key that's used to go right

    Functions: 
    hurt() run this function anytime player is hurt to subtract from player health, change texture to hurt, and start hurt cooldown
    */
    
    constructor(scene, x, y, textureKey, leftKey, rightKey, shootKey) {
        super(scene, x, y, textureKey, null); // args: scene, x, y, texture, frame

        // Feel free to change these values guys!! -Char
        this.lives = 1;
        this.hurtTimerCooldown = 2; // In seconds
        
        //change the bunny size if you want
        this.setScale(0.38)
        
        const purpleSpeed = 450
        const brownSpeed = 350

        // These values should only be changed if bug fixing 
        this.hurtTimer = 0; // Start hurt timer at 0
        this.shootCooldown = 0.25;
        this.shootTimer = 0;
        scene.add.existing(this);
        this.textureKey = textureKey;
        if (this.textureKey === 'player1_jetpack1') {this.playerSpeed = purpleSpeed}
        if (this.textureKey === 'player2_jetpack1') {this.playerSpeed = brownSpeed}

        //Play animations and set this.animKey
        if (this.textureKey === 'player1_jetpack1') {this.animKey = 'player1Anims'}
        if (this.textureKey === 'player2_jetpack1') {this.animKey = 'player2Anims'}
        this.play(this.animKey)

        

        // Create keys
        this.leftKey =
            scene.input.keyboard.addKey(leftKey);

        this.rightKey =
            scene.input.keyboard.addKey(rightKey);

        this.shootKey =
            scene.input.keyboard.addKey(shootKey);


        this.playerHurt = this.scene.sound.add("playerHurt", {
                volume: 0.8
            });

    }

    hurt() {
        if (this.hurtTimer <= 0) {
        this.playerHurt.play();
        //this.lives -= 1; ----- ok this is now handled by Level.js
        this.hurtTimer = this.hurtTimerCooldown; // Restart the timer
        }    
    }

    update(time, delta) {
        let dt = delta / 1000;
        this.hurtTimer -= dt; // subtract one dt (second) from hurt timer every frame. Using delta since a normal number would be based on frames which differs based on computer
        this.shootTimer -= dt;

        // Moving left
        if (this.leftKey.isDown) {
            // Check to make sure the sprite can actually move left
            if (this.x > (this.displayWidth/2)) {
                this.x -= this.playerSpeed * dt;
            }
        }

        // Moving right
        if (this.rightKey.isDown) {
            // Check to make sure the sprite can actually move right
            if (this.x < (game.config.width - (this.displayWidth/2))) {
                this.x += this.playerSpeed * dt;
            }
        }

        if(
            // Phaser.Input.Keyboard.JustDown(this.shootKey)
            this.shootKey.isDown 
            &&
            this.shootTimer <= 0
        ) {

            let bullet = new Bullet(
                this.scene,
                this.x,
                this.y - 40
            );

            this.scene.bullets.push(bullet);
            this.shootTimer = this.shootCooldown;
        }

        if (this.hurtTimer > 0) {
            if (this.textureKey === 'player1_jetpack1') {this.setTexture('player1_hurt')}
            if (this.textureKey === 'player2_jetpack1') {this.setTexture('player2_hurt')}
        }
        else if (this.anims && !this.anims.isPlaying) {
            this.setTexture(this.textureKey);
        }

    }

}