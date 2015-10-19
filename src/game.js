class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.canvas.width = 640;
        this.canvas.height = 480;

        this.input = new Input(canvas);
        this.projectiles = new Pool();
        this.player = new Player(0, 0, this.input);
        this.enemies = new Pool();
        this.oldTime = null;
        this.score = 0;
        this.wave = new Wave(this);
    }
    run() {
        this.player.currentWeapon = new Bow(this.projectiles, this);
        this.nextWave();
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
        this.wave.update(elapsedTime);
        for (var i = 0; i < this.enemies.length; i++) {
            if (this.enemies.get(i).alive) {
                this.enemies.get(i).update(elapsedTime);
            }
        }
        for (var i = 0; i < this.projectiles.length; i++) {
            if (this.projectiles.get(i).alive) {
                this.projectiles.get(i).update(elapsedTime);
            }
        }
    }
    nextWave() {
        this.wave.init();
    }
    spawnEnemy() {
        var enemy = this.enemies.getFree();
        if (!enemy) {
            enemy = new Enemy(0, 0, this);
            this.enemies.push(enemy);
        }
        enemy.position.x = Math.random() * 640;
        enemy.position.y = Math.random() * 480;
        enemy.alive = true;
    }
    enemyKilled(enemy) {
        this.addScore(1);
    }
    findClosestEnemy(source) {
        var dist, min = Number.POSITIVE_INFINITY, closest;
        for (var i = 0; i < this.enemies.length; i++) {
            if (this.enemies.get(i).alive) {
                dist = Geometry.getDistance(source, this.enemies.get(i).position);
                if (dist < min) {
                    min = dist;
                    closest = this.enemies.get(i);
                }
            }
        }

        return closest;
    }
    isColliding(source, target) {
        return source.position.x + source.w > target.position.x && source.position.x < target.position.x + target.w
            && source.position.y + source.h > target.position.y && source.position.y < target.position.y + target.h;
    }
    addScore(value) {
        this.score += value;
    }
    render() {
        var context = this.canvas.getContext('2d');
        context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.render(context);
        for (var i = 0; i < this.enemies.length; i++) {
            if (this.enemies.get(i).alive) {
                this.enemies.get(i).render(context);
            }
        }
        for (var i = 0; i < this.projectiles.length; i++) {
            if (this.projectiles.get(i).alive) {
                this.projectiles.get(i).render(context);
            }
        }
    }
}
