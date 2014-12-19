/**
 * Created by jonas on 12/14/2014.
 */


function Tank(x, y, color, game, group) {

	var RELOAD_TIME = 1000;

	this.speed = 0;
	this.range = 500;
	this.shootTime = 0;

	var sprite = game.add.sprite(x, y, 'tanks', 'tank' + color + '_outline.png');
	sprite.anchor.setTo(0.5, 0.5);
	if (group) {
		group.add(sprite);
	}
	sprite.enableBody = true;
	sprite.physicsBodyType = Phaser.Physics.ARCADE;
	game.physics.enable(sprite, Phaser.Physics.ARCADE);

	var barrel = game.add.sprite(0, 0, 'tanks', 'barrel' + color + '_outline.png');
	barrel.anchor.setTo(0.5, 0);
	sprite.addChild(barrel);

	this.update = function() {

		// move
		var dx = Math.sin(sprite.rotation) * this.speed;
		var dy = Math.cos(sprite.rotation) * this.speed;
		//sprite.body.velocity.x = -dx;
		//sprite.body.velocity.y = dy;
		game.physics.arcade.velocityFromAngle(sprite.angle-90, this.speed*100, sprite.body.velocity);

		//sprite.x -= dx;
		//sprite.y += dy;

		// barrel
		dx = sprite.x - game.input.activePointer.x;
		dy = sprite.y - game.input.activePointer.y;
		var mouseAngle = Math.atan2(dy, dx) + Math.PI/2;
		barrel.rotation = mouseAngle - sprite.rotation;
	};

	this.turn = function(amt) {
		sprite.angle += amt;
	};

	this.shoot = function() {
		var curTime = new Date().getTime();
		if (curTime - this.shootTime < RELOAD_TIME) {
			return;
		}
		else {
			this.shootTime = curTime;
		}
		var bullet = g_game.bullets.getFirstExists(false);

		bullet.reset(sprite.x, sprite.y);

		bullet.rotation = barrel.rotation + sprite.rotation + Math.PI;
		var dx = Math.sin(bullet.rotation - Math.PI) * this.range;
		var dy = Math.cos(bullet.rotation - Math.PI) * this.range;
		bullet.body.velocity.x = -dx * 3;
		bullet.body.velocity.y = dy * 3;

	};

	this.getSprite = function() {
		return sprite;
	};
}