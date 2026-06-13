class Win extends Phaser.Scene {
    constructor() {
        super("winScene");
    }

    create() {

        this.cameras.main.setBackgroundColor(0xAEE0FF);

        

        // Make floor
        this.floor = this.add.sprite(520, 679, 'jumper', 'ground_grass.png');
        this.floor.setDepth(-9);
        this.floor.setScale(4, 1)
        this.add.rectangle(512, 750, 1024, 100, 0xCA8A47).setDepth(-10);

        this.floorY = 590 // Used in tween


        // Sound 
        this.clickSFX = this.sound.add("clickingSound", {
            volume: 0.8
        });

        this.winMusic = this.sound.add("winMusic", {
            loop: true,
            volume: 0.45
        });

        this.winMusic.play()





            //Make players
        if (gameSettings.numPlayers === 1) {
                if (gameSettings.player1Character === 'purple') {
                    this.player1 = this.add.sprite(512, -100, 'player1_jetpack1').setScale(0.5)
                    this.player1.play('player1Anims');
                }
                if (gameSettings.player1Character === 'brown') {
                    this.player1 = this.add.sprite(512, -100, 'player2_jetpack1').setScale(0.5)
                    this.player1.play('player2Anims');
                }

                this.tweens.add({
                    targets: this.player1,
                    y: this.floorY,
                    duration: 3500,
                    ease: 'Cubic.easeOut',
                    onComplete: () => {
                        if (gameSettings.player1Character === 'purple') {this.player1.play('player1Idle')}
                        if (gameSettings.player1Character === 'brown') {this.player1.play('player2Idle')}
                    }
                });

                

        
            }
            else {

                if (gameSettings.player1Character === 'purple') {
                    this.player1 = this.add.sprite(412, -100, 'player1_jetpack1').setScale(0.5)
                    this.player1.play('player1Anims');
                }
                if (gameSettings.player1Character === 'brown') {
                    this.player1 = this.add.sprite(412, -100, 'player2_jetpack1').setScale(0.5)
                    this.player1.play('player2Anims');
                }
                if (gameSettings.player2Character === 'purple') {
                    this.player2 = this.add.sprite(612, -100, 'player1_jetpack1').setScale(0.5)
                    this.player2.play('player1Anims');
                }
                if (gameSettings.player2Character === 'brown') {
                    this.player2 = this.add.sprite(612, -100, 'player2_jetpack1').setScale(0.5)
                    this.player2.play('player2Anims');
                }

                this.tweens.add({
                    targets: this.player1,
                    y: this.floorY,
                    duration: 3500,
                    ease: 'Cubic.easeOut',
                    onComplete: () => {
                        if (gameSettings.player1Character === 'purple') {this.player1.play('player1Idle')}
                        if (gameSettings.player1Character === 'brown') {this.player1.play('player2Idle')}       
                    }
                });


                this.tweens.add({
                    targets: this.player2,
                    y: this.floorY,
                    duration: 3700,
                    ease: 'Cubic.easeOut',
                    onComplete: () => {
                        if (gameSettings.player2Character === 'purple') {this.player2.play('player1Idle')}
                        if (gameSettings.player2Character === 'brown') {this.player2.play('player2Idle')}       
                    }
                });
        }

        // Add aliens in
        this.alien1 = this.add.sprite(200, -200, 'aliens', 'shipGreen_manned.png')
        this.alien2 = this.add.sprite(420, -400, 'aliens', 'shipPink_manned.png')
        this.alien3 = this.add.sprite(800, -270, 'aliens', 'shipYellow_manned.png')

            this.tweens.add({
                targets: this.alien1,
                y: "+=600",
                duration: 2000,
                ease: 'Sine.easeOut',
                onComplete: () => {
                    this.tweens.add({
                        targets: this.alien1,
                        y: "+=10",
                        duration: 1800,
                        ease: 'Sine.easeInOut',
                        yoyo: true,
                        repeat: -1
                    });
                }
            });

            this.tweens.add({
                targets: this.alien2,
                y: "+=600",
                duration: 2100,
                ease: 'Sine.easeOut',
                onComplete: () => {
                    this.tweens.add({
                        targets: this.alien2,
                        y: "+=10",
                        duration: 1800,
                        ease: 'Sine.easeInOut',
                        yoyo: true,
                        repeat: -1
                    });
                }
            });

            this.tweens.add({
                targets: this.alien3,
                y: "+=600",
                duration: 1900,
                ease: 'Sine.easeOut',
                onComplete: () => {
                    this.tweens.add({
                        targets: this.alien3,
                        y: "+=10",
                        duration: 1800,
                        ease: 'Sine.easeInOut',
                        yoyo: true,
                        repeat: -1
                    });
                }
            });



        this.add.text(
            512,
            80,
            `You win!`, 
            { fontSize: "48px" }
        ).setOrigin(0.5);

        this.add.text(
                512,
                740,
                "Press Q to Quit",
                { fontSize: "24px",
                color: '#ecc499',
                },
            ).setOrigin(0.5);


        this.input.keyboard.once('keydown-Q', () => {
            //add clicking sound
            this.clickSFX.play();
            this.winMusic.stop();
            this.scene.start("titleScene");
        });





    }



    update() {





    }

    

}