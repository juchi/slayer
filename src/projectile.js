class Projectile extends Movable {
    constructor(game) {
        super(0, 0);
        this.game = game;
        this.alive = true;
        this.w = 4;
        this.h = 4;
        this.damages = 0;
    }
    onDestination() {
        this.alive = false;
    }
    render(context) {
        if (!this.alive) {
            return;
        }
        context.fillStyle = '#009900';
        context.fillRect(this.position.x, this.position.y, this.w, this.h);
    }
}
