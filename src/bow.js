class Bow extends Weapon {
    constructor(projectiles, game) {
        super(projectiles, game);
        this.damages = 10;
    }
    fire(startPosition, targetPosition) {
        var arrow = this.projectiles.getFree();
        if (!arrow) {
            arrow = new Arrow(this.game);
            this.projectiles.push(arrow);
        }
        arrow.alive = true;
        arrow.setPosition(startPosition);
        arrow.setDestination(targetPosition);
    }
}
