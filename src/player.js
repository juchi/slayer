class Player extends Movable {
    constructor(x, y, input) {
        super(x, y);
        this.w = 20;
        this.h = 20;
        this.baseSpeed = 100;
        this.life = 100;
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
        context.fillRect(this.position.x | 0, this.position.y | 0, this.w, this.h);
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
}
