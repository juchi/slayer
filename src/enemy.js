class Enemy extends Movable {
    constructor(x, y, game) {
        super(x, y, 20, 20);
        this.game = game;
        this.alive = true;
        this.baseSpeed = 100;
        this.maxLife = 10;
        this.respawn();
        this.range = 60;
        this.damages = 5;
        this.cooldown = 0;
    }
    respawn() {
        this.alive = true;
        this.life = this.maxLife;
    }
    takeDamage(value) {
        this.life -= value;
        if (this.life <= 0) {
            this.life = 0;
            this.die();
        }
    }
    die() {
        this.alive = false;
        this.game.enemyKilled(this);
    }
    update(elapsedTime) {
        this.cooldown -= elapsedTime;
        if (this.cooldown < 0) {
            this.cooldown = 0;
        }
        var target = this.game.findClosestPlayerObject(this.position);
        if (!target) {
            return;
        }
        this.destination = {x: target.position.x, y: target.position.y};
        super.update(elapsedTime);

        if (this.cooldown <= 0 && Geometry.getDistance(this.position, target.position) <= this.range) {
            this.attack(target);
        }
    }
    attack(target) {
        this.cooldown += 2;
        target.takeDamage(this.damages);
    }
    render(context) {
        context.fillStyle = '#FF0000';
        context.fillRect(... this.getRenderGeometry());
    }
}
