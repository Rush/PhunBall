/// <reference path="Common.js" />
/// <reference path="Vector.js" />

function Simulation(field)
{
	var friction = 0.95;

	function updatePlayer(player, time)
	{
		player.position.x += player.velocity.x * time;
		player.position.y += player.velocity.y * time;
		player.position.clamp(0, field.width, 0, field.height);
		player.velocity.mul(friction);
	}

	this.update = function (time)
	{
		updatePlayer(field.player, time);

		// TODO: update ball
		// TODO: update other players
		// TODO: fixed time simulation steps
	};

	this.applyForce = function (x, y)
	{
		field.player.velocity.add(x, y);
	};
}

module.exports = Simulation;