class Movable extends Drawable {
    constructor(x, y, w, h) {
        super(x, y, w, h);
        this.baseSpeed = 0;
        this.speed = {x: 0, y: 0};
        this.destination = null;
    }
    setDestination(destination) {
        if (!destination) {
            this.destination = null;
            return;
        }
        if (!this.destination) {
            this.destination = {x: 0, y: 0};
        }
        this.destination.x = destination.x;
        this.destination.y = destination.y;
    }
    update(elapsedTime) {
        if (this.destination) {
            var movement = Geometry.getVector(this.position, this.destination);
            var distance = Geometry.getLength(movement);
            this.speed = Geometry.normalize(movement);
            // do not go farther than the destination point
            var coef = this.baseSpeed;
            if (this.baseSpeed * elapsedTime > distance) {
                coef = distance / elapsedTime;
            }
            this.speed.x *= coef;
            this.speed.y *= coef;
        }
        this.position.x += this.speed.x * elapsedTime;
        this.position.y += this.speed.y * elapsedTime;

        if (this.destination && Geometry.getDistance(this.position, this.destination) < 1) {
            this.position.x = this.destination.x;
            this.position.y = this.destination.y;
            this.destination = null;
            this.speed = {x: 0,  y: 0};
            this.onDestination();
        }
    }
    onDestination() {

    }
}
