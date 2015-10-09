class Player extends Movable {
    constructor(x, y, context, input) {
        super(x, y);
        this.w = 20;
        this.h = 20;
        this.baseSpeed = 100;
        this.context = context;
        this.init(input);
    }
    init(input) {
        input.downevents.push(this.onKeyDown.bind(this));
        input.upevents.push(this.onKeyUp.bind(this));
    }
    render() {
        this.context.fillStyle = '#000000';
        this.context.fillRect(this.x | 0, this.y | 0, this.w, this.h);
    }
    onKeyDown(keyCode) {
        if (keyCode == 37) {
            this.speed.x -= this.baseSpeed;
        }
        if (keyCode == 38) {
            this.speed.y -= this.baseSpeed;
        }
        if (keyCode == 39) {
            this.speed.x += this.baseSpeed;
        }
        if (keyCode == 40) {
            this.speed.y += this.baseSpeed;
        }
    }
    onKeyUp(keyCode) {
        if (keyCode == 37) {
            this.speed.x += this.baseSpeed;
        }
        if (keyCode == 38) {
            this.speed.y += this.baseSpeed;
        }
        if (keyCode == 39) {
            this.speed.x -= this.baseSpeed;
        }
        if (keyCode == 40) {
            this.speed.y -= this.baseSpeed;
        }
    }
}
