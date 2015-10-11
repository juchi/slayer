class Enemy extends Movable {
    constructor(x, y) {
        super(x, y);
        this.w = 20;
        this.h = 20;
        this.baseSpeed = 100;
    }
    render(context) {
        context.fillStyle = '#FF0000';
        context.fillRect(this.position.x | 0, this.position.y | 0, this.w, this.h);
    }
}
