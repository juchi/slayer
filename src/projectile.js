class Projectile extends Movable {
    constructor(game) {
        super(0, 0, 4, 4);
        this.game = game;
        this.alive = true;
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
        context.fillRect(... this.getRenderGeometry());
    }
}
