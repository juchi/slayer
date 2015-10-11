class Projectile extends Movable {
    constructor() {
        super(0, 0);
        this.alive = true;
    }
    onDestination() {
        this.alive = false;
    }
    render(context) {
        if (!this.alive) {
            return;
        }
        context.fillStyle = '#009900';
        context.fillRect(this.position.x, this.position.y, 4, 4);
    }
}
