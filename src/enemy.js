class Enemy extends Movable {
    constructor(x, y, game) {
        super(x, y);
        this.w = 20;
        this.h = 20;
        this.game = game;
        this.alive = true;
        this.baseSpeed = 100;
        this.maxLife = 10;
        this.respawn();
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
    render(context) {
        context.fillStyle = '#FF0000';
        context.fillRect(this.position.x | 0, this.position.y | 0, this.w, this.h);
    }
}
