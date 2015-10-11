class Pool {
    constructor() {
        this.objects = [];
        this.length = 0;
    }
    get(index) {
        return this.objects[index];
    }
    getFree() {
        for (var i = 0; i < this.objects.length; i++) {
            if (!this.objects[i].alive) {
                return this.objects[i];
            }
        }
    }
    push(obj) {
        this.objects.push(obj);
        this.length = this.objects.length;
    }
    clear() {
        this.objects = [];
    }
}
