/**
 * Created by jonas on 12/14/2014.
 */


function Tank(x, y, game) {

	this.speed = 0;
	this.range = 500;

	var sprite = game.add.sprite(x, y, 'tanks', 'tankBlue_outline.png');
	sprite.anchor.setTo(0.5, 0.5);
	var barrel = game.add.sprite(0, 0, 'tanks', 'barrelBlue_outline.png');
	barrel.anchor.setTo(0.5, 0);
	sprite.addChild(barrel);

	this.update = function() {
		// move
		var dx = Math.sin(sprite.rotation) * this.speed;
		var dy = Math.cos(sprite.rotation) * this.speed;
		sprite.x -= dx;
		sprite.y += dy;

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
		var bullet = game.bullets.getFirstExists(false);

		bullet.reset(sprite.x, sprite.y);

		bullet.rotation = barrel.rotation + sprite.rotation + Math.PI;
		var dx = Math.sin(bullet.rotation - Math.PI) * this.range;
		var dy = Math.cos(bullet.rotation - Math.PI) * this.range;
		bullet.body.velocity.x = -dx * 3;
		bullet.body.velocity.y = dy * 5;

	};
}