"use strict";

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Loader = (function () {
    function Loader() {
        _classCallCheck(this, Loader);
    }

    _createClass(Loader, null, [{
        key: "load",
        value: function load(url, success, error) {
            var xhr = new XMLHttpRequest();
            xhr.overrideMimeType("application/json");
            xhr.open('GET', url, true); // Replace 'my_data' with the path to your file
            xhr.onreadystatechange = function () {
                if (xhr.readyState == 4) {
                    if (xhr.status == "200") {
                        success && success(xhr);
                    } else {
                        error && error(xhr);
                    }
                }
            };
            xhr.send(null);
        }
    }]);

    return Loader;
})();

var Pool = (function () {
    function Pool() {
        _classCallCheck(this, Pool);

        this.objects = [];
        this.length = 0;
    }

    _createClass(Pool, [{
        key: "get",
        value: function get(index) {
            return this.objects[index];
        }
    }, {
        key: "getFree",
        value: function getFree() {
            for (var i = 0; i < this.objects.length; i++) {
                if (!this.objects[i].alive) {
                    return this.objects[i];
                }
            }
        }
    }, {
        key: "push",
        value: function push(obj) {
            this.objects.push(obj);
            this.length = this.objects.length;
        }
    }, {
        key: "clear",
        value: function clear() {
            this.objects = [];
        }
    }]);

    return Pool;
})();

var Geometry = (function () {
    function Geometry() {
        _classCallCheck(this, Geometry);
    }

    _createClass(Geometry, null, [{
        key: "getVector",
        value: function getVector(source, destination) {
            var x = destination.x - source.x;
            var y = destination.y - source.y;

            return { x: x, y: y };
        }
    }, {
        key: "normalize",
        value: function normalize(vector) {
            var length = Geometry.getLength(vector);
            if (length == 0) {
                return { x: 0, y: 0 };
            }

            return { x: vector.x / length, y: vector.y / length };
        }
    }, {
        key: "getDistance",
        value: function getDistance(a, b) {
            var x = a.x - b.x;
            var y = a.y - b.y;

            return Math.sqrt(x * x + y * y);
        }
    }, {
        key: "getLength",
        value: function getLength(vector) {
            return Geometry.getDistance({ x: 0, y: 0 }, vector);
        }
    }]);

    return Geometry;
})();

var Weapon = (function () {
    function Weapon(projectiles, game) {
        _classCallCheck(this, Weapon);

        this.damages = 0;
        this.projectiles = projectiles;
        this.game = game;
    }

    _createClass(Weapon, [{
        key: "fire",
        value: function fire() {}
    }]);

    return Weapon;
})();

var Bow = (function (_Weapon) {
    _inherits(Bow, _Weapon);

    function Bow(projectiles, game) {
        _classCallCheck(this, Bow);

        _get(Object.getPrototypeOf(Bow.prototype), "constructor", this).call(this, projectiles, game);
        this.damages = 10;
    }

    _createClass(Bow, [{
        key: "fire",
        value: function fire(startPosition, targetPosition) {
            var arrow = this.projectiles.getFree();
            if (!arrow) {
                arrow = new Arrow(this.game);
                this.projectiles.push(arrow);
            }
            arrow.alive = true;
            arrow.setPosition(startPosition);
            arrow.setDestination(targetPosition);
        }
    }]);

    return Bow;
})(Weapon);

var Drawable = (function () {
    function Drawable(x, y, w, h) {
        _classCallCheck(this, Drawable);

        this.position = { x: x, y: y };
        this.w = w;
        this.h = h;
    }

    _createClass(Drawable, [{
        key: "setPosition",
        value: function setPosition(position) {
            this.position.x = position.x;
            this.position.y = position.y;
        }
    }, {
        key: "getRenderGeometry",
        value: function getRenderGeometry() {
            return [this.position.x - this.w / 2 | 0, this.position.y - this.h / 2 | 0, this.w, this.h];
        }
    }]);

    return Drawable;
})();

