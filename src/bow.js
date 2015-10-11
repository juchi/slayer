class Bow extends Weapon {
    constructor(projectiles) {
        super(projectiles);
        this.damages = 10;
    }
    fire(startPosition, targetPosition) {
        var arrow = this.projectiles.getFree();
        if (!arrow) {
            arrow = new Arrow();
            this.projectiles.push(arrow);
        }
        arrow.alive = true;
        arrow.setPosition(startPosition);
        arrow.setDestination(targetPosition);
    }
}
