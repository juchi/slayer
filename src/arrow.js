class Arrow extends Projectile {
    constructor(game) {
        super(game);
        this.baseSpeed = 400;
    }
    update(timeElapsed) {
        super.update(timeElapsed);
        var enemy;
        if (enemy = this.game.findClosestEnemy(this.position)) {
            if (this.game.isColliding(this, enemy)) {
                enemy.die();
                this.alive = false;
            }
        }
    }
}
