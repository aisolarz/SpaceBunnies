// Enemy.js

class Enemy extends Phaser.GameObjects.Sprite {

    constructor(
        scene,
        x,
        y,
        frame = "wingMan1.png",
        speed = 200,
        health = 1,
        movementType = "normal"
    ) {

        super(
            scene,
            x,
            y,
            "jumper",
            frame
        );

        scene.add.existing(this);

        //visuals
        this.setScale(0.2);

        //stats
        this.health = health;
        this.speed = speed;

        this.movementType = movementType;

        this.startX = x;
        this.startY = y;
        this.phaseOffset =
            Phaser.Math.FloatBetween(0, Math.PI * 2);

        //movement
        this.direction = 1;

        //shooting
        this.shootCooldown = 3;
        this.shootTimer = 2;

        //enemies start off screen
        this.entering = true;

        //dive stuff for the new enemy in level 2
        this.diveState = "waiting";
        this.diveTimer = Phaser.Math.FloatBetween(0.5, 1.5);
        this.targetX = x;

        // Boss initializing
        this.bossTimer = 7000
        this.bossAttacks = ['laser', 'laserFollow', 'laserSweep']


        // this is only the animation for Wingman enemies
        if(frame === "wingMan1.png") {
            this.play("wingmanFly");
        }

        if(frame === "flyMan_fly.png") {
            this.play("flymanFly");
        }

        if(frame === 'spikeBall1.png') {
            this.play('boss');
        }
    }

    takeDamage(amount = 1) {

        this.health -= amount;


        //update boss heath text
        if(this.isBoss && this.scene.bossHealthText.setText){
            this.scene.bossHealthText.setText("Boss HP: " + this.health);
        }

        //Flash when hit
        this.setTint(0xff4f4f);
        this.scene.time.delayedCall(100, () => {
            if(this.active){
                this.clearTint();
            }
        });


        if(this.health <= 0) {

            if (this.isBoss) { // Clear everything once boss is defeated
                this.scene.tweens.killTweensOf(this)
                if (this.scene.enemyLasers.length > 0) {
                    for (let laser of this.scene.enemyLasers) {
                        if (laser && laser.active) {
                            this.scene.tweens.killTweensOf(laser);
                            laser.destroy();
                        }
                    }
                    this.scene.enemyLasers = [] // Reset array to be safe
                }


            }

            if(this.scene.bossHealthText){
                this.scene.bossHealthText.destroy();
                this.scene.bossHealthText = null;
            }

            new Explosion(
                this.scene,
                this.x,
                this.y
            );
            
            let index =
                this.scene.enemies.indexOf(this);

            if(index !== -1){
                this.scene.enemies.splice(index, 1);
            }

            this.destroy();
        }
    }


    // ---------------------BOSS FUNCTIONS-----------------------
    // Boss attack logic

    /* width: 1024,
    height: 768, half is 384
    sides: 80, 944

    it starts at y axis 150
    */



    toCenter() {
        this.scene.tweens.add({
            targets: this,
            x: 512,
            y: 150,
            duration: 300,
            ease: "Sine.easeIn",
            onComplete: () => {
                this.movementType = 'figure8'
            }
        });
        this.shootTimer = 2
    }

    laser() {
        this.shootTimer = 999;
        this.enableFilters()
        let bossGlow = this.filters.internal.addGlow(0xF0CC5C, 3, 0, 1, false, 5, 150) // args: color, outerstrength, innerstrength, scale, knockout, quality, distance
        bossGlow.setPaddingOverride(null);

        // Disable usual movement
        this.movementType = null;

        // Choose random pattern 
        let pattern1 = [
            { x: 80, y: 150 },
            { x: 512, y: 150 },
            { x: 944, y: 150 }
        ]
        let pattern2 = [
            { x: 944, y: 150 },
            { x: 512, y: 150 },
            { x: 80, y: 150 }
        ]
        let pattern = Phaser.Math.Between(1, 2)
        let positions;
        if (pattern === 1) {positions = pattern1}
        if (pattern === 2) {positions = pattern2}

        // Make laser
        let laser = this.scene.add.sprite(80, 550, 'lasers', 'laserYellow1.png').setScale(2, 8).setDepth(-1)
        laser.visible = false
        laser.enableFilters()
        let glow = laser.filters.internal.addGlow(0xF0CC5C, 2, 0, 1, false, 50, 20) // args: color, outerstrength, innerstrength, scale, knockout, quality, distance
        glow.setPaddingOverride(null);
        this.scene.enemyLasers.push(laser)

        for (let i = 0; i < positions.length; i++) {


            this.scene.time.delayedCall(i * 1500, () => { //To prevent the tweens from starting one after another, need to add delay since the loop runs fast and will start all almost at same time

                if (!this.scene) {return}

                this.scene.tweens.add({
                    targets: this,
                    x: positions[i].x,
                    y: positions[i].y, 
                    duration: 700,
                    ease: "Sine.easeInOut",
                    onComplete: () => {
                        if (!this.scene) {return}

                        laser.x = this.x
                        laser.visible = true

                        let originalX = laser.x - 5; // The -5 and later +10 are intentional to keep the laser still centered
                        let shakeTween = this.scene.tweens.add({
                            targets: laser,
                            x: originalX + 10,
                            duration: 30,
                            yoyo: true,
                            repeat: -1
                        })

                        this.scene.time.delayedCall(800, () => {
                            if (!this.scene) {return}

                            shakeTween.stop(); // Have to stop it since it's moving forever
                            laser.visible = false
                            laser.x = originalX

                            // Destroy laser after last position
                            if (i === positions.length - 1) {
                                laser.destroy()
                                this.filters.internal.remove(bossGlow)
                                this.toCenter()
                            };
                        })
                    }
                });
            })
        }
    }

