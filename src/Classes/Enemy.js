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

        // this is only the animation for Wingman enemies
        if(frame === "wingMan1.png") {
            this.play("wingmanFly");
        }

        if(frame === "flyMan_fly.png") {
            this.play("flymanFly");
        }
    }

    takeDamage(amount = 1) {

        this.health -= amount;

        if(this.health <= 0) {
            
            let index =
                this.scene.enemies.indexOf(this);

            if(index !== -1){
                this.scene.enemies.splice(index, 1);
            }

            this.destroy();
        }
    }

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
        if(this.x > 950) {
            this.direction = -1;
            this.y += 40;
        }

        //left wall
        if(this.x < 75) {
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
    }
}