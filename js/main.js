/**
 * Created by jonas on 12/14/2014.
 */


var GameState = function(game) {
};

GameState.prototype.preload = function() {
	this.game.load.atlasXML('tanks', './assets/gfx/sheet_tanks.png', './assets/gfx/sheet_tanks.xml');
};

var tank;

GameState.prototype.create = function() {
	// Set stage background color
	this.game.stage.backgroundColor = 0x4488cc;

	tank = new Tank(100, 100, 'Blue', this.game);

	var enemy = new Tank(300, 100, 'Red', this.game);


	//  Our bullet group
	this.game.bullets = game.add.group();
	this.game.bullets.enableBody = true;
	this.game.bullets.physicsBodyType = Phaser.Physics.ARCADE;
	this.game.bullets.createMultiple(30, 'tanks', 'bulletBlue_outline.png', false);
	this.game.bullets.setAll('anchor.x', 0.5);
	this.game.bullets.setAll('anchor.y', 0.5);
	this.game.bullets.setAll('outOfBoundsKill', true);
	this.game.bullets.setAll('checkWorldBounds', true);

};

GameState.prototype.update = function() {

	if (this.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
		tank.speed = 2;
	}
	else if (this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
		tank.speed = -1;
	}
	else {
		tank.speed = 0;
	}
	if (this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
		tank.turn(3);
	}
	else if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
		tank.turn(-3);
	}

	if (game.input.activePointer.isDown) {
		tank.shoot();
	}

	tank.update();

};

// Setup game
var game = new Phaser.Game(848, 450, Phaser.AUTO, 'game');
game.state.add('game', GameState, true);