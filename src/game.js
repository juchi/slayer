var Game = function(canvas) {
    this.canvas = canvas;
    this.canvas.width = 640;
    this.canvas.height = 480;

    this.input = new Input(canvas);
    this.player = new Player(0, 0, canvas.getContext('2d'), this.input);
};

Game.prototype = {
    run: function() {
        this.frame();
    },

    frame: function() {
        requestAnimationFrame(this.frame.bind(this));
        this.update();
        this.render();
    },

    update: function() {
        this.player.update();
    },

    render: function() {
        this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.player.render();
    }
};
