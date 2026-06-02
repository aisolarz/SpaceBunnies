class Level extends Phaser.Scene {
    constructor() {
        super("Level");

    }


    create() {
        // Create keys
        this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);





    }


    update(time, delta) {
        let dt = delta / 1000 // Convert delta from miliseconds to seconds





    }

    
}