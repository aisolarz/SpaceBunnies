class ScoreBox extends Phaser.GameObjects.Sprite {
        constructor(scene, x, y, key, score = null, level = null) {
            super(scene, x, y, 'bigBox');


            /* 
            THIS IS NOT DONE YET AND IS NOT FUNCTIONALLLL
            I'm going to edit this a bit later to fix some stuff -Char
            
            This makes two types of score boxes 

            Inputs: 
            scene should always be: this
            x: x-coordinate
            y: y-coordinate
            key: either 'win' or 'loss'
            score: total score
            level: current level

            Methods: 
            destroyBox() used to destroy box and all its text
            hideBox() used to hide the box and all its text
            showBox() used to show the box and all its text 
            */
    
            // this.spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
            this.setScale(1.5)
            this.key = key;
            this.x = x;
            this.y = y;
            this.score = score;
            this.level = level;


            scene.add.existing(this); 


            if (this.key == 'win') { 
                this.scoreBoxWin();
            }
            if (this.key == 'lose') {
                this.scoreBoxFail();
            }
        }


         scoreBoxWin() {  
            this.text1 = this.scene.add.text(this.x, this.y - 100, `You win!`, {
                fontSize: '32px',
                fill: '#534200'
            });      
            this.text2 = this.scene.add.text(this.x, this.y - 30, `Time bonus + {time bonus}`, {
                fontSize: '24px',
                fill: '#534200'
            });      
            this.text3 = this.scene.add.text(this.x, this.y + 10, `Heart bonus: + {amount of hearts}`, {
                fontSize: '24px',
                fill: '#534200'
            });
            this.text4 = this.scene.add.text(this.x, this.y + 50, `Total score:`, {
                fontSize: '24px',
                fill: '#534200'
            });
            this.text5 = this.scene.add.text(this.x, this.y + 135, "Press SPACE to continue", {
                fontSize: '24px',
                fill: '#9b8014'
            });
            this.text1.setOrigin(0.5); // By default, text has origin at (0, 0) so we have to change that
            this.text2.setOrigin(0.5);
            this.text3.setOrigin(0.5);
            this.text4.setOrigin(0.5);
            this.text5.setOrigin(0.5);

        }  


        scoreBoxFail() {  
            this.text1 = this.scene.add.text(this.x, this.y - 100, `You can do it!`, {
                fontSize: '32px',
                fill: '#534200'
            });      

            this.text2 = this.scene.add.text(this.x, this.y - 30, `You found Time bonus + {time bonus}`, {
                fontSize: '24px',
                fill: '#534200'
            });      
            this.text3 = this.scene.add.text(this.x, this.y + 10, `Heart bonus: + {amount of hearts}`, {
                fontSize: '24px',
                fill: '#534200'
            });
            this.text4 = this.scene.add.text(this.x, this.y + 50, `Total score:`, {
                fontSize: '24px',
                fill: '#534200'
            });
            this.text5 = this.scene.add.text(this.x, this.y + 135, "Press SPACE to continue", {
                fontSize: '24px',
                fill: '#9b8014'
            });
            this.text1.setOrigin(0.5); // By default, text has origin at (0, 0) so we have to change that
            this.text2.setOrigin(0.5);
            this.text3.setOrigin(0.5);
            this.text4.setOrigin(0.5);
            this.text5.setOrigin(0.5);




        }  



        destroyBox() { // Used to destroy the box and all its text
            if (this.text1) {
                this.text1.destroy()
            }
            if (this.text2) {
                this.text2.destroy()
            }
            if (this.text3) {
                this.text3.destroy()
            }
            if (this.text4) {
                this.text4.destroy()
            }
            if (this.text5) {
                this.text5.destroy()
            }
            this.destroy();
        }

        hideBox() { // Used to make the box and all its text invisible 
            this.visible = false;
            if (this.text1) {this.text1.visible = false;}
            if (this.text2) {this.text2.visible = false;}
            if (this.text3) {this.text3.visible = false;}
            if (this.text4) {this.text4.visible = false;}
            if (this.text5) {this.text5.visible = false;}
        }

        showBox() { // Used to make the box and all its text visible 
            this.visible = true;
            if (this.text1) {this.text1.visible = true;}
            if (this.text2) {this.text2.visible = true;}
            if (this.text3) {this.text3.visible = true;}
            if (this.text4) {this.text4.visible = true;}
            if (this.text5) {this.text5.visible = true;}
        }



        update(time, delta) {
            let dt = delta / 1000 // Convert delta from miliseconds to seconds

            /* if (this && Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
            this.destroyBox()
            }
            */



        }
        
    }

