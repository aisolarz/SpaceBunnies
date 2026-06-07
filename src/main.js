//main.js

"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.WEBGL,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    width: 1024,
    height: 768,
    scene: [Load, Title, Select, Level, End],

    scale: {
        mode: Phaser.Scale.FIT, // Makes it so screen will scale with window size
        autoCenter: Phaser.Scale.CENTER_BOTH // Keeps screen centered in window
    } 
    
}

let gameSettings = {
    numPlayers: 1,
    player1Character: null,
    player2Character: null
};

// Global variable to hold sprites
var my = {sprite: {}};

const game = new Phaser.Game(config);
