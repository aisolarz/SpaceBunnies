//Box.js

class Box extends Phaser.GameObjects.Sprite {
        constructor(scene, id, name, textureKey, frameKey, text, choice1 = null, choice2 = null, next1 = null, next2 = null, isFinal = false, color = '0xF0C6D8') {
            super(scene, 512, 620, 'box');

            /*
            Inputs:
            scene: this
            ID: the name of this box to make it easy to refer to later
            x, y: coordinates
            texture: spritesheet name
            frame: specific image on sheet
            name: speaking character name as string
            text: put as string. Every 50 chars, the text will break into a newline. If newline occurs in middle of word, manually include the /n instead in your string
            choice1: choice text as string
            choice2: second choice text as string
            next1: the variable name for the box you want to show next. Put null if N/A
            next2: variable name for the box you want to show next upon second choice. Put null if N/A
            color: background color of box as hex code string. Default is grayish-blue, can be left empty

            A box can have either two, one, or no choices
            Boxes with choices should be used in object to be chained together
            */

        // TODO for Char, fix issue where second choice box takes two spacebar clicks to clear instead of one
        // Fix spacing on lines reaching end of box -Char
        // Fix bug with box 2.2 on level 2 not switching to next level when dialogue done

           
            this.next1 = next1;
            this.next2 = next2;
            this.x = 512;
            this.y = 620;
            this.originalText = text;
            scene.add.existing(this); 

            

            this.name = name;
            this.choice1 = choice1;
            this.choice2 = choice2;
            this.color = color;
            this.decision = 1; // Used to keep track of what choice the player makes
            this.id = id;
            this.textureKey = textureKey;
            this.frameKey = frameKey;
            this.isFinal = isFinal;

            this.text = this.originalText
            /*
            this.text = ""
            for (let i = 0; i < this.originalText.length; i++) {
                this.text += this.originalText[i]
                if ((i + 1) % 55 === 0) { // Have to add 1 otherwise the first character in string will cause newline since 0 % 50 is 0
                    this.text += '\n'
                } 
            }
            */

            this.clickSFX = this.scene.sound.add("clickingSound", {
                volume: 0.8
            });



            this.nameText = this.scene.add.text(this.x - 220, this.y - 80, this.name + ':', {
                fontSize: '28px', 
                fill: '#FFFFFFFF',
            });

            this.bodyText = this.scene.add.text(this.x - 220, this.y - 40, this.text, {
                fontSize: '20px',
                fill: '#FFFFFF',
                wordWrap: {
                    width: 670, 
                    useAdvancedWrap: true
                }
            });     

            this.choice1Text = this.scene.add.text(this.x - 220, this.y + 65, this.choice1, {
                fontSize: '20px',
                fill: '#ffee8e'
            });

            this.choice2Text = this.scene.add.text(this.x - 220, this.y + 85, this.choice2, {
                fontSize: '20px',
                fill: '#dddddd'
            });




            
            // Character sprite in box
            this.char = scene.add.sprite(173, 635, this.textureKey, this.frameKey).setDepth(-1).setScale(1.4);

            this.background = scene.add.rectangle(this.x - 340, this.y, 200, 200, this.color).setDepth(-2);

            this.spaceKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
            this.wKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
            this.sKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
            this.upKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
            this.downKey = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);




            
            this.entranceTween = this.scene.tweens.add({
                targets: [this, this.nameText, this.bodyText, this.choice1Text, this.choice2Text, this.char, this.background],
                y: "+=5", 
                duration: 100,
                ease: 'Sine.easeOut',
                paused: true,
                yoyo: true
            })
         

        }
      
        destroyBox() {
            if (this.scene.boxGroup[this.id]) {delete this.scene.boxGroup[this.id]} // Remove from object if in one
            if (this.bodyText) {this.bodyText.destroy()}
            if (this.nameText) {this.nameText.destroy()}
            if (this.choice1Text) {this.choice1Text.destroy()}
            if (this.choice2Text) {this.choice2Text.destroy()}
            if (this.char) {this.char.destroy()}
            if (this.background ) {this.background.destroy()}

            this.destroy();
        }

        nextBox() {
            if (this.isFinal) {
                this.scene.dialogueFinished = true;
            }
            if (this.next1 === null && this.next2 === null) { // Destroy box if there is argument for next box
                this.destroyBox();
            }
            else if (this.visible === true && this.decision === 1) {
                this.scene.boxGroup[this.next1].showBox()
                this.destroyBox()
            }
            else if (this.visible && this.decision === 2) {
                this.scene.boxGroup[this.next2].showBox()
                this.destroyBox()

            }
        }

    

        hideBox() {
            this.visible = false;
            if (this.bodyText) {this.bodyText.visible = false;}
            if (this.nameText) {this.nameText.visible = false;}
            if (this.choice1Text) {this.choice1Text.visible = false;}
            if (this.choice2Text) {this.choice2Text.visible = false;}
            if (this.char) {this.char.visible = false}
            if (this.background ) {this.background.visible = false}
        }

        showBox() {
            this.visible = true;
            if (this.bodyText) {this.bodyText.visible = true;}
            if (this.nameText) {this.nameText.visible = true;}
            if (this.choice1Text) {this.choice1Text.visible = true;}
            if (this.choice2Text) {this.choice2Text.visible = true;}
            if (this.char) {this.char.visible = true}
            if (this.background ) {this.background.visible = true}
            this.entranceTween.play();
        }



        update(time, delta) {


            if (!this.visible) {return}

            if (this.choice1 !== null) {
                if (this.choice2 !== null) {
                    if (Phaser.Input.Keyboard.JustDown(this.wKey) || Phaser.Input.Keyboard.JustDown(this.upKey)) {
                        this.choice1Text.setFill('#ffee8e');
                        this.choice2Text.setFill('#dddddd');
                        this.decision = 1
                    }
                    if (Phaser.Input.Keyboard.JustDown(this.sKey) || Phaser.Input.Keyboard.JustDown(this.downKey)) {
                        this.choice2Text.setFill('#ffee8e');
                        this.choice1Text.setFill('#dddddd');
                        this.decision = 2
                    }
                }
                if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
                    this.clickSFX.play();
                    this.nextBox();    
                }  
            }
           
            
            else if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
                this.destroyBox()
               
            }


        }
    }

