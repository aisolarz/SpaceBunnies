class Title extends Phaser.Scene {
    constructor() {
        super("titleScene");
    }

    create() {

        this.add.text(
            512,
            150,
            "Cottontails in the Cosmos",
            { fontSize: "48px" }
        ).setOrigin(0.5);

        this.add.text(
            512,
            300,
            "Press SPACE to Start",
            { fontSize: "32px" }
        ).setOrigin(0.5);

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start("selectScene");
        });
    }
}