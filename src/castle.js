class Castle extends Drawable {
    constructor(config) {
        super(config.position.x, config.position.y, 50, 50);
        this.life = config.life;
    }
    render(context) {
        context.fillStyle = '#00FF00';
        context.fillRect(... this.getRenderGeometry());
    }
    takeDamage(value) {
        this.life -= value;
        if (this.life <= 0) {
            this.life = 0;
            this.die();
        }
    }
    die() {
        alert('castle destroyed');
    }
}
