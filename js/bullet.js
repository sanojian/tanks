/**
 * Created by jonas on 12/14/2014.
 */

function Bullet(sprite) {

	this.speed = 30;

	this.update = function() {
		// move
		var dx = Math.sin(sprite.angle * Math.PI / 180) * this.speed;
		var dy = Math.cos(sprite.angle * Math.PI / 180) * this.speed;
		sprite.x -= dx;
		sprite.y += dy;

	};
}