class Box extends Phaser.GameObjects.Sprite {
        constructor(scene, x, y, key, line1,  line2 = null, line3 = null, line4 = null, score = null, level = null) {
            super(scene, x, y);


            /*
            THIS DOESN'T WORK RIGHT YETTTTT I will fix it later -Char
            */


           
            this.key = key;
            this.texture = texture;
            this.x = x;
            this.y = y;
            this.line1 = line1;
            this.line2 = line2;
            this.line3 = line3;
            this.score = score;
            this.level = level;
            this.line4 = line4

            scene.add.existing(this); 


            if (this.key == 1) { // Only has one line. Small box
                this.setScale(0.4);
                this.createBox();
            }
            if (this.key == 2) { // Has three lines. Big box
                this.setScale(0.3);
                this.bigBox();

            }
            if (this.key == 3) {  // Score box win
                this.setScale(1.5);
                this.scoreBoxWin();
            } 
            if (this.key == 4) {  // Score box fail
                this.setScale(1.5);
                this.scoreBoxFail();
            } 
        }


        createBox() {        
            this.text1 = this.scene.add.text(this.x, this.y, this.line1, {
                fontSize: '15px',
                fill: '#534200'
            });
            this.text1.setOrigin(0.5); // By default, text has origin at (0, 0) so we have to change that


        }
       


        bigBox() {  
            this.text1 = this.scene.add.text(this.x, this.y - 20, this.line1, {
                fontSize: '12px',
                fill: '#534200'
            });      

            this.text2 = this.scene.add.text(this.x, this.y, this.line2, {
                fontSize: '12px',
                fill: '#534200'
            });    
            this.text3 = this.scene.add.text(this.x, this.y + 20, this.line3, {
                fontSize: '12px',
                fill: '#534200'
            });  
            this.text1.setOrigin(0.5); // By default, text has origin at (0, 0) so we have to change that
            this.text2.setOrigin(0.5);     
            this.text3.setOrigin(0.5);           
      


        }  


      
           



        destroyBox() {
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

        hideBox() {
            this.visible = false;
            if (this.text1) {this.text1.visible = false;}
            if (this.text2) {this.text2.visible = false;}
            if (this.text3) {this.text3.visible = false;}
            if (this.text4) {this.text4.visible = false;}
            if (this.text5) {this.text5.visible = false;}
        }

        showBox() {
            this.visible = true;
            if (this.text1) {this.text1.visible = true;}
            if (this.text2) {this.text2.visible = true;}
            if (this.text3) {this.text3.visible = true;}
            if (this.text4) {this.text4.visible = true;}
            if (this.text5) {this.text5.visible = true;}
        }



        update() {}
        
    }

