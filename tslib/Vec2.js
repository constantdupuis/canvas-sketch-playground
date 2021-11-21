"use strict";
exports.__esModule = true;
exports.Vec2 = void 0;
var Vec2 = (function () {
    function Vec2(x, y) {
        if (x === void 0) { x = 0; }
        if (y === void 0) { y = 0; }
        this.x = x;
        this.y = y;
    }
    Vec2.prototype.add = function (vec) {
        this.x += vec.x;
        this.y += vec.y;
    };
    Vec2.prototype.getAdd = function (vec) {
        var ret;
        ret.add(vec);
        return ret;
    };
    Vec2.prototype.mult = function (factor) {
        if (typeof factor == "number") {
            this.x *= factor;
            this.y *= factor;
        }
        else {
            this.x *= factor.x;
            this.y *= factor.y;
        }
    };
    Vec2.prototype.getMult = function (factor) {
        var ret;
        ret.mult(factor);
        return ret;
    };
    return Vec2;
}());
exports.Vec2 = Vec2;
//# sourceMappingURL=Vec2.js.map