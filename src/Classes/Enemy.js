// Enemy.js

class Enemy extends Phaser.GameObjects.Sprite {

    constructor(
        scene,
        x,
        y,
        frame = "wingMan1.png",
        speed = 200,
        health = 1
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

        //movement
        this.direction = 1;

        //shooting
        this.shootCooldown = 3;
        this.shootTimer = 2;

        // this is only the animation for Wingman enemies
        if(frame === "wingMan1.png") {
            this.play("wingmanFly");
        }
    }

    takeDamage(amount = 1) {

        this.health -= amount;

        if(this.health <= 0) {
            this.scene.enemies.splice(this.scene.enemies.indexOf(this), 1) // Trying to fix "ghost object " bug by removing it from array when not needed  
            this.destroy();
        }
    }

    update(time, delta) {

        let dt = delta / 1000;

        //countdown shooting timer
        this.shootTimer -= dt;

        //move side-to-side
        this.x += this.speed * this.direction * dt;

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

        //shoot
        if(this.shootTimer <= 0) {

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