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



        this.powerUpSound = this.scene.sound.add("powerUpSound", {
            volume: 0.8
        });


        this.vfxCollect = scene.add.particles(200, 400, "particles", {
            frame: 'star_07.png', // exact frame from the atlas
            speed: {min: 300, max: 350}, 
            lifespan: 300,
            scale: {start: 0.1, end: 0},
            alpha: {start: 1, end: 0.1},
            blendMode: 'ADD', 
            quantity: 8,
            duration: 3,
            emitting: false
        });
        
    }


    collect(player) {

        player.setTint(0x302818).setTintMode(Phaser.TintModes.ADD);
        this.scene.time.delayedCall(100, () => {
            if(player.active){
                player.clearTint();
            }
        });

        this.powerUpSound.play();
        this.vfxCollect.setPosition(player.x, player.y)
        this.vfxCollect.explode();



        player.enableFilters();
        let glow = player.filters.internal.addGlow(0xF0E4C6, 1.8, 0, 1, false, 50, 50) // args: color, outer strength, inner strength, scale, knockout, quality, distance
        glow.setPaddingOverride(null);

        // life
        if (this.type === 1) {
            this.scene.teamLives += 1
            this.scene.livesText.setText(
                "Lives: " + this.scene.teamLives
            );
            player.filters.internal.remove(glow)
        }

        // wings
        if (this.type === 2) {
            player.playerSpeed += this.speedChange

            this.scene.time.delayedCall(this.length, () => {
                player.playerSpeed -= this.speedChange;
                player.filters.internal.remove(glow)

            });
        }
            
        // empty (shoot speed)
        if (this.type === 3) {
            player.shootCooldown -= this.shootChange;
            
            this.scene.time.delayedCall(this.length, () => {
                player.shootCooldown += this.shootChange;
                player.filters.internal.remove(glow)
            });
        }

        this.destroy()
        
    }



    update(time, delta) {}

        

        
            
        


    
}