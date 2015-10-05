var Enemy = function(x, y, context) {
    this.x = x;
    this.y = y;
    this.w = 20;
    this.h = 20;
    this.baseSpeed = 100;
    this.speed = {x: 0, y: 0};
    this.context = context;
};

Enemy.prototype = {
    render: function() {
        this.context.fillStyle = '#FF0000';
        this.context.fillRect(this.x | 0, this.y | 0, this.w, this.h);
    },
    update: function(elapsedTime) {
        this.x += this.speed.x * elapsedTime;
        this.y += this.speed.y * elapsedTime;
    },
};