var Movable = (function (_Drawable) {
    _inherits(Movable, _Drawable);

    function Movable(x, y, w, h) {
        _classCallCheck(this, Movable);

        _get(Object.getPrototypeOf(Movable.prototype), "constructor", this).call(this, x, y, w, h);
        this.baseSpeed = 0;
        this.speed = { x: 0, y: 0 };
        this.destination = null;
    }

    _createClass(Movable, [{
        key: "setDestination",
        value: function setDestination(destination) {
            if (!destination) {
                this.destination = null;
                return;
            }
            if (!this.destination) {
                this.destination = { x: 0, y: 0 };
            }
            this.destination.x = destination.x;
            this.destination.y = destination.y;
        }
    }, {
        key: "update",
        value: function update(elapsedTime) {
            if (this.destination) {
                var movement = Geometry.getVector(this.position, this.destination);
                var distance = Geometry.getLength(movement);
                this.speed = Geometry.normalize(movement);
                // do not go farther than the destination point
                var coef = this.baseSpeed;
                if (this.baseSpeed * elapsedTime > distance) {
                    coef = distance / elapsedTime;
                }
                this.speed.x *= coef;
                this.speed.y *= coef;
            }
            this.position.x += this.speed.x * elapsedTime;
            this.position.y += this.speed.y * elapsedTime;

            if (this.destination && Geometry.getDistance(this.position, this.destination) < 1) {
                this.position.x = this.destination.x;
                this.position.y = this.destination.y;
                this.destination = null;
                this.speed = { x: 0, y: 0 };
                this.onDestination();
            }
        }
    }, {
        key: "onDestination",
        value: function onDestination() {}
    }]);

    return Movable;
})(Drawable);

var Projectile = (function (_Movable) {
    _inherits(Projectile, _Movable);

    function Projectile(game) {
        _classCallCheck(this, Projectile);

        _get(Object.getPrototypeOf(Projectile.prototype), "constructor", this).call(this, 0, 0, 4, 4);
        this.game = game;
        this.alive = true;
        this.damages = 0;
    }

    _createClass(Projectile, [{
        key: "onDestination",
        value: function onDestination() {
            this.alive = false;
        }
    }, {
        key: "render",
        value: function render(context) {
            if (!this.alive) {
                return;
            }
            context.fillStyle = '#009900';
            context.fillRect.apply(context, _toConsumableArray(this.getRenderGeometry()));
        }
    }]);

    return Projectile;
})(Movable);

var Arrow = (function (_Projectile) {
    _inherits(Arrow, _Projectile);

    function Arrow(game) {
        _classCallCheck(this, Arrow);

        _get(Object.getPrototypeOf(Arrow.prototype), "constructor", this).call(this, game);
        this.baseSpeed = 400;
        this.damages = 10;
    }

    _createClass(Arrow, [{
        key: "update",
        value: function update(timeElapsed) {
            _get(Object.getPrototypeOf(Arrow.prototype), "update", this).call(this, timeElapsed);
            var enemy;
            if (enemy = this.game.findClosestEnemy(this.position)) {
                if (this.game.isColliding(this, enemy)) {
                    enemy.takeDamage(this.damages);
                    this.alive = false;
                }
            }
        }
    }]);

    return Arrow;
})(Projectile);

var Enemy = (function (_Movable2) {
    _inherits(Enemy, _Movable2);

    function Enemy(x, y, game) {
        _classCallCheck(this, Enemy);

        _get(Object.getPrototypeOf(Enemy.prototype), "constructor", this).call(this, x, y, 20, 20);
        this.game = game;
        this.alive = true;
        this.baseSpeed = 100;
        this.maxLife = 10;
        this.respawn();
        this.range = 60;
        this.damages = 5;
        this.cooldown = 0;
    }

    _createClass(Enemy, [{
        key: "respawn",
        value: function respawn() {
            this.alive = true;
            this.life = this.maxLife;
        }
    }, {
        key: "takeDamage",
        value: function takeDamage(value) {
            this.life -= value;
            if (this.life <= 0) {
                this.life = 0;
                this.die();
            }
        }
    }, {
        key: "die",
        value: function die() {
            this.alive = false;
            this.game.enemyKilled(this);
        }
    }, {
        key: "update",
        value: function update(elapsedTime) {
            this.cooldown -= elapsedTime;
            if (this.cooldown < 0) {
                this.cooldown = 0;
            }
            var target = this.game.findClosestPlayerObject(this.position);
            if (!target) {
                return;
            }
            this.destination = { x: target.position.x, y: target.position.y };
            _get(Object.getPrototypeOf(Enemy.prototype), "update", this).call(this, elapsedTime);

            if (this.cooldown <= 0 && Geometry.getDistance(this.position, target.position) <= this.range) {
                this.attack(target);
            }
        }
    }, {
        key: "attack",
        value: function attack(target) {
            this.cooldown += 2;
            target.takeDamage(this.damages);
        }
    }, {
        key: "render",
        value: function render(context) {
            context.fillStyle = '#FF0000';
            context.fillRect.apply(context, _toConsumableArray(this.getRenderGeometry()));
        }
    }]);

    return Enemy;
})(Movable);

var Wave = (function () {
    function Wave(game) {
        _classCallCheck(this, Wave);

        this.game = game;
        this.spawnPeriod = 2;
        this.lastSpawn = 0;
    }

    _createClass(Wave, [{
        key: "init",
        value: function init() {
            this.lastSpawn = 0;
        }
    }, {
        key: "update",
        value: function update(timeElapsed) {
            this.lastSpawn += timeElapsed;
            if (this.lastSpawn > this.spawnPeriod) {
                this.lastSpawn = 0;
                this.game.spawnEnemy();
            }
        }
    }]);

    return Wave;
})();

