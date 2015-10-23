class Castle {
    constructor(config) {
        this.position = {
            x: config.position.x,
            y: config.position.y
        };
        this.w = 50;
        this.h = 50;
        this.life = config.life;
    }
    render(context) {
        context.fillStyle = '#00FF00';
        context.fillRect(this.position.x | 0, this.position.y | 0, this.w, this.h);
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
