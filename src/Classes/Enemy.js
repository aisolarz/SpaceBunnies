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
        this.shootCooldown = 2;
        this.shootTimer = 2;

        // this is only the animation for Wingman enemies
        if(frame === "wingMan1.png") {
            this.play("wingmanFly");
        }
    }

    takeDamage(amount = 1) {

        this.health -= amount;

        if(this.health <= 0) {
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

            let bullet = new EnemyBullet(
                this.scene,
                this.x,
                this.y + 20
            );

            this.scene.enemyBullets.push(bullet);

            this.shootTimer = this.shootCooldown;
        }
    }
}