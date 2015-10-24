class Drawable {
    constructor(x, y, w, h) {
        this.position = {x: x, y: y};
        this.w = w;
        this.h = h;
    }
    setPosition(position) {
        this.position.x = position.x;
        this.position.y = position.y;
    }
    getRenderGeometry() {
        return [(this.position.x - this.w / 2) | 0, (this.position.y - this.h / 2) | 0, this.w, this.h];
    }
}
