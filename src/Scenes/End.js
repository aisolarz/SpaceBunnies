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

        // starfield background
        this.stars = [];

        for(let i = 0; i < 80; i++){

            let star = this.add.circle(
                Phaser.Math.Between(0, 1024),
                Phaser.Math.Between(0, 768),
                Phaser.Math.Between(1, 3),
                0xffffff
            );

            star.speed = Phaser.Math.Between(40, 120);

            star.setDepth(-100);

            this.stars.push(star);
        }


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
            



            if (this.level === 1) {

                

                // Make boxes
                this.boxGroup['box0'] = new Box(this, 'box0', 'Kenney', 'aliens', 'shipGreen_manned.png', "Thank you for defeating those monsters! What's a bunny doing in space?", "I'm here to save you!", "None of your business", 'box1.1', 'box1.2')
                this.boxGroup['box1.1'] = new Box(this, 'box1.1', 'Kenney', 'aliens', 'shipGreen_manned.png', "Thank you for helping us! But please stay safe! The monsters get more powerful as you go deeper into space. I hear a powerful boss monster waits even further beyond.", "I'll be careful", null, null, null, true)
                this.boxGroup['box1.2'] = new Box(this, 'box1.2', 'Kenney', 'aliens', 'shipGreen_manned.png', "I'm sorry! I didn't mean to intrude.", "Sure", null, null, null, true)

                // Hide later boxes
                this.boxGroup['box1.1'].hideBox();
                this.boxGroup['box1.2'].hideBox();


                this.levelmusicSFX.play();
                

            }
            if (this.level === 2) {

                this.levelmusicSFX.play();

                this.alien.setFrame('shipPink_manned.png');

                // Make boxes                                                                            
                this.boxGroup['box0'] = new Box(this, 'box0', 'Sharie', 'aliens', 'shipPink_manned.png', "EEK! Another monster! ... You seem awfully fluffy for a monster...", "I'm a bunny", "BOO!", 'box1.1', 'box1.2', false,'0xC6E0F0')
                this.boxGroup['box1.1'] = new Box(this, 'box1.1', 'Sharie', 'aliens', 'shipPink_manned.png', "I'm not sure what a bunny is... but you seem friendly. Please turn back while you can!", "Why turn back now?", "Leave me alone", 'box2.1', 'box2.2', false, '0xC6E0F0');
                this.boxGroup['box2.2'] = new Box(this, 'box2.2', 'Sharie', 'aliens', 'shipPink_manned.png', "Well...please be careful.", null, null, null, null, true, false, '0xC6E0F0')
                this.boxGroup['box2.1'] = new Box(this, 'box2.1', 'Sharie', 'aliens', 'shipPink_manned.png', "The monsters' evil boss is just beyond this point! He's covered in spikes and shoots lasers! I'm way too scared to fly any deeper...", "Any tips on beating him?", "Stop talking already!", 'box3', 'box4', false, '0xC6E0F0')
                this.boxGroup['box1.2'] = new Box(this, 'box1.2', 'Sharie', 'aliens', 'shipPink_manned.png', "EEK!! HELP! You must be working for that EVIL alien! STAY AWAY!", "If you say so", null, null, null, true, '0xC6E0F0')
                this.boxGroup['box3'] = new Box(this, 'box3', 'Sharie', 'aliens', 'shipPink_manned.png', "Pay attention to what color the boss monster glows when he's about to attack! Maybe it'll give you clues on how he will attack!", "Thanks!", null, null, null, true, '0xC6E0F0')
                this.boxGroup['box4'] = new Box(this, 'box4', 'Sharie', 'aliens', 'shipPink_manned.png', "I only wanted to help...", "Whatever", null, null, null, true, '0xC6E0F0')


                // Hide later boxes
                this.boxGroup['box1.1'].hideBox();
                this.boxGroup['box1.2'].hideBox();
                this.boxGroup['box2.1'].hideBox();
                this.boxGroup['box2.2'].hideBox();
                this.boxGroup['box3'].hideBox();
                this.boxGroup['box4'].hideBox();


            }

            if (this.level === 3) {

                this.levelmusicSFX.play();

                this.alien.setFrame('shipYellow_manned.png')

                this.boxGroup['box0'] = new Box(this, 'box0', 'Amieelia', 'aliens', 'shipYellow_manned.png', "Did you seriously take down that scary boss monster all by yourself?", "Yup!", "Ugh, more annoying aliens", "box1", "box2", false, '0xD2C6F0')
                this.boxGroup['box1'] = new Box(this, 'box1', 'Aimeelia', 'aliens', 'shipYellow_manned.png', "I'm pretty impressed. I've been trying to defeat that guy and save my alien friends for a while now. I appreciate the help.", "No worries! I've got to go home now", null, 'box3', null, false, '0xD2C6F0')
                this.boxGroup['box3'] = new Box(this, 'box3', 'Aimeelia', 'aliens', 'shipYellow_manned.png', "You aren't from space? Where do fluffy creatures like you live?", "Follow me! I'll show the aliens a glimpse of Earth!", null, null, null, true, '0xD2C6F0')
                this.boxGroup['box2'] = new Box(this, 'box2', 'Aimeelia', 'aliens', 'shipYellow_manned.png', "Even if you've got a rotten attitude, I should thank you for helping take down that boss monster. I've been trying to defeat him and save my alien friends for a while. Are you from around here?", 'No way!', null, 'box4', null, false, '0xD2C6F0')
                this.boxGroup['box4'] = new Box(this, 'box4', 'Aimeelia', 'aliens', 'shipYellow_manned.png', "Maybe that explains your power. Where are fluffy creatures like you from?", "Follow me. I'll show the aliens a glimpse of Earth", null, null, null, true, '0xD2C6F0')



                this.boxGroup['box1'].hideBox();
                this.boxGroup['box2'].hideBox();
                this.boxGroup['box4'].hideBox();
                this.boxGroup['box3'].hideBox();






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

        let dt = delta / 1000;

        // move stars
        for(let star of this.stars){

            star.y += star.speed * dt;

            if(star.y > 768){

                star.y = 0;
                star.x = Phaser.Math.Between(0, 1024);
            }
        }

        for (const key in this.boxGroup) {
            this.boxGroup[key].update(time, delta)
        }

        if (this.dialogueFinished) {
            if (this.level === 4) {
                this.scene.start('winScene')
            }
            else {
                this.scene.start('levelScene', {
                    level: this.level
                });
            }
            this.levelmusicSFX.stop();
        }
            
    }


}