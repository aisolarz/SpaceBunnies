//Player.js

class Player extends Phaser.GameObjects.Sprite {

    /* Inputs:
    x, y: starting location
    frame: will be either bunny2_stand.png or bunny1_stand.png
    leftKey: key that's used to go left 
    rightKey: key that's used to go right

    Functions: 
    hurt() run this function anytime player is hurt to subtract from player health, change texture to hurt, and start hurt cooldown
    */
    
    constructor(scene, x, y, frame, leftKey, rightKey, shootKey) {
        super(scene, x, y, 'jumper', frame); // args: scene, x, y, texture, frame

        // Feel free to change these values guys!!
        this.playerHealth = 3;
        this.hurtTimerCooldown = 2; // In seconds
        this.setScale(0.5)
        const purpleSpeed = 450
        const brownSpeed = 350

        // These values should only be changed if bug fixing 
        this.hurtTimer = 0; // Start hurt timer at 0
        this.shootCooldown = 0.25;
        this.shootTimer = 0;
        this.frame = frame;
        scene.add.existing(this);
        if (this.frame === 'bunny2_stand.png') {this.playerSpeed = purpleSpeed}
        if (this.frame === 'bunny1_stand.png') {this.playerSpeed = brownSpeed}

        // Animation for normal player. Left over from my other game's code
        /*
        if (!this.scene.anims.exists('playerAnims') && this.texture == 'player1') {
            scene.anims.create({
                    key: 'playerAnims', 
                    frames: [
                        {key: 'player1'}, 
                        {key: 'player2'},
                    ],
                    frameRate: 8, 
                    repeat: -1,
                    yoyo: true
        });
        }
        this.play('playerAnims')
        */

        // Create keys
        this.leftKey =
            scene.input.keyboard.addKey(leftKey);

        this.rightKey =
            scene.input.keyboard.addKey(rightKey);

        this.shootKey =
            scene.input.keyboard.addKey(shootKey);

    }

    hurt() {
        if (this.hurtTimer <= 0) {
        // this.scene.sound.play('playerHurtSound');
        this.playerHealth -= 1;
        // console.log('Health:', playerHealth);
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
            Phaser.Input.Keyboard.JustDown(this.shootKey)
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
            if (this.frame === 'bunny2_stand.png') {this.setFrame('bunny2_hurt.png')}
            if (this.frame === 'bunny1_stand.png') {this.setFrame('bunny1_hurt.png')}

        }
        else {
            this.setFrame(this.frame);
        }

    }

}