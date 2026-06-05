class Bullet extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y) {

        super(
            scene,
            x,
            y,
            "jumper",
            "carrot.png"
        );

        scene.add.existing(this);

        this.setScale(0.3);

        this.speed = 700;
    }

    update(time, delta) {

        let dt = delta / 1000;

        this.y -= this.speed * dt;

        if(this.y < -50) {
            this.destroy();
        }
    }
}