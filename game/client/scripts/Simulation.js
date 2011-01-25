/// <reference path="Common.js" />
/// <reference path="Vector.js" />

function Simulation(field)
{
    var friction = 0.95;
    var force = 1000.0;

    var simulationStep = 0.033;
    var simulationTimeAgg = 0.0;

    function updatePlayer(player, time)
    {
        player.position.x += player.velocity.x * time;
        player.position.y += player.velocity.y * time;
        player.position.clamp(0, field.width, 0, field.height);
        player.velocity.mul(friction);
    }

    this.update = function (time)
    {
        simulationTimeAgg += time;

     
        while (simulationTimeAgg > simulationStep)
        {
            var step = simulationStep;
            
            //TODO: Log this somewhere
            //TODO: Think about repairing this differently
            //      Situation can be fixed by flagging client state as corrupted and pulling whole state from server
            //      For server it ain't that easy
            if (simulationTimeAgg > simulationStep * 10)
            {
                step = simulationStep * 10;
            }

            updatePlayer(field.player, step);
            simulationTimeAgg -= step;
        }

        // TODO: update ball
        // TODO: update other players
    };

    this.applyForce = function (vector, time)
    {
        vector.normalize();
        vector.mul(force * time);

        field.player.velocity.add(vector);
    };
}

module.exports = Simulation;