class Explosion extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y){

        super(
            scene,
            x,
            y,
            "explosion0"
        );

        scene.add.existing(this);

        this.setScale(0.35);

        this.play("enemyExplosion");

        this.on(
            Phaser.Animations.Events.ANIMATION_COMPLETE,
            () => {
                this.destroy();
            }
        );
    }
}