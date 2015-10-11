class Bow extends Weapon {
    constructor(projectiles) {
        super(projectiles);
        this.damages = 10;
    }
    fire(startPosition, targetPosition) {
        var arrow = new Arrow();
        arrow.setPosition(startPosition);
        arrow.setDestination(targetPosition);
        this.projectiles.push(arrow);
    }
}
