class UI {
    constructor(domElements) {
        this.domElements = domElements;
    }
    refreshScore(score) {
        this.domElements.score.textContent = score;
    }
    refreshLife(life) {
        this.domElements.life.textContent = life;
    }
    refreshGameStatus(gameover) {
        this.domElements.game.textContent = gameover ? 'Game Over' : '';
    }
}
