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


        //Sound when level complete
        this.levelmusicSFX = this.sound.add("levelSound", {
            volume: 0.1,
            loop: -1
        });

        //create clicking sound - sharon
        this.clickSFX = this.sound.add("clickingSound", {
            volume: 0.8
        });

        


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
            



                // Alien names to be used: Sharie, Amieelia
            if (this.level === 1) {

                

                // Make boxes
                this.boxGroup['box0'] = new Box(this, 'box0', 'Kenney', 'aliens', 'shipGreen_manned.png', "Thank you for defeating those monsters! What's a bunny doing in space?", "I need to save my friend", "None of your business", 'box1.1', 'box1.2')
                this.boxGroup['box1.1'] = new Box(this, 'box1.1', 'Kenney', 'aliens', 'shipGreen_manned.png', "I spotted more monsters fly deeper into space holding a bunny captive! That must be your friend!", "Thanks for the info! I gotta keep going", null, null, null, true)
                this.boxGroup['box1.2'] = new Box(this, 'box1.2', 'Kenney', 'aliens', 'shipGreen_manned.png', "I'm sorry! I didn't mean to intrude. I spotted more monsters fly deeper into space holding a bunny captive. Stay safe out there!", "Sure", null, null, null, true)

                // Hide later boxes
                this.boxGroup['box1.1'].hideBox();
                this.boxGroup['box1.2'].hideBox();


                this.levelmusicSFX.play();
                

            }
            if (this.level === 2) {

                this.levelmusicSFX.play();

                this.alien.setFrame('shipPink_manned.png');

                // Make boxes                                                                            
                this.boxGroup['box0'] = new Box(this, 'box0', 'Charlie', 'aliens', 'shipPink_manned.png', "EEK! Another monster! ... You seem awfully fluffy for a monster...", "I'm a bunny", "BOO!", 'box1.1', 'box1.2', false,'0xC6E0F0')
                this.boxGroup['box1.1'] = new Box(this, 'box1.1', 'Charlie', 'aliens', 'shipPink_manned.png', "I'm not sure what a bunny is... but you seem friendly. Please turn back while you can. With all these\nmonsters, it's not safe. The monsters get MEANER as you go deeper! Something even scarier is out there in the depths...", "What's out there?", "You're overreacting", 'box2.1', 'box2.2', false, '0xC6E0F0');
                this.boxGroup['box2.2'] = new Box(this, 'box2.2', 'Charlie', 'aliens', 'shipPink_manned.png', "I'M NOT! You... aren't scared? Well...please be careful.", null, null, null, null, true, false, '0xC6E0F0')
                this.boxGroup['box2.1'] = new Box(this, 'box2.1', 'Charlie', 'aliens', 'shipPink_manned.png', "There's a SCARY evil alien who lives deep in space! I'm way too scared to fly any deeper, so I can't make it home now! It would be great if you could help...", "I won't let you down", null, null, null, true, '0xC6E0F0')
                this.boxGroup['box1.2'] = new Box(this, 'box1.2', 'Charlie', 'aliens', 'shipPink_manned.png', "EEK!! HELP! You must be working for that EVIL alien! STAY AWAY!", "If you say so", null, null, null, true, '0xC6E0F0')
                // Hide later boxes
                this.boxGroup['box1.1'].hideBox();
                this.boxGroup['box1.2'].hideBox();
                this.boxGroup['box2.1'].hideBox();
                this.boxGroup['box2.2'].hideBox();
            }

            if (this.level === 3) {

                this.levelmusicSFX.play();

                this.alien.setFrame('shipBlue_manned.png')

                this.boxGroup['box0'] = new Box(this, 'box0', 'Amieelia', 'aliens', 'shipBlue_manned.png', "It's not worth going any further. The whole area is being taken over by a power-hungry alien. I gave up fighting a long time ago. You'll give up soon too.", "I'm going to do my best anyway!", "You're irritating me", "box1", "box2", false, '0xF0ECC6')
                this.boxGroup['box1'] = new Box(this, 'box1', 'Aimeelia', 'aliens', 'shipBlue_manned.png', "You'll certainly need a miracle to make a difference here. I'm doubtful, but I wish you luck anyway.", "I know I can do it", null, null, null, true, '0xF0ECC6')
                this.boxGroup['box2'] = new Box(this, 'box2', 'Aimeelia', 'aliens', 'shipBlue_manned.png', "Then leave! If that evil alien doesn't take you down, I might as well do it myself.", "Don't stand in my way", null, null, null, true, '0xF0ECC6')

                this.boxGroup['box1'].hideBox();
                this.boxGroup['box2'].hideBox();




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

            this.cameras.main.setBackgroundColor("#201d45");
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
                //add clicking sound
                this.clickSFX.play();
                this.scene.start("levelScene", {
                    level: 1 // Restart level to 1
                });
            });


            this.input.keyboard.once('keydown-Q', () => {
                //add clicking sound
                this.clickSFX.play();
                this.scene.start("titleScene");
            });
        }

        // Now that the above text printed the completed level, incrementing the level counter 
        this.level += 1

    }

    


    

    update(time, delta) {

        for (const key in this.boxGroup) {
            this.boxGroup[key].update(time, delta)
        }

        if (this.dialogueFinished) {
            this.scene.start('levelScene', {
                level: this.level
            });
            this.levelmusicSFX.stop();
        }
            
    }


}