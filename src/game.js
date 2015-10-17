class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = 640;
        this.canvas.height = 480;

        this.input = new Input(canvas);
        this.projectiles = new Pool();
        this.player = new Player(0, 0, this.input);
        this.player.currentWeapon = new Bow(this.projectiles);
        this.enemies = [];
        this.enemies.push(new Enemy(200, 200));
        this.oldTime = null;
    }
    run() {
        requestAnimationFrame(this.frame.bind(this));
    }
    frame(newTime) {
        if (!this.oldTime) this.oldTime = newTime;
        var elapsedTime = (newTime - this.oldTime) / 1000;
        this.oldTime = newTime;
        this.update(elapsedTime);
        this.render();
        requestAnimationFrame(this.frame.bind(this));
    }
    update(elapsedTime) {
        this.player.update(elapsedTime);
        for (var i = 0; i < this.enemies.length; i++) {
            this.enemies[i].update(elapsedTime);
        }
        for (var i = 0; i < this.projectiles.length; i++) {
            if (this.projectiles.get(i).alive) {
                this.projectiles.get(i).update(elapsedTime);
            }
        }
    }
    render() {
        var context = this.canvas.getContext('2d');
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.render(context);
        for (var i = 0; i < this.enemies.length; i++) {
            this.enemies[i].render(context);
        }
        for (var i = 0; i < this.projectiles.length; i++) {
            if (this.projectiles.get(i).alive) {
                this.projectiles.get(i).render(context);
            }
        }
    }
}
