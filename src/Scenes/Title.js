//Title.js

class Title extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }

    create() {

        // starfield!!! yay space
        this.stars = [];

        for(let i = 0; i < 80; i++){

            let star = this.add.circle(
                Phaser.Math.Between(0, 1024),
                Phaser.Math.Between(0, 768),
                Phaser.Math.Between(1, 3),
                0xffffff
            );

            star.speed = Phaser.Math.Between(50, 200);

            this.stars.push(star);
        }

        // cute moon / planet in background
        this.add.sprite(
            900,
            140,
            "jumper",
            "bubble.png"
        )
        .setScale(0.5)
        .setAlpha(0.25);

        //cute stuff
        this.ship1 = this.add.sprite(
            250,
            350,
            "aliens",
            "shipPink_manned.png"
        );

        this.ship1.setScale(0.8);

        this.ship2 = this.add.sprite(
            780,
            420,
            "aliens",
            "shipBlue_manned.png"
        );

        this.ship2.setScale(0.8);

        // player bunnies

        this.bunny1 = this.add.sprite(
            400,
            560,
            "player1_jetpack1"
        );

        this.bunny1.setScale(0.8);

        this.bunny2 = this.add.sprite(
            620,
            560,
            "player2_jetpack1"
        );

        this.bunny2.setScale(0.8);

        // jetpack animation
        this.bunny1.play("player1Anims");
        this.bunny2.play("player2Anims");

        //animated so they move up
        this.tweens.add({
            targets: this.ship1,
            y: "-=20",
            duration: 1800,
            yoyo: true,
            repeat: -1
        });

        this.tweens.add({
            targets: this.ship2,
            y: "-=15",
            duration: 2200,
            yoyo: true,
            repeat: -1
        });

        // bunny floating animation

        this.tweens.add({
            targets: this.bunny1,
            y: "-=15",
            duration: 1400,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut"
        });

        this.tweens.add({
            targets: this.bunny2,
            y: "-=15",
            duration: 1700,
            yoyo: true,
            repeat: -1,
            ease: "Sine.easeInOut"
        });

        //create clicking sound - sharon
        this.clickSFX = this.sound.add("clickingSound", {
            volume: 0.8
        });

        this.level = 1;

        

        // Using this to test the boxes -Char
        // new Box(this, 'box', 'kenny', 'aliens', 'shipGreen_manned.png', 'testafejaweoifjaoewijfoaewjifjowaeij', 'choice1', 'choice2', null, null)

        // Create text
        this.titleText = this.add.text(
            512,
            180,
            "Cottontails\nin the Cosmos",
            {
                fontSize: "72px",
                color: "#FFD6FF",
                stroke: "#000000",
                strokeThickness: 6,
                align: "center"
            }
        ).setOrigin(0.5);

        this.startText = this.add.text(
            512,
            700,
            "Press SPACE to Start",
            {
                fontSize: "32px",
                color: "#ffffff"
            }
        ).setOrigin(0.5);

        // blinking press start text
        this.tweens.add({
            targets: this.startText,
            alpha: 0.3,
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        this.input.keyboard.once('keydown-SPACE', () => {

            this.clickSFX.play();

            this.scene.start("selectScene");

        });

        // Create tweens
        this.titleTween = this.tweens.add({
            targets: this.titleText,
            y: "-=10",
            duration: 2000,
            ease: 'Sine.easeInOut',
            repeat: -1,
            yoyo: true
        });

    }

    update(time, delta){

        let dt = delta / 1000;

        for(let star of this.stars){

            star.y += star.speed * dt;

            if(star.y > 768){

                star.y = 0;
                star.x = Phaser.Math.Between(0, 1024);
            }
        }
    }
}