var Castle = (function (_Drawable2) {
    _inherits(Castle, _Drawable2);

    function Castle(config) {
        _classCallCheck(this, Castle);

        _get(Object.getPrototypeOf(Castle.prototype), "constructor", this).call(this, config.position.x, config.position.y, 50, 50);
        this.life = config.life;
    }

    _createClass(Castle, [{
        key: "render",
        value: function render(context) {
            context.fillStyle = '#00FF00';
            context.fillRect.apply(context, _toConsumableArray(this.getRenderGeometry()));
        }
    }, {
        key: "takeDamage",
        value: function takeDamage(value) {
            this.life -= value;
            if (this.life <= 0) {
                this.life = 0;
                this.die();
            }
        }
    }, {
        key: "die",
        value: function die() {
            alert('castle destroyed');
        }
    }]);

    return Castle;
})(Drawable);

var Player = (function (_Movable3) {
    _inherits(Player, _Movable3);

    function Player(config, input) {
        _classCallCheck(this, Player);

        _get(Object.getPrototypeOf(Player.prototype), "constructor", this).call(this, config.position.x, config.position.y, 20, 20);
        this.baseSpeed = config.speed;
        this.life = config.life;
        this.init(input);
        this.currentWeapon = null;
    }

    _createClass(Player, [{
        key: "init",
        value: function init(input) {
            input.downevents.push(this.onKeyDown.bind(this));
            input.upevents.push(this.onKeyUp.bind(this));
            input.clickevents.push(this.onClick.bind(this));
        }
    }, {
        key: "render",
        value: function render(context) {
            context.fillStyle = '#000000';
            context.fillRect.apply(context, _toConsumableArray(this.getRenderGeometry()));
        }
    }, {
        key: "onKeyDown",
        value: function onKeyDown(keyCode) {}
    }, {
        key: "onKeyUp",
        value: function onKeyUp(keyCode) {}
    }, {
        key: "onClick",
        value: function onClick(e) {
            if (e.button == 0) {
                // left click
                this.destination = { x: e.offsetX, y: e.offsetY };
            } else if (e.button == 2) {
                // right click
                this.attack({ x: e.offsetX, y: e.offsetY });
            }
        }
    }, {
        key: "attack",
        value: function attack(targetPosition) {
            this.currentWeapon.fire(this.position, targetPosition);
        }
    }, {
        key: "takeDamage",
        value: function takeDamage(value) {
            this.life -= value;
            if (this.life <= 0) {
                this.life = 0;
                this.die();
            }
        }
    }, {
        key: "die",
        value: function die() {
            alert('you are dead');
        }
    }]);

    return Player;
})(Movable);

var Input = (function () {
    function Input(canvas) {
        _classCallCheck(this, Input);

        this.downkeys = {};
        this.downevents = [];
        this.upevents = [];
        this.clickevents = [];
        this.init(canvas);
    }

    _createClass(Input, [{
        key: "init",
        value: function init(canvas) {
            window.addEventListener('keydown', this.onKeyDown.bind(this));
            window.addEventListener('keyup', this.onKeyUp.bind(this));
            canvas.addEventListener('mousedown', this.onMouseDown.bind(this));
            canvas.addEventListener('contextmenu', function (e) {
                e.preventDefault();
            });
        }
    }, {
        key: "onKeyDown",
        value: function onKeyDown(e) {
            if (this.downkeys[e.keyCode]) return;
            this.downkeys[e.keyCode] = 1;
            for (var i in this.downevents) {
                this.downevents[i](e.keyCode);
            }
        }
    }, {
        key: "onKeyUp",
        value: function onKeyUp(e) {
            if (!this.downkeys[e.keyCode]) return;
            delete this.downkeys[e.keyCode];
            for (var i in this.upevents) {
                this.upevents[i](e.keyCode);
            }
        }
    }, {
        key: "onMouseDown",
        value: function onMouseDown(e) {
            for (var i in this.clickevents) {
                this.clickevents[i](e);
            }
        }
    }]);

    return Input;
})();

var UI = (function () {
    function UI(domElements) {
        _classCallCheck(this, UI);

        this.domElements = domElements;
    }

    _createClass(UI, [{
        key: "refreshScore",
        value: function refreshScore(score) {
            this.domElements.score.textContent = score;
        }
    }, {
        key: "refreshLife",
        value: function refreshLife(life) {
            this.domElements.life.textContent = life;
        }
    }, {
        key: "refreshGameStatus",
        value: function refreshGameStatus(gameover) {
            this.domElements.game.textContent = gameover ? 'Game Over' : '';
        }
    }]);

    return UI;
})();

