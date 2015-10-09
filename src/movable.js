class Movable {
    constructor(x, y) {
        this.x = x;
        this.y = y;

        this.baseSpeed = 0;
        this.speed = {x: 0, y: 0};
    }
    update(elapsedTime) {
        this.x += this.speed.x * elapsedTime;
        this.y += this.speed.y * elapsedTime;
    }
}
