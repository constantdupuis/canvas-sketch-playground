"use strict";
var Vide = /** @class */ (function () {
    function Vide(nimporte) {
        this.value = nimporte;
    }
    Vide.prototype.log = function () {
        console.log("Vide::log - " + this.value);
    };
    return Vide;
}());
module.exports = Vide;
