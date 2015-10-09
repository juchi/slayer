class Player {
    constructor(x, y, context, input) {
        this.x = x;
        this.y = y;
        this.w = 20;
        this.h = 20;
        this.baseSpeed = 100;
        this.speed = {x: 0, y: 0};
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
    update(elapsedTime) {
        this.x += this.speed.x * elapsedTime;
        this.y += this.speed.y * elapsedTime;
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
