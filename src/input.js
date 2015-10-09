class Input {
    constructor(canvas) {
        this.downkeys = {};
        this.downevents = [];
        this.upevents = [];
        this.init();
    }
    init() {
        window.addEventListener('keydown', this.onKeyDown.bind(this));
        window.addEventListener('keyup', this.onKeyUp.bind(this));
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
}
