class Geometry {
    static getVector(source, destination) {
        var x = destination.x - source.x;
        var y = destination.y - source.y;

        return {x: x, y: y};
    }
    static normalize(vector) {
        var length = Geometry.getDistance({x: 0, y: 0}, vector);

        return {x: vector.x / length, y: vector.y / length};
    }
    static getDistance(a, b) {
        var x = a.x - b.x;
        var y = a.y - b.y;

        return Math.sqrt(x * x + y * y);
    }
}
