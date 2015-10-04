var Player = function(x, y, context, input) {
    this.x = x;
    this.y = y;
    this.w = 20;
    this.h = 20;
    this.speed = {x: 0, y: 0};
    this.context = context;
    this.init(input);
};

Player.prototype = {
    init: function(input) {
        input.downevents.push(this.onKeyDown.bind(this));
        input.upevents.push(this.onKeyUp.bind(this));
    },
    render: function() {
        this.context.fillStyle = '#000000';
        this.context.fillRect(this.x, this.y, this.w, this.h);
    },
    update: function() {
        this.x += this.speed.x;
        this.y += this.speed.y;
    },

    onKeyDown: function(keyCode) {
        console.log(keyCode);
        if (keyCode == 37) {
            this.speed.x -= 5;
        }
        if (keyCode == 38) {
            this.speed.y -= 5;
        }
        if (keyCode == 39) {
            this.speed.x += 5;
        }
        if (keyCode == 40) {
            this.speed.y += 5;
        }
    },
    onKeyUp: function(keyCode) {
        if (keyCode == 37) {
            this.speed.x += 5;
        }
        if (keyCode == 38) {
            this.speed.y += 5;
        }
        if (keyCode == 39) {
            this.speed.x -= 5;
        }
        if (keyCode == 40) {
            this.speed.y -= 5;
        }
    }
};
