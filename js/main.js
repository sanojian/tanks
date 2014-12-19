/**
 * Created by jonas on 12/14/2014.
 */


var GameState = function(game) {
};

GameState.prototype.preload = function() {
	this.game.load.atlasXML('tanks', './assets/gfx/sheet_tanks.png', './assets/gfx/sheet_tanks.xml');
};

var g_game = {};

GameState.prototype.create = function() {
	// Set stage background color
	this.game.stage.backgroundColor = 0x4488cc;

	//this.game.physics.startSystem(Phaser.Physics.ARCADE);

	for (var y=0; y<20; y++) {
		for (var x=0; x<30; x++) {
			game.add.tileSprite(y*128, x*128, 128, 128, 'tanks', 'dirt.png');
		}
	}

	g_game.myTank = new Tank(100, 100, 'Blue', this.game);

	g_game.enemies = this.game.add.group();
	var enemy = new Tank(300, 100, 'Red', this.game, g_game.enemies);


	//  Our bullet group
	g_game.bullets = game.add.group();
	g_game.bullets.enableBody = true;
	g_game.bullets.physicsBodyType = Phaser.Physics.ARCADE;
	g_game.bullets.createMultiple(30, 'tanks', 'bulletBlue_outline.png', false);
	g_game.bullets.setAll('anchor.x', 0.5);
	g_game.bullets.setAll('anchor.y', 0.5);
	g_game.bullets.setAll('outOfBoundsKill', true);
	g_game.bullets.setAll('checkWorldBounds', true);


	g_game.trees = game.add.group();
	g_game.trees.create(360 + Math.random() * 200, 120 + Math.random() * 200, 'tanks', 'treeLarge.png');
	this.game.physics.enable(g_game.trees, Phaser.Physics.ARCADE);

	//this.game.camera.follow(g_game.myTank.getSprite());

};

function ramHandler(tank, obstacle) {
	//g_game.myTank.speed = 0;
	console.log(arguments);
}

function collisionHandler(bullet, enemy) {
	bullet.kill();
}

GameState.prototype.update = function() {

	if (this.game.input.keyboard.isDown(Phaser.Keyboard.W)) {
		g_game.myTank.speed = 2;
	}
	else if (this.game.input.keyboard.isDown(Phaser.Keyboard.S)) {
		g_game.myTank.speed = -1;
	}
	else {
		g_game.myTank.speed = 0;
	}
	if (this.game.input.keyboard.isDown(Phaser.Keyboard.D)) {
		g_game.myTank.turn(3);
	}
	else if (this.game.input.keyboard.isDown(Phaser.Keyboard.A)) {
		g_game.myTank.turn(-3);
	}

	if (game.input.activePointer.isDown) {
		g_game.myTank.shoot();
	}

	this.game.physics.arcade.overlap(g_game.bullets, g_game.enemies, collisionHandler, null, this);
	this.game.physics.arcade.overlap(g_game.myTank.getSprite(), g_game.enemies, ramHandler, null, this);
	this.game.physics.arcade.overlap(g_game.myTank.getSprite(), g_game.trees, ramHandler, null, this);
	this.game.physics.arcade.overlap(g_game.trees, g_game.bullets, function(tree, bullet) { bullet.kill(); }, null, this);

	g_game.myTank.update();

};



// Setup game
var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.AUTO, 'game');
game.state.add('game', GameState, true);