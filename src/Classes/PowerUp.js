class PowerUp extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, type) {
        super(scene, x, y, "jumper", "powerup_bunny.png");


        // Feel free to change this to dictate how long powerups last
        this.length = 7000 // Length power ups last
        this.speedChange = 200 // Change in speed when speed powerup collected
        this.shootChange = 0.1 // Change in shoot cooldown when shoot powerup collected



        this.type = type;
        this.velocity = 100
        scene.add.existing(this);
        this.setScale(0.6);

        if (this.type === 1) {this.setFrame("powerup_bunny.png")}
        if (this.type === 2) {this.setFrame("powerup_wings.png")}
        if (this.type === 3) {this.setFrame("powerup_empty.png")}


        
        scene.tweens.add({
            targets: this,
            y: 900,
            duration: 4000,
            onComplete: () => {this.destroy();}
        }); 
        
    }


    collect(player) {
        // life
        if (this.type === 1) {
            this.teamLives += 1
            this.scene.livesText.setText(
                "Lives: " + this.teamLives
            );
        }

        // wings
        if (this.type === 2) {
            player.playerSpeed += this.speedChange

            this.scene.time.delayedCall(this.length, () => {
                player.playerSpeed -= this.speedChange;
            });
        }
            
        // empty (shoot speed)
        if (this.type === 3) {
            player.shootCooldown -= this.shootChange;
            
            this.scene.time.delayedCall(this.length, () => {
                player.shootCooldown += this.shootChange;
            });
        }

        this.destroy()
        
    }



    update(time, delta) {}

        

        
            
        


    
}