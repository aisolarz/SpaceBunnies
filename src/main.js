"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    width: 1024,
    height: 768,
    scene: [Load, Level],

    scale: {
        mode: Phaser.Scale.FIT, // Makes it so screen will scale with window size
        autoCenter: Phaser.Scale.CENTER_BOTH // Keeps screen centered in window
    } 
    
}

// Global variable to hold sprites
var my = {sprite: {}};

const game = new Phaser.Game(config);