    laserFollow(player) {
        this.shootTimer = 999;
        this.enableFilters()
        let bossGlow = this.filters.internal.addGlow(0x5CBDF0, 3, 0, 1, false, 5, 150) // args: color, outerstrength, innerstrength, scale, knockout, quality, distance
        bossGlow.setPaddingOverride(null);
        
        // Disable usual movement
        this.movementType = null;

        // Make laser
        let laser = this.scene.add.sprite(80, 550, 'lasers', 'laserBlue1.png').setScale(2, 8).setDepth(-1)
        laser.visible = false
        laser.enableFilters()
        let glow = laser.filters.internal.addGlow(0x5CBDF0, 2, 0, 1, false, 50, 20) // args: color, outerstrength, innerstrength, scale, knockout, quality, distance
        glow.setPaddingOverride(null);
        this.scene.enemyLasers.push(laser)

        for (let i = 0; i < 3; i++) { // This for loop is still used to calculate the delay
            

            this.scene.time.delayedCall(i * 1500, () => { // Follows the same i * 1500 delay the other function uses to get the player x every time a new tween is going to happen
                
                if (!this.scene) {return}

                let position = player.x
            
                this.scene.tweens.add({
                    targets: this,
                    x: position,
                    duration: 700,
                    ease: "Sine.easeInOut",
                    onComplete: () => {
                        if (!this.scene) {return}

                        laser.x = this.x
                        laser.visible = true

                        let originalX = laser.x - 5; // The -5 and later +10 are intentional to keep the laser still centered
                        let shakeTween = this.scene.tweens.add({
                            targets: laser,
                            x: originalX + 10,
                            duration: 30,
                            yoyo: true,
                            repeat: -1
                        })
                        this.scene.time.delayedCall(800, () => {
                            if (!this.scene) {return}
                            
                            shakeTween.stop(); // Have to stop it since it's moving forever
                            laser.visible = false
                            laser.x = originalX
                            // Destroy laser after last position
                            if (i === 2) {
                                laser.destroy()
                                this.filters.internal.remove(bossGlow)
                                this.toCenter()
                            };
                        })
                    }
                });
            });
        }
    }

    laserSweep() {
        this.shootTimer = 999;
        this.enableFilters()
        let bossGlow = this.filters.internal.addGlow(0xF05C88, 3, 0, 1, false, 5, 150) // args: color, outerstrength, innerstrength, scale, knockout, quality, distance
        bossGlow.setPaddingOverride(null);

        // Disable usual movement
        this.movementType = null;

        let pattern = Phaser.Math.Between(1, 2)
        let position;

        if (pattern === 1) {
            position = { start: 80, end: 914}
        }
        if (pattern === 2) {
            position = { start: 944, end: 110}
        }

        // Make laser
        let laser = this.scene.add.sprite(80, 550, 'lasers', 'laserPink1.png').setScale(2, 8).setDepth(-1)
        laser.visible = false
        laser.enableFilters()
        let glow = laser.filters.internal.addGlow(0xF05C88, 2, 0, 1, false, 50, 20) // args: color, outerstrength, innerstrength, scale, knockout, quality, distance
        glow.setPaddingOverride(null);
        this.scene.enemyLasers.push(laser)
            
        this.scene.tweens.add({
            targets: this,
            x: position.start,
            duration: 700,
            ease: "Sine.easeInOut",
            onComplete: () => {
                if (!this.scene) {return}

                laser.x = this.x
                laser.visible = true

                laser.angle = -0.4; // Can't have two tweens on same target property, so shaking angle instead
                let shakeTween = this.scene.tweens.add({
                    targets: laser,
                    angle: 0.4,
                    duration: 30,
                    yoyo: true,
                    repeat: -1
                })
                this.scene.tweens.add({
                    targets: [this, laser],
                    x: position.end,
                    duration: 2600,
                    ease: "Sine.easeInOut",
                    onComplete: () => {
                        if (!this.scene) {return}

                        shakeTween.stop(); // Have to stop it since it's moving forever
                        laser.visible = false
                        laser.destroy()
                        this.toCenter()
                        this.filters.internal.remove(bossGlow)
                    }
                })
            }
        });
    }

    // -----------------------------------------------------










