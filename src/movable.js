class Movable {
    constructor(x, y) {
        this.position = {x: x, y: y};

        this.baseSpeed = 0;
        this.speed = {x: 0, y: 0};
        this.destination = null;
    }
    update(elapsedTime) {
        if (this.destination) {
            this.speed = Geometry.normalize(Geometry.getVector(this.position, this.destination));
            this.speed.x *= this.baseSpeed;
            this.speed.y *= this.baseSpeed;
        }
        this.position.x += this.speed.x * elapsedTime;
        this.position.y += this.speed.y * elapsedTime;

        if (this.destination && Geometry.getDistance(this.position, this.destination) < 1) {
            this.position.x = this.destination.x;
            this.position.y = this.destination.y;
            this.destination = null;
            this.speed = {x: 0,  y: 0};
        }
    }
}
