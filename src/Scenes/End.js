class End extends Phaser.Scene {
    constructor() {
        super("endScene");
    }

    init(data) {
        this.win = data.win;
        this.level = data.level;
        this.background = data.background
    }

    //I added this end scene. 
    // I added the option to either play the game again or quit and start from the title sceen - sharon
    //I will keep adding stuff to this!
        
    create(){

        this.cameras.main.setBackgroundColor(this.background);
        this.boxGroup = {};
        this.dialogueFinished = false;


        // Congrats/Lose
        this.add.text(
            512,
            80,
            this.win ? `You beat Level ${this.level}!` : "You Lost!", //sorry changing it to you lose for now to test the level
            { fontSize: "48px" }
        ).setOrigin(0.5);






        // ------------------------------ Win scene ---------------------------- 
        if (this.win === true) {

            this.alien = this.add.sprite(1100, 350, 'aliens', 'shipGreen_manned.png')

            this.tweens.add({
                targets: this.alien,
                x: 650,
                y: 300,
                duration: 2000,
                ease: 'Sine.easeOut',
                onComplete: () => {
                    this.tweens.add({
                        targets: this.alien,
                        y: "+=10",
                        duration: 1800,
                        ease: 'Sine.easeInOut',
                        yoyo: true,
                        repeat: -1
                    });
                }
            });
    
            //Make players
            if (gameSettings.numPlayers === 1) {
                    if (gameSettings.player1Character === 'purple') {
                        this.player1 = this.add.sprite(300, 300, 'player1_jetpack1').setScale(0.5)
                        this.player1.play('player1Anims');
                    }
                    if (gameSettings.player1Character === 'brown') {
                        this.player2 = this.add.sprite(300, 300, 'player2_jetpack1').setScale(0.5)
                        this.player2.play('player2Anims');
                    }

                    this.tweens.add({
                        targets: this.player1,
                        y: "+=10",
                        duration: 2500,
                        ease: 'Sine.easeInOut',
                        yoyo: true,                            
                        repeat: -1
                    });
        
                }
                else {

                    if (gameSettings.player1Character === 'purple') {
                        this.player1 = this.add.sprite(300, 250, 'player1_jetpack1').setScale(0.5)
                        this.player1.play('player1Anims');
                    }
                    if (gameSettings.player1Character === 'brown') {
                        this.player1 = this.add.sprite(300, 250, 'player2_jetpack1').setScale(0.5)
                        this.player1.play('player2Anims');
                    }
                    if (gameSettings.player2Character === 'purple') {
                        this.player2 = this.add.sprite(400, 350, 'player1_jetpack1').setScale(0.5)
                        this.player2.play('player1Anims');
                    }
                    if (gameSettings.player2Character === 'brown') {
                        this.player2 = this.add.sprite(400, 350, 'player2_jetpack1').setScale(0.5)
                        this.player2.play('player2Anims');
                    }

                    this.tweens.add({
                            targets: this.player1,
                            y: "+=10",
                            duration: 2500,
                            ease: 'Sine.easeInOut',
                            yoyo: true,
                            repeat: -1
                        });

                    this.tweens.add({
                            targets: this.player2,
                            y: "+=10",
                            duration: 2300,
                            ease: 'Sine.easeInOut',
                            yoyo: true,
                            repeat: -1
                        });
                }
            



            if (this.level === 1) {
                // Make boxes. Organized like "units" and "lessons" with the first number representing the choice tree
                this.boxGroup['box0'] = new Box(this, 'box0', 'Kenney', 'aliens', 'shipGreen_manned.png', "Testing some dialogue! Thank you for defeating those\nmonsters! What's a bunny doing in space?", "I need to save my friend", "Why do you care?", 'box1.1', 'box2.1')
                this.boxGroup['box1.1'] = new Box(this, 'box1.1', 'Kenney', 'aliens', 'shipGreen_manned.png', "I saw some monsters go deeper into space holding a\nbunny captive! That must be your friend!", "Thanks for the info! I gotta keep going", null, null, null, true)
                this.boxGroup['box2.1'] = new Box(this, 'box2.1', 'Kenney', 'aliens', 'shipGreen_manned.png', "I'm sorry! I didn't mean to intrude. I spotted some\nmonsters go deeper into space with a bunny captive.\nStay safe out there!", "Sure", null, null, null, true)

                // Hide later boxes
                this.boxGroup['box1.1'].hideBox();
                this.boxGroup['box2.1'].hideBox();
            }
            if (this.level === 2) {
                this.alien.setFrame('shipPink_manned.png');




            }

        }
        















        //------------------------------ Lose scene ----------------------------
        if (this.win === false) {

            // Put bunnies to sad sprites to be used for cutscenes
            if (gameSettings.numPlayers === 1) {
                    if (gameSettings.player1Character === 'purple') {this.player1 = this.add.sprite(512, 400, 'jumper', 'bunny2_hurt.png')}
                    if (gameSettings.player1Character === 'brown') {this.player1 = this.add.sprite(512, 400, 'jumper', 'bunny1_hurt.png')}
                }
                else {
                    if (gameSettings.player1Character === 'purple') {this.player1 = this.add.sprite(392, 400, 'jumper', 'bunny2_hurt.png')}
                    if (gameSettings.player1Character === 'brown') {this.player1 = this.add.sprite(392, 400, 'jumper', 'bunny1_hurt.png')}
                    if (gameSettings.player2Character === 'purple') {this.player2 = this.add.sprite(632, 400, 'jumper', 'bunny2_hurt.png')}
                    if (gameSettings.player2Character === 'brown') {this.player2 = this.add.sprite(632, 400, 'jumper', 'bunny1_hurt.png')}
                }

            this.cameras.main.setBackgroundColor("#0d0d26");
            let vignette = this.cameras.main.filters.internal.addVignette();
            vignette.radius = 2;

            let tweenTargets = [];
            if(this.player1) {
                tweenTargets.push(this.player1)
                this.player1.alpha = 0;
            }
            if(this.player2) {
                tweenTargets.push(this.player2)
                this.player2.alpha = 0;
            }

            // Small tween for players
            this.tweens.add({
                targets: tweenTargets,
                y: "+=20",
                duration: 1500,
                ease: 'Quad.easeOut',
                alpha: 1
            });


            this.add.text(512, 150, `You reached level ${this.level}. Don't give up!`, {fontSize: '32px'}).setOrigin(0.5);

            this.add.text(
                512,
                650,
                "Press SPACE to Play Again",
                { fontSize: "32px" }
            ).setOrigin(0.5);


            this.add.text(
                512,
                700,
                "Press Q to Quit",
                { fontSize: "32px" }
            ).setOrigin(0.5);
        


            this.input.keyboard.once('keydown-SPACE', () => {
                this.scene.start("levelScene", {
                    level: 1 // Restart level to 1
                });
            });


            this.input.keyboard.once('keydown-Q', () => {
                this.scene.start("titleScene");
            });
        }

        // Now that the above text printed the completed level, incrementing the level counter 
        this.level += 1



    


    }

    update(time, delta) {

        console.log(this.dialogueFinished)
        for (const key in this.boxGroup) {
            this.boxGroup[key].update(time, delta)
        }

        if (this.dialogueFinished) {
            this.scene.start('levelScene', {
                level: this.level
            });
        }
            
    }


}