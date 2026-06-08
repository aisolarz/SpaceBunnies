class EnemyBullet extends Phaser.GameObjects.Sprite {

    constructor(
        scene, 
        x, 
        y,
        velocityX,
        velocityY
        
    ) {

        super(
            scene,
            x,
            y,
            "jumper",
            "carrot.png"
        );

        scene.add.existing(this);

        this.setScale(0.3);

        //adding this the enemies will be able to track the player
        this.velocityX = velocityX;
        this.velocityY = velocityY;

        this.speed = 700;
    }

    update(time, delta) {

        let dt = delta / 1000;

        this.x += this.velocityX * dt;
        this.y += this.velocityY * dt;

        if(this.y > 800) {
            this.destroy();
        }
    }
}