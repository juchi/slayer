var Game = function(canvas) {
    this.canvas = canvas;
    this.canvas.width = 640;
    this.canvas.height = 480;

    this.input = new Input(canvas);
    this.player = new Player(0, 0, canvas.getContext('2d'), this.input);
    this.enemies = [];
    this.enemies.push(new Enemy(200, 200, canvas.getContext('2d')));
    this.oldTime = 0;
};

Game.prototype = {
    run: function() {
        this.frame();
    },

    frame: function() {
        requestAnimationFrame(this.frame.bind(this));
        var newTime = performance.now()
        var elapsedTime = (newTime - this.oldTime) / 1000;
        this.oldTime = newTime;
        this.update(elapsedTime);
        this.render();
    },

    update: function(elapsedTime) {
        this.player.update(elapsedTime);
    },

    render: function() {
        this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.render();
        for (var i = 0; i < this.enemies.length; i++) {
            this.enemies[i].render();
        }
    }
};
