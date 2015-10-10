class Input {
    constructor(canvas) {
        this.downkeys = {};
        this.downevents = [];
        this.upevents = [];
        this.clickevents = [];
        this.init(canvas);
    }
    init(canvas) {
        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
        canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
        canvas.addEventListener('contextmenu', function(e) {e.preventDefault();});
    }
    onKeyDown(e) {
        if (this.downkeys[e.keyCode]) return;
        this.downkeys[e.keyCode] = 1;
        for (var i in this.downevents) {
            this.downevents[i](e.keyCode);
        }
    }
    onKeyUp(e) {
        if (!this.downkeys[e.keyCode]) return;
        delete this.downkeys[e.keyCode];
        for (var i in this.upevents) {
            this.upevents[i](e.keyCode);
        }
    }
    onMouseDown(e) {
        for (var i in this.clickevents) {
            this.clickevents[i](e);
        }
    }
}