    update(time, delta) {

        if(this.entering){
            return;
        }

        let dt = delta / 1000;

        //countdown shooting timer
        this.shootTimer -= dt;

        //changing the movements. left and right were too boring....
        if(this.movementType === "normal"){

            this.x += this.speed * this.direction * dt;
        }

        else if(this.movementType === "sine"){

            this.x =
                this.startX +
                Math.sin(time * 0.003 + this.phaseOffset) * 120;

            this.y =
                this.startY +
                Math.sin(time * 0.002) * 40;
        }

        else if(this.movementType === "figure8"){

            this.x =
                this.startX +
                Math.sin(time * 0.003 + this.phaseOffset) * 100;

            this.y =
                this.startY +
                Math.sin(time * 0.006) * 50;
        }

        else if(this.movementType === "dive"){

            this.diveTimer -= dt;

            // waiting above
            if(this.diveState === "waiting"){

                if(this.diveTimer <= 0){

                    let target = this.scene.player1;

                    if(this.scene.player2){

                        let d1 = Phaser.Math.Distance.Between(
                            this.x,
                            this.y,
                            this.scene.player1.x,
                            this.scene.player1.y
                        );

                        let d2 = Phaser.Math.Distance.Between(
                            this.x,
                            this.y,
                            this.scene.player2.x,
                            this.scene.player2.y
                        );

                        if(d2 < d1){
                            target = this.scene.player2;
                        }
                    }

                    // lock player position
                    this.targetX = target.x;

                    this.diveState = "diving";
                }
            }

            // dive downward
            else if(this.diveState === "diving"){

                this.x += (this.targetX - this.x) * 3 * dt;
                this.y += 900 * dt;

                if(this.y > 700){
                    this.diveState = "returning";
                }
            }

            // fly back up
            else if(this.diveState === "returning"){

                this.y -= 600 * dt;

                if(this.y <= this.startY){

                    this.y = this.startY;

                    this.diveState = "waiting";

                    this.diveTimer =
                        Phaser.Math.FloatBetween(0.75, 1.5);
                }
            }
        }

        //right wall
        if(this.movementType !== null && this.x > 950) {
            this.direction = -1;
            this.y += 40;
        }

        //left wall
        if(this.movementType !== null && this.x < 75) {
            this.direction = 1;
            this.y += 40;
        }

        if(
            this.movementType === "dive" &&
            this.diveState === "diving"
        ){

            let distance = Phaser.Math.Distance.Between(
                this.x,
                this.y,
                this.scene.player1.x,
                this.scene.player1.y
            );

            if(distance < 50){

                this.scene.damagePlayer(
                    this.scene.player1
                );

                this.diveState = "returning";
            }

            if(this.scene.player2){

                let distance2 =
                    Phaser.Math.Distance.Between(
                        this.x,
                        this.y,
                        this.scene.player2.x,
                        this.scene.player2.y
                    );

                if(distance2 < 50){

                    this.scene.damagePlayer(
                        this.scene.player2
                    );

                    this.diveState = "returning";
                }
            }
        }

        //shoot
        if(
            this.shootTimer <= 0 &&
            this.movementType !== "dive"
        ) {

            let target = this.scene.player1;

            if(this.scene.player2){

                let d1 = Phaser.Math.Distance.Between(
                    this.x,
                    this.y,
                    this.scene.player1.x,
                    this.scene.player1.y
                );

                let d2 = Phaser.Math.Distance.Between(
                    this.x,
                    this.y,
                    this.scene.player2.x,
                    this.scene.player2.y
                );

                if(d2 < d1){
                    target = this.scene.player2;
                }
            }

            let angle = Phaser.Math.Angle.Between(
                this.x,
                this.y,
                target.x,
                target.y
            );

            let randomOffset =
                Phaser.Math.FloatBetween(-0.4, 0.4);

            angle += randomOffset;


            let angles = [
                angle - 0.15,
                angle + 0.15
            ];

            for(let currentAngle of angles){

                let velocityX = Math.cos(currentAngle) * 300;
                let velocityY = Math.sin(currentAngle) * 300;

                let bullet = new EnemyBullet(
                    this.scene,
                    this.x,
                    this.y,
                    velocityX,
                    velocityY
                );

                this.scene.enemyBullets.push(bullet);

                this.shootTimer = this.shootCooldown;
            }
        }

        // Boss update

        if (this.isBoss && this.movementType !== null) { // Only counts down from timer when not attacking
            this.bossTimer -= delta
        }

        if (this.bossTimer < 0 && this.movementType !== null) {
            let choices = ['laser', 'laserFollow', 'laserSweep']

            let index = choices.indexOf(this.previousChoice);

            if (index !== -1) {choices.splice(index, 1)} // indexOf can return -1 if it doesn't find item

            let choice = choices[Phaser.Math.Between (0, choices.length - 1)]
            

            if (choice === 'laser') {
                this.laser()
            }

            if (choice === 'laserFollow') {
                if (this.scene.player2 && Phaser.Math.Between(1, 2) === 2) {
                    this.laserFollow(this.scene.player2)
                }
                else {
                    this.laserFollow(this.scene.player1)
                }
            }

            if (choice === 'laserSweep') {
                this.laserSweep()
            }
            this.previousChoice = choice;
            this.bossTimer = 7000;
        }
    }

}