var Game = (function () {
    function Game(canvas, configPath, domElements) {
        _classCallCheck(this, Game);

        this.canvas = canvas;
        this.canvas.width = 640;
        this.canvas.height = 480;

        this.ui = new UI(domElements);
        this.running = false;

        Loader.load(configPath, this.onLoadConfig.bind(this), function () {
            console.error('Error during configuration load', xhr);
        });
    }

    _createClass(Game, [{
        key: "onLoadConfig",
        value: function onLoadConfig(xhr) {
            var config = JSON.parse(xhr.responseText);
            this.config = config;
            this.init();
        }
    }, {
        key: "init",
        value: function init() {
            this.input = new Input(canvas);
            this.projectiles = new Pool();
            this.player = new Player(this.config.player, this.input);
            this.castle = new Castle(this.config.castle);
            this.enemies = new Pool();
            this.oldTime = null;
            this.score = 0;
            this.wave = new Wave(this);

            this.run();
        }
    }, {
        key: "run",
        value: function run() {
            this.running = true;
            this.ui.refreshScore(this.score);
            this.ui.refreshLife(this.player.life);
            this.ui.refreshGameStatus(false);
            this.player.currentWeapon = new Bow(this.projectiles, this);
            this.nextWave();
            requestAnimationFrame(this.frame.bind(this));
        }
    }, {
        key: "frame",
        value: function frame(newTime) {
            if (!this.running) {
                return;
            }
            if (!this.oldTime) this.oldTime = newTime;
            var elapsedTime = (newTime - this.oldTime) / 1000;
            this.oldTime = newTime;
            this.update(elapsedTime);
            this.render();
            requestAnimationFrame(this.frame.bind(this));
        }
    }, {
        key: "update",
        value: function update(elapsedTime) {
            this.player.update(elapsedTime);
            this.wave.update(elapsedTime);
            for (var i = 0; i < this.enemies.length; i++) {
                if (this.enemies.get(i).alive) {
                    this.enemies.get(i).update(elapsedTime);
                }
            }
            for (var i = 0; i < this.projectiles.length; i++) {
                if (this.projectiles.get(i).alive) {
                    this.projectiles.get(i).update(elapsedTime);
                }
            }
            this.ui.refreshLife(this.player.life);
            if (this.player.life === 0 || this.castle.life === 0) {
                this.gameover();
            }
        }
    }, {
        key: "nextWave",
        value: function nextWave() {
            this.wave.init();
        }
    }, {
        key: "spawnEnemy",
        value: function spawnEnemy() {
            var enemy = this.enemies.getFree();
            if (!enemy) {
                enemy = new Enemy(0, 0, this);
                this.enemies.push(enemy);
            }
            enemy.position.x = Math.random() * 640;
            enemy.position.y = Math.random() * 480;
            enemy.respawn();
        }
    }, {
        key: "enemyKilled",
        value: function enemyKilled(enemy) {
            this.addScore(1);
        }
    }, {
        key: "findClosestEnemy",
        value: function findClosestEnemy(source) {
            var dist,
                min = Number.POSITIVE_INFINITY,
                closest;
            for (var i = 0; i < this.enemies.length; i++) {
                if (this.enemies.get(i).alive) {
                    dist = Geometry.getDistance(source, this.enemies.get(i).position);
                    if (dist < min) {
                        min = dist;
                        closest = this.enemies.get(i);
                    }
                }
            }

            return closest;
        }
    }, {
        key: "findClosestPlayerObject",
        value: function findClosestPlayerObject(position) {
            var playerDist = Geometry.getDistance(position, this.player.position);
            var castleDist = Geometry.getDistance(position, this.castle.position);

            if (playerDist < castleDist) {
                return this.player;
            } else {
                return this.castle;
            }
        }
    }, {
        key: "isColliding",
        value: function isColliding(source, target) {
            return source.position.x + source.w > target.position.x && source.position.x < target.position.x + target.w && source.position.y + source.h > target.position.y && source.position.y < target.position.y + target.h;
        }
    }, {
        key: "addScore",
        value: function addScore(value) {
            this.score += value;
            this.ui.refreshScore(this.score);
        }
    }, {
        key: "gameover",
        value: function gameover() {
            this.running = false;
            this.ui.refreshGameStatus(true);
        }
    }, {
        key: "render",
        value: function render() {
            var context = this.canvas.getContext('2d');
            context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.player.render(context);
            this.castle.render(context);
            for (var i = 0; i < this.enemies.length; i++) {
                if (this.enemies.get(i).alive) {
                    this.enemies.get(i).render(context);
                }
            }
            for (var i = 0; i < this.projectiles.length; i++) {
                if (this.projectiles.get(i).alive) {
                    this.projectiles.get(i).render(context);
                }
            }
        }
    }]);

    return Game;
})();
