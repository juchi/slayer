class Wave {
    constructor(game) {
        this.game = game;
        this.spawnPeriod = 2;
        this.lastSpawn = 0;
    }
    init() {
        this.lastSpawn = 0;
    }
    update(timeElapsed) {
        this.lastSpawn += timeElapsed;
        if (this.lastSpawn > this.spawnPeriod) {
            this.lastSpawn = 0;
            this.game.spawnEnemy();
        }
    }
}
