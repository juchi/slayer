class Enemy extends Movable {
    constructor(x, y, context) {
        super(x, y);
        this.w = 20;
        this.h = 20;
        this.baseSpeed = 100;
        this.context = context;
    }
    render() {
        this.context.fillStyle = '#FF0000';
        this.context.fillRect(this.position.x | 0, this.position.y | 0, this.w, this.h);
    }
}
