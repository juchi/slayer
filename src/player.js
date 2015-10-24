class Player extends Movable {
    constructor(config, input) {
        super(config.position.x, config.position.y, 20, 20);
        this.baseSpeed = config.speed;
        this.life = config.life;
        this.init(input);
        this.currentWeapon = null;
    }
    init(input) {
        input.downevents.push(this.onKeyDown.bind(this));
        input.upevents.push(this.onKeyUp.bind(this));
        input.clickevents.push(this.onClick.bind(this));
    }
    render(context) {
        context.fillStyle = '#000000';
        context.fillRect(... this.getRenderGeometry());
    }
    onKeyDown(keyCode) {}
    onKeyUp(keyCode) {}
    onClick(e) {
        if (e.button == 0) { // left click
            this.destination = {x: e.offsetX, y: e.offsetY};
        } else if (e.button == 2) { // right click
            this.attack({x: e.offsetX, y: e.offsetY});
        }
    }
    attack(targetPosition) {
        this.currentWeapon.fire(this.position, targetPosition);
    }
    takeDamage(value) {
        this.life -= value;
        if (this.life <= 0) {
            this.life = 0;
            this.die();
        }
    }
    die() {
        alert('you are dead');
    }
}
